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
  setBorrowData,
  borrowIdDoc,
  borrowerName,
  agencyName,
  borrowDate,
  realReturnDate,
  offerBorrowApproveDate,
  borrowStatus,
}) {
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
          value={borrowerName}
        />
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            value={agencyName}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={borrowDate}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={realReturnDate}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-left bg-gray-200 pl-3 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={offerBorrowApproveDate}
          />
        </div>
        <div className="flex justify-center  col-span-2">
            <button
              type="button"
              disabled
              // to={`/borrowSaving/${ID}`}
              // onClick={() => handleClick(item.borrowStatus)}
              className={`${
                borrowStatus === "waitApprove"
                  ? "bg-sky-200 text-blue-600 rounded-xl border-sky-200"
                  : borrowStatus === "done"
                  ? " bg-sidebar-green text-text-green  rounded-xl border-sidebar-green "
                  : borrowStatus === "waitCheckReturn"
                  ? "bg-orange-100 text-orange-400 border-orange-100 rounded-xl"
                  : "bg-text-green text-white rounded-xl hover:bg-green-800"
              } border border-spacing-5 p-2 w-24 flex justify-center`}
            >
              {borrowStatus === "waitApprove"
                ? "รออนุมัติ"
                : borrowStatus === "done"
                ? "คืนสำเร็จ"
                : borrowStatus === "waitCheckReturn"
                ? "รอตรวจรับ"
                : "บันทึกคืน"}
            </button>
        </div>
      </div>
    </div>
  );
}

export default RowOfTableBorrowHistory;
