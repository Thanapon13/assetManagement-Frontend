import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import { getAllAsset, getBySearch } from "../api/assetApi";

const AssetInformationIndex = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [perPage, setPerPage] = useState(10);

  // search
  const [search, setSearch] = useState({
    typeTextSearch: "assetNumber",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: todayThaiDate,
    sector: "",
    page: "",
    limit: 10,
    total: "",
  });

  const [assetList, setAssetList] = useState([]);

  // handle
  function handleChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  const fetchSearchAssetList = async (paginationSearchObj) => {
    try {
      let res = [];
      // console.log(paginationSearchObj)
      if (paginationSearchObj) {
        res = await getBySearch(paginationSearchObj);
      } else {
        res = await getBySearch(search);
      }
      console.log(res.data.asset);

      // handle the response data
      setAssetList(res.data.asset);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });

      console.log([
        ...Array(
          Math.ceil(
            search.total < search.limit
              ? search.total / search?.total
              : search.limit / search?.total
          )
        ).keys(),
      ]);
      console.log([
        ...Array(
          Math.ceil(
           search.limit / search?.total
          )
        ).keys(),
      ]);
      console.log([
        ...Array(
          Math.ceil(
            search.total / search?.total
              
          )
        ).keys(),
      ]);

      console.log({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchSearchAssetList();
  };

  const handlePaginationSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchSearchAssetList({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchAssetList = async () => {
      try {
        const res = await getAllAsset();
        console.log(res.data.asset);
        setAssetList(res.data.asset);
        setSearch({
          ...search,
          page: res.data.page,
          limit: res.data.limit,
          total: res.data.total,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAssetList();
  }, []);

  return (
    <div className="bg-background-page px-5 pt-10 pb-36">
      {/* Header */}
      <div className="text-xl text-text-green ">ข้อมูลครุภัณฑ์</div>
      <div className="flex justify-between items-center">
        {/* left home */}
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ข้อมูลครุภัณฑ์</div>
        </div>

        {/* right button เพิ่มใบเบิก */}
        <Link
          to="/assetInformation"
          type="button"
          className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          + เพิ่มใบเบิกครุภัณฑ์
        </Link>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          {/* <Selector placeholder={"ID"} /> */}
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="typeTextSearch"
            value={search.typeTextSearch}
            onChange={handleChange}
          >
            <option defaultValue value="assetNumber">
              เลขครุภัณฑ์
            </option>
            <option>all</option>
            <option>all</option>
            <option>all</option>
          </select>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            name="textSearch"
            onChange={handleChange}
            value={search.textSearch}
            placeholder="เลขครุภัณฑ์"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3">
          {/* <Selector placeholder={"สถานะ"} /> */}
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะ
            </option>
            <option value="inStock">ใช้งานได้</option>
            <option value="transfered">โอน</option>
            <option value="borrowws">ยืม</option>
            <option value="broken">ชำรุด</option>
            <option value="repair">ซ่อม</option>
            <option value="sell">จำหน่าย</option>
            <option value="">แทงจำหน่าย</option>
          </select>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateFrom"
              state={search}
              setState={setSearch}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateTo"
              state={search}
              setState={setSearch}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3 ">
          <Selector
            placeholder={"หน่วยงาน"}
            id={"หน่วยงาน"}
            state={search}
            setState={setSearch}
          />
        </div>

        <div className="flex justify-end">
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

      {/* table */}
      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1000px] lg:w-full h-[500px] ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">{search.total} รายการ </div>
            </div>
            {/* top bar */}
            <div className="grid grid-cols-16 gap-5 h-12 items-center text-center text-text-black-table text-xs font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
              <div className="ml-2">ID</div>
              <div className="col-span-3">เลขครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-2">ราคา</div>

              <div className="col-span-3">หน่วยงาน</div>
              {/* <div className="col-span-1">อาคาร</div> */}
              <div className="col-span-2 text-center">สถานะ</div>
              <div className="col-span-2 text-center font-bold mr-2">
                Action
              </div>
            </div>
          </div>
          {assetList?.map((el, idx) => {
            return (
              <RowOfTableArray
                key={idx}
                index={idx}
                _id={el._id}
                realAssetId={el.realAssetId}
                assetNumber={el.assetNumber}
                productName={el.productName}
                // department={el.department}
                sector={el.sector}
                // agency={el.agency}
                // building={el.building}
                // floor={el.floor}
                // room={el.room}
                status={el.status}
                price={el.pricePerUnit}
              />
            );
          })}
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex items-center mr-10">
              <div>Rows per page:</div>
              <select
                id="limit"
                name="limit"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlePaginationSearch}
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

            <div>
              1-{search.total < search.limit ? search.total : search.limit} of{" "}
              {search.total}
            </div>

            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1"
              // onClick={() => {
              //   deleteRow(index)
              // }}
            >
              <HiChevronLeft className="text-lg" />
            </button>
            {/* {[...Array(Math.ceil(search.limit/search.total)).keys()].map((idx)=> idx+1 )} */}
            {search?.total > 0 &&
              [
                ...Array(
                  Math.ceil(
                    search.total / search?.limit
                  )
                ).keys(),
              ]?.map((idx) => (
                
                <button
                  key={idx + 1}
                  name="page"
                  value={idx + 1}
                  className="flex justify-center items-center hover:bg-gray-200 text-black w-8 h-8 px-1 py-1"
                  onClick={handlePaginationSearch}
                >
                  {idx + 1}
                </button>
              ))}
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

export default AssetInformationIndex;
