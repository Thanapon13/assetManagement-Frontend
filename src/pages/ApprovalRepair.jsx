import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalBorrowRejectAllApprove from "../components/modal/ModalBorrowRejectAllApprove";
import ModalTransferRejectAllApprove from "../components/modal/ModalTransferRejectAllApprove";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import OnlyDateInput from "../components/date/onlyDateInput";
import { useEffect } from "react";
import { getSector } from "../api/masterApi";
import SearchSelector from "../components/selector/SearchSelector";
import { Spinner } from "flowbite-react/lib/esm";
import {
  approveAllWaitingRepair,
  getListApprovalRepair,
  rejectIndividualWaitingRepair
} from "../api/repairApi";
import ModalRepairRejectAllApprove from "../components/modal/ModalRepairRejectAllApprove";

function ApprovalRepair() {
  const allStatus = ["inProgressOfDetailRecord", "reject"];
  const [search, setSearch] = useState({
    listStatus: "",
    dateFrom: "",
    dateTo: ""
  });

  console.log("search:", search);

  const [isFetch, setIsFetch] = useState(true);
  const optionDate = { day: "2-digit", month: "2-digit", year: "numeric" };
  const optionTime = { hour: "2-digit", minute: "2-digit", our12: false };

  const [topApproveList, setTopApproveList] = useState([]);
  console.log("topApproveList:", topApproveList);
  const [bottomApprovedList, setBottomApprovedList] = useState([]);
  // console.log("bottomApprovedList:", bottomApprovedList);
  const [totalAll, setTotalAll] = useState();
  const [totalReject, setTotalReject] = useState();
  const [totalWaitting, setTotalWaitting] = useState();
  const [totalApprove, setTotalApprove] = useState();

  const fetchSearchWaitingRepairList = async () => {
    try {
      const res = await getListApprovalRepair(search);

      setTopApproveList(res.data.topApproveList);
      setBottomApprovedList(res.data.bottomApproveList);
      // console.log("res.data:", res.data);
      setTotalAll(res.data.totalAll);
      setTotalReject(res.data.totalReject);
      setTotalWaitting(res.data.totalWaiting);
      setTotalApprove(res.data.totalApprove);
      if (!search.listStatus.length)
        setSearch({ ...search, listStatus: allStatus });
      setIsFetch(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [sectorList, setSectorList] = useState();

  const fetchList = async () => {
    const sector = await getSector();
    const arrSector = [];
    sector.data.sector.map(ele => {
      arrSector.push({ label: ele.name, value: ele.name });
    });
    setSectorList(arrSector);
  };

  useEffect(() => {
    fetchSearchWaitingRepairList();
    fetchList();
  }, []);

  useEffect(() => {
    fetchSearchWaitingRepairList();
  }, [isFetch]);

  const boxStyle = {
    boxStatus: `p-2 rounded-md flex flex-col items-center border-[2px] shadow-md`
  };

  // main input date state
  const [transferPendingDateTime, setTransferPendingDateTime] = useState(
    new Date()
  );

  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleAllCheckboxChange = list => {
    setIsCheckAll(!isCheckAll);
    const newCheck = !isCheckAll;
    const newList = list.map(item => {
      return { ...item, checked: newCheck };
    });
    setTopApproveList(newList);
  };

  const handleCheckboxChange = (list, id) => {
    const newList = list.map(item => {
      console.log("newList:", newList);
      if (item._id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setTopApproveList(newList);
    if (
      !isCheckAll &&
      newList?.filter(ele => ele.checked).length == topApproveList.length
    ) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  };

  const handleListStatusChange = value => {
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

  // handle
  const handleChange = e => {
    console.log("handleChange", { ...search, [e.target.name]: e.target.value });
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-background-page pt-5 p-3 min-h-full">
        <div className="text-2xl text-text-green ">อนุมัติซ่อม</div>
        <div className="flex pt-3">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">อนุมัติซ่อม</div>
          </div>
        </div>
        <div className="lg:px-8">
          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
            <div className="text-lg ">รายการเสนออนุมัติประจำวัน</div>
            <div className="grid lg:grid-cols-7 md:grid-cols-4 pt-4 gap-5 md:gap-x-5">
              <div className=" md:col-span-2 flex flex-col gap-y-2">
                <label className=" text-text-gray flex">วันที่เริ่มต้น</label>
                <div className="flex h-[38px]">
                  <OnlyDateInput
                    id="dateFrom"
                    state={search.dateFrom}
                    // setState={setSearch}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-y-2">
                <label className=" text-text-gray flex">วันที่สิ้นสุด</label>
                <div className="flex h-[38px]">
                  <OnlyDateInput
                    id="dateTo"
                    state={search.dateTo}
                    // setState={setSearch}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-y-2">
                <label className="text-text-gray">
                  หน่วยงานที่เสนอ (รหัส P4P)
                </label>
                <SearchSelector
                  options={sectorList}
                  name={"sector"}
                  onChange={value =>
                    setSearch({ ...search, transferSector: value || "" })
                  }
                />
              </div>

              <div className="flex justify-start items-end">
                <button
                  type="button"
                  className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                  onClick={fetchSearchWaitingRepairList}
                >
                  <div className="text-xl text-white">
                    <AiOutlineSearch />
                  </div>
                </button>
              </div>
              {/* <div className="flex flex-col gap-y-2">
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
            </div> */}
            </div>
            {/* status */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 py-5 border-b-2 gap-5 md:gap-10">
              <div
                className={`${boxStyle.boxStatus} font-semibold border-blue-500`}
              >
                <h1>ทั้งหมด (รายการ)</h1>
                <div className="text-2xl pt-3 text-blue-500">{totalAll}</div>
              </div>
              <div
                className={`${boxStyle.boxStatus} font-semibold border-yellow-300`}
              >
                <h1>รออนุมัติ (รายการ)</h1>
                <div className="text-2xl pt-3 text-yellow-700">
                  {totalWaitting}
                </div>
              </div>
              <div
                className={`${boxStyle.boxStatus} font-semibold border-green-500`}
              >
                <h1>อนุมัติ (รายการ)</h1>
                <div className="text-2xl pt-3 text-green-600">
                  {totalApprove}
                </div>
              </div>
              <div
                className={`${boxStyle.boxStatus} font-semibold border-red-500`}
              >
                <h1>ไม่อนุมัติ (รายการ)</h1>
                <div className="text-2xl pt-3 text-red-500">{totalReject}</div>
              </div>
            </div>

            {!topApproveList.length ? (
              <div className="mt-5 py-10 w-full text-center">
                {isFetch ? <Spinner size="xl" /> : "ยังไม่มีรายการรออนุมัติ"}
              </div>
            ) : (
              <div className="flex justify-between mt-5">
                <div className="flex items-center space-x-5">
                  <div className="flex">
                    <input
                      type="checkbox"
                      onChange={() => handleAllCheckboxChange(topApproveList)}
                      className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
                      checked={isCheckAll}
                    />
                    <h1 className="ml-2">เลือกทั้งหมด</h1>
                  </div>
                  <h1 className="">
                    เลือกแล้ว {topApproveList.filter(ele => ele.checked).length}{" "}
                    รายการ
                  </h1>
                </div>
                <div className="flex space-x-2">
                  <ModalRepairRejectAllApprove
                    state={topApproveList?.filter(ele => ele.checked)}
                    setState={setTopApproveList}
                    isFetch={isFetch}
                  />
                  <ModalApproveAll
                    selectedList={topApproveList?.filter(ele => ele.checked)}
                    setIsFetch={setIsFetch}
                  />
                </div>
              </div>
            )}

            <ApproveListItem
              state={topApproveList}
              setState={setTopApproveList}
              handle={handleCheckboxChange}
              setIsFetch={setIsFetch}
            />
          </div>

          <div className="bg-white border-[1px] mb-5 p-4 rounded-lg shadow-sm text-sm mt-3 ">
            <div className="lg:flex items-center">
              <div className=" text-lg">รายการคำขอที่จัดการแล้ว</div>
              {!!bottomApprovedList.length && (
                <div className="inline-flex space-x-5 md:ml-5 mt-2">
                  <button
                    className={`flex text-text-green bg-sidebar-green p-2 border rounded-2xl ${
                      search.listStatus.includes("inProgressOfDetailRecord")
                        ? "border-2 border-green-800 "
                        : ""
                    } `}
                    onClick={() =>
                      handleListStatusChange("inProgressOfDetailRecord")
                    }
                  >
                    อนุมัติแล้ว
                    <div className="ml-2 ">
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
                </div>
              )}
              {/* </div>
              </div> */}
            </div>
            {!bottomApprovedList.length ? (
              <center className="p-5">-</center>
            ) : (
              <BottomApprovedListItem data={bottomApprovedList} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const ApproveListItem = props => {
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
              onChange={() => props.handle(props.state, item._id)}
              className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
            />
            <div
              // to={`/approvalTransferAssetDetail/${item.id}`}
              className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full"
            >
              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <h1>เลขที่ใบแจ้งซ่อม</h1>
                  <h1>{item.informRepairIdDoc}</h1>
                </div>
                <div className="flex space-x-2 mr-5">
                  {new Date(item.createdAt).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    our12: false
                  })}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่ส่งซ่อม</h1>
                  <h1>{item.repairSector}</h1>
                </div>
                <div className="flex justify-end space-x-4">
                  <ModalIndividualReject
                    state={props.state}
                    setState={props.setState}
                    index={idx}
                    item={item}
                    setIsFetch={props.setIsFetch}
                  />
                  <Link
                    // type="button"
                    to={`/viewApprovalRepairDetail/${item._id}`}
                    className="p-2 w-[115px] text-center border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
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

const BottomApprovedListItem = props => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[60vh] scrollbar mt-2">
      {props.data.map((item, idx) => {
        return (
          <Link to={`/viewApprovalRepairDetail/${item._id}`} key={idx}>
            <div
              key={idx}
              className="bg-background-page border-[2px] rounded-md my-3 p-3 w-full hover:shadow-md"
            >
              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <h1>เลขที่ใบแจ้งซ่อม</h1>
                  <h1>{item.informRepairIdDoc}</h1>
                </div>
                <div className="flex space-x-2 mr-5 text-text-gray">
                  <h1>
                    วันที่อนุมัติ:{" "}
                    {new Date(item.dateTime_approver).toLocaleDateString(
                      "th-TH",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        our12: false
                      }
                    )}
                  </h1>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex space-x-5">
                  <h1 className="text-text-gray">หน่วยงานที่ส่งซ่อม</h1>
                  <h1>{item.repairSector}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex text-text-gray">
                    วันที่เสนอ
                    <div className="px-5 text-black">
                      {new Date(item.createdAt).toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        our12: false
                      })}
                    </div>
                  </div>
                  <div className="">
                    <div
                      className={` ${
                        item.statusOfDetailRecord === "inProgressOfDetailRecord"
                          ? " bg-sidebar-green  text-text-green    "
                          : item.statusOfDetailRecord !== "reject"
                          ? "text-orange-400 bg-orange-100  "
                          : "text-red-500 bg-red-100"
                      } text-center px-4 py-2 rounded-full border`}
                    >
                      {item.statusOfDetailRecord === "inProgressOfDetailRecord"
                        ? "อนุมัติแล้ว"
                        : item.statusOfDetailRecord === "reject"
                        ? "ไม่อนุมัติ"
                        : item.statusOfDetailRecord}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const ModalApproveAll = ({ selectedList, setIsFetch }) => {
  // console.log("selectedList:", selectedList);
  const [showModal, setShowModal] = useState(false);

  const handleApproveAllWaitingList = async e => {
    e.preventDefault();
    try {
      await approveAllWaitingRepair({
        topApproveList: selectedList
      });
      setIsFetch(true);
      setShowModal(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <button
        className="p-2 px-3 border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
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
                <div>
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการที่อนุมัติ
                    </h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center">
                        <IoIosClose className="text-2xl" />
                      </span>
                    </button>
                  </div>
                  {!selectedList.length ? (
                    <div className="flex justify-center items-center h-40">
                      ยังไม่มีรายการที่เลือก
                    </div>
                  ) : (
                    <div className="overflow-x-auto scrollbar pt-4 mb-5">
                      <div className="w-fit min-w-full lg:w-full">
                        <div className="grid grid-cols-8 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                          <div className="col-span-1">ลำดับ</div>
                          <div className="col-span-2">เลขที่ใบแจ้งซ่อม</div>
                          <div className="col-span-3">หน่วยงานที่ส่งซ่อม</div>
                          <div className="col-span-2">วันที่เสนอ</div>
                        </div>
                        <TableSummaryApprove data={selectedList} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md hover:bg-gray-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={handleApproveAllWaitingList}
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
  item,
  state,
  setState,
  index,
  setIsFetch
}) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeArray = e => {
    const clone = [...state];
    clone[index] = clone[index] || {};
    clone[index][e.target.name] = e.target.value;
    console.log(clone);
    setState(clone);
  };

  const onChangeAllInIndexReason = (e, index) => {
    setState(prevState => {
      const updatedDataTopApproveList = [...prevState];
      updatedDataTopApproveList[index].reason = e.target.value;
      updatedDataTopApproveList[index].subComponentTransfer?.forEach(
        subComponent => (subComponent.reason = e.target.value)
      );
      console.log(updatedDataTopApproveList);
      return updatedDataTopApproveList;
    });
  };

  const handleReject = async e => {
    e.preventDefault();
    if (!state[index].reason) {
      setError(true);
      return;
    }
    const list = state[index];
    // list.assetIdArray.map(ele => {
    //   ele.reason = state[index].reason;
    // });
    // list.packageAssetIdArray.map(ele => {
    //   ele.reason = state[index].reason;
    // });
    console.log("list:", list);

    try {
      await rejectIndividualWaitingRepair({ topApproveList: list });
      setIsFetch(true);
      setShowModal(false);
    } catch (err) {
      console.log("err", state[index].reason);
    }
  };

  return (
    <>
      <button
        className="p-2 w-[115px] text-center border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-500/[.15]"
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
                <div>
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl">สาเหตุที่ไม่อนุมัติ</h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        // className="flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                      >
                        <IoIosClose className="text-2xl" />
                      </span>
                    </button>
                  </div>
                  {/* reject information */}
                  <div className="p-3">
                    <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
                      <div className="md:flex justify-between">
                        <div className="flex space-x-3">
                          <h1>เลขที่ใบแจ้งซ่อม</h1>
                          <h1>{item.informRepairIdDoc}</h1>
                        </div>
                        <div className="flex space-x-5 mr-5">
                          <h1>{item.date}</h1>
                          <h1>{item.time}</h1>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-5">
                          <h1>หน่วยงานที่ส่งซ่อม</h1>
                          <h1>{item.repairSector}</h1>
                        </div>
                        <div className="flex items-center space-x-5 mt-2">
                          <label>สาเหตุที่ไม่อนุมัติ</label>
                          <input
                            type="text"
                            name="reason"
                            required
                            className={`border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue ${
                              error && !state[index].reason && "border-red-500"
                            }`}
                            onChange={e => onChangeAllInIndexReason(e, index)}
                            value={state[index].reason}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md hover:bg-gray-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-red-600 px-10 py-2 border rounded-md "
                    onClick={handleReject}
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

const TableSummaryApprove = ({ data }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {data?.map((item, idx) => {
        console.log("item:", item);
        return (
          <div className="grid grid-cols-8 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.informRepairIdDoc}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex px-2 text-left items-center border-[2px] rounded-md">
              {item.repairSector}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {new Date(item.dateTime_recorder).toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                our12: false
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ApprovalRepair;
