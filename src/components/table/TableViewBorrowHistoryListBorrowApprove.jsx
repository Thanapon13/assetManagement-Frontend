import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { BsFillEyeFill } from "react-icons/bs";

const TableViewBorrowHistoryListBorrowApprove = ({ approveAssetList, approveAssetImageList  }) => {
  const [isClick, setIsClick] = useState(false);

   //Show Modal
   const [showViewImageModal, setShowViewImageModal] = useState(false);
   const [imgIndex, setImgIndex] = useState(0);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {approveAssetList.map((item, idx) => {
        return (
          <div className="grid grid-cols-13 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
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
            {item.status === "borrowed"
                ? "ยืม"
                : item.status === "inStock"
                ? "ใช้งานได้"
                : item.status === "repair"
                ? "ซ่อม"
                : item.status === "transfered"
                ? "โอน"
                : "ชำรุด"}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.pricePerUnit}
            </div>
            <button
              className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
              onClick={() => {
                setShowViewImageModal(true);
                setImgIndex(idx);
              }}
            >
              <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mr-2" />
            </button>
          </div>
        );
      })}

         {/* view image */}
         <Modal
        id="showViewImageModal"
        isVisible={showViewImageModal}
        width={"[800px]"}
        onClose={() => setShowViewImageModal(false)}
        header={"รูปภาพครุภัณฑ์"}
        showViewImageModal={showViewImageModal}
      >
        <div className=" px-10 pt-2 pb-10">
          {approveAssetImageList[imgIndex]?.map((el, idx) => (
            <img
              crossOrigin="true"
              src={el.imgURL}
              className="w-[640px] mb-5"
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TableViewBorrowHistoryListBorrowApprove;
