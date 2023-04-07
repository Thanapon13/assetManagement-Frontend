import { BsFillEyeFill } from "react-icons/bs"
import { BsFillPencilFill } from "react-icons/bs"
import { IoMdTrash } from "react-icons/io"
import { Link } from "react-router-dom";

function RowOfMerchantTableArray({
  index,
  billNumber,
  documentRegistration,
  sector,
  withdrawDate,
  allPrice,
  count,
  _id,
  mode
}) {
  return (
    <div
      className={`grid grid-cols-17 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="ml-2">{index + 1}</div>
      <div className="col-span-2">{billNumber}</div>
      <div className="col-span-3">{documentRegistration}</div>
      <div className="col-span-3">{sector}</div>
      <div className="col-span-2">{withdrawDate}</div>
      <div className="col-span-2">{allPrice}</div>
      <div className="col-span-2 ">{count}</div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        <Link
          to={`/${mode !== "reportInfo" ? "viewMerchant" : "viewReportMerchantInfo"}/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        {mode === "reportInfo"
          ?
          <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
            <div className="flex justify-center items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4 4H3.6V1C3.6 0.716667 3.6861 0.479 3.8583 0.287C4.0311 0.0956666 4.245 0 4.5 0H13.5C13.755 0 13.9686 0.0956666 14.1408 0.287C14.3136 0.479 14.4 0.716667 14.4 1V4ZM14.4 9.5C14.655 9.5 14.8686 9.404 15.0408 9.212C15.2136 9.02067 15.3 8.78333 15.3 8.5C15.3 8.21667 15.2136 7.979 15.0408 7.787C14.8686 7.59567 14.655 7.5 14.4 7.5C14.145 7.5 13.9314 7.59567 13.7592 7.787C13.5864 7.979 13.5 8.21667 13.5 8.5C13.5 8.78333 13.5864 9.02067 13.7592 9.212C13.9314 9.404 14.145 9.5 14.4 9.5ZM5.4 16H12.6V12H5.4V16ZM5.4 18C4.905 18 4.4814 17.8043 4.1292 17.413C3.7764 17.021 3.6 16.55 3.6 16V14H0.9C0.645 14 0.4314 13.904 0.2592 13.712C0.0864001 13.5207 0 13.2833 0 13V8C0 7.15 0.2625 6.43767 0.7875 5.863C1.3125 5.28767 1.95 5 2.7 5H15.3C16.065 5 16.7064 5.28767 17.2242 5.863C17.7414 6.43767 18 7.15 18 8V13C18 13.2833 17.9136 13.5207 17.7408 13.712C17.5686 13.904 17.355 14 17.1 14H14.4V16C14.4 16.55 14.2239 17.021 13.8717 17.413C13.5189 17.8043 13.095 18 12.6 18H5.4Z"
                  fill="green"
                />
              </svg>
            </div>
          </button>
          : <>
            <Link
              to={`/editMerchant/${_id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
              <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
            </Link>
            <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
              <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
            </button>
          </>}
      </div>
    </div>
  );
}

export default RowOfMerchantTableArray;
