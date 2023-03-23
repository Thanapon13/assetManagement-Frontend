import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import RowofTableSaveTransfer from "../components/table/RowofTableSaveTransfer";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";

const SaveTransferAsset = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  const [countRow, setCountRow] = useState(1);

  const [input, setInput] = useState({
    transferDocumentNumber: "",
    transferSector: "",
    subSector: "",
    handler: "",
    building: "",
    floor: "",
    room: "",
    transfereeSector: "",
    transferPendingDateTime: todayThaiDate,
    firstName_recorder: "",
    lastName_recorder: "",
    dateTime_recorder: "",
    firstName_courier: "",
    lastName_courier: "",
    dateTime_courier: "",
    firstName_approver: "",
    lastName_approver: "",
    dateTime_approver: "",
    status: "waiting",
  });
  const [countIndexArray, setCountIndexArray] = useState([0]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [saveTransferTableArray, setSaveTransferTableArray] = useState([
    {
      index: 0,
      assetNumber: "",
      productName: "",
      serialNumber: "",
      hostSector: "",
    },
  ]);

  const tableData = [
    {
      ID: "1",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
    {
      ID: "2",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
    {
      ID: "3",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
  ];

  // handle
  const handleChangeID = (e) => {
    const clone = { ...input };
    clone.ID = e.target.value;
    setInput(clone);
  };
  const handleChangeBillNumber = (e) => {
    const clone = { ...input };
    clone.billNumber = e.target.value;
    setInput(clone);
  };
  const handleChangeDocumentRegistration = (e) => {
    const clone = { ...input };
    clone.documentRegistration = e.target.value;
    setInput(clone);
  };
  const handleChangeSector = (e) => {
    const clone = { ...input };
    clone.sector = e.target.value;
    setInput(clone);
  };
  const handleChangeEligiblePerson = (e) => {
    const clone = { ...input };
    clone.eligiblePerson = e.target.value;
    setInput(clone);
  };

  const handleChangeAllPrice = (e) => {
    const clone = { ...input };
    clone.allPrice = e.target.value;
    setInput(clone);
  };

  //handle bottom table
  const handleClickIncrease = (e) => {
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...saveTransferTableArray];
    const newCloneArray = {
      index: countRow,
      inventoryNumber: "",
      productName: "",
      brand: "",
      serialNumber: "",
      supplier: "",
      amount: "",
      price: "",
    };
    setSaveTransferTableArray([...clone, newCloneArray]);
  };

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1);
    }

    let clone = [...saveTransferTableArray];
    clone.splice(index, 1);
    setSaveTransferTableArray(clone);
  };

  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">บันทึกโอน-ย้ายครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">บันทึกโอน-ย้ายครุภัณฑ์</div>
          </div>
        </div>
        {/* การโอน-ย้ายครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">การโอน-ย้ายครุภัณฑ์</div>
          {/* Row 1 เลขที่เอกสารการยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                เลขที่เอกสารการโอนย้าย
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* หน่วยงานผู้โอน */}
            <div className="flex flex-col gap-y-2 col-span-2">
              <div>
                <div className="text-text-gray mb-1">หน่วยงานผู้โอน</div>
                <div className="flex h-[38px] ">
                  <Selector
                    placeholder={"Select"}
                    state={input}
                    setState={setInput}
                    id={"หน่วยงานผู้โอน"}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Row 2 วันที่ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            {/* ภาควิชาผู้โอน */}
            <div className="flex flex-col gap-y-2 col-span-2">
              <div>
                <div className="text-text-gray mb-1">ภาควิชาผู้โอน</div>
                <div className="flex h-[38px] ">
                  <Selector
                    placeholder={"Select"}
                    state={input}
                    setState={setInput}
                    id={"ภาควิชาผู้โอน"}
                  />
                </div>
              </div>
            </div>
            {/* ผู้ดำเนินการ */}
            <div className="flex flex-col gap-y-2 col-span-2">
              <div>
                <div className="text-text-gray mb-1">ผู้ดำเนินการ</div>
                <div className="flex h-[38px] ">
                  <Selector
                    placeholder={"Select"}
                    state={input}
                    setState={setInput}
                    id={"ผู้ดำเนินการ"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่เลือก */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่เลือก</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-14 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-3">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-3">Serial Number</div>
                  <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                </div>
              </div>
              {saveTransferTableArray?.map((el, idx) => {
                return (
                  <RowofTableSaveTransfer
                    key={idx}
                    index={idx}
                    saveTransferTableArray={saveTransferTableArray}
                    setSaveTransferTableArray={setSaveTransferTableArray}
                    deleteRow={deleteRow}
                  />
                );
              })}
              <button
                type="button"
                className="w-full h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มครุภัณฑ์
              </button>

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
              <Selector
                state={input}
                setState={setInput}
                id={"หน่วยงานที่รับโอน"}
                placeholder={"Select"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                อาคาร
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <Selector
                state={input}
                setState={setInput}
                id={"อาคาร"}
                placeholder={"Select"}
              />
            </div>
          </div>
          {/* Row 2 ชั้น */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ชั้น</label>
              <Selector
                state={input}
                setState={setInput}
                id={"ชั้น"}
                placeholder={"Select"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ห้อง</label>
              <Selector
                state={input}
                setState={setInput}
                id={"ห้อง"}
                placeholder={"Select"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      {/* <div className="bottom-0 bg-white  flex justify-end items-center gap-10 p-3 text-sm mr-3 "> */}
      {/* <button
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
        </button> */}
      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-3">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <div className="flex justify-end gap-4">
          <button
            className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
          >
            บันทึกแบบร่าง
          </button>
          <button
            type="button"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            // onClick={handleSubmit}
            onClick={() => setShowModalConfirm(true)}
          >
            บันทึกขออนุมัติ
          </button>
          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
          // onSave={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SaveTransferAsset;
