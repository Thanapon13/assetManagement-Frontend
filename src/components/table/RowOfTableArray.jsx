import {BsFillEyeFill} from "react-icons/bs"
import {BsFillPencilFill} from "react-icons/bs"
import {IoMdTrash} from "react-icons/io"

function RowOfTableArray({
  index,
  ID,
  inventoryNumber,
  name,
  department,
  sector,
  building,
  status,
}) {
  return (
    <div
      className={`grid grid-cols-16 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="ml-2">{ID}</div>
      <div className="col-span-3">{inventoryNumber}</div>
      <div className="col-span-3 ">{name}</div>
      <div className="col-span-2">{department}</div>
      <div className="col-span-3">{sector}</div>
      <div className="col-span-1 ">{building}</div>
      <div className="col-span-1 text-text-blue text-center bg-background-light-blue p-2 rounded-full">{status}</div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        <div className="border-[1px] border-text-green  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green"/>
        </div>
        <div className="border-[1px] border-text-green  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green"/>
        </div>
        <div className="border-[1px] border-text-green  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <IoMdTrash className="w-[20px] h-[20px] text-text-green"/>
        </div>
      </div>
    </div>
  );
}

export default RowOfTableArray;
