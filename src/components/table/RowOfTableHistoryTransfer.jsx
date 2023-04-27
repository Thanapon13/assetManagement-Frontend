import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function RowOfTableHistoryTransfer({
  index,
  id,
  transferPendingDateTime,
  transferDocumentNumber,
  transferSector,
  transfereeSector,
  building,
  status,
}) {
  return (
    <div
      className={`grid grid-cols-17 gap-2  py-2 text-xs text-center items-center justify-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="col-span-1 ml-2">{index+1}</div>
      <div className="col-span-3">{transferDocumentNumber}</div>
      <div className="col-span-3 text-left">{transferSector}</div>
      <div className="col-span-3 text-left">{transfereeSector}</div>
      <div className="col-span-3 text-left">{building}</div>
      <div className="col-span-2">{transferPendingDateTime}</div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
      <>
            <Link
              to={`/viewTransferAsset/${id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm px-3 font-medium text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] px-1 flex justify-center items-center rounded-md"
            >
              <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
              <p className="ml-2">ดูรายละเอียด</p>
            </Link>
          </>
      </div>
    </div>
  );
}

export default RowOfTableHistoryTransfer;
