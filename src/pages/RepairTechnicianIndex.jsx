import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import DateInput from "../components/date/DateInput";
import {
  getRepairTechnicianBySearch,
  updateStatusForGetJobRepair,
  getSectorForSearchDetailRecord
} from "../api/repairApi";
import SearchSelector from "../components/selector/SearchSelector";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";

const RepairTechnicianIndex = () => {
  const [search, setSearch] = useState({
    typeTextSearch: "informRepairIdDoc",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: new Date(),
    sector: "",
    page: "",
    limit: ""
  });
  console.log("search:", search);

  const [data, setData] = useState([]);
  console.log("data:", data);
  const [sectorArray, setSectorArray] = useState([]);

  const [sectorList, setSectorList] = useState([]);
  // console.log("sectorList:", sectorList);

  useEffect(() => {
    fetchList();
    // getMaster()
  }, []);

  async function fetchList() {
    const res = await getRepairTechnicianBySearch(search);
    setData(res.data.repair);
    console.log(res.data.repair);
    setSearch({
      ...search,
      page: res.data.page,
      limit: res.data.limit,
      total: res.data.total
    });
  }

  // fetch dropdown sector
  const fetchSectorForSearchDetailRecord = async () => {
    try {
      const res = await getSectorForSearchDetailRecord();
      setSectorList(res.data.courierSector);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSectorForSearchDetailRecord();
  }, []);

  async function getMaster() {
    const sector = await getSectorOfRepair();
    const arrSector = [];
    sector.data.sector.map(ele => {
      arrSector.push({ label: ele.sector, value: ele.sector });
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
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">
        รายการรอลงรายละเอียดแจ้งซ่อม
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">
            รายการรอลงรายละเอียดแจ้งซ่อม
          </div>
        </div>
      </div>
      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 md:pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
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
            <option value="waiting">รอการอนุมัติ</option>
            <option value="waitingRecord">รอลงบันทึก</option>
            <option value="waitingApproval">รออนุมัติ</option>
            <option value="inProgressOfDetailRecord">ดำเนินการ</option>
            <option value="completeOfDetailRecord">เสร็จสิ้น</option>
            <option value="cancelOfDetailRecord">ไม่รับงาน</option>
            <option value="reject">ไม่อนุมัติ</option>
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

        <div className="md:col-span-2 ">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="sector"
            value={search.sector}
            onChange={handleChange}
          >
            <option value="">หน่วยงาน</option>

            {sectorList.map((el, idx) => (
              <option key={idx} value={el.courierSector}>
                {el.courierSector}
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
          <div className="min-w-[1070px] lg:w-full lg:h-full h-[500px]">
            <div className="text-sm">ผลการค้นหา {search.total} รายการ</div>
            <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
              {/* top bar */}
              <div className="grid grid-cols-14 gap-2 h-12 items-center text-center">
                <div className="col-span-1">วันที่แจ้ง</div>
                <div className="col-span-2">เลขที่ใบแจ้งซ่อม</div>
                <div className="col-span-2">เลขครุภัณฑ์</div>
                <div className="col-span-3">รายละเอียด</div>
                <div className="col-span-1">หน่วยงานที่ส่งซ่อม</div>
                <div className="col-span-1">สถานะความเร่งด่วน</div>
                <div className="col-span-2">สถานะ</div>
                <div className="col-span-2"></div>
              </div>
            </div>
            <TableRepairTechnicianIndex data={data} fetchList={fetchList} />

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

const TableRepairTechnicianIndex = ({ data, fetchList }) => {
  const [isClick, setIsClick] = useState(false);

  let navigate = useNavigate();

  const handleClick = status => {
    setIsClick(!isClick);

    if (status === "waitToReturn") {
      navigate("/repairIndex");
    }
  };
  //   waitTechnicianConfirm , inProgress , draftRepair, waitApprove, done , cancel
  // emerygencyStatus , normal , emergency, rushing
  return (
    <>
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-14 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">
              {new Date(item.informRepairDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })}{" "}
              น.
            </div>
            <div className="col-span-2">{item.informRepairIdDoc}</div>
            <div className="col-span-2 ">{item.assetNumber}</div>
            <div className="col-span-3 text-left">{item.problemDetail}</div>
            <div className="col-span-1 text-left">{item.courierSector}</div>
            <div className="col-span-1 flex justify-center">
              <div
                onClick={() => handleClick(item.emerygencyStatus)}
                className={`${
                  item.urgentStatus === "ปกติ"
                    ? "bg-blue-600 text-white rounded-full "
                    : item.urgentStatus === "เร่งด่วน"
                    ? "bg-[#F2994A] text-white  rounded-full"
                    : item.urgentStatus === "ฉุกเฉิน"
                    ? "bg-red-700 text-white  rounded-full"
                    : "border-0"
                } border border-spacing-5 p-2 w-[80px]`}
              >
                {
                  item.urgentStatus
                  // === 'normal'
                  //   ? 'ปกติ'
                  //   : item.urgentStatus === 'rushing'
                  //     ? 'เร่งด่วน'
                  //     : item.urgentStatus === 'emergency'
                  //       ? 'ฉุกเฉิน'
                  //       : 'ยกเลิก'
                }
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <div
                onClick={() => handleClick(item.status)}
                className={`${
                  item.statusOfDetailRecord === "waitTechnicianConfirm"
                    ? "bg-[#245BD826] text-blue-600 rounded-full "
                    : item.statusOfDetailRecord === "waiting"
                    ? "bg-[#245BD826] text-blue-600 rounded-full "
                    : item.statusOfDetailRecord === "inProgressOfDetailRecord"
                    ? "bg-purple-600  text-white rounded-full"
                    : item.statusOfDetailRecord === "waitApprove"
                    ? " bg-[#F2C94C]  rounded-full"
                    : item.statusOfDetailRecord === "waitingApproval"
                    ? "bg-yellow-300 rounded-full"
                    : item.statusOfDetailRecord === "waitingRecord"
                    ? " bg-[#F2994A26] text-[#F2994A] rounded-full"
                    : item.statusOfDetailRecord === "completeOfDetailRecord"
                    ? "bg-sidebar-green text-text-green  rounded-full  "
                    : "bg-red-200 text-red-600 rounded-full "
                }  p-2 w-[100px]`}
              >
                {item.statusOfDetailRecord === "waiting"
                  ? "รอช่างรับงาน"
                  : item.statusOfDetailRecord === "inProgressOfDetailRecord"
                  ? "ดำเนินการ"
                  : item.statusOfDetailRecord === "waitingApproval"
                  ? "รออนุมัติ"
                  : item.statusOfDetailRecord === "waitingRecord"
                  ? "รอลงบันทึก"
                  : item.statusOfDetailRecord === "completeOfDetailRecord"
                  ? "เสร็จสิ้น"
                  : item.statusOfDetailRecord}
              </div>
            </div>
            <div className="col-span-2">
              {/*  completeOfDetailRecord  cancleOfDetailRecord  reject  */}
              {item.statusOfDetailRecord === "waiting" ? (
                <ActionWaitTechnicalConfirm
                  id={item._id}
                  item={item}
                  fetchList={fetchList}
                />
              ) : item.statusOfDetailRecord === "waitingRecord" ? (
                <ActionWaitRecord id={item._id} item={item} />
              ) : item.statusOfDetailRecord === "inProgressOfDetailRecord" ? (
                <ActionInProgress id={item._id} item={item} />
              ) : item.statusOfDetailRecord === "waitingApproval" ? (
                <ActionWaitApprove id={item._id} item={item} />
              ) : item.statusOfDetailRecord === "completeOfDetailRecord" ? (
                <ActionDone item={item} />
              ) : (
                <ActionCancel item={item} />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

const ModalCancel = () => {
  const [showModal, setShowModal] = useState(false);

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
                  {/* header*/}
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
                  {/* ข้อมูลผู้เกี่ยวข้อง */}
                  <div className="p-6 text-base">
                    {/* row 1 เลขที่ใบแจ้งซ่อม */}
                    <div className="grid grid-cols-2  md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center ">
                        เลขที่ใบแจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {"mnt-0308/65-002"}
                      </div>
                      <div className="text-text-gray flex items-center ">
                        เวลาที่แจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {"18/03/2566 , 09.42 น."}
                      </div>
                    </div>
                    {/* row 2 ผู้ประสานงาน */}
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        ผู้ประสานงาน
                      </div>
                      <div className="flex items-center">
                        {"เมตตา ดวงรุ่งเรืองโรจน์"}
                      </div>
                      <div className="text-text-gray flex items-center">
                        หน่วยงาน
                      </div>
                      <div className="flex items-center">
                        {"กองงานบัญชีกลาง"}
                      </div>
                    </div>
                    {/* สาเหตุที่ยกเลิก */}
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        สาเหตุที่ยกเลิก
                      </div>
                      <textarea className="col-span-3 border-[1px] p-2 h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"></textarea>
                    </div>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-3 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ย้อนกลับ
                  </button>
                  <Link
                    to="/borrowList"
                    className="text-white bg-red-600 px-10 py-3 border rounded-md "
                    // type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยันยกเลิก
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

const ActionWaitTechnicalConfirm = props => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <ModalConfirmSave
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          text={`คุณต้องการรับงานเลขที่ใบแจ้งซ่อม ${props.item.informRepairIdDoc} นี้หรือไม่`}
          header="ยืนยันการรับงาน"
          confirmText="รับงาน"
          onSave={async () => {
            try {
              await updateStatusForGetJobRepair(props.id, "waitingRecord");
              props.fetchList();
              setShowModal(false);
            } catch (error) {
              console.log(error);
            }
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-[100px]"
          onClick={() => setShowModal(true)}
        >
          รับงาน
        </button>
        <Link
          to={`repairTechnicianDetail/${props.id}`}
          state={{ data: props?.item }}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
      </div>
    </>
  );
};

const ActionWaitRecord = ({ id, item }) => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2 -mx-4">
        <Link
          to={`repairTechnicianRecord/${id}`}
          state={{ data: item }}
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg px-3"
        >
          ลงบันทึก
        </Link>
        <Link
          to={`repairOutsourceRecord/${id}`}
          state={{ data: item }}
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg "
        >
          จ้างซ่อมภายนอก
        </Link>
      </div>
    </>
  );
};

const ActionInProgress = ({ id, item }) => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <Link
          to={`/repairTechnicianIndex/RepairOffwork/${id}`}
          state={{ data: item }}
          className="border hover:bg-[#245BD826]  border-[#2F80ED] text-[#2F80ED] p-2 rounded-lg w-[120px]"
        >
          ปิดงาน
        </Link>
      </div>
    </>
  );
};

const ActionWaitApprove = ({ id, item }) => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2 -mx-4">
        <Link
          to={`repairTechnicianRecord/${id}`}
          state={{ data: item }}
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg px-3"
        >
          ลงบันทึก
        </Link>
        <Link
          to={`repairOutsourceRecord/${id}`}
          state={{ data: item }}
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg "
        >
          จ้างซ่อมภายนอก
        </Link>
      </div>
    </>
  );
};

const ActionDone = props => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <Link
          className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
          to={`repairTechnicianDetail/${props.item._id}`}
          state={{ data: props.item }}
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
          <h1>ดูรายละเอียด</h1>
        </Link>
      </div>
    </>
  );
};

const ActionCancel = props => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <Link
          className="border-[1px] gap-2 border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[120px] flex justify-center items-center rounded-md"
          to={`repairTechnicianDetail/${props.item._id}`}
          state={{ data: props.item }}
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
          <h1>ดูรายละเอียด</h1>
        </Link>
      </div>
    </>
  );
};
export default RepairTechnicianIndex;
