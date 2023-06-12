import { useEffect } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";

function RowOfTableArray({
  index,
  _id,
  realAssetId,
  assetNumber,
  productName,
  price,
  sector,
  status,
  handleDelete,
  building,
  department,
}) {

  return (
    <div
      className={`grid grid-cols-16 gap-5 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="ml-2 text-center">{index}</div>
      <div className="col-span-3">{assetNumber}</div>
      <div className="col-span-3 ">{productName}</div>
      <div className="col-span-2 text-center">{price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      {/* <div className="col-span-1">{department}</div> */}
      <div className="col-span-2">{sector}</div>
      <div className="col-span-1 ">{building}</div>
      <div className="col-span-2 flex justify-center">
        <div
          className={`  ${status === "borrowed"
              ? " bg-background-light-blue text-text-blue  "
              : status === "inStock"
                ? " bg-text-green/[.15] text-text-green    "
                : status === "repair"
                  ? "bg-red-200 text-red-600  "
                  : status === "transfered"
                    ? "bg-amber-300 text-amber-800  "
                  : status === "saveDraft"
                    ? "bg-gray-200 "
                    : "bg-white text-red-600 border-[1px] border-red-600  "
            }  text-center p-2 w-16   rounded-full `}
        >
          {status === "borrowed"
            ? "ยืม"
            : status === "inStock"
              ? "ใช้งานได้"
              : status === "repair"
                ? "ซ่อม"
                : status === "transfered"
                  ? "โอน"
                : status === "saveDraft"
                  ? "แบบร่าง"
                  : "ชำรุด"}
        </div>
      </div>

      <div className="col-span-2 flex justify-center gap-2 mr-2">
        <Link
          to={`/viewAssetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <Link
          to={status != "saveDraft" ? `/editAssetInformation/${_id}` : `/assetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        {/* <Link
          to="/viewAssetInformation"
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
        </Link> */}
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => handleDelete(_id)}
        >
          <IoMdTrash className="text-lg" />
          {/* <svg width="13" height="17" viewBox="0 0 13 17" fill="none"  xmlns="http://www.w3.org/2000/svg">
            <path fill="white"
              d="M0.892857 14.2857C0.892857 15.2679 1.69643 16.0714 2.67857 16.0714H9.82143C10.8036 16.0714 11.6071 15.2679 11.6071 14.2857V5.35714C11.6071 4.375 10.8036 3.57143 9.82143 3.57143H2.67857C1.69643 3.57143 0.892857 4.375 0.892857 5.35714V14.2857ZM11.6071 0.892857H9.375L8.74107 0.258929C8.58036 0.0982142 8.34821 0 8.11607 0H4.38393C4.15179 0 3.91964 0.0982142 3.75893 0.258929L3.125 0.892857H0.892857C0.401786 0.892857 0 1.29464 0 1.78571C0 2.27679 0.401786 2.67857 0.892857 2.67857H11.6071C12.0982 2.67857 12.5 2.27679 12.5 1.78571C12.5 1.29464 12.0982 0.892857 11.6071 0.892857Z"
            />
          </svg> */}
        </button>
      </div>
    </div>
  );
}

export default RowOfTableArray;
