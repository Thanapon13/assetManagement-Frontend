import { BsFillEyeFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";

function RowOfTableTransferIndex({
  index,
  id,
  ele,
  status,
  setShowModalDelete
}) {

  return (
    <div
      className={`grid grid-cols-18 gap-2  py-2 text-xs text-center items-center justify-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="col-span-2 ml-2">{new Date(ele.createdAt).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", our12: false })}</div>
      <div className="col-span-3">{ele.transferDocumentNumber}</div>
      <div className="col-span-3 text-left">{ele.transferSector}</div>
      <div className="col-span-3 text-left">{ele.transfereeSector}</div>
      <div className="col-span-3 text-left">{ele.building}</div>
      <div
        className={`col-span-2 ${ele.status === "waiting"
          ? " bg-background-light-blue text-text-blue  "
          : ele.status === "approve" || ele.status === "partiallyApprove"
            ? "bg-text-green/[.15] text-text-green    "
            : ele.status === "reject"
              ? "bg-red-200 text-red-600  "
              : ele.status === "saveDraft"
                ? "bg-gray-200 text-gray-600  "
                : "bg-red-500 text-white   hover:bg-green-800"
          } text-center  p-2 rounded-full`}
      >
        {status.find(el => el.value == ele.status)?.name || "ยกเลิก"}
        {/* {status === "waiting"
          ? "รอการอนุมัติ"
          : status === "approve"
            ? "อนุมัติแล้ว"
            : status === "partiallyApprove"
              ? "อนุมัติบางส่วน"
              : status === "reject"
                ? "ไม่อนุมัติ"
                : status === "saveDraft"
                  ? "แบบร่าง"
                  : "ยกเลิก"} */}
      </div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        {ele.status === "waiting" ||
          ele.status === "saveDraft" ? (
          <>
            <Link
              to={`/viewWaitingTransferAsset/${id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
            >
              <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
            </Link>
            <Link
              to={`/editTransferAsset/${id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
            >
              <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
            </Link>
            <button
              className="border-[1px] border-red-600  focus:border-transparent shadow-sm text-sm font-medium   hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600  h-[31px] w-[31px] flex justify-center items-center rounded-md"
              onClick={() => setShowModalDelete(id)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50005 8.90078L2.60005 13.8008C2.41672 13.9841 2.18338 14.0758 1.90005 14.0758C1.61672 14.0758 1.38338 13.9841 1.20005 13.8008C1.01672 13.6174 0.925049 13.3841 0.925049 13.1008C0.925049 12.8174 1.01672 12.5841 1.20005 12.4008L6.10005 7.50078L1.20005 2.60078C1.01672 2.41745 0.925049 2.18411 0.925049 1.90078C0.925049 1.61745 1.01672 1.38411 1.20005 1.20078C1.38338 1.01745 1.61672 0.925781 1.90005 0.925781C2.18338 0.925781 2.41672 1.01745 2.60005 1.20078L7.50005 6.10078L12.4 1.20078C12.5834 1.01745 12.8167 0.925781 13.1 0.925781C13.3834 0.925781 13.6167 1.01745 13.8 1.20078C13.9834 1.38411 14.075 1.61745 14.075 1.90078C14.075 2.18411 13.9834 2.41745 13.8 2.60078L8.90005 7.50078L13.8 12.4008C13.9834 12.5841 14.075 12.8174 14.075 13.1008C14.075 13.3841 13.9834 13.6174 13.8 13.8008C13.6167 13.9841 13.3834 14.0758 13.1 14.0758C12.8167 14.0758 12.5834 13.9841 12.4 13.8008L7.50005 8.90078Z"
                  fill="#EB5757"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link
              to={`/viewWaitingTransferAsset/${id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] px-1 flex justify-center items-center rounded-md"
            >
              <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
              <p className="ml-2">ดูรายละเอียด</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default RowOfTableTransferIndex;
