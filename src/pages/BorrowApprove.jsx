import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalBorrowRejectAllApprove from "../components/modal/ModalBorrowRejectAllApprove";
import OnlyDateInput from "../components/date/onlyDateInput";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import {
  approveAllWaitingBorrow,
  getAllFirstFetchBorrowApprove,
  getAllSectorFromBorrow,
  getBySearchTopBorrowApprove,
  rejectIndividualWaitingBorrow,
} from "../api/borrowApi";
import ApproveSectorSelector from "../components/selector/ApproveSectorSelector";
import { id } from "date-fns/locale";

const BorrowApprove = () => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };

  const [search, setSearch] = useState({
    dateFrom: "",
    dateTo: new Date(),
    sector: "",
    listStatus: [],
  });
  const [amountOfStatusList, setAmountOfStatusList] = useState({
    totalAll: 0,
    totalApprove: 0,
    totalReject: 0,
    totalWaiting: 0,
  });

  const [sectorList, setSectorList] = useState([]);

  const boxStyle = {
    boxStatus: `p-2 rounded-md flex flex-col items-center border-[2px] shadow-md`,
  };

  const [topApproveList, setTopApproveList] = useState([]);
  const [bottomApprovedList, setBottomApprovedList] = useState([]);

  // toggle check all
  const [isChecked, setIsChecked] = useState(false);

  const fetchSearchWaitingBorrowList = async () => {
    try {
      console.log(search);
      const res = await getBySearchTopBorrowApprove(search);
      console.log(res.data);
      // console.log("top",res.data.topApproveList);
      // console.log("bottom",res.data.bottomApproveList);
      setTopApproveList(res.data.topApproveList);
      setBottomApprovedList(res.data.bottomApproveList);
    } catch (err) {
      console.log(err);
    }
  };

  // handle checkbox
  const handleAllCheckboxChange = (list) => {
    setIsChecked(!isChecked);
    const newCheck = !isChecked;
    const newList = list.map((item) => {
      return { ...item, checked: newCheck };
    });
    console.log(newList);
    setTopApproveList(newList);
  };

  const handleCheckboxChange = (list, id) => {
    const newList = list.map((item) => {
      if (item._id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    console.log(newList);
    setTopApproveList(newList);
  };

  const handleSearch = () => {
    fetchSearchWaitingBorrowList();
  };

  // handle add ListStatus in search
  const handleListStatusChange = (value) => {
    const listStatus = search.listStatus;
    const index = listStatus.indexOf(value);
    console.log(index);
    if (index === -1) {
      listStatus.push(value);
    } else {
      listStatus.splice(index, 1);
    }
    console.log(listStatus);
    setSearch({ ...search, listStatus: listStatus });
  };

  // Modal Submit
  const handleApproveAllWaitingList = async (e, state) => {
    e.preventDefault();
    console.log(state);
    const topApproveListJSON = JSON.stringify(state);
    console.log(topApproveListJSON);
    await approveAllWaitingBorrow({
      topApproveList: topApproveListJSON,
    });
    await fetchFirstBorrowApproveData();
  };

  // fetch dropdown sector
  const fetchApproveSectorSelector = async () => {
    try {
      const res = await getAllSectorFromBorrow();
      // console.log(res.data.sectors);
      setSectorList(res.data.sectors);
    } catch (err) {
      console.log(err);
    }
  };

  // getAllFirstFetchBorrowApprove
  const fetchFirstBorrowApproveData = async () => {
    try {
      const res = await getAllFirstFetchBorrowApprove();
      // console.log(res.data);
      // console.log(res.data.waitingList);
      // console.log("bottomList", res.data.bottomList);
      setTopApproveList(res.data.waitingList);
      setBottomApprovedList(res.data.bottomList);
      // setSectorList(res.data.sectors);
      setAmountOfStatusList({
        totalAll: res.data.totalAll,
        totalApprove: res.data.totalApprove,
        totalReject: res.data.totalReject,
        totalWaiting: res.data.totalWaiting,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApproveSectorSelector();
    fetchFirstBorrowApproveData();
  }, []);

  return (
    <>
      <div className="bg-background-page pt-5 p-3 ">
        {/* Header */}
        <div className="text-2xl text-text-green ">อนุมัติยืมครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">อนุมัติยืมครุภัณฑ์</div>
          </div>
        </div>
        {/* รายการเสนออนุมัติประจำวัน */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg ">รายการเสนออนุมัติประจำวัน</div>
          {/* วันที่ */}
          <div className="grid md:grid-cols-7 pt-4 gap-5 md:gap-x-5">
            <div className=" md:col-span-2 flex flex-col gap-y-2">
              <label className=" text-text-gray flex">วันที่เริ่มต้น</label>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  id="dateFrom"
                  state={search}
                  setState={setSearch}
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-y-2">
              <label className=" text-text-gray flex">วันที่สิ้นสุด</label>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  id="dateTo"
                  state={search}
                  setState={setSearch}
                />
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-y-2">
              <label className="text-text-gray">
                หน่วยงานที่เสนอ(รหัส P4P)
              </label>
              {/* <select className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md">
                <option className="">select</option>
                <option>select</option>
                <option>select</option>
                <option>select</option>
              </select> */}
              <ApproveSectorSelector
                placeholder={"Select"}
                state={search}
                setState={setSearch}
                search={search}
                setSearch={setSearch}
                id={"sector"}
                data={sectorList}
              />
            </div>
            {/* <div className=" md:col-span-3 flex flex-col gap-y-2">
              <label className="text-text-gray">รายการ</label>
              <select className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md">
                <option defaultValue>ดูทั้งหมด</option>
                <option>รออนุมัติ</option>
                <option>อนุมัติ</option>
                <option>ไม่อนุมัติ</option>
              </select>
            </div> */}

            <div className="flex justify-end items-end">
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
          {/* status */}
          <div className="grid md:grid-cols-4 pt-5 gap-5 md:gap-10 p-2">
            <div className={`${boxStyle.boxStatus} border-blue-500`}>
              <h1>ทั้งหมด (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-blue-500">
                {amountOfStatusList.totalAll}
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-yellow-300`}>
              <h1>รออนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-yellow-700">
                {amountOfStatusList.totalWaiting}
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-green-500`}>
              <h1>อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-green-600">
                {amountOfStatusList.totalApprove}
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-red-500`}>
              <h1>ไม่อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-red-500">
                {amountOfStatusList.totalReject}
              </div>
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
              <h1 className="">
                เลือกแล้ว {amountOfStatusList.totalWaiting} รายการ
              </h1>
            </div>
            <div className="flex space-x-5 md:space-x-10">
              <ModalBorrowRejectAllApprove
                state={topApproveList}
                setState={setTopApproveList}
                fetchFirstBorrowApproveData={fetchFirstBorrowApproveData}
              />
              <ModalApproveAll
                state={topApproveList}
                setState={setTopApproveList}
                handleApproveAllWaitingList={handleApproveAllWaitingList}
              />
            </div>
          </div>
          {/* approve list item */}
          <div className="mt-3">
            <BorrowApproveListItem
              state={topApproveList}
              setState={setTopApproveList}
              handle={handleCheckboxChange}
              fetchFirstBorrowApproveData={fetchFirstBorrowApproveData}
            />
          </div>
        </div>
        {/* รายการคำขอที่จัดการแล้ว */}
        <div className="bg-white border-[1px] mb-5 p-4 rounded-lg shadow-sm text-sm mt-3">
          {/* header */}
          <div className="flex items-center space-x-10">
            <div className="text-lg">รายการคำขอที่จัดการแล้ว</div>
            <div className="md:flex space-x-5">
              <button
                className={`flex text-text-green bg-sidebar-green p-2 border rounded-2xl ${
                  search.listStatus.includes("approve")
                    ? "border-2 border-green-800 "
                    : ""
                }`}
                onClick={() => handleListStatusChange("approve")}
              >
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
              </button>
              <button
                className={`flex text-red-500 bg-red-100 p-2 border rounded-2xl  ${
                  search.listStatus.includes("reject")
                    ? "border-2 border-red-800 "
                    : ""
                }`}
                onClick={() => handleListStatusChange("reject")}
              >
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
              </button>
              <button
                className={`flex text-orange-400 bg-orange-100 p-2 border rounded-2xl  ${
                  search.listStatus.includes("partiallyApprove")
                    ? "border-2 border-orange-800 "
                    : ""
                }`}
                onClick={() => handleListStatusChange("partiallyApprove")}
              >
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
              </button>
            </div>
          </div>
          {/* approved list item */}
          <div className="mt-3">
            <BorrowApprovedListItem data={bottomApprovedList} />
          </div>
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

const BorrowApproveListItem = (props) => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return (
    <div className="overflow-x-auto overflow-y-auto scrollbar ">
      <div className=" h-[500px] ">
        {props.state.map((item, idx) => {
          return (
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => props.handle(props.state, item._id)}
                className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
              />
              <div className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full">
                <div className="flex justify-between">
                  <div className="flex space-x-10">
                    <h1>เลขที่ ID เลขที่การยืม</h1>
                    <h1>{item.borrowIdDoc}</h1>
                  </div>
                  <div className="flex space-x-5 mr-5">
                    <h1>
                      {new Date(item.borrowDate).toLocaleDateString(
                        "th-TH",
                        options
                      )}
                    </h1>
                    <h1>
                      {new Date(item.borrowDate).toLocaleTimeString(
                        "th-TH",
                        hoursOptions
                      )}
                    </h1>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex space-x-5">
                    <h1>หน่วยงานที่เสนอ</h1>
                    <h1>{item.sector}</h1>
                  </div>
                  <div className="flex justify-end space-x-5">
                    <ModalIndividualReject
                      idx={idx}
                      state={props.state}
                      setState={props.setState}
                      fetchFirstBorrowApproveData={
                        props.fetchFirstBorrowApproveData
                      }
                    />
                    <Link
                      // type="button"
                      to={`/borrowApproveDetail/${props.state[idx]._id}`}
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
      </div>
    </div>
  );
};

const BorrowApprovedListItem = ({ data }) => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return (
    <div className="overflow-x-auto overflow-y-auto scrollbar ">
      <div className=" h-[500px] ">
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full"
            >
              <div className="flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.borrowIdDoc}</h1>
                </div>
                <div className="flex space-x-2 mr-5 text-text-gray">
                  <h1>
                    วันที่อนุมัติ:{" "}
                    {new Date(item.borrowDate).toLocaleDateString(
                      "th-TH",
                      options
                    )}{" "}
                    ,
                  </h1>
                  <h1>
                    {new Date(item.borrowDate).toLocaleTimeString(
                      "th-TH",
                      hoursOptions
                    )}
                  </h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex space-x-5">
                  <h1 className="text-text-gray">หน่วยงานที่เสนอ</h1>
                  <h1>{item.sector}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex text-text-gray">
                    วันที่เสนอ
                    <div className="px-5 text-black">
                      {new Date(item.dateTime_approver).toLocaleDateString(
                        "th-TH",
                        options
                      )}{" "}
                      ,{" "}
                      {new Date(item.dateTime_approver).toLocaleTimeString(
                        "th-TH",
                        hoursOptions
                      )}
                    </div>
                  </div>
                  <div className="">
                    <div
                      className={`${
                        item.status === "waiting"
                          ? " bg-background-light-blue text-text-blue  rounded-xl "
                          : item.status === "approve"
                          ? " bg-sidebar-green text-text-green  rounded-xl  "
                          : item.status === "watingReturnApprove"
                          ? "bg-orange-100 text-orange-400 rounded-xl"
                          : item.status === "cancel" || item.status === "reject"
                          ? "bg-red-200 text-red-600  rounded-xl"
                          : "bg-text-green text-white rounded-md hover:bg-green-800"
                      } border border-spacing-5 p-2 w-full`}
                    >
                      {item.status === "waiting"
                        ? "รออนุมัติ"
                        : item.status === "done"
                        ? "คืนสำเร็จ"
                        : item.status === "waitCheckReturn"
                        ? "รอตรวจรับ"
                        : item.status === "cancel"
                        ? "ยกเลิก"
                        : item.status === "reject"
                        ? "ไม่อนุมัติ"
                        : "บันทึกคืน"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ModalApproveAll = ({ state, setState, handleApproveAllWaitingList }) => {
  const [showModal, setShowModal] = useState(false);

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
                      <TableSummaryApprove state={state} setState={setState} />
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
                  <button
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    type="button"
                    onClick={(e) => {
                      setShowModal(false);
                      handleApproveAllWaitingList(e, state);
                    }}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const ModalIndividualReject = ({
  state,
  setState,
  idx,
  fetchFirstBorrowApproveData,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const state = props.state;

  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const handleChangeIndividualReject = (e) => {
    const clone = [...state];
    clone[idx][e.target.name] = e.target.value;
    setState(clone);
  };

  const handleSubmitIndividualReject = async (e) => {
    e.preventDefault();
    const cloneObject = state[idx];

    const filteredAndModifiedObject = (input) => {
      // add the reason property to each item in the filtered packageAssetIdArray
      const modifiedPackageAssetIdArray = input.packageAssetIdArray.map(
        (asset) => ({
          ...asset,
          reason: input.reason,
        })
      );

      // add the reason property to each item in the assetIdArray
      const modifiedAssetIdArray = input.assetIdArray.map((asset) => ({
        ...asset,
        reason: input.reason,
      }));

      // create a new object with the modified packageAssetIdArray and assetIdArray
      return {
        ...input,
        packageAssetIdArray: modifiedPackageAssetIdArray,
        assetIdArray: modifiedAssetIdArray,
      };
    };

    const result = filteredAndModifiedObject(cloneObject);

    // only one that you select
    const topApproveListJSON = JSON.stringify(result);
    await rejectIndividualWaitingBorrow({
      topApproveList: topApproveListJSON,
    });
    await fetchFirstBorrowApproveData();
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
                          <h1>{state[idx].borrowIdDoc}</h1>
                        </div>
                        <div className="flex space-x-5 mr-5">
                          <h1>
                            {" "}
                            {new Date(state[idx].borrowDate).toLocaleDateString(
                              "th-TH",
                              options
                            )}
                          </h1>
                          <h1>
                            {" "}
                            {new Date(state[idx].borrowDate).toLocaleTimeString(
                              "th-TH",
                              hoursOptions
                            )}
                          </h1>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-5">
                          <h1>หน่วยงานที่เสนอ</h1>
                          <h1>{state[idx].sector}</h1>
                        </div>
                        <div className="flex items-center space-x-5 mt-2">
                          <label>สาเหตุที่ไม่อนุมัติ</label>
                          <input
                            type="text"
                            name="reason"
                            value={state[idx].reason}
                            onChange={(e) => handleChangeIndividualReject(e)}
                            placeholder="Example"
                            required
                            className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
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
                    onClick={(e) => {
                      setShowModal(false);
                      handleSubmitIndividualReject(e);
                    }}
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

const TableSummaryApprove = ({ state, setState }) => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  console.log("TableSummaryApprove", state);

  const anyChecked = state.some((item) => item.checked);

  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <div>
      {anyChecked ? (
        state.map((item, idx) => {
          if (item.checked) {
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
                  {item.sector}
                </div>
                <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                  {new Date(item.borrowDate).toLocaleDateString(
                    "th-TH",
                    options
                  )}
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="flex justify-center items-center h-40">
          ยังไม่มีรายการยืมที่ท่านเลือก
        </div>
      )}
    </div>
  );
};

export default BorrowApprove;
