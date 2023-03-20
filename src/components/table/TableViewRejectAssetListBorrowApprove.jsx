import React, { useState } from "react";

const TableViewRejectAssetListBorrowApprove = ({ rejectAssetList }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {rejectAssetList.map((item, idx) => {
        return (
          <div className="grid grid-cols-11 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.brand}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.pricePerUnit}
            </div>
            <div className="col-span-2 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.reason}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableViewRejectAssetListBorrowApprove;
