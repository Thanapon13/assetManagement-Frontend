import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DropdownModalBorrowApprove from "../components/dropdown/DropdownModalBorrowApprove";
import RowofTableViewApprovalTransferDetail from "../components/table/RowofTableViewApprovalTransferDetail";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Spinner } from "flowbite-react/lib/esm";
import { getTransferApproveDetailById } from "../api/transferApi";

const ViewApprovalTransferAssetDetail = () => {
  let { transferId } = useParams();
  const printRef = useRef();

  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState();
  const [approveArray, setApproveArray] = useState()
  const [rejectArray, setRejectArray] = useState()
  
  useEffect(() => {
    const fetchList = async () => {
      const res = await getTransferApproveDetailById(transferId)
      setData(res.data.transfer)
      setApproveArray(res.data.approveArray)
      setRejectArray(res.data.rejectArray)
    }
    fetchList()
  }, [])

  // const [isAllReject, setAllReject] = useState(
  //   data.reason === "" ? "แยกการให้สาเหตุแต่ละรายการ" : "สาเหตุแบบหลายรายการ"
  // );
  // const callback = (payload) => {
  //   setAllReject(payload);
  // };

  return (
    <>
      <div className="bg-background-page py-5 p-3">
        <div className="flex items-center mr-10">
          <Link
            to="/approvalTransferAsset"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-2xl text-text-green ">รายละเอียดการขออนุมัติ</div>
        </div>
        <div className="flex justify-between items-center pt-3">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">
              <Link
                to="/approvalTransferAsset"
                className='className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2'
              >
                อนุมัติโอน-ย้ายครุภัณฑ์
              </Link>
            </div>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการขออนุมัติ</div>
          </div>

          <ReactToPrint
            trigger={() => {
              return (
                <button
                  type="button"
                  className="-ml-2 flex justify-center items-center text-white bg-blue-500 hover:bg-focus-blue rounded-lg focus:border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-blue focus:border-focus-blue  px-8 py-2 "
                >
                  <div className="flex justify-center items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4 4H3.6V1C3.6 0.716667 3.6861 0.479 3.8583 0.287C4.0311 0.0956666 4.245 0 4.5 0H13.5C13.755 0 13.9686 0.0956666 14.1408 0.287C14.3136 0.479 14.4 0.716667 14.4 1V4ZM14.4 9.5C14.655 9.5 14.8686 9.404 15.0408 9.212C15.2136 9.02067 15.3 8.78333 15.3 8.5C15.3 8.21667 15.2136 7.979 15.0408 7.787C14.8686 7.59567 14.655 7.5 14.4 7.5C14.145 7.5 13.9314 7.59567 13.7592 7.787C13.5864 7.979 13.5 8.21667 13.5 8.5C13.5 8.78333 13.5864 9.02067 13.7592 9.212C13.9314 9.404 14.145 9.5 14.4 9.5ZM5.4 16H12.6V12H5.4V16ZM5.4 18C4.905 18 4.4814 17.8043 4.1292 17.413C3.7764 17.021 3.6 16.55 3.6 16V14H0.9C0.645 14 0.4314 13.904 0.2592 13.712C0.0864001 13.5207 0 13.2833 0 13V8C0 7.15 0.2625 6.43767 0.7875 5.863C1.3125 5.28767 1.95 5 2.7 5H15.3C16.065 5 16.7064 5.28767 17.2242 5.863C17.7414 6.43767 18 7.15 18 8V13C18 13.2833 17.9136 13.5207 17.7408 13.712C17.5686 13.904 17.355 14 17.1 14H14.4V16C14.4 16.55 14.2239 17.021 13.8717 17.413C13.5189 17.8043 13.095 18 12.6 18H5.4Z"
                        fill="white"
                      />
                    </svg>
                    <div className="ml-2 text-sm">พิมพ์</div>
                  </div>
                </button>
              );
            }}
            onBeforeGetContent={async () => { await setShowAll(true) }}
            content={() => printRef.current}
            onAfterPrint={() => setShowAll(false)}
          />
        </div>
        {!data
          ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
          : <div ref={printRef} className={`${showAll && "px-5"}`}>
            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
              <div className="text-lg font-semibold">รายละเอียดการโอน-ย้ายครุภัณฑ์</div>
              {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-sm"> */}
              <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
                <div className="text-gray-500 sm:col-span-3 col-span-1">เลขที่เอกสารการโอนย้าย</div>
                <div className="sm:col-span-4 col-span-2">
                  {data?.transferDocumentNumber}
                </div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">หน่วยงาน</div>
                <div className="sm:col-span-4 col-span-2">
                  {data?.transferSector}
                </div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">ภาควิชา</div>
                <div className="sm:col-span-4 col-span-2">{data?.subSector}</div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">ผู้ดำเนินการ</div>
                <div className="sm:col-span-4 col-span-2">{data?.name_recorder}</div>
              </div>
            </div>

            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
              {approveArray?.length > 0 &&
                <>
                  <div className="text-lg font-semibold">รายการครุภัณฑ์ที่อนุมัติ</div>
                  <div className="overflow-x-auto pt-4 mb-5 scrollbar ">
                    <div className={`${!showAll && "w-[900px]"} lg:w-full p-2`}>
                      <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                        <div className="grid grid-cols-13 gap-2 text-center">
                          <div className="ml-2 col-span-1 ">ลำดับ</div>
                          <div className="col-span-3">เลขครุภัณฑ์</div>
                          <div className="col-span-3">ชื่อครุภัณฑ์</div>
                          <div className="col-span-3">Serial Number</div>
                          <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                        </div>
                      </div>
                      <div id="table" className={`${!showAll && "scrollbar overflow-y-auto max-h-[300px]"}`}>
                        {approveArray?.map((el, idx) => {
                          return (
                            <RowofTableViewApprovalTransferDetail
                              key={idx}
                              index={idx}
                              row={el}
                              data={data}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              }

              {rejectArray?.length > 0 &&
                <>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">รายการครุภัณฑ์ที่ไม่อนุมัติ</div>
                    {/* <div className="flex items-center gap-5 mr-2">
                      <div>ประเภทการให้เหตุผล</div>
                      <DropdownModalBorrowApprove
                        isDisable={true}
                        // callback={callback}
                        // header={isAllReject}
                        header={data.reason === "" ? "แยกการให้สาเหตุแต่ละรายการ" : "สาเหตุแบบหลายรายการ"}
                      />
                    </div> */}
                  </div>
                  <div className="overflow-x-auto scrollbar pt-4">
                    <div className={`${!showAll && "w-[900px]"} lg:w-full p-2`}>
                      <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                        <div
                          className={`grid ${!data.reason ? "grid-cols-17" : "grid-cols-13"
                            } gap-2 text-center`}
                        >
                          <div className="ml-2 col-span-1 ">ลำดับ</div>
                          <div className="col-span-3">เลขครุภัณฑ์</div>
                          <div className="col-span-3">ชื่อครุภัณฑ์</div>
                          <div className="col-span-3">Serial Number</div>
                          <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                          {!data.reason &&
                            <div className="col-span-4">สาเหตุที่ไม่อนุมัติ</div>
                          }
                        </div>
                      </div>
                      <div id="table" className={`${!showAll && "scrollbar max-h-[300px] overflow-y-auto"}`}>
                        {rejectArray.map((el, idx) => {
                          return (
                            <RowofTableViewApprovalTransferDetail
                              key={idx}
                              index={idx}
                              lengthApprove={
                                data.subComponentTransfer?.filter(
                                  (x) => x.status === "approve"
                                ).length
                              }
                              row={el}
                              data={data}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {data.reason &&
                    <div className="p-4 text-sm mt-3 ">
                      <div className="text-md">สาเหตุที่ไม่อนุมัติ</div>
                      <textarea
                        maxLength=""
                        name="reason"
                        disabled
                        className="resize-none min-h-[100px] border-[1px] border-gray-200 mt-5 bg-gray-100 rounded-md w-full focus:border-sky-300"
                        value={data.reason}
                      ></textarea>
                    </div>
                  }
                </>
              }

            </div>

            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
              <div className="text-lg font-semibold">สถานที่ตั้งใหม่</div>
              <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
                <div className="text-gray-500 sm:col-span-3 col-span-1">หน่วยงานที่รับโอน</div>
                <div className="sm:col-span-4 col-span-2">
                  {data?.transferDocumentNumber}
                </div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">อาคาร</div>
                <div className="sm:col-span-4 col-span-2">{data?.building}</div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">ชั้น</div>
                <div className="sm:col-span-4 col-span-2">{data?.floor}</div>
                <div className="text-gray-500 sm:col-span-3 col-span-1">ห้อง</div>
                <div className="sm:col-span-4 col-span-2">{data?.room}</div>
              </div>
            </div>

            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
              <div className="text-lg font-semibold">หมายเหตุ</div>
              <textarea
                maxLength=""
                name="note"
                disabled
                className="resize-none min-h-[7em] max-h-auto border-[1px]  border-gray-200 mt-5  bg-gray-100 rounded-md w-full focus:border-sky-300"
                value={data.note}
              />
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default ViewApprovalTransferAssetDetail;
