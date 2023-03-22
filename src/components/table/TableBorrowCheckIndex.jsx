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
            className={`grid grid-cols-12 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
             <div className="col-span-1">{props.search.page >1 ?props.search.limit + idx +1 : idx+1}</div>
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
            <div className="col-span-2">
              <div className="grid grid-cols-2">
                <div
                  className={`${
                    item.status === "done"
                      ? "  text-green-700 bg-sidebar-green"
                      : " bg-orange-100 border-orange-100 text-orange-400 "
                  } px-4 py-2 rounded-2xl border`}
                >
                  {item.status === "done" ? "คืนสำเร็จ" : "รอตรวจรับ"}
                </div>
                {item.status === "inProgress" ? (
                  <div className="flex justify-center">
                    <Link
                      // type="button"
                      // to={`/borrowSaving/${ID}`}
                      to="/BorrowCheckIndex/borrowCheckSaving"
                      onClick={handleClick}
                      className="text-white bg-text-green hover:bg-green-800 border border-spacing-5  rounded-md p-2"
                    >
                      ตรวจรับ
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Link
                      to="/borrowCheckIndex/borrowCheckDetail"
                      className="border-[1px] h-[31px] w-[31px] flex justify-center items-center rounded-md border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
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

export default TableBorrowCheckIndex;
