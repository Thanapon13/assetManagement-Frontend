import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import DateInput from "../components/date/DateInput";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import {
  getBorrowHistorySector,
  getBySearchBorrowHistory
} from "../api/borrowApi";
import BorrowHistorySectorSelector from "../components/selector/BorrowHistorySectorSelector";
import {
  getRepairHistoryBySearch,
  getRepairOutsourceBySearch
} from "../api/repairApi";
import SearchSelector from "../components/selector/SearchSelector";

const RepairOutsourceIndex = () => {
  const [search, setSearch] = useState({
    typeTextSearch: "borrowIdDoc",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: new Date(),
    sector: "",
    page: "",
    limit: 10,
    total: 0
  });

  const [dataList, setDataList] = useState([]);
  console.log("dataList:", dataList);
  const [sectorList, setSectorList] = useState([]);

  // handle
  const handleChange = e => {
    console.log({ ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFirstPage = () => {
    if (search.page === 1) {
      // window.alert("You are already on the first page.");
    } else {
      setSearch({ ...search, page: 1 });
      fetchDataList({ ...search, page: 1 });
    }
  };
  const handleLastPage = () => {
    if (search.page === amountPage) {
      // window.alert("You are already on the last page.");
    } else {
      setSearch({ ...search, page: amountPage });
      fetchDataList({ ...search, page: amountPage });
    }
  };
  const handlePageDecrease = () => {
    // console.log(search.page)
    if (search.page > 1) {
      let newPage = search.page - 1;
      setSearch({ ...search, page: newPage });
      fetchDataList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the first page.");
    }
  };
  const handlePageIncrease = () => {
    // console.log(search.page)
    // console.log(amountPage)
    if (search.page < amountPage) {
      let newPage = search.page + 1;
      setSearch({ ...search, page: newPage });
      fetchDataList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the last page.");
    }
  };

  const fetchDataList = async () => {
    try {
      const res = await getRepairOutsourceBySearch(search);
      console.log("res:", res.data.repair);
      setDataList(res.data.repair);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchDataList();
  };

  const handlePaginationSearch = e => {
    console.log({ ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchDataList({ ...search, [e.target.name]: e.target.value });
  };

  // fetch dropdown
  const getDropdown = async () => {
    try {
      const res = await getBorrowHistorySector();
      console.log(res.data.sectors);
      setSectorList(res.data.sectors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataList();
    getDropdown();
  }, []);

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">ตรวจสอบการจ้างซ่อมภายนอก</div>
      <div className="flex text-xs mt-3">
        <Link
          to="/"
          className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
        >
          Home
        </Link>
        <div className="text-text-gray">/</div>
        <div className="text-text-gray ml-2">ตรวจสอบการจ้างซ่อมภายนอก</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        {/* <div className="md:col-span-2">
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="typeTextSearch"
            value={search.typeTextSearch}
            onChange={handleChange}
          >
            <option defaultValue value="borrowIdDoc">
              เลขที่ใบซ่อมแซม
            </option>
            <option defaultValue value="assetNumber">
              เลขครุภัณฑ์
            </option>
          </select>
        </div> */}

        <div className="md:col-span-2  h-[38px] relative">
          <input
            type="text"
            name="textSearch"
            onChange={handleChange}
            value={search.textSearch}
            placeholder="เลขที่ใบแจ้งซ่อม"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-2  h-[38px] relative">
          <input
            type="text"
            name="textSearch"
            onChange={handleChange}
            value={search.textSearch}
            placeholder="เลขที่ใบแจ้งซ่อมภายนอก"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>
        <div className="md:col-span-3 ">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะใบแจ้งซ่อมภายนอก
            </option>
            <option value="">สถานะใบแจ้งซ่อมภายนอก1</option>
            <option value="">สถานะใบแจ้งซ่อมภายนอก2</option>
          </select>
        </div>

        <div className="md:col-span-3 ">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              ประเภทการซ่อม
            </option>
            <option value="">ประเภทการซ่อม1</option>
            <option value="">ประเภทการซ่อม2</option>
          </select>
        </div>

        <div className="md:col-span-2 h-full ">
          <div className="flex h-full">
            <DateInput id="dateFrom" state={search} setState={setSearch} />
          </div>
        </div>

        <div className="md:col-span-2 h-full ">
          <div className="flex h-full">
            <DateInput id="dateTo" state={search} setState={setSearch} />
          </div>
        </div>

        <div className="md:col-span-3">
          <SearchSelector
            options={sectorList}
            placeholder={"อาคาร"}
            name={"sector"}
            onChange={(value, label) =>
              setSearch({ ...search, [label]: value })
            }
            floatLabel
          />
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between gap-4">
            <div className="w-2/4 md:col-span-2">
              <SearchSelector
                options={sectorList}
                placeholder={"ชั้น"}
                name={"sector"}
                onChange={(value, label) =>
                  setSearch({ ...search, [label]: value })
                }
                floatLabel
              />
            </div>

            <button
              type="button"
              className="w-2/4 flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={handleSearch}
            >
              <div className="text-base text-white">
                <h1>ค้นหา</h1>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
          <div className="w-[1000px] xl:w-full xl:h-full ">
            {/* <div className="text-sm">ผลการค้นหา {search.total} รายการ</div> */}
            <div className="text-sm">รายการใบแจ้งซ่อม</div>
            {/* <div className="flex text-sm">
              <div className="flex text-blue-500 bg-blue-100 p-2 border rounded-2xl">
                ซ่อมครุภัณฑ์
                <div className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#CE4646"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex text-red-500 bg-red-100 p-2 border rounded-2xl">
                ซ่อมทั่วไป
                <div className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#CE4646"
                    />
                  </svg>
                </div>

              </div>
            </div> */}

            <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
              {/* top bar */}
              <div className="grid grid-cols-9 gap-2 h-12 items-center text-center">
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">เลขที่ใบซ่อม</div>
                <div className="col-span-2">อาการเสีย</div>
                <div className="col-span-1">หน่วยงานที่ส่งซ่อม</div>
                <div className="col-span-1">มูลค่างาน</div>
                <div className="col-span-1">สถานะใบซ่อม</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            <TableBorrowHistory data={dataList} search={search} />

            {!dataList.length ? (
              <center className="p-5">-</center>
            ) : (
              <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
                <div className="flex mr-10 items-center">
                  <div>Rows per page:</div>
                  <select
                    id="limit"
                    name="limit"
                    className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handlePaginationSearch}
                  >
                    <option value="5">5</option>
                    <option value="10" selected="selected">
                      {" "}
                      10{" "}
                    </option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <div className="mx-5">
                  {search.limit * (search.page - 1) + 1}-
                  {search.limit * (search.page - 1) + dataList.length} of{" "}
                  {search.total}
                </div>

                <button
                  className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
                  onClick={handleFirstPage}
                >
                  <CgPushChevronLeft className="text-lg" />
                </button>
                <button
                  className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
                  onClick={handlePageDecrease}
                >
                  <HiChevronLeft className="text-lg" />
                </button>
                <button
                  className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
                  onClick={handlePageIncrease}
                >
                  <HiChevronRight className="text-lg" />
                </button>
                <button
                  className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
                  onClick={handleLastPage}
                >
                  <CgPushChevronRight className="text-lg font-bold" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TableBorrowHistory = props => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-9 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1 flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2 m-auto">
              {props.search.page > 1 ? props.search.limit + idx + 1 : idx + 1}
            </div>
            <div className="col-span-2 py-2 w-full border-[1px] bg-[#CACACA] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-2  py-2 w-full border-[1px] bg-[#CACACA] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-1  py-2 w-full border-[1px] bg-[#CACACA] rounded-md">
              {item.hostSector}
            </div>
            <div className="col-span-1  py-2 w-full border-[1px] bg-[#CACACA] rounded-md">
              {new Date(item.repairedDate).toLocaleDateString("th-TH", options)}
            </div>
            <div
              onClick={() => handleClick(item.status)}
              className={`rounded-full border-0 ${
                item.urgentStatus === "rush"
                  ? "bg-text-green/[.2] text-text-green "
                  : item.urgentStatus === "rush"
                  ? "bg-yellow-300"
                  : "bg-red-200 text-red-600  border-red-200"
              } border border-spacing-5 p-2 w-full`}
            >
              {item.urgentStatus === "rush"
                ? "รับใบซ่อม"
                : item.urgentStatus === "rush"
                ? "รอเบิกวัสดุ"
                : "ยกเลิก"}
            </div>
            <div className="col-span-1 flex justify-center">
              <Link
                to={`/historyRepair/${item._id}`}
                className="border flex gap-1 items-center p-1 rounded-md border-text-green text-text-green hover:bg-sidebar-green "
              >
                <svg
                  width="17"
                  height="11"
                  viewBox="0 0 17 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.49967 8.65592C9.33787 8.65592 10.0492 8.36374 10.6335 7.77936C11.2179 7.19499 11.5101 6.4837 11.5101 5.64551C11.5101 4.80731 11.2179 4.09603 10.6335 3.51165C10.0492 2.92728 9.33787 2.63509 8.49967 2.63509C7.66148 2.63509 6.9502 2.92728 6.36582 3.51165C5.78145 4.09603 5.48926 4.80731 5.48926 5.64551C5.48926 6.4837 5.78145 7.19499 6.36582 7.77936C6.9502 8.36374 7.66148 8.65592 8.49967 8.65592ZM8.49967 7.62884C7.94481 7.62884 7.47554 7.437 7.09186 7.05332C6.70818 6.66964 6.51634 6.20037 6.51634 5.64551C6.51634 5.09065 6.70818 4.62138 7.09186 4.23769C7.47554 3.85401 7.94481 3.66217 8.49967 3.66217C9.05453 3.66217 9.52381 3.85401 9.90749 4.23769C10.2912 4.62138 10.483 5.09065 10.483 5.64551C10.483 6.20037 10.2912 6.66964 9.90749 7.05332C9.52381 7.437 9.05453 7.62884 8.49967 7.62884ZM8.49967 10.958C6.77606 10.958 5.21773 10.4681 3.82467 9.48822C2.43162 8.50835 1.39273 7.22745 0.708008 5.64551C1.39273 4.06356 2.43162 2.78266 3.82467 1.8028C5.21773 0.822938 6.77606 0.333008 8.49967 0.333008C10.2233 0.333008 11.7816 0.822938 13.1747 1.8028C14.5677 2.78266 15.6066 4.06356 16.2913 5.64551C15.6066 7.22745 14.5677 8.50835 13.1747 9.48822C11.7816 10.4681 10.2233 10.958 8.49967 10.958Z"
                    fill="#38821D"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RepairOutsourceIndex;
