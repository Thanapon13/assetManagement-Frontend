import React, { useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { BsArrowLeft } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";

const AssetInformationIndex = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [perPage, setPerPage] = useState(10);

  const [input, setInput] = useState({
    ID: "",
    serialNumber: "",
    engProductName: "",
    productName: "",
    type: "",
    kind: "",
    unit: "",
    brand: "",
    model: "",
    size: "",
    quantity: 0,
    serialNumberMachine: "",
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    source: "",
    guaranteedMonth: "",
    purposeOfUse: "",

    status: "not approve",
  });

  //Main Date
  const [insuranceStartDate, setInsuranceStartDate] = useState(todayThaiDate);
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState(todayThaiDate);

  // handle
  const handleChangeID = (e) => {
    const clone = { ...input };
    clone.ID = e.target.value;
    setInput(clone);
  };
  const handleChangeSerialNumber = (e) => {
    const clone = { ...input };
    clone.serialNumber = e.target.value;
    setInput(clone);
  };
  const handleChangeEngProductName = (e) => {
    const clone = { ...input };
    clone.engProductName = e.target.value;
    setInput(clone);
  };
  const handleChangeProductName = (e) => {
    const clone = { ...input };
    clone.productName = e.target.value;
    setInput(clone);
  };
  const handleChangeModel = (e) => {
    const clone = { ...input };
    clone.model = e.target.value;
    setInput(clone);
  };
  const handleChangeSize = (e) => {
    const clone = { ...input };
    clone.size = e.target.value;
    setInput(clone);
  };
  const handleChangeQuantity = (e) => {
    const clone = { ...input };
    clone.quantity = e.target.value;
    setInput(clone);
  };
  const handleChangeSerialNumberMachine = (e) => {
    const clone = { ...input };
    clone.serialNumberMachine = e.target.value;
    setInput(clone);
  };
  const handleChangeSource = (e) => {
    const clone = { ...input };
    clone.source = e.target.value;
    setInput(clone);
  };
  const handleChangeGuaranteedMonth = (e) => {
    const clone = { ...input };
    clone.guaranteedMonth = e.target.value;
    setInput(clone);
  };

  // const handleChangeAllPrice = (e) => {
  //   const clone = { ...input };
  //   clone.allPrice = e.target.value;
  //   setInput(clone);
  // };

  // data
  return (
    <div className="bg-background-page px-5 pt-10 pb-36 w-[100vw] sm:w-[85vw]">
      {/* Header */}
      <div className="flex items-center">
        <Link
          to="/assetInformationIndex"
          className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
        >
          <BsArrowLeft className="text-lg" />
        </Link>
        <div className="text-xl text-text-green ">เพิ่มครุภัณฑ์</div>
      </div>
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
          <Link
            to="/assetInformationIndex"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline ml-2"
          >
            ข้อมูลครุภัณฑ์
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">เพิ่มครุภัณฑ์</div>
        </div>
      </div>

      {/* block white top */}
      <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
        <div>บันทึกใบเบิกจ่ายครุภัณฑ์</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
          {/* ID */}
          <div>
            <div className="mb-1">ID ครุภัณฑ์</div>
            <input
              type="text"
              name="ID"
              id="ID"
              onChange={handleChangeID}
              value={input.ID}
              className="w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* เลขครุภัณฑ์ */}
          <div>
            <div className="mb-1">เลขครุภัณฑ์</div>
            <input
              type="text"
              name="serialNumber"
              id="serialNumber"
              onChange={handleChangeSerialNumber}
              value={input.serialNumber}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* ชื่อครุภัณฑ์ภาษาอังกฤษ */}
          <div>
            <div className="mb-1">ชื่อครุภัณฑ์ภาษาอังกฤษ</div>
            <input
              type="text"
              name="engProductName"
              id="engProductName"
              onChange={handleChangeEngProductName}
              value={input.engProductName}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* ชื่อครุภัณฑ์ภาษาไทย */}
          <div>
            <div className="mb-1">ชื่อครุภัณฑ์ภาษาไทย</div>
            <input
              type="text"
              name="productName"
              id="productName"
              onChange={handleChangeProductName}
              value={input.productName}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* ประเภทครุภัณฑ์ */}
          <div>
            <div className="mb-1">ประเภทครุภัณฑ์</div>
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ประเภทครุภัณฑ์"}
              />
            </div>
          </div>
          {/* ชนิดครุภัณฑ์ */}
          <div>
            <div className="mb-1">ชนิดครุภัณฑ์</div>
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ชนิดครุภัณฑ์"}
              />
            </div>
          </div>
          {/* หน่วยนับ */}
          <div>
            <div className="mb-1">หน่วยนับ</div>
            {/* <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                readOnly
                // value={input.selfproductName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"หน่วยนับ"}
              />
            </div>
          </div>
          {/* ยี่ห้อ */}
          <div>
            <div className="mb-1">ยี่ห้อ</div>
            {/* <input
                type="text"
                name="allPrice"
                id="allPrice"
                // onChange={handleChangeAllPrice}
                // value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ยี่ห้อ"}
              />
            </div>
          </div>
          {/* รุ่น */}
          <div>
            <div className="mb-1">รุ่น</div>
            <input
              type="text"
              name="model"
              id="model"
              onChange={handleChangeModel}
              value={input.model}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* ขนาด */}
          <div>
            <div className="mb-1">ขนาด</div>
            <input
              type="text"
              name="size"
              id="size"
              onChange={handleChangeSize}
              value={input.size}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* จำนวน */}
          <div>
            <div className="mb-1">จำนวน</div>
            <input
              type="text"
              name="quantity"
              id="quantity"
              onChange={handleChangeQuantity}
              value={input.quantity}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* หมายเลขเครื่อง */}
          <div>
            <div className="mb-1">หมายเลขเครื่อง</div>
            <input
              type="text"
              name="allPrice"
              id="allPrice"
              onChange={handleChangeSerialNumberMachine}
              value={input.serialNumberMachine}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* หมวด */}
          <div>
            <div className="mb-1">หมวด</div>
            {/* <input
                type="text"
                name="allPrice"
                id="allPrice"
                // onChange={handleChangeAllPrice}
                // value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"หมวด"}
              />
            </div>
          </div>
          {/* กลุ่ม */}
          <div>
            <div className="mb-1">กลุ่ม</div>
            {/* <input
                type="text"
                name="allPrice"
                id="allPrice"
                // onChange={handleChangeAllPrice}
                // value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"กลุ่ม"}
              />
            </div>
          </div>
          {/* ประเภทที่ได้มา */}
          <div>
            <div className="mb-1">ประเภทที่ได้มา</div>
            {/* <input
                type="text"
                name="allPrice"
                id="allPrice"
                // onChange={handleChangeAllPrice}
                // value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ประเภทที่ได้มา"}
              />
            </div>
          </div>
          {/* แหล่งที่ได้มา */}
          <div>
            <div className="mb-1">แหล่งที่ได้มา</div>
            <input
              type="text"
              name="source"
              id="source"
              onChange={handleChangeSource}
              value={input.source}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* วัตถุประสงค์ในการใช้งาน */}
          <div>
            <div className="mb-1">วัตถุประสงค์ในการใช้งาน</div>
            {/* <input
                type="text"
                name="allPrice"
                id="allPrice"
                // onChange={handleChangeAllPrice}
                // value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            <div className="flex h-[38px] ">
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"วัตถุประสงค์ในการใช้งาน"}
              />
            </div>
          </div>
          {/* จำนวนเดือนที่รับประกัน (เดือน) */}
          <div>
            <div className="mb-1">จำนวนเดือนที่รับประกัน (เดือน)</div>
            <input
              type="text"
              name="guaranteedMonth"
              id="guaranteedMonth"
              // onChange={handleChangeGuaranteedMonth}
              // value={input.guaranteedMonth}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            />
          </div>
          {/* วันที่เริ่มรับประกัน */}
          <div>
            <div className="mb-1">วันที่เริ่มรับประกัน</div>
            <div className="flex h-[38px]">
              <DateInput
                state={insuranceStartDate}
                setState={setInsuranceStartDate}
              />
            </div>
          </div>
          {/* วันที่สิ้นสุดรับประกัน */}
          <div>
            <div className="mb-1">วันที่สิ้นสุดรับประกัน</div>
            <div className="flex h-[38px]">
              <DateInput
                state={insuranceExpiredDate}
                setState={setInsuranceExpiredDate}
              />
            </div>
          </div>
        </div>

        {/* ภาพครุภัณฑ์และเอกสารประกอบ */}
        <div className="mt-16">
          {/* Header ภาพครุภัณฑ์และเอกสารประกอบ */}
          <div className="font-semibold">ภาพครุภัณฑ์และเอกสารประกอบ</div>
          <div className="flex text-xs mb-6">
            <div className=" text-text-gray mr-1">รูปภาพครุภัณฑ์*</div>
            <div className="font-semibold">(2/8 รูป)</div>
          </div>
          {/* image */}
          <div className="grid sm:grid-cols-6">
            <div className="sm:col-span-4 background-page py-10 px-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInformationIndex;
