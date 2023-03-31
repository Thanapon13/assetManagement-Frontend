import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";

const TableBorrowCheckIndex = (props) => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };

  const [isClick, setIsClick] = useState(false);

  let navigate = useNavigate();

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={item._id}
            className={`grid grid-cols-12 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">
              {props.search.page > 1 ? props.search.limit + idx + 1 : idx + 1}
            </div>
            <div className="col-span-3">{item.borrowIdDoc}</div>
            <div className="col-span-3 ">{item.sector}</div>
            <div className="col-span-1">
              {new Date(item.borrowDate).toLocaleDateString("th-TH", options)}
            </div>
            <div className="col-span-1">
              {new Date(item.borrowSetReturnDate).toLocaleDateString(
                "th-TH",
                options
              )}
            </div>
            <div className="col-span-1 ">
              {item.borrowReturnDate
                ? new Date(item.borrowReturnDate).toLocaleDateString(
                    "th-TH",
                    options
                  )
                : "-"}
            </div>
            <div className="col-span-2 grid grid-cols-2 items-center gap-2">
              <div className="flex justify-center">
                <div className="flex gap-1">
                  <div
                    className={`${
                      item.status === "done"
                        ? "  text-green-700 bg-sidebar-green"
                        : " bg-orange-100 border-orange-100 text-orange-400 "
                    } px-4 py-2 rounded-2xl border`}
                  >
                    {item.status === "done" ? "คืนสำเร็จ" : "รอตรวจรับ"}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                {item.status === "waitingReturnApprove" ||
                item.status === "partiallyReturn" ? (
                  <Link
                    to={`/borrowCheckApprove/${item._id}`}
                    className="bg-text-green text-white rounded-md hover:bg-green-800 p-2 w-full"
                  >
                    {item.status === "waitingReturnApprove" ||
                    item.status === "partiallyReturn"
                      ? "ตรวจรับ"
                      : ""}
                    {/* {item.status} */}
                  </Link>
                ) : (
                  <Link
                  to={`/viewBorrowCheckDetail/${item._id}`}
                    className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
                  >
                    <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                  </Link>
                  // <div
                  //   // type="button"
                  //   // to={`/borrowSaving/${ID}`}
                  //   className={`${
                  //     item.status === "done"
                  //       ? "  text-green-700 bg-sidebar-green"
                  //       : " bg-orange-100 border-orange-100 text-orange-400 "
                  //   } px-4 py-2 rounded-2xl border`}
                  // >
                  //   {item.status === "done" ? "คืนสำเร็จ" : "ตรวจรับคืน"}
                  // </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableBorrowCheckIndex;
