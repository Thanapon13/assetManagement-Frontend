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
  // department,
  sector,
  // building,
  status,
}) {
  return (
    <div
      className={`grid grid-cols-16 gap-5 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="ml-2 text-center">{realAssetId}</div>
      <div className="col-span-3">{assetNumber}</div>
      <div className="col-span-3 ">{productName}</div>
      <div className="col-span-2 text-center">{price.toFixed(2)}</div>
      <div className="col-span-3">{sector}</div>
      {/* <div className="col-span-1 ">{building}</div> */}
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
          to={`/viewAssetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <Link
          to={`/editAssetInformation/${_id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <Link
          to="/viewAssetInformation"
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
        >
          <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
        </Link>
      </div>
    </div>
  );
}

export default RowOfTableArray;
