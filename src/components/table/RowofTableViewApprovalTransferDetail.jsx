import { HiTrash } from "react-icons/hi";
import Selector from "../selector/Selector";

function RowofTableViewApprovalTransferDetail({
  index,
  lengthApprove,
  row,
  data,
}) {
  console.log(data.reason === "" || row.status === "approve");
  return (
    <div
      className={`p-1  grid ${
        row.status === "approve"
          ? "grid-cols-13"
          : data.reason === ""
          ? "grid-cols-17"
          : "grid-cols-13"
      } justify-center text-center items-center gap-4 h-16 text-xs bg-white`}
    >
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {row.status === "approve" ? index + 1 : index + 1 - lengthApprove}
        </div>
      </div>

      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.assetNumber}
      />
      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.productName}
      />
      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.serialNumber}
      />
      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={row && row?.hostSector}
      />

      {
        row.status === "approve"
          ? <></>
          : data.reason === ""
          ?  (
            <input
              className="col-span-4 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
              disabled
              value={row && row?.reason}
            />
          )
          : <></>
      }
    </div>
  );
}

export default RowofTableViewApprovalTransferDetail;
