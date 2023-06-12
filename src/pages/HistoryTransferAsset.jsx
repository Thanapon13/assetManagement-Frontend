import React, { useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import RowOfTableTransferIndex from "../components/table/RowOfTableTransferIndex";
import RowOfTableHistoryTransfer from "../components/table/RowOfTableHistoryTransfer";
import { getBySearchTransferHistory, getTransferHistorySector } from "../api/transferApi";
import { useEffect } from "react";
import SearchSelector from "../components/selector/SearchSelector";

const HistoryTransferAsset = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [perPage, setPerPage] = useState(10);
  //Main Date
  const [withdrawDate, setWithdrawDate] = useState(todayThaiDate);
  const typeSearch = [
    { name: "เลขที่ใบเบิก", value: "transferId" },
    { name: "เลขครุภัณฑ์", value: "assetNumber" },
    { name: "เลขที่เอกสารการโอนย้าย", value: "transferDocumentNumber" },
  ]
  const [search, setSearch] = useState({
    typeTextSearch: "transferId",
    textSearch: "",
    // assetNumber: "",
    // transferId: "",
    // status: "",
    dateFrom: "",
    dateTo: new Date(),
    sector: "",
    page: "",
    limit: 10,
    total: 0,
  });
  const [data, setData] = useState();
  const [sectorList, setSectorList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getBySearchTransferHistory(search)
        const sector = await getTransferHistorySector()
        setData(history.data.transfer)
        const arrSector = []
        sector.data.transfereeSectors.map(ele => {
          arrSector.push({ label: ele.transfereeSector, value: ele.transfereeSector })
        })
        setSectorList(arrSector)
      } catch (err) {
        setData([])
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  };

  const handleSelect = (value, label) => {
    setSearch({ ...search, [label]: value })
  }

  const handleSearch = async () => {
    const res = await getTransferAssetBySearch(search)
    setTransferArray(res.data.transfer)
    setSearch({
      ...search,
      limit: res.data.limit,
      page: res.data.page,
      total: res.data.total
    })
  }

  return (
    <div className="bg-background-page px-5 py-10 min-h-full">
      <div className="text-xl text-text-green">ประวัติการโอน-ย้าย</div>
      <div className="flex justify-between items-center">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ประวัติการโอน-ย้าย</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="md:col-span-3 flex items-center">
          <div className="text-xs font-semibold flex-none px-3">ค้นหาโดย</div>
          <select
            className="ml-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
            value={search.typeTextSearch}
            onChange={handleChange}
            name="typeTextSearch"
          >

            {typeSearch.map(ele => (
              <option value={ele.value}>{ele.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-5 h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            id="textSearch"
            name="textSearch"
            onChange={handleChange}
            value={search.textSearch}
            placeholder={`ค้นหาโดย${typeSearch.find(ele => ele.value == search.typeTextSearch).name}`}
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3 md:pr-10">
          {/* <select
            className="md:ml-2 border text-sm border-gray-300 w-full text-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option value="" selected="selected">สถานะทั้งหมด</option>
            {status.map(ele => (
              <option value={ele.value}>{ele.name}</option>
            ))}
          </select> */}
        </div>

        <div className="md:col-span-2 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateFrom"
              state={search}
              setState={setSearch}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-2 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateTo"
              state={search}
              setState={setSearch}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <SearchSelector
            options={sectorList}
            placeholder={"หน่วยงานที่โอน"}
            name={"transferSector"}
            onChange={handleSelect}
            floatLabel
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1200px] 2xl:w-full  ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">{data?.length} รายการ </div>
            </div>
            {/* top bar */}
            <div className="grid grid-cols-17 gap-2 h-12 items-center text-text-black-table text-xs text-center font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
              <div className="col-span-1 ml-2">ลำดับ</div>
              <div className="col-span-3">เลขที่เอกสารการโอนย้าย</div>
              <div className="col-span-3">หน่วยงานผู้โอน</div>
              <div className="col-span-3">หน่วยงานรับโอน</div>
              <div className="col-span-3">สถานที่ตั้งใหม่</div>
              <div className="col-span-2 text-center">วันที่โอน</div>
              <div className="col-span-2 text-center font-bold mr-2">
                {/* Action */}
              </div>
            </div>
          </div>
          <div className="">
            {data?.map((el, idx) => {
              return (
                <RowOfTableHistoryTransfer
                  key={idx}
                  index={idx}
                  id={el._id}
                  transferPendingDateTime={new Date(el.dateTime_approver).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  transferDocumentNumber={el.transferDocumentNumber}
                  transferSector={el.transferSector}
                  transfereeSector={el.transfereeSector}
                  building={el.building}
                  status={el.status}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex items-end mr-10">
              <div>Rows per page:</div>
              <select
                id="perPage"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPerPage(e.target.value)}
              >
                {/* <option value="" selected disabled hidden>
            ประเภทครุภัณฑ์
          </option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10" selected="selected">
                  10
                </option>
              </select>
            </div>

            <div>1-{perPage} of 13</div>

            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1"
            // onClick={() => {
            //   deleteRow(index)
            // }}
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1"
            // onClick={() => {
            //   deleteRow(index)
            // }}
            >
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransferAsset;
