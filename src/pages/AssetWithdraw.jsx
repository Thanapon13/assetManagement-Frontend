import React, { useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import RowOfWithdrawTableArray from "../components/table/RowOfWithdrawTableArray";

export const AssetWithdraw = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [search, setSearch] = useState({
    inventoryNumber: "",
    wordSearch: "",
    department: "",
    sector: "",
    // "withdrawDate":todayThaiDate
  });
  const [perPage, setPerPage] = useState(10);

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState(todayThaiDate);

  // data
  let withdrawTableArray = [
    {
      ID: "84745",
      billNumber: "4140-001-004",
      documentRegistration: "พล072565",
      sector: "ภาควิชาศัลยกรรมศาสตร์",
      withdrawDate: "14/12/2565 ",
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: "4140-001-004",
      documentRegistration: "พล072565",
      sector: "ภาควิชาศัลยกรรมศาสตร์",
      withdrawDate: "14/12/2565 ",
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: "4140-001-004",
      documentRegistration: "พล072565",
      sector: "ภาควิชาศัลยกรรมศาสตร์",
      withdrawDate: "14/12/2565 ",
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: "4140-001-004",
      documentRegistration: "พล072565",
      sector: "ภาควิชาศัลยกรรมศาสตร์",
      withdrawDate: "14/12/2565 ",
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: "4140-001-004",
      documentRegistration: "พล072565",
      sector: "ภาควิชาศัลยกรรมศาสตร์",
      withdrawDate: "14/12/2565 ",
      allPrice: 1100,
      count: 20,
    },
  ];

  return (
    <div className="bg-background-page px-5 pt-20 pb-36">
      {/* Header */}
      <div className="text-xl text-text-green ">รายการเบิกจ่ายครุภัณฑ์</div>
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
          <div className="text-text-gray ml-2">รายการเบิกจ่าย</div>
        </div>

        {/* right button เพิ่มใบเบิก */}
        <Link
          to="/SaveAssetWithdraw"
          className="bg-text-green text-white px-4 py-2 rounded"
        >
          + เพิ่มใบเบิกครุภัณฑ์
        </Link>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <Selector placeholder={"ID"} />
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
          <Selector placeholder={"สถานะ"} />
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <Selector placeholder={"ฝ่าย/กลุ่มงาน"} />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            // onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full h-[500px] ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">25 รายการ </div>
            </div>
            {/* top bar */}
            <div className="grid grid-cols-17 gap-2 h-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-t-lg border-b-[1px] border-border-gray-table">
              <div className="ml-2">ลำดับ</div>
              <div className="col-span-2">เลขที่ใบเบิก</div>
              <div className="col-span-3">ทะเบียนเอกสาร</div>
              <div className="col-span-3">หน่วยงาน</div>
              <div className="col-span-2">วันที่เบิก</div>
              <div className="col-span-2">รวมมูลค่า</div>
              <div className="col-span-2 ">จำนวนรายการ</div>
              <div className="col-span-2 text-center font-bold mr-2">
                Action
              </div>
            </div>
          </div>
          {withdrawTableArray?.map((el, idx) => {
            return (
              <RowOfWithdrawTableArray
                key={idx}
                index={idx}
                billNumber={el.billNumber}
                documentRegistration={el.documentRegistration}
                sector={el.sector}
                withdrawDate={el.withdrawDate}
                allPrice={el.allPrice}
                count={el.count}
              />
            );
          })}
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex mr-10">
              <div>Rows per page:</div>
              <select
                id="perPage"
                className="w-12 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default AssetWithdraw;
