import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import Selector from "../components/selector/Selector";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import { BsArrowLeft } from "react-icons/bs";
import ModalSuccess from "../components/modal/ModalSuccess";
import { updateRecordRepairDetail } from "../api/repairApi";
import OnlyDateInput from "../components/date/onlyDateInput";
import DateInput from "../components/date/DateInput";

const RepairTechnicianJobDetail = () => {
  const location = useLocation();
  // const item = location.state?.data
  const [item, setItem] = useState({
    ...location.state?.data,
    arriveAtPlaceDate: new Date(),
    workDate: new Date(),
    repairDate: new Date()
  });
  const [error, setError] = useState(false);
  console.log(item);

  const [countRow, setCountRow] = useState(1);
  const [countRow1, setCountRow1] = useState(1);
  const [countIndexArray, setCountIndexArray] = useState([0]);
  const defaultTech = {
    name: "",
    workPerHour: "",
    ratePerHour: "",
    totalEarn: "",
    amountExtra: ""
  };
  const [arrayTechnician, setArrayTechnician] = useState(
    item.informRepairManArray || [defaultTech]
  );
  const [arrayCostRepair, setArrayCostRepair] = useState(
    item.costOfRepairArray || [
      {
        // index: 0,
        stuffName: "",
        quantity: "",
        unit: "",
        pricePerUnit: ""
      }
    ]
  );
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  //handle bottom table
  const handleClickIncrease = e => {
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...arrayTechnician];
    setArrayTechnician([...clone, defaultTech]);
  };
  const handleClickIncreaseCost = e => {
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...arrayCostRepair];
    const newCloneArray = {
      // index: countRow,
      stuffName: "",
      quantity: "",
      unit: "",
      pricePerUnit: ""
    };
    setArrayCostRepair([...clone, newCloneArray]);
  };

  const deleteRow = index => {
    if (countRow > 0) {
      setCountRow(countRow - 1);
    }

    let clone = [...arrayTechnician];
    clone.splice(index, 1);
    setArrayTechnician(clone);
  };
  const deleteRowCost = index => {
    if (countRow1 > 0) {
      setCountRow(countRow1 - 1);
    }

    let clone = [...arrayCostRepair];
    clone.splice(index, 1);
    setArrayCostRepair(clone);
  };

  const [showModal, setShowModal] = useState();
  const [showModalSuccess, setShowModalSuccess] = useState();
  const { id } = useParams();
  async function submit(valStatus) {
    console.log(item, valStatus || item.statusOfDetailRecord, id);
    // return
    try {
      await updateRecordRepairDetail(id, {
        input: item,
        status: valStatus || item.statusOfDetailRecord,
        informRepairManArray: arrayTechnician,
        costOfRepairArray: arrayCostRepair
      });
      if (!valStatus) {
        console.log(
          valStatus,
          arrayTechnician,
          item.statusOfDetailRecord,
          arrayCostRepair
        );
        return;
      }
      setShowModalSuccess(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = () => {
    let err, errTable;
    if (!item.repairMan) err = true;
    if (!arrayTechnician.length) {
      setArrayTechnician([defaultTech]);
      errTable = true;
    }
    arrayTechnician?.map(ele => {
      if (!ele.name || !ele.totalEarn.length) errTable = true;
    });
    setError(err);
    setErrorTable(errTable);
    console.log(err, errTable, arrayTechnician);
    if (!(err || errTable)) setShowModal(true);
  };

  useEffect(() => {
    let total = 0;
    arrayCostRepair?.map(cost => {
      total += cost.total;
    });
    arrayTechnician?.map(tech => {
      total += +tech.totalEarn;
    });
    setItem({ ...item, totalPrice: total });
  }, [arrayTechnician, arrayCostRepair]);
  console.log(item.totalPrice);

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        <div>
          <div className="text-xl text-text-green flex items-center">
            <Link
              to={`/repairTechnicianIndex`}
              className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
            >
              <BsArrowLeft className="text-lg" />
            </Link>
            <h1>ลงบันทึกรายละเอียดการซ่อม</h1>
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
                to="/repairTechnicianIndex"
                className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                รายการรอลงรายละเอียดแจ้งซ่อม
              </Link>
              <div className="text-text-gray">/</div>
              <div className="text-text-gray ml-2">
                ลงบันทึกรายละเอียดการซ่อม
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5 mr-5">
            <div className="flex items-center gap-2">
              <h1>สถานะใบแจ้งซ่อม</h1>
              <div
                className={`text-sm p-2 rounded-full px-3 
              ${
                item.statusOfDetailRecord == "inProgressOfDetailRecord"
                  ? "bg-purple-600  text-white"
                  : item.statusOfDetailRecord == "waitingApproval"
                  ? "bg-yellow-300"
                  : ""
              }`}
              >
                {item.statusOfDetailRecord == "inProgressOfDetailRecord"
                  ? "ดำเนินการ"
                  : item.statusOfDetailRecord == "waitingApproval"
                  ? "รออนุมัติ"
                  : ""}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center col-span-2">
                {item.informRepairIdDoc}
              </div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div
                className={`flex justify-center items-end md:-mt-3 py-2 w-fit px-3.5 rounded-full col-span-2 h-fit
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
            {/* row 2 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center col-span-2">
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
              <div className="flex items-center col-span-2">
                {item.assetGroupNumber}
              </div>
            </div>
            {/* row 3 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div
                className={`flex items-center col-span-2 ${
                  item.isInsurance ? "text-text-green" : "text-red-500"
                }`}
              >
                {item.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
              </div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">
                {item.assetNumber}
              </div>
            </div>
            {/* row 4 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">
                {item.hostSector || "-"}
              </div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">
                {item.productName || "-"}
              </div>
            </div>
            {/* row 5 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center col-span-2">
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
              <div className="flex items-center col-span-2">
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
            {/* row 6 */}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center col-span-2">
                {item.costCenterCode || "-"}
              </div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center col-span-2">
                {item.asset01 || "-"}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center ">
                ที่ตั้ง/อาคาร
              </div>
              <div className="flex items-center col-span-2">
                {item.building}
              </div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center col-span-2 ">{item.floor}</div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center col-span-2">{item.room}</div>
            </div>
          </div>

          <div className="pt-5">
            <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center ">
                ผู้ส่งซ่อม
              </div>
              <div className="flex items-center col-span-2 ">
                {item.name_courier}
              </div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center col-span-2 ">
                {item.phoneNumber}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center col-span-2">
                {item.name_recorder}
              </div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>
              <div className="flex items-center col-span-2">
                {item.courierSector}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">วันที่-เวลาซ่อม</div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาจ่ายงานช่าง
              </div>
              <div className="flex items-center col-span-2">
                {item.assignDate &&
                  `${new Date(item.assignDate).toLocaleString("th", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })} น.`}
              </div>
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาถึงสถานที่ซ่อม
              </div>
              {item.arriveAtPlaceDate &&
                `${new Date(item.arriveAtPlaceDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-6 p-2 max-md:pb-0">
            <div className="text-text-gray flex items-center">
              วันที่-เวลาทำการซ่อม
            </div>
            <div className="flex mr-2 col-span-2">
              {item.workDate &&
                `${new Date(item.workDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`}
            </div>
            <div className="text-text-gray flex items-center ">
              วันที่-เวลาซ่อมเสร็จ
            </div>
            <div className="flex mr-2 h-full col-span-2">
              {item.repairDate &&
                `${new Date(item.repairDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`}
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 grid">
          <div className="text-xl">ข้อมูลรายชื่อช่าง</div>

          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-8 gap-2 text-center">
                  <div className="col-span-2">ชื่อช่าง</div>
                  <div className="col-span-1">จำนวนชั่วโมงที่ทำ</div>
                  <div className="col-span-1">อัตราต่อชั่วโมง</div>
                  <div className="col-span-1">รวมเป็นเงิน</div>
                  <div className="col-span-1">เงินพิเศษ</div>
                  <div className="col-span-1">รวมทั้งหมด (บาท)</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              {/* {arrayTechnician?.map((ele, idx) => {
                return (
                  <TableTechnicianRecord
                    key={idx}
                    ele={ele}
                    errorTable={errorTable}
                  />
                )
              })} */}
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 grid">
          <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>

          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-9 gap-2 text-center">
                  <div className="col-span-1">ลำดับ</div>
                  <div className="col-span-3">รายการ</div>
                  <div className="col-span-1">จำนวน</div>
                  <div className="col-span-1">หน่วย</div>
                  <div className="col-span-1">ราคา/หน่วย (บาท)</div>
                  <div className="col-span-1">รวมทั้งหมด (บาท)</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              {/* {arrayCostRepair?.map((ele, idx) => {
                return (
                  <TableTechnicianRepairCost
                    key={idx}
                    ele={ele}
                  />
                )
              })} */}

              <div className="p-4 rounded-md bg-background-gray-table mt-2 flex justify-between">
                <h1>รวมจำนวนเงินทั้งหมด</h1>
                <div>{item?.totalPrice || ""} บาท</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 grid">
          <div className="text-xl">ผลการซ่อม</div>

          <div className="grid grid-cols-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">ผลการซ่อม</div>
            <div className="flex items-center md:col-span-5 md:w-11/12">
              <input
                type="text"
                className={`${
                  error && !ele.name && "border-red-500"
                } py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                name="name"
                // onChange={onChange}
                // value={ele.name}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">ความเห็นช่าง</div>
            <div className="flex items-center md:col-span-5 md:w-11/12">
              <input
                type="text"
                className={`${
                  error && !ele.name && "border-red-500"
                } py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                name="name"
                // onChange={onChange}
                // value={ele.name}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>

        <button
          id="form"
          type="submit"
          className="bg-text-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
          onClick={() => handleSubmit(true)}
        >
          ปิดงาน
        </button>

        <ModalConfirmSave
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => submit("waitingApproval")}
        />
        {showModalSuccess && <ModalSuccess urlPath="/repairTechnicianIndex" />}
      </div>
    </>
  );
};

const TableTechnicianRecord = ({
  index,
  deleteRow,
  ele,
  arrayTechnician,
  onChange,
  errorTable
}) => {
  return (
    <div className="p-2 grid grid-cols-8 justify-center items-center gap-5 text-xs bg-white">
      <div className="col-span-2">
        <input
          type="text"
          className={`${
            errorTable && !ele.name && "border-red-500"
          } py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
          name="name"
          onChange={onChange}
          value={ele.name}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className={`${
            errorTable && !ele.totalEarn && "border-red-500"
          } text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
          name="workPerHour"
          onChange={onChange}
          value={ele.workPerHour}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className={`${
            errorTable && !ele.totalEarn && "border-red-500"
          } text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
          name="ratePerHour"
          onChange={onChange}
          value={ele.ratePerHour}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none focus:border-focus-blue text-center"
          name="total"
          // onChange={onChange}
          value={
            arrayTechnician[index].total || ele.workPerHour * ele.ratePerHour
          }
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className={`${
            errorTable && !ele.totalEarn && "border-red-500"
          } text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
          name="amountExtra"
          onChange={onChange}
          value={ele.amountExtra}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none focus:border-focus-blue text-center"
          name="totalEarn"
          value={ele.totalEarn}
        />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => {
            deleteRow(index);
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
};

const TableTechnicianRepairCost = ({ index, deleteRow, ele, onChange }) => {
  return (
    <div className="p-2 grid grid-cols-9 justify-center items-center gap-5 text-xs bg-white">
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>
      <div className="col-span-3">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
          name="stuffName"
          onChange={onChange}
          value={ele.stuffName}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
          name="quantity"
          onChange={onChange}
          value={ele.quantity}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
          name="unit"
          onChange={onChange}
          value={ele.unit}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
          name="pricePerUnit"
          onChange={onChange}
          value={ele.pricePerUnit}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="text-center py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
          name="total"
          onChange={onChange}
          value={ele.total}
        />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => {
            deleteRow(index);
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
};
export default RepairTechnicianJobDetail;
