import React from 'react'
import { Link } from 'react-router-dom'
import TableBorrowRecord from '../components/table/TableBorrowRecord'

const BorrowRecord = () => {
  const tableData = [
    {
      ID: '1',
      assetId: '65/0322171',
      assetName: 'Macbook Pro M2 16" -512GB',
      borrowerName: 'สำนักคอมพิวเตอร์',
      quantity: '3',
    },
    {
      ID: '2',
      assetId: '65/0322171',
      assetName: 'Macbook Pro M2 16" -512GB',
      borrowerName: 'สำนักคอมพิวเตอร์',
      quantity: '3',
    },
    {
      ID: '3',
      assetId: '65/0322171',
      assetName: 'Macbook Pro M2 16" -512GB',
      borrowerName: 'สำนักคอมพิวเตอร์',
      quantity: '3',
    },
  ]

  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">บันทึกใบยืมครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">บันทึกใบยืมครุภัณฑ์</div>
          </div>
        </div>
        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-md font-semibold">ข้อมูลการยืมครุภัณฑ์</div>
          {/* Row 1 เลขที่เอกสารการยืม */}
          <div className="grid grid-cols-5 pt-4 gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                เลขที่เอกสารการยืม
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ราคายืม (ต่อวัน)</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 วันที่ยืม */}
          <div className="grid grid-cols-5 pt-4 gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วันที่ยืม</label>
              <input
                type="date"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
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
        {/* ข้อมูลครุภัณฑ์ที่เลือก */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="flex justify-between">
            <div className="text-md font-semibold">ข้อมูลครุภัณฑ์ที่เลือก</div>
            <button
              type="button"
              className="border border-text-green text-text-green px-4 py-2 rounded hover:bg-green-800 hover:text-white"
            >
              เลือกรายการครุภัณฑ์
            </button>
          </div>
          {/* table */}
          <div className="overflow-x-auto text-xs font-semibold p-2 mt-3">
            {/* header table */}
            <div className="grid grid-cols-10 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
              <div className="col-span-1">ลำดับ</div>
              <div className="col-span-2">ID ครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-2">เจ้าของครุภัณฑ์</div>
              <div className="col-span-1">จำนวน</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          {tableData?.map((val, idx) => {
            return (
              <TableBorrowRecord
                key={idx}
                index={idx}
                ID={val.ID}
                assetId={val.assetId}
                assetName={val.assetName}
                borrowerName={val.borrowerName}
                quantity={val.quantity}
              />
            )
          })}
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-md font-semibold">รายละเอียดผู้ยืม</div>
          {/* Row 1 ชื่อ */}
          <div className="grid grid-cols-5 pt-4 gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                ชื่อ
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หมายเลขโทรศัพท์</label>
              <input
                type="number"
                placeholder="00000000"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 หน่วยงานผู้ยืม */}
          <div className="grid grid-cols-5 pt-4 gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">หน่วยงานผู้ยืม</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ภาควิชาผู้ยืม</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 3 ที่อยู่ */}
          <div className="grid grid-cols-5 pt-4  gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">ที่อยู่</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">วัตถุประสงค์การขอยืม</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
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

export default BorrowRecord
