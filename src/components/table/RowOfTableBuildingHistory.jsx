import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import Modal from "../modal/Modal";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function RowOfTableBuildingHistory({
  index,
  borrowData,
  building,
  floor,
  room,
  moveInDate,
  moveOutDate
}) {
  return (
    <div>
      <div
        className={`grid grid-cols-12 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
      >
        <div className="ml-2 text-center flex justify-center items-center ">
          <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
            {index + 1}
          </div>
        </div>

        <input
          className="col-span-4 bg-gray-200 px-2 flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={building}
        />
        <input
          className=" bg-gray-200 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={floor}
        />
        <div className="flex relative col-span-2">
          <input
            className="w-full text-center bg-gray-200 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            value={room}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-center bg-gray-200 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={moveInDate && new Date(moveInDate).toLocaleDateString('th')}
          />
        </div>
        <div className="flex relative col-span-2">
          <input
            className="w-full text-center bg-gray-200 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={moveOutDate && new Date(moveOutDate).toLocaleDateString('th')}
          />
        </div>
      </div>
    </div>
  );
}

export default RowOfTableBuildingHistory;
