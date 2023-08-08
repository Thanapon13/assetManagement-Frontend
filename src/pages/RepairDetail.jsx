import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsArrowLeft, BsFillCheckCircleFill } from "react-icons/bs";
import {
  deleteRepair,
  getRepairById,
  updateStatusForCheckJob,
  updateStatusForGetJobRepair
} from "../api/repairApi";
import ModalSuccess from "../components/modal/ModalSuccess";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";

const RepairDetail = () => {
  const location = useLocation();
  const item = location.state.data;
  console.log("item:", item);
  const getData = async () => {
    const res = await getRepairById(param.repairId);
    console.log(res.data.repair);
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalCancel, setShowModalCancle] = useState(false);

  const status = {
    saveDraft: "แบบร่าง",
    waiting: "รอช่างรับงาน",
    waitingForCheck: "รอตรวจรับ",
    inProgress: "ดำเนินการ",
    reject: "ยกเลิก",
    complete: "เสร็จสิ้น"
  };
  const statusTechnician = {
    // cancelOfDetailRecord: 'ไม่รับงาน',
    reject: "ไม่อนุมัติ",
    waitTechnicianConfirm: "รอช่างรับงาน",
    waitingRecord: "รอลงบันทึก",
    inProgressOfDetailRecord: "ดำเนินการ",
    waitingApproval: "รออนุมัติ",
    completeOfDetailRecord: "เสร็จสิ้น"
  };

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
            <h1>รายละเอียดการแจ้งซ่อม</h1>
          </div>
          {/* navigate link */}
          <div className="flex pt-3">
            {/* left home */}
            <div className="flex text-xs">
              <Link
                to="/"
                className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                Home
              </Link>
              <div className="text-text-gray">/</div>
              <Link
                to="/repairIndex"
                className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                รายการแจ้งซ่อม
              </Link>
              <div className="text-text-gray">/</div>
              <div className="text-text-gray ml-2">รายละเอียดการแจ้งซ่อม</div>
            </div>
          </div>
          {/* status */}
          <div className="flex justify-end gap-5">
            {item.repairStatus === "waitApprove" ? (
              <>
                <ModalApproveDone />
                <div className="flex items-center gap-2">
                  <h1>สถานะใบแจ้งซ่อม</h1>
                  <div className="bg-purple-600 text-white text-sm py-2 px-4 rounded-2xl">
                    {"รอตรวจรับ"}
                  </div>
                </div>
              </>
            ) : (
              <>
                {!location.pathname.includes(
                  "/repairTechnicianIndex/repairTechnicianDetail/"
                ) && <ButtonCancelAndModal item={item} />}
                <div className="flex items-center gap-2">
                  <h1>สถานะใบแจ้งซ่อม</h1>
                  {/* bg-sky-200 text-blue-600 */}
                  <div
                    className={` text-sm py-2 px-4 rounded-2xl
                  ${
                    !location.pathname.includes("/repairTechnicianIndex/")
                      ? item.status == "inProgress"
                        ? "bg-yellow-300 text-yellow-700"
                        : item.status == "saveDraft"
                        ? "bg-gray-300 border-gray-300"
                        : item.status == "waiting"
                        ? "bg-text-blue/[.2] text-blue-600 "
                        : item.status === "complete"
                        ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D]"
                        : item.status === "reject"
                        ? "bg-red-200 text-red-600"
                        : ""
                      : item.statusOfDetailRecord == "reject"
                      ? "bg-red-200 text-red-600"
                      : "bg-[#38821D] bg-opacity-[15%] text-[#38821D]"
                  }`}
                  >
                    {location.pathname.includes("/repairTechnicianIndex/")
                      ? statusTechnician[item.statusOfDetailRecord] || "ยกเลิก"
                      : status[item.status]}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Component 1 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          {/* ข้อมูลครุภัณฑ์ */}
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 เลขที่ใบแจ้งซ่อม */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center ">{item.informRepairIdDoc}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div
                className={`flex justify-center items-end -mt-3 py-2 w-fit px-3.5 rounded-full
              ${
                item.urgentStatus === "ปกติ"
                  ? "bg-blue-600 text-white "
                  : item.urgentStatus === "เร่งด่วน"
                  ? "bg-[#F2994A] text-white "
                  : item.urgentStatus === "ฉุกเฉิน"
                  ? "bg-red-700 text-white "
                  : "border-0"
              }`}
              >
                {item.urgentStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center">
                {item.informRepairDate &&
                  `${new Date(item.informRepairDate).toLocaleString("th", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })} น.`}
              </div>
              <div className="text-text-gray flex items-center">
                รหัสครุภัณฑ์
              </div>
              <div className="flex items-center">{item.assetGroupNumber}</div>
            </div>
            {/* row 3 อยู่ในประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div
                className={`flex items-center ${
                  item.isInsurance ? "text-text-green" : "text-red-500"
                }`}
              >
                {item.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
              </div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center">{item.assetNumber}</div>
            </div>
            {/* row 4 เจ้าของครุภัณฑ์*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center">{item.hostSector || "-"}</div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center">{item.productName || "-"}</div>
            </div>
            {/* row 5 วันที่เริ่มรับประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center">
                {item.insuranceStartDate
                  ? `${new Date(item.insuranceStartDate).toLocaleString("th", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })} น.`
                  : "-"}
              </div>
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center">
                {item.insuranceEndDate
                  ? `${new Date(item.insuranceEndDate).toLocaleString("th", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })} น.`
                  : "-"}
              </div>
            </div>
            {/* row 6 รหัส cost center*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center">
                {item.costCenterCode || "-"}
              </div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center">{item.asset01 || "-"}</div>
            </div>
          </div>
          {/* ข้อมูลสถานที่ซ่อม */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>
            {/* row 1 ที่ตั้ง/อาคาร */}
            <div className="grid grid-cols-2  md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ที่ตั้ง/อาคาร
              </div>
              <div className="flex items-center ">{item.building || "-"}</div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center ">{item.floor || "-"}</div>
            </div>
            {/* row 2 ห้อง */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center">{item.room || "-"}</div>
            </div>
          </div>
          {/* ข้อมูลผู้เกี่ยวข้อง */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>
            {/* row 1 ผู้ส่งซ่อม */}
            <div className="grid grid-cols-2  md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ผู้ส่งซ่อม
              </div>
              <div className="flex items-center ">
                {item.name_courier || "-"}
              </div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center ">{item.phoneNumber}</div>
            </div>
            {/* row 2 ผู้ประสานงาน */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center">{item.name_recorder}</div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>
              <div className="flex items-center">
                {item.courierSector || "-"}
              </div>
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
            <div className="grid grid-cols-3 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ส่วนที่ชำรุดหรือเหตุขัดข้อง
              </div>
              <div className="flex items-center col-span-2">
                {item.problemDetail}
              </div>
            </div>
          </div>
        </div>
        {location.pathname.includes(
          "/repairTechnicianIndex/repairTechnicianDetail/"
        ) &&
          item.statusOfDetailRecord == "waitTechnicianConfirm" && (
            <div className="flex justify-between items-center gap-10 p-5 text-sm mr-">
              <button
                type="button"
                className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
              >
                ยกเลิก
              </button>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
                  onClick={() => setShowModalCancle(true)}
                >
                  ไม่รับงาน
                </button>
                {showModalCancel && (
                  <ModalCancleJob
                    item={item}
                    setShowModalCancle={setShowModalCancle}
                  />
                )}
                <button
                  id="form"
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
                  onClick={() => setShowModal(true)}
                >
                  รับงาน
                </button>

                <ModalConfirmSave
                  isVisible={showModal}
                  onClose={() => setShowModal(false)}
                  text={`คุณต้องการรับงานเลขที่ใบแจ้งซ่อม ${item?.informRepairIdDoc} นี้หรือไม่`}
                  header="ยืนยันการรับงาน"
                  confirmText="รับงาน"
                  onSave={async () => {
                    try {
                      await updateStatusForGetJobRepair(
                        item._id,
                        "waitingRecord"
                      );
                      setShowModalSuccess(true);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
                {showModalSuccess && (
                  <ModalSuccess urlPath="/repairTechnicianIndex" />
                )}
              </div>
            </div>
          )}

        {item.repairStatus === "waitApprove" ? (
          <>
            <TableRepairCost data={item.repairCostList} />
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

const TableRepairCost = props => {
  //   waitTechnicianConfirm , inProgress , draftRepair, waitApprove, done , cancel
  return (
    <>
      {/* table */}
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar border-[1px]">
        <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            {/* header table */}
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

  const callback = payload => {
    setAllReject(payload);
  };
  return (
    <>
      <button
        className=" px-6 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ตรวจรับ
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-3/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* ตรวจรับครุภัณฑ์สำเร็จ */}
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
      ) : null}
    </>
  );
};

const ButtonCancelAndModal = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setreason] = useState("");
  const [error, setError] = useState(false);

  async function onConfirm(id) {
    try {
      await deleteRepair(id, { reason: reason });
      window.location.href = "/repairIndex";
    } catch (error) {}
  }
  return (
    <>
      <button
        className="px-6 py-2 bg-red-500 hover:bg-red-600  text-white rounded-md"
        onClick={() => setShowModal(true)}
      >
        ยกเลิก
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                <div>
                  <div className="flex justify-center items-center gap-5 p-5 ">
                    <svg
                      width="84"
                      height="84"
                      viewBox="0 0 84 84"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.0001 0.333984C39.9167 0.333984 37.8334 1.12565 36.1251 2.79232L2.79175 36.1256C-0.499919 39.3756 -0.499919 44.6256 2.79175 47.8756L36.1251 81.209C39.3751 84.5006 44.6251 84.5006 47.8751 81.209L81.2084 47.8756C84.5001 44.6256 84.5001 39.3756 81.2084 36.1256L47.8751 2.79232C46.1667 1.12565 44.0834 0.333984 42.0001 0.333984ZM37.8334 21.1673H46.1667V46.1673H37.8334V21.1673ZM37.8334 54.5006H46.1667V62.834H37.8334V54.5006Z"
                        fill="#EB5757"
                      />
                    </svg>
                    <h1 className="text-2xl text-red-700">ยกเลิกการแจ้งซ่อม</h1>
                  </div>

                  <div className="p-6 text-base">
                    <div className="grid grid-cols-2  md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center ">
                        เลขที่ใบแจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {item?.informRepairIdDoc}
                      </div>
                      <div className="text-text-gray flex items-center ">
                        เวลาที่แจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {item?.informRepairDate &&
                          `${new Date(item?.informRepairDate).toLocaleString(
                            "th",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false
                            }
                          )} น.`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        ชื่อครุภัณฑ์
                      </div>
                      <div className="flex items-center">
                        {item?.productName}
                      </div>
                      <div className="text-text-gray flex items-center">
                        เลขครุภัณฑ์
                      </div>
                      <div className="flex items-center">
                        {item?.assetNumber}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        รายละเอียด
                      </div>
                      <div className="flex items-center">
                        {item?.problemDetail}
                      </div>
                      <div className="text-text-gray flex items-center">
                        หน่วยงาน
                      </div>
                      <div className="flex items-center">
                        {item?.courierSector}
                      </div>
                    </div>
                    {item.status != "saveDraft" && (
                      <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                        <div className="text-text-gray flex items-center">
                          สาเหตุที่ยกเลิก
                        </div>
                        <textarea
                          className={`${
                            error && !reason && "border-red-500"
                          } col-span-3 border-[1px] p-2 min-h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-3 text-white bg-gray-400/[.8] hover:bg-gray-400 bg-[#999999] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-10 py-3 border rounded-md "
                    onClick={() => {
                      item.status == "saveDraft"
                        ? onConfirm(item._id)
                        : reason
                        ? onConfirm(item._id)
                        : setError(true);
                    }}
                  >
                    ยืนยันยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const ModalCancleJob = ({ item, setShowModalCancle }) => {
  const [reason, setreason] = useState("");
  const [error, setError] = useState(false);

  async function onConfirm(id) {
    try {
      await updateStatusForCheckJob(id, { reason: reason });
      window.location.href = "/repairIndex";
    } catch (error) {}
  }
  return (
    <>
      <div className="fixed inset-0 -left-10 bg-black opacity-50" />
      <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
        <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
          <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
            <div>
              <div className="flex items-center ml-8 pt-5 text-lg">
                ระบุสาเหตุไม่รับงาน
              </div>

              <div className="p-6 text-base flex justify-center">
                <textarea
                  className={`${
                    error && !reason && "border-red-500"
                  } w-11/12 border-[1px] p-2 min-h-[38px] h-[7rem] text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="flex items-center gap-5 justify-end p-6 pt-2 rounded-b">
              <button
                className="px-10 py-3 text-white bg-gray-400/[.8] hover:bg-gray-400 bg-[#999999] shadow-sm rounded-md "
                type="button"
                onClick={() => setShowModalCancle(false)}
              >
                ย้อนกลับ
              </button>
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-10 py-3 border rounded-md "
                onClick={() => {
                  item.status == "saveDraft"
                    ? onConfirm(item._id)
                    : reason
                    ? onConfirm(item._id)
                    : setError(true);
                }}
              >
                ยืนยันยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepairDetail;
