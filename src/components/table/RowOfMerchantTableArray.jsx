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
  _id
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
          to={`/viewMerchant/${_id || 1}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
        </button>
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
        </button>
      </div>
    </div>
  );
}

export default RowOfMerchantTableArray;
