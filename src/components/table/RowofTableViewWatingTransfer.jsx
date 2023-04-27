import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import Modal from "../../components/modal/Modal";

function RowofTableViewWatingTransfer({ index, row }) {
  const [showViewImageModal, setShowViewImageModal] = useState(false);

  return (
    <div
      className={` p-2 grid grid-cols-14 justify-center items-center gap-4 h-16 text-xs bg-white`}
    >
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <input
        className="text-center col-span-3 bg-gray-200 pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.assetNumber}
      />
      <input
        className="col-span-3 bg-gray-200 pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.productName}
      />
      <input
        className="text-center col-span-3 bg-gray-200 pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.serialNumber}
      />

      <input
        className="text-center col-span-3 bg-gray-200 pl-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.sector}
      />

      <button
        // className="inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 rounded-md"
        className="col-span-1 border-2 border-text-green shadow-sm rounded-md w-full justify-center py-2 hover:bg-sidebar-green items-center"
        onClick={() => {
          setShowViewImageModal(true);
          setImgIndex(idx);
        }}
      >
        <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mx-2 inline" />
      </button>

      <Modal
        id="showViewImageModal"
        isVisible={showViewImageModal}
        width={"[800px]"}
        onClose={() => setShowViewImageModal(false)}
        header={"รูปภาพครุภัณฑ์"}
        showViewImageModal={showViewImageModal}
      >
        <div className=" px-10 pt-2 pb-10">
          {row.imageArray?.map((el, idx) => (
            <img
              crossOrigin="true"
              src={el.imgURL}
              className="w-[640px] mb-5"
            />
          ))}
        </div>
      </Modal>

    </div>
  );
}

export default RowofTableViewWatingTransfer;
