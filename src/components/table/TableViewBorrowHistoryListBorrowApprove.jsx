import React, { useState } from "react";

const TableViewBorrowHistoryListBorrowApprove = ({ approveAssetList }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {approveAssetList.map((item, idx) => {
        return (
          <div className="grid grid-cols-12 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber }
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.serialNumber}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.sector}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
            {item.status === "waiting"
              ? "รออนุมัติ"
              : item.status === "approve"
              ? "อนุมัติแล้ว"
              : item.status === "partiallyApprove"
              ? "อนุมัติบางส่วน"
              : item.status === "done"
              ? "คืนสำเร็จ"
              : item.status === "waitCheckReturn"
              ? "รอตรวจรับ"
              : item.status === "cancel"
              ? "ยกเลิก"
              : item.status === "reject"
              ? "ไม่อนุมัติ"
              : "บันทึกคืน"}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.pricePerUnit}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableViewBorrowHistoryListBorrowApprove;
