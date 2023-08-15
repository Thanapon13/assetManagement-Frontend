import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft, HiChevronRight, HiTrash } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import DateInput from "../components/date/DateInput";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import {
  getBorrowHistorySector,
  getBySearchBorrowHistory
} from "../api/borrowApi";
import BorrowHistorySectorSelector from "../components/selector/BorrowHistorySectorSelector";
import { getRepairById, updateOutsourceRecord } from "../api/repairApi";
import { BsArrowLeft, BsFillEyeFill } from "react-icons/bs";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";

const RepairOutsource = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  console.log("data:", data);

  const [showModalSuccess, setShowModalSuccess] = useState();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const handleChange = e => {
    const updatedData = { ...data, statusOutsourceRepair: e.target.value };
    setData(updatedData);
  };

  const fetchDataList = async () => {
    try {
      const res = await getRepairById(id);
      console.log(res.data, id);
      setData(res.data.repair);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const submit = async valStatus => {
    try {
      const formData = new FormData();
      formData.append("input", JSON.stringify(data));
      formData.append("status", valStatus || data.statusOfDetailRecord);
      formData.append("costOfRepairArray", JSON.stringify(""));
      formData.append("existArrayDocument", JSON.stringify([]));

      await updateOutsourceRecord(id, formData);

      await setShowModalConfirm(true);
      window.location.reload();
      await setShowModalSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-background-page py-5 p-3 min-h-full">
      <div className="flex items-center mr-10">
        <Link
          to="/repairOutsourceIndex"
          className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
        >
          <BsArrowLeft className="text-lg" />
        </Link>
        <div className="text-2xl text-text-green ">
          รายละเอียดการจ้างซ่อมภายนอก
        </div>
      </div>

      <div className="flex pt-3 justify-between">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <Link
            to="/repairOutsourceIndex"
            className="text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
          >
            ตรวจสอบการจ้างซ่อมภายนอก
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">รายละเอียดประวัติการซ่อม</div>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-xs">สถานะใบแจ้งซ่อมแซม</h1>
          <div
            className={`flex items-center justify-center ${
              data.statusOutsourceRepair === "gotRepair"
                ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-sm p-2 rounded-2xl"
                : data.statusOutsourceRepair === "waitingForMaterial"
                ? "bg-[#F2994A] bg-opacity-[15%] text-[#F2994A] text-sm p-2 rounded-2xl"
                : data.statusOutsourceRepair === "inProgress"
                ? "bg-yellow-300 text-yellow-700 text-sm p-2 rounded-2xl"
                : data.statusOutsourceRepair === "complete"
                ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-sm p-2 rounded-2xl"
                : ""
            }`}
          >
            {data.statusOutsourceRepair === "gotRepair"
              ? "รับใบซ่อม"
              : data.statusOutsourceRepair === "waitingForMaterial"
              ? " รอเบิกวัสดุ"
              : data.statusOutsourceRepair === "inProgress"
              ? " กำลังดำเนินการซ่อม"
              : data.statusOutsourceRepair === "complete"
              ? " เสร็จสิ้น"
              : ""}
          </div>
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
        <div>
          <div className="text-xl">ข้อมูลครุภัณฑ์</div>
          {/* row 1 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่ใบแจ้งซ่อม
            </div>
            <div className="flex items-center col-span-2">
              {data.informRepairIdDoc}
            </div>
            <div className="text-text-gray flex items-center ">
              สถานะความเร่งด่วน
            </div>
            <div
              className={`rounded-full text-white  ${
                data.urgentStatus === "ฉุกเฉิน"
                  ? "bg-red-600 "
                  : data.urgentStatus === "เร่งด่วน"
                  ? "bg-yellow-300"
                  : data.urgentStatus === "ปกติ"
                  ? " bg-blue-600"
                  : "bg-red-200 text-red-600  border-red-200"
              } border border-spacing-5 p-2 w-fit`}
            >
              {data.urgentStatus}
            </div>
          </div>
          {/* row 2 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่แจ้งซ่อม
            </div>
            <div className="flex items-center col-span-2">
              {data.informRepairDate &&
                `${new Date(data.informRepairDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`}
            </div>
            <div className="text-text-gray flex items-center">รหัสครุภัณฑ์</div>
            <div className="flex items-center col-span-2">
              {data.assetGroupNumber}
            </div>
          </div>
          {/* row 3 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">อยู่ในประกัน</div>
            <div
              className={`flex items-center col-span-2 ${
                data.isInsurance ? "text-text-green" : "text-red-500"
              }`}
            >
              {data.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
            </div>
            <div className="text-text-gray flex items-center">เลขครุภัณฑ์</div>
            <div className="flex items-center col-span-2">
              {data.assetNumber}
            </div>
          </div>
          {/* row 4 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              วันที่เริ่มรับประกัน
            </div>
            <div className="flex items-center col-span-2">
              {data.insuranceStartDate
                ? `${new Date(data.insuranceStartDate).toLocaleString("th", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })} น.`
                : "-"}
            </div>

            <div className="text-text-gray flex items-center">ชื่อครุภัณฑ์</div>
            <div className="flex items-center col-span-2">
              {data.productName}
            </div>
          </div>

          {/* row 6 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              วันที่สิ้นสุดการรับประกัน
            </div>
            <div className="flex items-center col-span-2">
              {data.insuranceEndDate
                ? `${new Date(data.insuranceEndDate).toLocaleString("th", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })} น.`
                : "-"}
            </div>
            <div className="text-text-gray flex items-center">ยกเลิกใบซ่อม</div>
            <div className="flex items-center col-span-2">
              {data.hostSector || "-"}
            </div>
          </div>
          {/* row 7 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              รหัส cost center
            </div>
            <div className="flex items-center col-span-2">
              {data.costCenterCode || "-"}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>

          <div className="grid grid-cols-2  md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              ที่ตั้ง/อาคาร
            </div>
            <div className="flex items-center col-span-2">{data.building}</div>
            <div className="text-text-gray flex items-center ">ชั้น</div>
            <div className="flex items-center col-span-2 ">{data.floor}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">ห้อง</div>
            <div className="flex items-center col-span-2">{data.room}</div>
          </div>
        </div>

        <div className="pt-5">
          <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>

          <div className="grid grid-cols-2  md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">ผู้ส่งซ่อม</div>
            <div className="flex items-center col-span-2 ">
              {data.name_courier}
            </div>
            <div className="text-text-gray flex items-center ">
              เบอร์โทรศัพท์
            </div>
            <div className="flex items-center col-span-2 ">
              {data.phoneNumber}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">ผู้ประสานงาน</div>
            <div className="flex items-center col-span-2">
              {data.name_recorder}
            </div>
            <div className="text-text-gray flex items-center">หน่วยงาน</div>
            <div className="flex items-center col-span-2">
              {data.courierSector}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
        <div>
          <div className="text-xl">วันที่-เวลาซ่อม</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              วันที่-เวลาจ่ายงานช่าง
            </div>
            <div className="flex items-center  col-span-2">
              {data.assignDate &&
                `${new Date(data.assignDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} `}
            </div>
            <div className="text-text-gray flex items-center ">
              วันที่-เวลาถึงสถานที่ซ่อม
            </div>
            <div className="flex h-full col-span-2">
              {data.arriveAtPlaceDate &&
                `${new Date(data.arriveAtPlaceDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} `}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              วันที่-เวลาทำการซ่อม
            </div>
            <div className="flex col-span-2">
              {data.workDate &&
                `${new Date(data.workDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} `}
            </div>

            <div className="text-text-gray flex items-center ">
              วันที่-เวลาซ่อมเสร็จ
            </div>
            <div className="flex col-span-2">
              {data.repairedDate &&
                `${new Date(data.repairedDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} `}
            </div>
          </div>
          <div className="text-xl mt-3">ผลการซ่อม</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">ผลการซ่อม</div>
            <div className="flex items-center col-span-2 ">
              <h1>{data.repairResult}</h1>
            </div>

            <div className="text-text-gray flex items-center ">
              สถานะใบซ่อมแซม
            </div>
            <select
              className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
              name="statusOutsourceRepairTextSearch"
              value={data.statusOutsourceRepair}
              onChange={handleChange}
            >
              <option value="gotRepair">รับใบซ่อม</option>
              <option value="waitingForMaterial">รอเบิกวัสดุ</option>
              <option value="inProgress">กำลังดำเนินการซ่อม</option>
              <option value="complete">เสร็จสิ้น</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              ความเห็นช่าง
            </div>
            <div className="flex items-center col-span-2 ">
              <h1>{data.mechinicComment}</h1>
            </div>
          </div>{" "}
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
        <div className="text-lg">เปิดใบจ้างซ่อมภายนอก (ซ่อมทั่วไป)</div>
        <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่ใบจ้างภายนอก
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.outSourceRepairNumber}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่อ้างอิงหน่วยช่าง
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.repairSectorRefNumber}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่ทำการซ่อม
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.repairDateCreateOutsourceRepair &&
              `${new Date(data.repairDateCreateOutsourceRepair).toLocaleString(
                "th",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                }
              )} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ชื่อเรื่อง
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.descriptionCreateOutsourceRepair}
          </div>
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
        <div className="text-lg">ผู้รับผิดชอบ</div>
        <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่ใบจ้างภายนอก
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.outSourceRepairNumber}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ชื่อผู้รับผิดชอบ
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.responsibleName}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่ได้รับการอนุมัติ
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.approveDate &&
              `${new Date(data.approveDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่หนังสือ
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.bookNumber}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่อนุมัติ (ฝ่ายช่างส่งพัสดุ)
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.approveDateOfDelivery &&
              `${new Date(data.approveDateOfDelivery).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่คาดว่าจะส่งมอบ
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.deliverDate &&
              `${new Date(data.deliverDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ชื่อผู้ว่าจ้าง
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.responsibleName}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">ที่อยู่</div>
          <div className="sm:col-span-4 col-span-2">
            {data?.responsibleAddress}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            หมายเลขโทรศัพท์
          </div>
          <div className="sm:col-span-4 col-span-2">
            {" "}
            {data?.phoneNumber
              ? `${data.phoneNumber.slice(0, 3)}-${data.phoneNumber.slice(3)}`
              : ""}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">ราคาจ้าง</div>
          <div className="sm:col-span-4 col-span-2">{data?.price}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ชื่อผู้ติดต่อ
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.contactName}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ภาษีมูลค่าเพิ่ม
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.tax}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">หมายเหตุ</div>
          <div className="sm:col-span-4 col-span-2">
            {data?.responsibleRemark}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">ราคารวม</div>
          <div className="sm:col-span-4 col-span-2">{data?.totalPrice}</div>
        </div>

        <div className="text-lg pt-5">เอกสารใบสั่งซื้อ / สั่งจอง</div>
        {/* <h1>{data?.documentArray[0]?.document}</h1> */}
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
        <div className="text-lg">ค่าใช้จ่ายในการซ่อม</div>

        <div className="overflow-x-auto scrollbar pt-4">
          <div className="w-[1000px] lg:w-full p-2">
            <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
              <div className="grid grid-cols-8 gap-2 text-center">
                <div className="ml-2 col-span-1 ">ลำดับ</div>
                <div className="col-span-3">รายการ</div>
                <div className="col-span-1">จำนวน</div>
                <div className="col-span-1">หน่วย</div>
                <div className="col-span-1">ราคา/หน่วย (บาท)</div>
                <div className="col-span-1 pr-2">รวมทั้งหมด (บาท)</div>
              </div>
            </div>
            <div className="scrollbar max-h-[45vh] overflow-y-auto">
              {data.costOfRepairArray?.map((ele, idx) => {
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
                      {ele.stuffName}
                    </div>
                    <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                      {ele.quantity}
                    </div>
                    <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md ">
                      {ele.unit}
                    </div>
                    <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                      {ele.pricePerPiece}
                    </div>
                    <div className="col-span-1 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md ">
                      {ele.quantity * ele.pricePerPiece || 0}
                    </div>
                  </div>
                );
              })}

              {data.costOfRepairArray?.length > 0 && (
                <div className="bg-table-data h-[40px] p-6 flex justify-between items-center mt-10">
                  <div className="text-sm  font-semibold">
                    รวมจำนวนเงินทั้งหมด
                  </div>
                  <div className="text-sm font-semibold">
                    {data.costOfRepairArray.reduce(
                      (sum, ele) => sum + ele.quantity * ele.pricePerPiece,
                      0
                    )}
                    &nbsp; บาท
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
        <div className="text-lg">ข้อมูลการตรวจรับงาน</div>
        <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่ใบตรวจรับงาน
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.checkJobReceiptNumber}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ยกเลิกใบตรวจรับ
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.status}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่อนุมัติจ้าง / ซ่อม
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.approveHireDate &&
              `${new Date(data.approveHireDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่ตรวจรับ
          </div>
          <div className="sm:col-span-4 col-span-2">
            {" "}
            {data.checkJobDate &&
              `${new Date(data.checkJobDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            เลขที่ใบสั่งจ้าง
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.hireNumber}</div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่วางฏีกา (วันส่งเบิกเงิน)
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.sendWithDrawMoneyDate &&
              `${new Date(data.sendWithDrawMoneyDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่รับใบสั่งจ้าง
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.receiveWorkOrderDate &&
              `${new Date(data.receiveWorkOrderDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            วันที่หมดประกัน
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data.checkJobInsuranceEndDate &&
              `${new Date(data.checkJobInsuranceEndDate).toLocaleString("th", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })} `}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            ระยะเวลารับประกัน ( เดือน)
          </div>
          <div className="sm:col-span-4 col-span-2">
            {data?.checkJobWarrantyPeriod}
          </div>
          <div className="text-gray-500 sm:col-span-3 col-span-1">
            จำนวนเงินซื้อ / จ้าง (บาท)
          </div>
          <div className="sm:col-span-4 col-span-2">{data?.purchaseAmount}</div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-">
        <Link to="/repairOutsourceIndex">
          <button
            type="button"
            className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
          >
            ยกเลิก
          </button>
        </Link>
        <div className="flex justify-end gap-4">
          <button
            className="border-text-green text-text-green hover:bg-green-100 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-sm rounded-md py-2 px-4"
            onClick={() => submit()}
          >
            บันทึก
          </button>

          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={() => submit("waitingApproval")}
          />

          {showModalSuccess && <ModalSuccess urlPath="/repairOutsourceIndex" />}
        </div>
      </div>
    </div>
  );
};

export default RepairOutsource;
