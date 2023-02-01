import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TableBorrowRecord from '../components/table/TableBorrowRecord'
import Selector from '../components/selector/Selector'
import TableLocationHistory from '../components/table/TableLocationHistory'

const SaveTransferAsset = () => {
  const [countRow, setCountRow] = useState(1)

  const [input, setInput] = useState({
    ID: '',
    billNumber: '',
    documentRegistration: '',
    sector: '',
    eligiblePerson: '',
    selfSector: '',
    allPrice: 0,
    firstName_recorder: '',
    lastName_recorder: '',
    dateTime_recorder: '',
    firstName_courier: '',
    lastName_courier: '',
    dateTime_courier: '',
    firstName_approver: '',
    lastName_approver: '',
    dateTime_approver: '',
    status: 'not approve',
  })
  const [countIndexArray, setCountIndexArray] = useState([0])

  const [saveAssetWithdrawTableArray, setSaveAssetWithdrawTableArray] =
    useState([
      {
        index: 0,
        inventoryNumber: '',
        productName: '',
        brand: '',
        serialNumber: '',
        supplier: '',
        amount: '',
        price: '',
      },
    ])

  const tableData = [
    {
      ID: '1',
      building: 'อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ',
      floor: '12',
      room: 'ห้องรับห้องพิเศษ',
      moveInDate: '19/04/2565',
      moveOutDate: '22/12/2565',
    },
    {
      ID: '2',
      building: 'อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ',
      floor: '12',
      room: 'ห้องรับห้องพิเศษ',
      moveInDate: '19/04/2565',
      moveOutDate: '22/12/2565',
    },
    {
      ID: '3',
      building: 'อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ',
      floor: '12',
      room: 'ห้องรับห้องพิเศษ',
      moveInDate: '19/04/2565',
      moveOutDate: '22/12/2565',
    },
  ]

  // handle
  const handleChangeID = (e) => {
    const clone = { ...input }
    clone.ID = e.target.value
    setInput(clone)
  }
  const handleChangeBillNumber = (e) => {
    const clone = { ...input }
    clone.billNumber = e.target.value
    setInput(clone)
  }
  const handleChangeDocumentRegistration = (e) => {
    const clone = { ...input }
    clone.documentRegistration = e.target.value
    setInput(clone)
  }
  const handleChangeSector = (e) => {
    const clone = { ...input }
    clone.sector = e.target.value
    setInput(clone)
  }
  const handleChangeEligiblePerson = (e) => {
    const clone = { ...input }
    clone.eligiblePerson = e.target.value
    setInput(clone)
  }

  const handleChangeAllPrice = (e) => {
    const clone = { ...input }
    clone.allPrice = e.target.value
    setInput(clone)
  }

  //handle bottom table
  const handleClickIncrease = (e) => {
    e.preventDefault()
    setCountRow(countRow + 1)
    setCountIndexArray([...countIndexArray, countRow])

    let clone = [...saveAssetWithdrawTableArray]
    const newCloneArray = {
      index: countRow,
      inventoryNumber: '',
      productName: '',
      brand: '',
      serialNumber: '',
      supplier: '',
      amount: '',
      price: '',
    }
    setSaveAssetWithdrawTableArray([...clone, newCloneArray])
  }

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1)
    }

    let clone = [...saveAssetWithdrawTableArray]
    clone.splice(index, 1)
    setSaveAssetWithdrawTableArray(clone)
  }

  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">บันทึกโอน-ย้ายครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">บันทึกโอน-ย้ายครุภัณฑ์</div>
          </div>
        </div>
        {/* การโอน-ย้ายครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">การโอน-ย้ายครุภัณฑ์</div>
          {/* Row 1 เลขที่เอกสารการยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
              เลขที่เอกสารการโอนย้าย
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หน่วยงานผู้โอน</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 วันที่ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วันที่ยืม</label>
              <input
                type="date"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">กำหนดส่งคืน</label>
              <input
                type="date"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่เลือก */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่เลือก</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-12 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-2">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                  <div className="col-span-3 grid grid-cols-4 gap-5">
                    <div className="col-span-1">จำนวน</div>
                    <div className="col-span-1">หน่วยนับ</div>
                    <div className="col-span-2">จำนวนเงิน (บาท)</div>
                  </div>
                </div>
              </div>
              {saveAssetWithdrawTableArray?.map((el, idx) => {
                return (
                  <TableBorrowRecord
                    key={idx}
                    index={idx}
                    saveAssetWithdrawTableArray={saveAssetWithdrawTableArray}
                    setSaveAssetWithdrawTableArray={
                      setSaveAssetWithdrawTableArray
                    }
                    deleteRow={deleteRow}
                  />
                )
              })}
              <button
                type="button"
                className="w-full h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มครุภัณฑ์
              </button>

              <div className="h-[24px]"></div>
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* Row 1 หน่วยงาน */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  หน่วยงาน
                  <h1 className="text-red-500 ml-2 font-bold">*</h1>
                </label>
              </div>
              <Selector placeholder={'Select'} />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ภาควิชา</label>
              <Selector placeholder={'Select'} />
            </div>
          </div>
          {/* Row 2 วัตถุประสงค์การขอยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วัตถุประสงค์การขอยืม</label>
              <Selector placeholder={'Select'} />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">ผู้ดำเนินการ</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* สถานที่ตั้งใหม่ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">สถานที่ตั้งใหม่</div>
          {/* Row 1 ชื่อ */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                อาคาร
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <Selector placeholder={'Select'} />
            </div>
            <div className="flex flex-col gap-y-2 col-span-1">
              <label className="text-text-gray">ชั้น</label>
              <input
                type="number"
                placeholder="00000000"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-1">
              <label className="text-text-gray">ห้อง</label>
              <input
                type="number"
                placeholder="00000000"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* ประวัติสถานที่ตั้ง */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">ประวัติสถานที่ตั้ง</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-11 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-3">อาคาร</div>
                  <div className="col-span-1">ชั้น</div>
                  <div className="col-span-2">ห้อง</div>
                  <div className="col-span-2">วันที่ย้ายเข้า</div>
                  <div className="col-span-2">วันที่ย้ายออก</div>
                </div>
              </div>
              <TableLocationHistory data={tableData} />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="bottom-0 bg-white  flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        <button
          type="button"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </button>
        <button
          type="button"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          บันทึกขอยืมครุภัณฑ์
        </button>
      </div>
    </>
  )
}

export default SaveTransferAsset
