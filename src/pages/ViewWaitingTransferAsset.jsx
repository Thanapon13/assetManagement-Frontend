import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import RowofTableSaveTransfer from "../components/table/RowofTableSaveTransfer";
import RowofTableViewWatingTransfer from "../components/table/RowofTableViewWatingTransfer";

const ViewWaitingTransferAsset = () => {
  // const todayThaiDate = ChangeDateToBuddhist(
  //   new Date().toLocaleString("th-TH")
  // );

  // const [countRow, setCountRow] = useState(1);

  const fetchData = {
    transferDocumentNumber: "trf.6603/1723011",
    transferSector: "ภาควิชาอายุรศาสตร์",
    subSector: "งานบริหารเภสัช",
    handler: "นายธรรมกร นามสมมุติ",
    transfereeSector: "สำนักบริหารงานเภสัช",
    building: "อาคารสำนักงานบริหารกิจการ",
    floor: "7",
    room: "704",
    note: "abc",
    transferPendingDate: "29/12/2565",
    transferPendingTime: "18:00",
    transferActiveDate: "1/1/2566",
    transferActiveTime: "18:00",
    firstName_recorder: "สุริวิภา",
    lastName_recorder: "ภาวนาจิต",
    dateTime_recorder: "12/12/2565",
    firstName_courier: "สุริวิภา",
    lastName_courier: "ภาวนาจิต",
    dateTime_courier: "12/12/2565",
    firstName_approver: "สุริวิภา",
    lastName_approver: "ภาวนาจิต",
    dateTime_approver: "12/12/2565",
    status: "waiting",

    reason: "reason",
    subComponentTransfer: [
      {
        assetNumber: "7440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "approve",
        checked: false,
      },
      {
        assetNumber: "7440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "approve",
        checked: false,
      },
      {
        assetNumber: "1440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "approve",
        checked: false,
      },
      {
        assetNumber: "8440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "approve",
        checked: false,
      },
      {
        assetNumber: "9440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "reject",
        checked: false,
      },
      {
        assetNumber: "2440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "reject",
        checked: false,
      },
      {
        assetNumber: "2440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "reject",
        checked: false,
      },
      {
        assetNumber: "2440-001-0001",
        productName: "พัดลม hatari แบบ...",
        serialNumber: "HjYn12wert434th/a",
        hostSector: "สำนักคอมพิวเตอร์",
        reason: "",
        status: "reject",
        checked: false,
      },
    ],
  };

  const [data, setData] = useState(fetchData);

  // handle


  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">
          รายละเอียดการโอน-ย้ายครุภัณฑ์
        </div>
        <div className="flex pt-3">
          {/* left home */}
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">
              รายละเอียดการโอน-ย้ายครุภัณฑ์
            </div>
          </div>
        </div>

        {/* รายละเอียดการโอน-ย้ายครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg">รายละเอียดการโอน-ย้ายครุภัณฑ์</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* เลขที่เอกสารการโอนย้าย */}
            <div className="text-gray-500">เลขที่เอกสารการโอนย้าย</div>
            <div>
              {data?.transferDocumentNumber !== ""
                ? data?.transferDocumentNumber
                : "-"}
            </div>
            {/* หน่วยงาน */}
            <div className="text-gray-500">หน่วยงาน</div>
            <div>
              {data?.transferSector !== "" ? data?.transferSector : "-"}
            </div>
            {/* ภาควิชา */}
            <div className="text-gray-500">ภาควิชา</div>
            <div>{data?.subSector !== "" ? data?.subSector : "-"}</div>
            {/* ผู้ดำเนินการ */}
            <div className="text-gray-500">ผู้ดำเนินการ</div>
            <div>{data?.handler !== "" ? data?.handler : "-"}</div>
          </div>
        </div>

        {/* ข้อมูลครุภัณฑ์ที่เลือก */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">ข้อมูลครุภัณฑ์ที่เลือก</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full h-[500px] p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-13 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-3">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-3">Serial Number</div>
                  <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                </div>
              </div>
              {data.subComponentTransfer?.map((el, idx) => {
                return (
                  <RowofTableViewWatingTransfer
                    key={idx}
                    index={idx}
                    row={el}
                    // saveTransferTableArray={saveTransferTableArray}
                    // setSaveTransferTableArray={setSaveTransferTableArray}
                  />
                );
              })}

              <div className="h-[24px]"></div>
            </div>
          </div>
        </div>
        {/* สถานที่ตั้งใหม่ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">สถานที่ตั้งใหม่</div>
          {/* Row 1 หน่วยงานที่รับโอน * */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                หน่วยงานที่รับโอน
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                className=" bg-table-gray pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
                disabled
                value={data && data?.transfereeSector}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                อาคาร
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                className=" bg-table-gray pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
                disabled
                value={data && data?.building}
              />
            </div>
          </div>
          {/* Row 2 ชั้น */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ชั้น</label>
              <input
                className=" bg-table-gray pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
                disabled
                value={data && data?.floor}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ห้อง</label>
              <input
                className=" bg-table-gray pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
                disabled
                value={data && data?.room}
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="bottom-0 bg-white  flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        <button
          type="button"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          บันทึกขอยืมครุภัณฑ์
        </button>
      </div>
    </>
  );
};

export default ViewWaitingTransferAsset;
