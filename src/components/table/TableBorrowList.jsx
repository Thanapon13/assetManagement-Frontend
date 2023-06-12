import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";

const TableBorrowList = (props) => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };

  const [isClick, setIsClick] = useState(false);

  let navigate = useNavigate();

  const handleClick = (status) => {
    setIsClick(!isClick);

    if (status === "waitToReturn") {
      navigate("/borrowList/borrowSaving");
    }
  };

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-11 gap-2 h-12 pt-2  text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">
              {props.search.page > 1 ? props.search.limit + idx + 1 : idx + 1}
            </div>
            <div className="col-span-2 text-left">{item.borrowIdDoc}</div>
            <div className="col-span-3 text-left">{item.sector}</div>
            <div className="col-span-1">
              {new Date(item.borrowDate).toLocaleDateString("th-TH", options)}
            </div>
            {/* insuranceStartDate.toLocaleDateString("en-GB", options) */}
            <div className="col-span-1 ">
              {new Date(item.borrowSetReturnDate).toLocaleDateString(
                "th-TH",
                options
              )}
            </div>
            <div className="col-span-1">
              {item.borrowReturnDate
                ? new Date(item.borrowReturnDate).toLocaleDateString(
                    "th-TH",
                    options
                  )
                : "-"}
            </div>
            <div className="col-span-2 grid grid-cols-2 items-center">
              <div className="flex justify-center">
                {item.status === "approve" ||
                item.status === "partiallyApprove" ||
                item.status === "waitingReturnApprove"||
                item.status === "partiallyReturn" ? (
                  <Link
                    to={`/borrowCheckSaving/${item._id}`}
                    className="bg-text-green text-white rounded-md hover:bg-green-800 p-2 w-full"
                  >
                    {item.status === "approve" ||
                    item.status === "partiallyApprove"||
                    item.status === "waitingReturnApprove"||
                    item.status === "partiallyReturn" 
                      ? "บันทึกคืน"
                      : ""}
                  </Link>
                ) : (
                  <div
                    onClick={() => handleClick(item.borrowStatus)}
                    className={`${
                      item.status === "waiting"
                        ? " bg-background-light-blue text-text-blue  rounded-xl "
                        : item.status === "approve"
                        ? " bg-sidebar-green text-text-green  rounded-xl  "
                        : item.status === "waitingReturnApprove"
                        ? "bg-orange-100 text-orange-400 rounded-xl"
                        : item.status === "done"
                        ? " text-green-700 bg-sidebar-green rounded-xl"
                        : item.status === "cancel" || item.status === "reject"
                        ? "bg-red-200 text-red-600  rounded-xl"
                        : "bg-text-green text-white rounded-md hover:bg-green-800"
                    } border border-spacing-5 p-2 w-full cursor-default`}
                  >
                    {item.status === "waiting"
                      ? "รออนุมัติ"
                      : item.status === "done"
                      ? "คืนสำเร็จ"
                      : item.status === "waitingReturnApprove"
                      ? "รอตรวจรับ"
                      : item.status === "cancel"
                      ? "ยกเลิก"
                      : item.status === "reject"
                      ? "ไม่อนุมัติ"
                      : "บันทึกคืน"}
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.status === "waiting" ? (
                  <div className="flex gap-1">
                    <Link
                      to={`/borrowEdit/${item._id}`}
                      className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                    >
                      <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
                    </Link>
                    <ModalCancel />
                  </div>
                ) : (
                  <Link
                    to={`/borrowDetail/${item._id}`}
                    className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                  >
                    <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ModalCancel = () => {
  const [showModal, setShowModal] = useState(false);

  const callback = (payload) => {
    setAllReject(payload);
  };
  return (
    <>
      <button
        className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
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
            fill="#38821D"
          />
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* ระบุสาเหตุที่ยกเลิก */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl">ระบุสาเหตุที่ยกเลิก</h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                </div>
                {/* สาเหตุไม่อนุมัติ */}
                <div>
                  <textarea className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"></textarea>
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

export default TableBorrowList;
