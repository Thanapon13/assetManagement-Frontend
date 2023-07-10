import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi'
import Selector from '../components/selector/Selector'
import ModalConfirmSave from '../components/modal/ModalConfirmSave'
import { BsArrowLeft, BsFillEyeFill } from 'react-icons/bs'
import ModalSuccess from '../components/modal/ModalSuccess'
import OnlyDateInput from "../components/date/onlyDateInput"
import { updateRecordRepairDetail } from '../api/repairApi'
import DateInput from '../components/date/DateInput'
import { IoIosClose } from 'react-icons/io'
import boxIcon from "../public/pics/boxIcon.png";

const RepairOutSourceRecord = () => {
  const location = useLocation()
  // const item = location.state?.data
  const [item, setItem] = useState({
    ...location.state?.data,
    arriveAtPlaceDate: new Date(),
    workDate: new Date(),
    repairDate: new Date(),
    approveDateOfDelivery: new Date(),
    deliverDate: new Date(),
    approveHireDate: new Date(),
    checkJobDate: new Date(),
    sendWithDrawMoneyDate: new Date(),
    receiveWorkOrderDate: new Date(),
    checkJobInsuranceEndDate: new Date(),
  })
  const [error, setError] = useState(false)

  function handleChange(e) {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }
  console.log(item)
  const [arrayCostRepair, setArrayCostRepair] = useState(item.costOfRepairArray || [
    {
      stuffName: '',
      quantity: '',
      unit: '',
      pricePerUnit: '',
    }]
  )
  const [countRow, setCountRow] = useState(1)
  const [countRow1, setCountRow1] = useState(1)
  const [countIndexArray, setCountIndexArray] = useState([0])

  const [showModalConfirm, setShowModalConfirm] = useState(false)

  const inputDoc = useRef();
  const [arrayDocument, setArrayDocument] = useState([])
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const cloneFile = [...arrayDocument];
    for (let i = 0; i < fileList.length; i++) {
      if (fileTypes.includes(fileList[i].type)) {
        cloneFile.push({ document: fileList[i] });
      } else {
        toast.warn(
          `${fileList[i].name} is wrong file type or size is more than 2mb.!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    }
    setArrayDocument(cloneFile);
  };
  const handleClickIncrease = (e) => {
    e.preventDefault()
    setCountRow(countRow + 1)
    setCountIndexArray([...countIndexArray, countRow])

    let clone = [...arrayCostRepair]
    const newCloneArray = {
      stuffName: '',
      quantity: '',
      unit: '',
      pricePerUnit: '',
    }
    setArrayCostRepair([...clone, newCloneArray])
  }

  const deleteRow = (index) => {
    if (countRow1 > 0) {
      setCountRow(countRow1 - 1)
    }

    let clone = [...arrayCostRepair]
    clone.splice(index, 1)
    setArrayCostRepair(clone)
  }

  useEffect(() => {
    let total = 0
    arrayCostRepair?.map(cost => {
      total += cost.total
    })
    setItem({ ...item, totalPrice: total })
  }, [arrayCostRepair])

  const handleSubmit = () => {
    console.log(item)
    let err
    if (!item.repairMan) err = true
    if (err) {
      setError(true)
      return
    }
    setShowModal(true)
  }

  async function submit(valStatus) {
    try {
      await updateRecordRepairDetail(id, {
        input: item,
        status: valStatus || item.statusOfDetailRecord,
        informRepairManArray: arrayTechnician,
        costOfRepairArray: arrayCostRepair
      })
      if (!valStatus) {
        console.log(valStatus, arrayTechnician, item.statusOfDetailRecord, arrayCostRepair)
        return
      }
      setShowModalSuccess(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        <div>
          <div className="text-xl text-text-green flex items-center">
            <Link to={`/repairTechnicianIndex`}
              className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
            >
              <BsArrowLeft className="text-lg" />
            </Link>
            <h1>บันทึกจ้างซ่อมภายนอก</h1>
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
                บันทึกจ้างซ่อมภายนอก
              </div>
            </div>
          </div>
          {/* status */}
          <div className="flex justify-end gap-5 mr-5">
            <div className="flex items-center gap-2">
              <h1>สถานะใบแจ้งซ่อม</h1>
              <div className={`text-sm p-2 rounded-full px-3 
              ${item.statusOfDetailRecord == "waitingRecord" ? "bg-[#F2994A26] text-[#F2994A]"
                  : item.statusOfDetailRecord == "waitingApproval" ? "bg-yellow-300"
                    : ""}`}
              >
                {item.statusOfDetailRecord == "waitingRecord" ? "รอลงบันทึก"
                  : item.statusOfDetailRecord == "waitingApproval" ? "รออนุมัติ"
                    : ""}
                {/* {'แจ้งซ่อม'} */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center col-span-2">{item.informRepairIdDoc}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div className={`flex justify-center items-end -mt-3 py-2 w-fit px-3.5 rounded-full h-fit col-span-2
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
            {/* row 2 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center col-span-2">
                {item.informRepairDate && `${new Date(item.informRepairDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`}
              </div>
              <div className="text-text-gray flex items-center">
                รหัสครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">{item.assetGroupNumber}</div>
            </div>
            {/* row 3 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div className={`flex items-center ${item.isInsurance ? "text-text-green" : "text-red-500"} col-span-2`}>
                {item.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
              </div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">{item.assetNumber}</div>
            </div>
            {/* row 4 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">{item.hostSector}</div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center col-span-2">
                {item.productName}
              </div>
            </div>
            {/* row 5 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center col-span-2">
                {(item.insuranceStartDate)
                  ? `${new Date(item.insuranceStartDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`
                  : '-'}
              </div>
              <div className="text-text-gray flex items-center">
                ส่วนที่ชำรุด เสียหาย
                <h1 className="text-red-500">*</h1>
              </div>
              <div className="flex items-center col-span-2">{item.problemDetail}</div>
            </div>
            {/* row 6 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center col-span-2">
                {item.insuranceEndDate ? `${new Date(item.insuranceEndDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`
                  : '-'}
              </div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center col-span-2">{item.asset01 || '-'}</div>
            </div>
            {/* row 7 */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center col-span-2">{item.costCenterCode || '-'}</div>
            </div>
          </div>

          <div className="pt-5">
            <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>

            <div className="grid grid-cols-2  md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                ที่ตั้ง/อาคาร
              </div>
              <div className="flex items-center  col-span-2">{item.building}</div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center col-span-2 ">{item.floor}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center col-span-2">{item.room}</div>
            </div>
          </div>

          <div className="pt-5">
            <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>

            <div className="grid grid-cols-2  md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                ผู้ส่งซ่อม
              </div>
              <div className="flex items-center col-span-2 ">{item.name_courier}</div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center col-span-2 ">{item.phoneNumber}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center col-span-2">
                {item.name_recorder}
              </div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>
              <div className="flex items-center col-span-2">{item.courierSector}</div>
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
                {item.assignDate && `${new Date(item.assignDate).toLocaleString('th', { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })} น.`}
              </div>
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาถึงสถานที่ซ่อม
              </div>
              <div className="flex h-full col-span-2">
                <DateInput
                  id="arriveAtPlaceDate"
                  state={item}
                  setState={(e) => setItem({ ...item, arriveAtPlaceDate: e })}
                // lable="date to"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่-เวลาทำการซ่อม
              </div>
              <div className="flex col-span-2">
                <DateInput
                  id="workDate"
                  state={item}
                  setState={(e) => setItem({ ...item, workDate: e })}
                />
              </div>
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาซ่อมเสร็จ
              </div>
              <div className="flex col-span-2">
                <DateInput
                  id="repairDate"
                  state={item}
                  setState={(e) => setItem({ ...item, repairDate: e })}
                />
              </div>
            </div>

            <div className="text-xl mt-3">ผลการซ่อม</div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                ผลการซ่อม
              </div>
              <div className="flex items-center col-span-2 ">
                <input
                  type="text"
                  name="repairResult"
                  onChange={handleChange}
                  value={item.repairResult}
                  className={`${error && !item.repairResult && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className="text-text-gray flex items-center ">
                สถานะใบซ่อมแซม
              </div>
              <div className="flex items-center col-span-2 ">
                {item.mechinicComment}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                ความเห็นช่าง
              </div>
              <div className="flex items-center col-span-2 ">
                <input
                  type="text"
                  name="mechinicComment"
                  onChange={handleChange}
                  value={item.mechinicComment}
                  className={`${error && !item.mechinicComment && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">เปิดใบจ้างซ่อมภายนอก (ซ่อมทั่วไป)</div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบจ้างภายนอก
              </div>
              <div className="flex items-center col-span-2 ">
                <input
                  type="text"
                  name="outsourceRepairNumber"
                  onChange={handleChange}
                  value={item.outsourceRepairNumber}
                  className={`${error && !item.outsourceRepairNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className="text-text-gray flex items-center ">
                เลขที่อ้างอิงหน่วยช่าง
              </div>
              <div className="flex items-center col-span-2 ">
                <input
                  type="text"
                  name="repairSectorRefNumber"
                  onChange={handleChange}
                  value={item.repairSectorRefNumber}
                  className={`${error && !item.repairSectorRefNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่ทำการซ่อม
              </div>
              <div className="flex items-center col-span-2">
                <OnlyDateInput
                  id={"workDate"}
                  state={item}
                  setState={setItem}
                  isValid={error && !item.workDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                ชื่อเรื่อง
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="descriptionOfCreateOutsourceRepair"
                  onChange={handleChange}
                  value={item.descriptionOfCreateOutsourceRepair}
                  className={`${error && !item.descriptionOfCreateOutsourceRepair && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div>
            <div className="text-xl">ผู้รับผิดชอบ</div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบจ้างภายนอก
              </div>
              <div className="flex items-center col-span-2 ">

              </div>
              <div className="text-text-gray flex items-center ">
                ชื่อผู้รับผิดชอบ
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="responsibleName"
                  onChange={handleChange}
                  value={item.responsibleName}
                  className={`${error && !item.responsibleName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่ได้รับการอนุมัติ
              </div>
              <div className="flex items-center col-span-2">
                <OnlyDateInput
                  id={"workDate"}
                  state={item}
                  setState={setItem}
                  isValid={error && !item.workDate}
                />
              </div>
              <div className="text-text-gray flex items-center">
                เลขที่หนังสือ
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="bookNumber"
                  onChange={handleChange}
                  value={item.bookNumber}
                  className={`${error && !item.bookNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                วันที่อนุมัติ(ฝ่ายช่างส่งพัสดุ)
              </div>
              <div className="flex items-center col-span-2">
                <OnlyDateInput
                  id={"approveDateOfDelivery"}
                  state={item}
                  setState={setItem}
                  isValid={error && !item.approveDateOfDelivery}
                />              </div>
              <div className="text-text-gray flex items-center">
                วันที่คาดว่าจะส่งมอบ
              </div>
              <div className="flex items-center col-span-2">
                <OnlyDateInput
                  id={"deliverDate"}
                  state={item}
                  setState={setItem}
                  isValid={error && !item.deliverDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                ชื่อผู้รับจ้าง
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="contractorName"
                  onChange={handleChange}
                  value={item.contractorName}
                  className={`${error && !item.contractorName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className='border border-text-green flex items-center justify-center rounded-md text-text-green'>
                เลือกผู้รับจ้าง
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                ที่อยู่
              </div>
              <div className="flex items-center col-span-3">
                <input
                  type="text"
                  name="responsibleAddress"
                  onChange={handleChange}
                  value={item.responsibleAddress}
                  className={`${error && !item.responsibleAddress && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                หมายเลขโทรศัพท์
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="responsiblePhone"
                  onChange={handleChange}
                  value={item.responsiblePhone}
                  className={`${error && !item.responsiblePhone && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>

              <div className="text-text-gray flex items-center">
                ราคาจ้าง
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={item.price}
                  className={`${error && !item.price && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
              <div className="text-text-gray flex items-center">
                ชื่อผู้ติดต่อ
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="contractName"
                  onChange={handleChange}
                  value={item.contractName}
                  className={`${error && !item.contractName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className="text-text-gray flex items-center">
                ภาษีมูลค่าเพิ่ม
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="tax"
                  onChange={handleChange}
                  value={item.tax}
                  className={`${error && !item.tax && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">

              <div className="text-text-gray flex items-center">
                หมายเหตุ
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="responsibleRemark"
                  onChange={handleChange}
                  value={item.responsibleRemark}
                  className={`${error && !item.responsibleRemark && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className="text-text-gray flex items-center">
                ราคารวม
              </div>
              <div className="flex items-center col-span-2">
                <input
                  type="text"
                  name="totalPrice"
                  onChange={handleChange}
                  value={item.totalPrice}
                  className={`${error && !item.totalPrice && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>


            <div className="border-gray-300 border-2 rounded-md border-dashed mt-2">
              <div className="sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 ">
                <div className=" font-semibold text-text-green ">
                  เลือกเอกสารใบสั่งซื้อ/สั่งจอง
                </div>
                <img src={boxIcon} className="w-[50px]" />
                วางไฟล์แนบ หรือคลิก
                <button
                  className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                  onClick={() => inputDoc.current.click()}
                >
                  Upload
                </button>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={inputDoc}
                  onChange={handleFileChange}
                />

              </div>
            </div>
            <div className="col-span-4 sm:mt-5">
              {arrayDocument.map((el, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b-[1px] mt-2 pb-2"
                >
                  <div className="flex items-center text-text-green">
                    <img src={docIcon} className="w-4 h-4 " />
                    <div className="ml-2 text-sm">{el.document.name || el.document}</div>
                  </div>
                  <button
                    className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                    onClick={() => deleteDoc(idx)}
                  >
                    <IoIosClose className="text-2xl" />
                  </button>
                </div>
              ))}
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
                  <div className="col-span-1">รวมทั้งหมด(บาท)</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              {arrayCostRepair?.map((el, idx) => {
                console.log(el)
                return (
                  <TableTechnicianRepairCost
                    key={idx}
                    index={idx}
                    deleteRow={deleteRow}
                    ele={el}
                    onChange={e => {
                      const array = [...arrayCostRepair]
                      array[idx][e.target.name] = e.target.value
                      array[idx].total = array[idx].quantity * array[idx].pricePerUnit || 0
                      setArrayCostRepair(array)
                    }}
                  />
                )
              })}
              <button
                type="button"
                className="w-full mt-5 h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มรายการ
              </button>

              <div className="p-4 rounded-md bg-background-gray-table mt-10 flex justify-between">
                <h1>รวมจำนวนเงินทั้งหมด</h1>
                <div>{item?.totalPrice || '0'} บาท</div>
              </div>
            </div>
          </div>
        </div>
      </div >

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
        <div>
          <div className="text-xl">ข้อมูลการตรวจรับงาน</div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่ใบตรวจรับงาน
            </div>
            <div className="flex items-center col-span-2 ">
              <input
                type="text"
                name="checkJobReceiptNumber"
                onChange={handleChange}
                value={item.checkJobReceiptNumber}
                className={`${error && !item.checkJobReceiptNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div className="text-text-gray flex items-center ">
              สถานะใบตรวจรับ
            </div>

          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center">
              วันที่อนุมัติจ้าง/ซ่อม
            </div>
            <div className="flex items-center col-span-2">
              <OnlyDateInput
                id={"approveHireDate"}
                state={item}
                setState={setItem}
                isValid={error && !item.approveHireDate}
              />
            </div>
            <div className="text-text-gray flex items-center ">
              วันที่ตรวจรับ
            </div>
            <div className="flex items-center col-span-2">
              <OnlyDateInput
                id={"checkJobDate"}
                state={item}
                setState={setItem}
                isValid={error && !item.checkJobDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่ใบสั่งจ้าง
            </div>
            <div className="flex items-center  col-span-2">
              <input
                type="text"
                name="hireNumber"
                onChange={handleChange}
                value={item.hireNumber}
                className={`${error && !item.hireNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div className="text-text-gray flex items-center ">
              วันที่วางฏีกา (วันที่ส่งเบิกเงิน)
            </div>
            <div className="flex items-center col-span-2 ">
              <OnlyDateInput
                id={"sendWithDrawMoneyDate"}
                state={item}
                setState={setItem}
                isValid={error && !item.sendWithDrawMoneyDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              วันที่รับใบสั่งจ้าง
            </div>
            <div className="flex items-center col-span-2 ">
              <OnlyDateInput
                id={"receiveWorkOrderDate"}
                state={item}
                setState={setItem}
                isValid={error && !item.receiveWorkOrderDate}
              />
            </div>
            <div className="text-text-gray flex items-center ">
              วันที่หมดประกัน
            </div>
            <div className="flex items-center col-span-2 ">
              <OnlyDateInput
                id={"checkJobInsuranceEndDate"}
                state={item}
                setState={setItem}
                isValid={error && !item.checkJobInsuranceEndDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
            <div className="text-text-gray flex items-center ">
              ระยะเวลารับประกัน (เดือน)
            </div>
            <div className="flex items-center col-span-2 ">
              <input
                type="text"
                name="checkJobWarrantyPeriod"
                onChange={handleChange}
                value={item.checkJobWarrantyPeriod}
                className={`${error && !item.checkJobWarrantyPeriod && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div className="text-text-gray flex items-center ">
              จำนวนเงินซื้อ/จ้าง (บาท)
            </div>
            <div className="flex items-center col-span-2 ">
              <input
                type="text"
                name="purchaseAmount"
                onChange={handleChange}
                value={item.purchaseAmount}
                className={`${error && !item.purchaseAmount && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
        <div className="flex justify-end gap-4">
          <button
            className="border-text-green text-text-green hover:bg-green-100 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-sm rounded-md py-2 px-6"
            onClick={submit}
          >
            บันทึก
          </button>
          <button
            id="form"
            type="submit"
            className="bg-text-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleSubmit}
          >
            บันทึกและขออนุมัติ
          </button>

          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={() => submit('waitingApproval')}
          />
          {/* {showModalSuccess && <ModalSuccess urlPath='/repairTechnicianIndex' />} */}
        </div>
      </div>

    </>
  )
}

const TableTechnicianRecord = ({ index, deleteRow }) => {
  return (
    <div className="p-2 grid grid-cols-8 justify-center items-center gap-5 text-xs bg-white">
      <div className="col-span-2">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          className="py-2 w-full border-[1px] border-block-green rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => {
            deleteRow(index)
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
    </div>
  )
}

const TableTechnicianRepairCost = ({ index, deleteRow, ele, onChange }) => {
  console.log(ele)
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
            deleteRow(index)
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
    </div>
  )
}
export default RepairOutSourceRecord
