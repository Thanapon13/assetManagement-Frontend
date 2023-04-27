import { HiTrash } from "react-icons/hi";
import Selector from "../selector/Selector";

function RowofTableApprovalTransferDetail({
  index,
  row,
  data,
  handleCheckboxChange
}) {

  return (
    <div
      className={`p-1  grid grid-cols-14 justify-center text-center items-center gap-4 h-16 text-xs bg-white`}
    >
      <div className="col-span-1">
        <input
          type="checkbox"
          checked={row.checked}
          onChange={() => handleCheckboxChange(data.subComponentTransfer,index)}
          className="text-text-green rounded-md placeholder-text-green focus:ring-0"
        />
      </div>
      <div className="col-span-1 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <input
        className="col-span-3 bg-gray-200 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          row && row?.assetNumber
        }
      />
      <input
        className="col-span-3 bg-gray-200 px-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          row && row?.productName
        }
      />
      <input
        className="col-span-3 bg-gray-200 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          row && row?.serialNumber
        }
      />
      <input
        className="col-span-3 bg-gray-200 px-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          row && row?.sector
        }
      />
    </div>
  );
}

export default RowofTableApprovalTransferDetail;
