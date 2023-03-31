import React, { useState } from "react";
import DropdownStatus from "../dropdown/DropdownStatus";

const TableBorrowCheckApprove = ({ assetList, handleCheckboxChange }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {assetList.map((item, idx) => {
        return (
          <div
            key={item?._id}
            className={`grid grid-cols-11 gap-2 h-12 py-2 text-xs text-center items-center ${
              item?.return === "done" || item?.return === "" ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="col-span-1 text-center flex justify-center items-center">
              <input
                type="checkbox"
                className={` text-text-green placeholder-text-green focus:ring-0 rounded-sm ${
                  item?.return === "done" || item?.return === "" ? "bg-gray-300" : ""
                }`}
                checked={item?.checked}
                disabled={item?.return === "done" || item?.return === ""? true : false}
                onChange={() => handleCheckboxChange(assetList, item._id)}
              />
            </div>
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item?.assetNumber}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item?.productName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item?.sector}
            </div>
            <div className="col-span-1  bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item?.status === "borrowed"
                ? "ยืม"
                : item?.status === "inStock"
                ? "ใช้งานได้"
                : item?.status === "repair"
                ? "ซ่อม"
                : item?.status === "transfered"
                ? "โอน"
                : "ชำรุด"}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item?.pricePerUnit}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableBorrowCheckApprove;
