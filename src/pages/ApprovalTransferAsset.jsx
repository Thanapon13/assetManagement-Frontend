import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalBorrowRejectAllApprove from "../components/modal/ModalBorrowRejectAllApprove";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalTransferRejectAllApprove from "../components/modal/ModalTransferRejectAllApprove";

const ApprovalTransferAsset = () => {
  const dataTopApproveList = [
    {
      id: "1271",
      transferSector: "ภาควิชาอายุรศาสตร์",
      transferPendingDate: "29/12/2565",
      transferPendingTime: "18:00",
      transferActiveDate: "1/1/2566",
      transferActiveTime: "18:00",
      reason: "",
      checked: false,
      subComponentTransfer: [
        {
          assetNumber: "7440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "8440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "9440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "2440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
      ],
    },
    {
      id: "1272",
      transferSector: "ภาควิชาเวทมนต์ศาสตร์มืด",
      transferPendingDate: "30/12/2565",
      transferPendingTime: "18:00",
      transferActiveDate: "1/1/2566",
      transferActiveTime: "18:00",
      reason: "",
      checked: false,
      subComponentTransfer: [
        {
          assetNumber: "7440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "8440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "9440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "2440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
      ],
    },
    {
      id: "1273",
      transferSector: "ภาควิชาปรุงยาแมนเดรก",
      transferPendingDate: "31/12/2565",
      transferPendingTime: "18:00",
      transferActiveDate: "1/1/2566",
      transferActiveTime: "18:00",
      reason: "",
      checked: false,
      subComponentTransfer: [
        {
          assetNumber: "7440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "8440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "9440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
        {
          assetNumber: "2440-001-0001",
          productName: "พัดลม hatari แบบ...",
          serialNumber: "HjYn12wert434th/a",
          hostSector: "สำนักคอมพิวเตอร์",
          reason: "",
          status: "wating",
          checked: false,
        },
      ],
    },
  ];

  const dataBottomApprovedList = [
    {
      id: "1271",
      transferSector: "ภาควิชาศาสตร์มืด",
      date: "29/12/2565",
      time: "18:00",
      offerDate: "9/03/2565",
      offerTime: "9:31",
      status: "approve",
    },
    {
      id: "1272",
      transferSector: "ภาควิชาศาสตร์มืดมิด",
      date: "30/12/2565",
      time: "19:00",
      offerDate: "12/03/2565",
      offerTime: "20:22",
      status: "partiallyApprove",
    },
    {
      id: "1273",
      transferSector: "ภาควิชาศาสตร์มืดมน",
      date: "23/11/2565",
      time: "12:00",
      offerDate: "22/05/2565",
      offerTime: "8:22",
      status: "reject",
    },
  ];

  const boxStyle = {
    boxStatus: `p-2 rounded-md flex flex-col items-center border-[2px] shadow-md`,
  };

  const [topApproveList, setTopApproveList] = useState(dataTopApproveList);
  const [bottomApprovedList, setBottomApprovedList] = useState(
    dataBottomApprovedList
  );

  // main input date state
  const [transferPendingDateTime, setTransferPendingDateTime] = useState(
    new Date()
  );

  // toggle check all
  const [isChecked, setIsChecked] = useState(false);

  const [selectedListOption, setSelectedListOption] = useState("select");

  const handleListOptionChange = (event) => {
    setSelectedListOption(event.target.value);
  };

  // handle
  const handleAllCheckboxChange = (list) => {
    setIsChecked(!isChecked);
    const newCheck = !isChecked;
    const newList = list.map((item) => {
      return { ...item, checked: newCheck };
    });
    setTopApproveList(newList);
  };

  const handleCheckboxChange = (list, id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setTopApproveList(newList);
  };

  return (
    <>
      <div className="bg-background-page pt-5 p-3 ">
        {/* Header */}
        <div className="text-2xl text-text-green ">อนุมัติโอน-ย้ายครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">อนุมัติโอน-ย้ายครุภัณฑ์</div>
          </div>
        </div>
        {/* รายการเสนออนุมัติประจำวัน */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg ">รายการเสนออนุมัติประจำวัน</div>
          {/* วันที่ */}
          <div className="grid md:grid-cols-3 pt-4 gap-5 md:gap-10">
            <div className="flex flex-col gap-y-2">
              <label className=" text-text-gray flex">วันที่</label>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  state={transferPendingDateTime}
                  setState={setTransferPendingDateTime}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-text-gray">
                หน่วยงานที่เสนอ(รหัส P4P)
              </label>
              <select className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md">
                <option className="">select</option>
                <option>select</option>
                <option>select</option>
                <option>select</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-text-gray">รายการ</label>
              <select
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md"
                value={selectedListOption}
                onChange={handleListOptionChange}
              >
                <option defaultValue>ดูทั้งหมด</option>
                <option>รออนุมัติ</option>
                <option>อนุมัติ</option>
                <option>ไม่อนุมัติ</option>
              </select>
            </div>
          </div>
          {/* status */}
          <div className="grid md:grid-cols-4 pt-5 gap-5 md:gap-10 p-2">
            <div className={`${boxStyle.boxStatus} border-blue-500`}>
              <h1>ทั้งหมด (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-blue-500">
                10
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-yellow-300`}>
              <h1>รออนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-yellow-700">
                4
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-green-500`}>
              <h1>อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-green-600">
                5
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-red-500`}>
              <h1>ไม่อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-red-500">1</div>
            </div>
          </div>
          {/* header approve list */}
          <div className="flex justify-between mt-5 pt-5 border-t-2">
            <div className="flex items-center space-x-5">
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={() => handleAllCheckboxChange(topApproveList)}
                  className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <h1 className="ml-2">เลือกทั้งหมด</h1>
              </div>
              <h1 className="">เลือกแล้ว {3} รายการ</h1>
            </div>
            <div className="flex space-x-5 md:space-x-10">
              <ModalTransferRejectAllApprove
                state={topApproveList}
                setState={setTopApproveList}
              />
              <ModalApproveAll />
            </div>
          </div>
          {/* approve list item */}
          <TransferApproveListItem
            state={topApproveList}
            setState={setTopApproveList}
            handle={handleCheckboxChange}
          />
        </div>
        {/* รายการคำขอที่จัดการแล้ว */}
        <div className="bg-white border-[1px] mb-5 p-4 rounded-lg shadow-sm text-sm mt-3">
          {/* header */}
          <div className="md:flex items-center  md:justify-between">
            <div className=" text-lg">รายการคำขอที่จัดการแล้ว</div>
            <div className="flex justify-between  md:space-x-5 mt-2 md:mt-0">
              <div className="flex text-text-green bg-sidebar-green p-2 border rounded-2xl ">
                อนุมัติแล้ว
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
                      fill="#38821D"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex text-red-500 bg-red-100 p-2 border rounded-2xl">
                ไม่อนุมัติ
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
              <div className="flex text-orange-400 bg-orange-100 p-2 border rounded-2xl">
                อนุมัติบางส่วน
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
                      fill="#F2994A"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* approved list item */}
          <TransferBottomApprovedListItem data={dataBottomApprovedList} />
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        {/* <Link
          // type="button"
          to="/borrowList"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </Link>
        <button
          type="button"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          บันทึกคืนครุภัณฑ์
        </button> */}
      </div>
    </>
  );
};

const TransferApproveListItem = (props) => {
  return (
    <>
      {props.state.map((item, idx) => {
        return (
          <div key={idx} className="flex items-center space-x-3">
            {/* <input
              type="checkbox"
              className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
            /> */}
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => props.handle(props.state, item.id)}
              className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
            />
            <div
              // to={`/approvalTransferAssetDetail/${item.id}`}
              className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full"
            >
              <div className="flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.id}</h1>
                </div>
                <div className="flex space-x-5 mr-5">
                  <h1>{item.transferPendingDate}</h1>
                  <h1>{item.transferPendingTime}</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่เสนอ</h1>
                  <h1>{item.transferSector}</h1>
                </div>
                <div className="flex justify-end space-x-5">
                  <ModalIndividualReject
                    state={props.state}
                    setState={props.setState}
                    index={idx}
                    item={item}
                  />
                  <Link
                    // type="button"
                    to={`/approvalTransferAssetDetail/${item.id}`}
                    className=" p-2 px-10 border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
                  >
                    อนุมัติ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const TransferBottomApprovedListItem = (props) => {
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <Link to={`/viewApprovalTransferAssetDetail/${item.id}`} key={idx}>
            <div
              key={idx}
              className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full"
            >
              <div className="flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.id}</h1>
                </div>
                <div className="flex space-x-2 mr-5 text-text-gray">
                  <h1>วันที่อนุมัติ: {item.date} ,</h1>
                  <h1>{item.time}</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex space-x-5">
                  <h1 className="text-text-gray">หน่วยงานที่เสนอ</h1>
                  <h1>{item.transferSector}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex text-text-gray">
                    วันที่เสนอ
                    <div className="px-5 text-black">
                      {item.offerDate} , {item.offerTime}
                    </div>
                  </div>
                  <div className="">
                    <div
                      className={` ${
                        item.status === "approve"
                          ? " bg-sidebar-green text-text-green    "
                          : item.status === "partiallyApprove"
                          ? "text-orange-400 bg-orange-100  "
                          : "text-red-500 bg-red-100"
                      } text-center px-4 py-2 rounded-full`}
                    >
                      {item.status === "approve"
                        ? "อนุมัติแล้ว"
                        : item.status === "partiallyApprove"
                        ? "อนุมัติบางส่วน"
                        : "ไม่อนุมัติ"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

const ModalApproveAll = () => {
  const [showModal, setShowModal] = useState(false);

  const tableData = [
    {
      borrowIdDoc: "br.2314530087",
      agencyBorrowerName: "พัดลม hatari แบบ",
      borrowDate: "27/05/2132",
    },
    {
      borrowIdDoc: "br.2314530087",
      agencyBorrowerName: "พัดลม hatari แบบ",
      borrowDate: "27/05/2132",
    },
    {
      borrowIdDoc: "br.2314530087",
      agencyBorrowerName: "พัดลม hatari แบบ",
      borrowDate: "27/05/2132",
    },
  ];

  return (
    <>
      <button
        className="p-2 border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
        type="button"
        onClick={() => setShowModal(true)}
      >
        อนุมัติทั้งหมด
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* รายการครุภัณฑ์ที่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่อนุมัติ
                    </h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  {/* table */}
                  <div className="overflow-x-auto  scrollbar pt-4 mb-5">
                    <div className="w-[1000px] lg:w-full">
                      <div className="grid grid-cols-8 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                        <div className="col-span-1">ลำดับ</div>
                        <div className="col-span-2">เลขที่เอกสารการยืม</div>
                        <div className="col-span-3">หน่วยงานที่เสนอ</div>
                        <div className="col-span-2">วันที่เสนอ</div>
                      </div>
                      <TableSummaryApprove data={tableData} />
                    </div>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const ModalIndividualReject = ({ item, state, setState, index }) => {
  const [showModal, setShowModal] = useState(false);

  const handleChangeArray = (e) => {
    const clone = [...state];
    clone[index] = clone[index] || {};
    clone[index][e.target.name] = e.target.value;
    console.log(clone);
    setState(clone);
  };

  const onChangeAllInIndexReason = (e, index) => {
    setState((prevState) => {
      const updatedDataTopApproveList = [...prevState];
      updatedDataTopApproveList[index].reason = e.target.value;
      updatedDataTopApproveList[index].subComponentTransfer.forEach(
        (subComponent) => (subComponent.reason = e.target.value)
      );
      console.log(updatedDataTopApproveList);
      return updatedDataTopApproveList;
    });
  };

  return (
    <>
      <button
        className="p-2 px-10 border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ไม่อนุมัติ
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* สาเหตุที่ไม่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl">สาเหตุที่ไม่อนุมัติ</h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  {/* reject information */}
                  <div className="p-3">
                    <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
                      <div className="md:flex justify-between">
                        <div className="flex space-x-10">
                          <h1>เลขที่ ID เลขที่การยืม</h1>
                          <h1>{item.id}</h1>
                        </div>
                        <div className="flex space-x-5 mr-5">
                          <h1>{item.date}</h1>
                          <h1>{item.time}</h1>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-5">
                          <h1>หน่วยงานที่เสนอ</h1>
                          <h1>{item.transferSector}</h1>
                        </div>
                        <div className="flex items-center space-x-5 mt-2">
                          <label>สาเหตุที่ไม่อนุมัติ</label>
                          <input
                            type="text"
                            name="reason"
                            placeholder="Example"
                            required
                            className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                            onChange={(e) => onChangeAllInIndexReason(e, index)}
                            value={state[index].reason}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-red-600 px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const TableSummaryApprove = (props) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div className="grid grid-cols-8 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.borrowIdDoc}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.agencyBorrowerName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.borrowDate}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ApprovalTransferAsset;