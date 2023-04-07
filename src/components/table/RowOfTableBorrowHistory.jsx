import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import Modal from "../modal/Modal";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function RowOfTableBorrowHistory({
  index,
  borrowIdDoc,
  sector,
  borrowDate,
  borrowSetReturnDate,
  handler,
  borrowReturnDate,
  status,
}) {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return (
    <div>
      <div
        className={`grid grid-cols-15 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
      >
        <div className="ml-2 text-center flex justify-center items-center ">
          <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
            {index + 1}
          </div>
        </div>

        <input
          className="col-span-2 bg-gray-200 text-center flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={borrowIdDoc}
        />
        <input
          className="col-span-2 bg-gray-200 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={handler}
        />
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            value={sector}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={`${
              borrowDate 
                ? new Date(borrowDate).toLocaleDateString(
                  "th-TH",
                  options
                )
                : "-"
            }${" "}${borrowDate  ? "," : ""}${" "} ${borrowDate ? new Date(borrowDate).toLocaleTimeString("th-TH",hoursOptions)
              : ""
          }`}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={`${
              borrowSetReturnDate 
                ? new Date(borrowSetReturnDate).toLocaleDateString(
                  "th-TH",
                  options
                )
                : "-"
            }${" "}${borrowSetReturnDate  ? "," : ""}${" "} ${borrowSetReturnDate ? new Date(borrowSetReturnDate).toLocaleTimeString("th-TH",hoursOptions)
              : ""
          }`}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={`${
              borrowReturnDate 
                ? new Date(borrowReturnDate).toLocaleDateString(
                  "th-TH",
                  options
                )
                : "-"
            }${" "}${borrowReturnDate  ? "," : ""}${" "} ${borrowReturnDate ? new Date(borrowReturnDate).toLocaleTimeString("th-TH",hoursOptions)
              : ""
          }`}
          />
        </div>
        <div className="flex justify-center  col-span-2">
          <button
            type="button"
            disabled
            // to={`/borrowSaving/${ID}`}
            // onClick={() => handleClick(item.borrowStatus)}
            className={`${
              status === "waiting"
                ? " bg-background-light-blue text-text-blue  rounded-2xl "
                : status === "approve"
                ? " bg-sidebar-green text-text-green  rounded-2xl  "
                : status === "partiallyApprove"
                ? " text-orange-400 bg-orange-100 p-2 border rounded-2xl  "
                : status === "watingReturnApprove"
                ? "bg-orange-100 text-orange-400 rounded-2xl"
                : status === "cancel" || status === "reject"
                ? "bg-red-200 text-red-600  rounded-2xl"
                : "bg-text-green text-white hover:bg-green-800 rounded-2xl"
            } border border-spacing-5 p-2 w-full`}
          >
            {status === "waiting"
              ? "รออนุมัติ"
              : status === "approve"
              ? "อนุมัติแล้ว"
              : status === "partiallyApprove"
              ? "อนุมัติบางส่วน"
              : status === "done"
              ? "คืนสำเร็จ"
              : status === "waitCheckReturn"
              ? "รอตรวจรับ"
              : status === "cancel"
              ? "ยกเลิก"
              : status === "reject"
              ? "ไม่อนุมัติ"
              : status === "waitingReturnApprove"
              ? "รออนุมัติคืน"
              : "บันทึกคืน"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RowOfTableBorrowHistory;
