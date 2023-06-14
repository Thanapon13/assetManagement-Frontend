import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Selector from "../components/selector/Selector";
import TableBorrowCheckIndex from "../components/table/TableBorrowCheckIndex";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import DateInput from "../components/date/DateInput";
import {
  getBySearchBorrowCheck,
  getBorrowCheckSector,
} from "../api/borrowApi";
import BorrowHistorySectorSelector from "../components/selector/BorrowHistorySectorSelector";
import SearchSelector from "../components/selector/SearchSelector";

const BorrowCheckIndex = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );
  // useState
  const [amountPage, setAmountPage] = useState(1);

  // search
  const [search, setSearch] = useState({
    typeTextSearch: "borrowIdDoc",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: new Date(),
    sector: "",
    page: "",
    limit: 10,
    total: 0,
  });

  const [borrowList, setBorrowList] = useState([]);
  const [sectorList, setSectorList] = useState([]);

  // handle
  const handleChange = (e) => {
    console.log({ ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFirstPage = () => {
    if (search.page === 1) {
      // window.alert("You are already on the first page.");
    } else {
      setSearch({ ...search, page: 1 });
      fetchSearchBorrowList({ ...search, page: 1 });
    }
  };
  const handleLastPage = () => {
    if (search.page === amountPage) {
      // window.alert("You are already on the last page.");
    } else {
      setSearch({ ...search, page: amountPage });
      fetchSearchBorrowList({ ...search, page: amountPage });
    }
  };
  const handlePageDecrease = () => {
    // console.log(search.page)
    if (search.page > 1) {
      let newPage = search.page - 1;
      setSearch({ ...search, page: newPage });
      fetchSearchBorrowList({ ...search, page: newPage });
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
      fetchSearchBorrowList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the last page.");
    }
  };

  const fetchSearchBorrowList = async (paginationSearchObj) => {
    try {
      let res = [];
      // console.log(paginationSearchObj);
      if (paginationSearchObj) {
        res = await getBySearchBorrowCheck(paginationSearchObj);
      } else {
        res = await getBySearchBorrowCheck(search);
      }
      console.log(res.data.borrow);

      // handle the response data
      setBorrowList(res.data.borrow);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
      setAmountPage(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchSearchBorrowList();
  };

  const handlePaginationSearch = (e) => {
    console.log({ ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchSearchBorrowList({ ...search, [e.target.name]: e.target.value });
  };

  // fetch dropdown sector
  const fetchBorrowHistorySectorSelector = async () => {
    try {
      const res = await getBorrowCheckSector();
      console.log(res.data.sectors);
      setSectorList(res.data.sectors);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all data
  const fetchBorrowList = async () => {
    try {
      const res = await getBySearchBorrowCheck({});
      console.log(res.data.borrow);
      setBorrowList(res.data.borrow);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
      setAmountPage(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBorrowHistorySectorSelector();
    fetchBorrowList();
  }, []);

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">รายการรอตรวจรับคืน</div>
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
          <div className="text-text-gray ml-2">รายการรอตรวจรับคืน</div>
        </div>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="typeTextSearch"
            value={search.typeTextSearch}
            onChange={handleChange}
          >
            <option defaultValue value="borrowIdDoc">
              เลขที่เอกสารการยืม
            </option>
            <option defaultValue value="assetNumber">
              เลขครุภัณฑ์
            </option>
          </select>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            // name="requestedId"
            // id="requestedId"
            // onChange={(e) => setRequestedId(e.target.value)}
            // value={requestedId}
            placeholder="ค้นหาโดยเลขที่ใบเบิก"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3">
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะ
            </option>
            <option value="approve">อนุมัติแล้ว</option>
            <option value="partiallyApprove">อนุมัติบางส่วน</option>
            <option value="waitingReturnApprove ">รออนุมัติคืน</option>
            <option value="done">อนุมัติคืนแล้ว</option>
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
          {/* <BorrowHistorySectorSelector
            placeholder={"หน่วยงาน"}
            state={search}
            setState={setSearch}
            search={search}
            setSearch={setSearch}
            id={"sector"}
            data={sectorList}
          /> */}
            <SearchSelector
            options={sectorList}
            placeholder={"หน่วยงาน"}
            name={"sector"}
            onChange={(value, label) => setSearch({ ...search, [label]: value })}
            floatLabel
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
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-sm">ผลการค้นหา {search.total} รายการ</div>
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            {/* top bar */}
            <div className="grid grid-cols-12 gap-2 h-12 items-center text-center">
              <div className="col-span-1">ลำดับ</div>
              <div className="col-span-3">เลขที่เอกสารการยืม</div>
              <div className="col-span-3">หน่วยงานที่ยืม</div>
              <div className="col-span-1">วันที่ยืม</div>
              <div className="col-span-1">กำหนดคืน</div>
              <div className="col-span-1">วันที่คืน</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>
          <TableBorrowCheckIndex data={borrowList} search={search} />
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex mr-10 items-center">
              <div>Rows per page:</div>
              <select
                 id="limit"
                 name="limit"
                 className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 onChange={handlePaginationSearch}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10" defaultValue="selected">
                  10
                </option>
              </select>
            </div>

            <div>
              {" "}
              {search.limit * (search.page - 1) + 1}-
              {search.limit * (search.page - 1) + borrowList.length} of{" "}
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
        </div>
      </div>
    </div>
  );
};

export default BorrowCheckIndex;
