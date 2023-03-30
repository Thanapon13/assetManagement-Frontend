import {BsFillEyeFill} from "react-icons/bs"
import {BsFillPencilFill} from "react-icons/bs"
import {IoMdTrash} from "react-icons/io"
import { Link } from "react-router-dom";

function RowOfTablePackageIndex({
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
  department
}) {
  return (
    <div
      className={`grid grid-cols-19 gap-5 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="ml-2 text-center">{index+1}</div>
      <div className="col-span-3">{assetNumber}</div>
      <div className="col-span-3 ">{productName}</div>
      <div className="col-span-2 text-center">{price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div className="col-span-2">{department}</div>
      <div className="col-span-2">{sector}</div>
      <div className="col-span-2">{building}</div>
      <div className="col-span-2 flex justify-center">
        <div
          className={`  ${
            status === "borrowed"
              ? " bg-background-light-blue text-text-blue  "
              : status === "inStock"
              ? " bg-sidebar-green text-text-green    "
              : status === "repair"
              ? "bg-red-200 text-red-600  "
              : status === "transfered"
              ? "bg-amber-300 text-amber-800  "
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
            : "ชำรุด"}
        </div>
      </div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        <Link
          to={`/viewPackageAssetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <Link
          to={`/editPackageAssetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={()=>handleDelete(_id)}
        >
          <IoMdTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default RowOfTablePackageIndex;
