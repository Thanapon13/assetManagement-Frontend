import {BsFillEyeFill} from "react-icons/bs"
import {BsFillPencilFill} from "react-icons/bs"
import {IoMdTrash} from "react-icons/io"

function RowOfTableUserInformationIndex({
  index,
  userId,
  thaiFirstName,
  thaiLastName,
  sector,
  lastLoginDate,
  level,
}) {
  return (
    <div
      className={`grid grid-cols-13 gap-2 h-12 pt-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="col-span-2 ml-2">{userId}</div>
      <div className="col-span-2">{thaiFirstName}</div>
      <div className="col-span-2 ">{thaiLastName}</div>
      <div className="col-span-2">{sector}</div>
      <div className="col-span-2">{lastLoginDate}</div>
      <div className="col-span-1 ">{level}</div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        {/* <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green"/>
        </button> */}
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green"/>
        </button>
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <IoMdTrash className="w-[20px] h-[20px] text-text-green"/>
        </button>
      </div>
    </div>
  );
}

export default RowOfTableUserInformationIndex;
