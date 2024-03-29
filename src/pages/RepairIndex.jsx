import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import DateInput from "../components/date/DateInput";
import { useEffect } from "react";
import {
  deleteRepair,
  getRepairBySearch,
  getSectorOfRepair
} from "../api/repairApi";
import SearchSelector from "../components/selector/SearchSelector";

const RepairIndex = () => {
  const [perPage, setPerPage] = useState(10);
  const [totalRow, setTotalRow] = useState(25);
  const [withdrawDate, setWithdrawDate] = useState(new Date());
  const [search, setSearch] = useState({
    typeTextSearch: "informRepairIdDoc",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: new Date(),
    sector: ""
  });
  //* แก้ ใช้ state คนละตัว *
  const [data, setData] = useState([]);
  console.log("data:", data);
  const [sectorArray, setSectorArray] = useState([]);
  console.log("sectorArray:", sectorArray);

  useEffect(() => {
    fetchList();
    getMaster();
  }, []);

  async function fetchList() {
    const res = await getRepairBySearch(search);
    setData(res.data.repair);
    console.log(res.data.repair, search);
    setSearch({
      ...search,
      page: res.data.page,
      limit: res.data.limit,
      total: res.data.total
    });
  }

  async function getMaster() {
    const sector = await getSectorOfRepair();
    const arrSector = [];
    sector.data.courierSector?.map(ele => {
      arrSector.push({ label: ele.courierSector, value: ele.courierSector });
    });
    setSectorArray(arrSector);
  }

  const handlePagination = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchList({ ...search, [e.target.name]: e.target.value });
  };

  const handleChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-background-page px-5 pt-5 pb-6 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">รายการแจ้งซ่อม</div>
      <div className="flex justify-between items-center">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">รายการแจ้งซ่อม</div>
        </div>
        <div className="md:flex gap-5 space-y-2 md:space-y-0">
          <button
            type="button"
            className="bg-background-page px-4 py-2  flex items-center gap-3 text-text-green border border-text-green rounded hover:bg-green-800"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.08203 7.79252C4.95093 7.66187 4.84691 7.50663 4.77593 7.3357C4.70496 7.16477 4.66842 6.9815 4.66842 6.79642C4.66842 6.61134 4.70496 6.42808 4.77593 6.25715C4.84691 6.08621 4.95093 5.93097 5.08203 5.80033L10.0039 0.878453C10.1346 0.747353 10.2898 0.643332 10.4607 0.572356C10.6317 0.501379 10.8149 0.464844 11 0.464844C11.1851 0.464844 11.3683 0.501379 11.5393 0.572356C11.7102 0.643332 11.8654 0.747353 11.9961 0.878453L16.918 5.80033C17.0491 5.93097 17.1531 6.08621 17.2241 6.25715C17.295 6.42808 17.3316 6.61134 17.3316 6.79642C17.3316 6.9815 17.295 7.16477 17.2241 7.3357C17.1531 7.50663 17.0491 7.66187 16.918 7.79252C16.6526 8.05445 16.2947 8.20131 15.9219 8.20131C15.549 8.20131 15.1912 8.05445 14.9258 7.79252L12.4062 5.27298V14.9995C12.4062 15.3725 12.2581 15.7302 11.9944 15.9939C11.7306 16.2576 11.373 16.4058 11 16.4058C10.627 16.4058 10.2694 16.2576 10.0056 15.9939C9.74191 15.7302 9.59375 15.3725 9.59375 14.9995V5.27298L7.07422 7.79252C6.94357 7.92362 6.78833 8.02764 6.6174 8.09861C6.44647 8.16959 6.26321 8.20612 6.07812 8.20612C5.89304 8.20612 5.70978 8.16959 5.53885 8.09861C5.36792 8.02764 5.21268 7.92362 5.08203 7.79252ZM19.4375 10.312H16.625C16.252 10.312 15.8944 10.4602 15.6306 10.7239C15.3669 10.9877 15.2188 11.3453 15.2188 11.7183C15.2188 12.0913 15.3669 12.4489 15.6306 12.7127C15.8944 12.9764 16.252 13.1245 16.625 13.1245H18.9688V23.9058H3.03125V13.1245H5.375C5.74796 13.1245 6.10565 12.9764 6.36937 12.7127C6.63309 12.4489 6.78125 12.0913 6.78125 11.7183C6.78125 11.3453 6.63309 10.9877 6.36937 10.7239C6.10565 10.4602 5.74796 10.312 5.375 10.312H2.5625C1.94185 10.3151 1.34749 10.563 0.908622 11.0019C0.469749 11.4408 0.22183 12.0351 0.21875 12.6558V24.3745C0.22183 24.9952 0.469749 25.5896 0.908622 26.0284C1.34749 26.4673 1.94185 26.7152 2.5625 26.7183H19.4375C20.0582 26.7152 20.6525 26.4673 21.0914 26.0284C21.5303 25.5896 21.7782 24.9952 21.7812 24.3745V12.6558C21.7782 12.0351 21.5303 11.4408 21.0914 11.0019C20.6525 10.563 20.0582 10.3151 19.4375 10.312Z"
                fill="#38821D"
              />
            </svg>
            Export
          </button>
          <Link
            to="/repairRecord"
            className="bg-text-green text-white px-4 py-2 rounded hover:bg-green-800"
          >
            + เพิ่มการซ่อมบำรุง
          </Link>
        </div>
      </div>
      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 md:pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          {/* <Selector placeholder={"เลขที่ใบแจ้งซ่อม"} /> */}
          <div className="md:col-span-2 ">
            <select
              className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
              name="typeTextSearch"
              value={search.typeTextSearch}
              onChange={handleChange}
            >
              <option value="informRepairIdDoc">เลขที่ใบแจ้งซ่อม</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            name="textSearch"
            id="billNumber"
            onChange={handleChange}
            value={search.textSearch}
            placeholder="เลขที่ใบแจ้งซ่อม"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะ
            </option>
            <option value="waiting">รอช่างรับงาน</option>
            <option value="inProgress">ดำเนินการ</option>
            <option value="waitingForCheck">รอตรวจรับ</option>
            <option value="complete">เสร็จสิ้น</option>
            <option value="reject">ยกเลิก</option>
            <option value="saveDraft">แบบร่าง</option>
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

        {/* <div className="md:col-span-3">
          <SearchSelector
            options={sectorArray}
            placeholder={"หน่วยงาน"}
            name={"sector"}
            onChange={(value, label) =>
              setSearch({ ...search, [label]: value })
            }
            floatLabel
          />
        </div> */}

        <div className="md:col-span-2 ">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="sector"
            value={search.sector}
            onChange={handleChange}
          >
            <option value="">หน่วยงาน</option>

            {sectorArray.map((el, idx) => (
              <option key={idx} value={el.label}>
                {el.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            onClick={fetchList}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className="grid">
        <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
          <div className="min-w-[1000px] lg:w-full h-full ">
            <div className="text-sm">ผลการค้นหา {search.total} รายการ</div>
            <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
              <div className="grid grid-cols-13 gap-2 h-12 items-center text-center">
                <div className="col-span-1">วันที่แจ้ง</div>
                <div className="col-span-2">เลขที่ใบแจ้งซ่อม</div>
                <div className="col-span-2">รหัสครุภัณฑ์</div>
                <div className="col-span-3">รายละเอียด</div>
                <div className="col-span-1">หน่วยงานที่ส่งซ่อม</div>
                <div className="col-span-1">ผู้ส่งซ่อม</div>
                <div className="col-span-1">สถานะ</div>
                <div className="col-span-2">Action</div>
              </div>
            </div>
            <TableRepairIndex data={data} fetchList={fetchList} />

            <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
              <div className="flex mr-10 items-center">
                <div>Rows per page:</div>
                <select
                  id="limit"
                  name="limit"
                  className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handlePagination}
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
                {search.limit * (search.page - 1) + data.length} of{" "}
                {search.total}
              </div>

              <button className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
                <HiChevronLeft className="text-lg" />
              </button>
              <button className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
                <HiChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRepairIndex = props => {
  const [isClick, setIsClick] = useState(false);

  let navigate = useNavigate();

  const handleClick = status => {
    setIsClick(!isClick);

    if (status === "waitToReturn") {
      navigate("/repairIndex");
    }
  };
  //   waitTechnicianConfirm , inProgress , draftRepair, waitApprove, done , cancel
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-13 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">
              {item.informRepairDate &&
                `${new Date(item.informRepairDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`}
            </div>
            <div className="col-span-2">{item.informRepairIdDoc}</div>
            <div className="col-span-2">{item.assetNumber}</div>
            <div className="col-span-3 text-left">{item.problemDetail}</div>
            <div className="col-span-1 text-left">{item.courierSector}</div>
            <div className="col-span-1 text-left">{item.name_courier}</div>
            <div className="col-span-1">
              <div className="flex justify-center">
                <div
                  onClick={() => handleClick(item.status)}
                  className={`${
                    item.status === "waiting"
                      ? "bg-text-blue/[.2] text-blue-600 rounded-full border-sky-200"
                      : item.status === "inProgress"
                      ? "bg-yellow-300 text-yellow-700 border-yellow-300 rounded-full"
                      : item.status === "waitingForCheck"
                      ? " bg-purple-600 border-purple-600 text-white rounded-full"
                      : item.status === "saveDraft"
                      ? " bg-gray-300 border-gray-300 text-black rounded-full"
                      : item.status === "complete"
                      ? "bg-text-green/[.15] text-text-green  rounded-full border-sidebar-green "
                      : "bg-red-200 text-red-600 rounded-full border-red-200"
                  }  border-spacing-5 p-2 w-full`}
                >
                  {item.status === "waiting"
                    ? "รอช่างรับงาน"
                    : item.status === "inProgress"
                    ? "ดำเนินการ"
                    : item.status === "waitingForCheck"
                    ? "รอตรวจรับ"
                    : item.status === "saveDraft"
                    ? "แบบร่าง"
                    : item.status === "complete"
                    ? "เสร็จสิ้น"
                    : "ยกเลิก"}
                </div>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 items-center">
              <div className="flex justify-center col-span-2">
                {item.status === "waiting" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>
                    <Link
                      to={`repairEdit/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>
                    <ModalCancel item={item} fetchList={props.fetchList} />
                  </div>
                ) : item.status === "inProgress" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                      <h1>ดูรายละเอียด</h1>
                    </Link>
                  </div>
                ) : item.status === "complete" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                      <h1>ดูรายละเอียด</h1>
                    </Link>
                  </div>
                ) : item.status === "reject" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                      <h1>ดูรายละเอียด</h1>
                    </Link>
                  </div>
                ) : item.status === "saveDraft" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>
                    <Link
                      to={`repairEdit/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>
                    <ModalCancel item={item} fetchList={props.fetchList} />
                  </div>
                ) : item.status === "waitingForCheck" ? (
                  <div className="flex gap-3">
                    <Link
                      to={`repairDetail/${item._id}`}
                      state={{ data: item }}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>

                    <Link
                      to={`/repairIndex/updateStatusForCheckJob/${item._id}`}
                    >
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                        ตรวจรับ
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <Link
                      to={`repairDetail/${item._id}`}
                      className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                      <h1>ดูรายละเอียด</h1>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ModalCancel = ({ item, fetchList }) => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setreason] = useState("");
  const [error, setError] = useState(false);
  console.log(item);
  async function onConfirm(id) {
    await deleteRepair(id, { reason: reason });
    fetchList();
  }

  const callback = payload => {
    setAllReject(payload);
  };

  return (
    <>
      <button
        className=" gap-2 border-[1px] border-button-red  focus:border-transparent shadow-sm text-sm font-medium  text-button-red hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[80px] flex justify-center items-center rounded-md"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.10002 8.3998L2.20002 13.2998C2.01669 13.4831 1.78336 13.5748 1.50002 13.5748C1.21669 13.5748 0.983357 13.4831 0.800024 13.2998C0.616691 13.1165 0.525024 12.8831 0.525024 12.5998C0.525024 12.3165 0.616691 12.0831 0.800024 11.8998L5.70002 6.9998L0.800024 2.0998C0.616691 1.91647 0.525024 1.68314 0.525024 1.3998C0.525024 1.11647 0.616691 0.883138 0.800024 0.699804C0.983357 0.516471 1.21669 0.424805 1.50002 0.424805C1.78336 0.424805 2.01669 0.516471 2.20002 0.699804L7.10002 5.5998L12 0.699804C12.1834 0.516471 12.4167 0.424805 12.7 0.424805C12.9834 0.424805 13.2167 0.516471 13.4 0.699804C13.5834 0.883138 13.675 1.11647 13.675 1.3998C13.675 1.68314 13.5834 1.91647 13.4 2.0998L8.50002 6.9998L13.4 11.8998C13.5834 12.0831 13.675 12.3165 13.675 12.5998C13.675 12.8831 13.5834 13.1165 13.4 13.2998C13.2167 13.4831 12.9834 13.5748 12.7 13.5748C12.4167 13.5748 12.1834 13.4831 12 13.2998L7.10002 8.3998Z"
            fill="#CE4646"
          />
        </svg>
        <h1>ยกเลิก</h1>
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* ยกเลิกการแจ้งซ่อม */}
                <div>
                  <div className="flex justify-center items-center gap-5 p-5 ">
                    <svg
                      width="84"
                      height="84"
                      viewBox="0 0 84 84"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.0001 0.333984C39.9167 0.333984 37.8334 1.12565 36.1251 2.79232L2.79175 36.1256C-0.499919 39.3756 -0.499919 44.6256 2.79175 47.8756L36.1251 81.209C39.3751 84.5006 44.6251 84.5006 47.8751 81.209L81.2084 47.8756C84.5001 44.6256 84.5001 39.3756 81.2084 36.1256L47.8751 2.79232C46.1667 1.12565 44.0834 0.333984 42.0001 0.333984ZM37.8334 21.1673H46.1667V46.1673H37.8334V21.1673ZM37.8334 54.5006H46.1667V62.834H37.8334V54.5006Z"
                        fill="#EB5757"
                      />
                    </svg>
                    <h1 className="text-2xl text-red-700">ยกเลิกการแจ้งซ่อม</h1>
                  </div>

                  <div className="p-6 text-base">
                    <div className="grid grid-cols-2  md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center ">
                        เลขที่ใบแจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {item?.informRepairIdDoc}
                      </div>
                      <div className="text-text-gray flex items-center ">
                        เวลาที่แจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {item?.informRepairDate &&
                          `${new Date(item?.informRepairDate).toLocaleString(
                            "th",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false
                            }
                          )} น.`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        ชื่อครุภัณฑ์
                      </div>
                      <div className="flex items-center">
                        {item?.productName}
                      </div>
                      <div className="text-text-gray flex items-center">
                        เลขครุภัณฑ์
                      </div>
                      <div className="flex items-center">
                        {item?.assetNumber}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        รายละเอียด
                      </div>
                      <div className="flex items-center">
                        {item?.problemDetail}
                      </div>
                      <div className="text-text-gray flex items-center">
                        หน่วยงาน
                      </div>
                      <div className="flex items-center">
                        {item?.courierSector}
                      </div>
                    </div>
                    {item.status != "saveDraft" && (
                      <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                        <div className="text-text-gray flex items-center">
                          สาเหตุที่ยกเลิก
                        </div>
                        <textarea
                          className={`${
                            error && !reason && "border-red-500"
                          } col-span-3 border-[1px] p-2 min-h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-3 text-white bg-gray-400/[.8] hover:bg-gray-400 bg-[#999999] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-10 py-3 border rounded-md "
                    // type="button"
                    onClick={() => {
                      item.status == "saveDraft"
                        ? onConfirm(item._id)
                        : reason
                        ? onConfirm(item._id)
                        : setError(true);
                    }}
                  >
                    ยืนยันยกเลิก
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

export default RepairIndex;
