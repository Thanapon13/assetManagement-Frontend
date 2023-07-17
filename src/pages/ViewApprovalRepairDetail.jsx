import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DropdownModalBorrowApprove from "../components/dropdown/DropdownModalBorrowApprove";
import RowofTableViewApprovalTransferDetail from "../components/table/RowofTableViewApprovalTransferDetail";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { BsArrowLeft, BsFillCheckCircleFill } from "react-icons/bs";
import { Spinner } from "flowbite-react/lib/esm";
import { getTransferApproveDetailById } from "../api/transferApi";
import { getRepairById } from "../api/repairApi";

const ViewApprovalRepairDetail = () => {
  let { id } = useParams();
  const printRef = useRef();

  const [showAll, setShowAll] = useState(false);
  const [item, setItem] = useState({});
  const [approveArray, setApproveArray] = useState()
  const [rejectArray, setRejectArray] = useState()
  const [error, setError] = useState()
  const [reason, setReason] = useState()

  useEffect(() => {
    const fetchList = async () => {
      const res = await getRepairById(id)
      setItem(res.data.repair)
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
      <div className="bg-background-page pt-5 p-3">

        <div>

          <div className="text-2xl text-text-green flex items-center ">
            <Link
              to={-1}
              className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
            >
              <BsArrowLeft className="text-lg" />
            </Link>
            <h1>อนุมัติซ่อม</h1>
          </div>

          <div className="flex pt-3">
            <div className="flex text-xs">
              <Link
                to="/"
                className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                Home
              </Link>
              <div className="text-text-gray">/</div>
              <Link
                to="/approvalRepair"
                className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                อนุมัติซ่อม
              </Link>
              <div className="text-text-gray">/</div>
              <div className="text-text-gray ml-2">รายละเอียดการอนุมัติซ่อม</div>
            </div>
          </div>

          <div className="flex justify-end gap-5">

          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center ">{item.informRepairIdDoc}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div className={`flex justify-center items-end md:-mt-3 py-2 w-fit px-3.5 rounded-full
              ${item.urgentStatus === 'ปกติ'
                  ? 'bg-blue-600 text-white '
                  : item.urgentStatus === 'เร่งด่วน'
                    ? 'bg-[#F2994A] text-white '
                    : item.urgentStatus === 'ฉุกเฉิน'
                      ? 'bg-red-700 text-white '
                      : 'border-0'}`}>
                {item.urgentStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center">
                {item.informRepairDate && `${new Date(item.informRepairDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`}
              </div>
              <div className="text-text-gray flex items-center">
                รหัสครุภัณฑ์
              </div>
              <div className="flex items-center">{item.assetGroupNumber}</div>
            </div>
            {/* row 3 อยู่ในประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div className={`flex items-center ${item.isInsurance ? "text-text-green" : "text-red-500"}`}>
                {item.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
              </div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center">{item.assetNumber}</div>
            </div>
            {/* row 4 เจ้าของครุภัณฑ์*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center">{item.hostSector || '-'}</div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center">
                {item.productName || '-'}
              </div>
            </div>
            {/* row 5 วันที่เริ่มรับประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center">{(item.insuranceStartDate)
                ? `${new Date(item.insuranceStartDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`
                : '-'}</div>
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center">{item.insuranceEndDate ? `${new Date(item.insuranceEndDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`
                : '-'}</div>
            </div>
            {/* row 6 รหัส cost center*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center">{item.costCenterCode || '-'}</div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center">{item.asset01 || '-'}</div>
            </div>
          </div>
          {/* ข้อมูลสถานที่ซ่อม */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>
            {/* row 1 ที่ตั้ง/อาคาร */}
            <div className="grid grid-cols-2  md:grid-cols-5 p-2 gap-y-2 max-md:pb-0">
              <div className="text-text-gray flex items-center ">
                ที่ตั้ง/อาคาร
              </div>
              <div className="flex items-center ">{item.building || '-'}</div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center ">{item.floor || '-'}</div>
            </div>
            {/* row 2 ห้อง */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center">{item.room || '-'}</div>
            </div>
          </div>
          {/* ข้อมูลผู้เกี่ยวข้อง */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>
            {/* row 1 ผู้ส่งซ่อม */}
            <div className="grid grid-cols-2  md:grid-cols-5 p-2 gap-y-2">
              <div className="text-text-gray flex items-center ">
                ผู้ส่งซ่อม
              </div>
              <div className="flex items-center ">{item.name_courier || '-'}</div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center ">{item.phoneNumber}</div>
            </div>
            {/* row 2 ผู้ประสานงาน */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2 gap-y-2">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center">
                {item.name_recorder}
              </div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>
              <div className="flex items-center">{item.courierSector || '-'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">รายละเอียดการซ่อม</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ประเภทการซ่อม
              </div>
              <div className="flex items-center ">{item.typeOfRepair}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                หน่วยงานซ่อม
              </div>
              <div className="flex items-center">{item.repairSector}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ส่วนที่ชำรุดหรือเหตุขัดข้อง
              </div>
              <div className="flex items-center md:col-span-2">
                {item.problemDetail}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>

          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">หมายเหตุ</div>
            <div className="p-2 py-3 flex justify-center">
              <textarea className={`${error && !reason && "border-red-500"} disabled:bg-gray-100 w-full border-[1px] p-2 min-h-[38px] h-[7rem] text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none focus:border-focus-blue`}
              disabled={item.statusOfDetailRecord != "waitingApproval"}/>
            </div>
          </div>
        </div>

        {item.statusOfDetailRecord == "waitingApproval" &&
          <div className="flex justify-between items-center gap-10 p-5 text-sm mr-">
             <button
        className="p-2 w-[115px] text-center border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-500/[.15]"
        type="button"
        // onClick={() => setShowModal(true)}
      >
        ไม่อนุมัติ
      </button>

      <button
        className="bg-text-green px-10 hover:bg-green-800 text-white text-sm rounded-md p-2"
        type="button"
        // onClick={() => setShowModal(true)}
      >
        อนุมัติ
      </button>
          </div>
        }

        {item.repairStatus === "waitApprove" ? (
          <>
            <TableRepairCost data={item.costOfRepairArray} />
            {/* ผลการซ่อม */}
            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
              {/* รายละเอียดการซ่อม */}
              <div>
                <div className="text-xl">ผลการซ่อม</div>
                {/* row 1 ผลการซ่อม */}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                  <div className="text-text-gray flex items-center ">
                    ผลการซ่อม
                  </div>
                  <div className="flex items-center ">
                    {"เปลี่ยนสายไฟเรียบร้อย"}
                  </div>
                </div>
                {/* row 2 ความเห็นช่าง*/}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                  <div className="text-text-gray flex items-center">
                    ความเห็นช่าง
                  </div>
                  <div className="flex items-center">
                    {"ระวังหนูกัดสายไฟซ้ำ"}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* footer */}
      {item.repairStatus === "waitApprove" ? (
        <>
          {/* footer */}
          <div className="flex justify-between p-3 border-t-[1px] bg-white">
            <div className="text-text-gray text-sm flex items-center">
              ยกเลิก
            </div>
            <button className="px-4 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600">
              ตรวจรับ
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

const TableRepairCost = (props) => {
  return (
    <>
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar border-[1px]">
        <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            <div className="grid grid-cols-8 gap-2 h-12 items-center text-center">
              <div className="col-span-1">ลำดับ</div>
              <div className="col-span-3">รายการ</div>
              <div className="col-span-1">จำนวน</div>
              <div className="col-span-1">หน่วย</div>
              <div className="col-span-1">ราคา / หน่วย (บาท)</div>
              <div className="col-span-1">รวมทั้งหมด(บาท)</div>
            </div>
          </div>
          {props?.data?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`grid grid-cols-8 gap-2 h-12 pt-2 text-xs text-center items-center bg-white`}
              >
                <div className="col-span-1  text-center flex justify-center items-center ">
                  <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                    {idx + 1}
                  </div>
                </div>
                <div className="col-span-3 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                  {item.list}
                </div>
                <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                  {item.quannity}
                </div>
                <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md ">
                  {item.unit}
                </div>
                <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                  {item.pricePerUnit}
                </div>
                <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md ">
                  {item.totalPrice}
                </div>
              </div>
            );
          })}
          <div className="bg-table-data h-[40px] p-6 flex justify-between items-center mt-10">
            <div className="text-sm  font-semibold">รวมจำนวนเงินทั้งหมด</div>
            <div className="text-sm font-semibold">{"11300.00"} บาท</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModalApproveDone = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className=" px-6 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ตรวจรับ
      </button>
      {showModal &&
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-3/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                <div className="flex flex-col justify-center items-center gap-5 p-5 ">
                  <BsFillCheckCircleFill className="text-text-green w-[150px] h-[150px]" />
                  <h1 className="text-2xl text-text-green">
                    ตรวจรับครุภัณฑ์สำเร็จ
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default ViewApprovalRepairDetail;
