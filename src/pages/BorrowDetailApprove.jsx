import React from 'react'
import { Link } from 'react-router-dom'
import TableBorrowApprove from '../components/table/TableBorrowApprove'

const BorrowDetailApprove = () => {
  const tableData = [
    {
      ID: '1',
      assetId: '7440-001-001',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '3',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
    {
      ID: '2',
      assetId: '6301-018-0131',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '5',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
    {
      ID: '3',
      assetId: '1314-013-1331',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '7',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
  ]
  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">อนุมัติการยืมครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">
              <Link
                to="/borrowApprove"
                className='className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2'
              >
                อนุมัติยืมครุภัณฑ์
              </Link>
            </div>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการขออนุมัติ</div>
          </div>
        </div>
        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          {/* header */}
          <div className="flex justify-between">
            <div className="text-lg">ข้อมูลการยืมครุภัณฑ์</div>
            <button className="p-1 px-7 mr-5 border-[1px] border-gray-500 rounded-md hover:bg-slate-200">
              พิมพ์
            </button>
          </div>
          <div className="grid grid-cols-7 gap-5 sm:gap-20">
            {/* Form 1 เลขที่เอกสารการยืม */}
            <div className="grid grid-cols-2 col-span-3 pt-4 gap-5">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  เลขที่เอกสารการยืม
                </label>
                <input
                  type="text"
                  placeholder="Example"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className=" text-text-gray">วันที่ยืม</label>
                <input
                  type="date"
                  placeholder="Example"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className=" text-text-gray">วันที่คืน</label>
                <input
                  type="date"
                  placeholder="Example"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray">วัตถุประสงค์การขอยืม</label>
                <input
                  type="text"
                  placeholder="Example"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
            {/* Form 2 ราคายืม */}
            <div className="grid grid-cols-2 col-span-3 pt-4 gap-5">
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">ราคายืม (ต่อวัน)</label>
                <input
                  type="number"
                  placeholder="100"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">จำนวนวันที่ยืม (วัน)</label>
                <input
                  type="number"
                  placeholder="5"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">กำหนดส่งคืน</label>
                <input
                  type="date"
                  value="123"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">มูลค่าการยืม (บาท)</label>
                <input
                  type="number"
                  placeholder="400.00"
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่ขอยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-lg">รายการครุภัณฑ์ที่ขอยืม</div>
          {/* table */}
          <div className="overflow-x-auto relative text-xs font-semibold p-2 mt-3">
            {/* header table */}
            <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
              </div>
              <div className="col-span-1">ลำดับ</div>
              <div className="col-span-2">ID ครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
              <div className="col-span-1">จำนวน</div>
              <div className="col-span-1">หน่วยนับ</div>
              <div className="col-span-1">จำนวนเงิน(บาท)</div>
            </div>
            <TableBorrowApprove data={tableData} />
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-lg">รายละเอียดผู้ยืม</div>
          {/* Row 1 ชื่อ */}
          <div className="grid grid-cols-5 pt-4 gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray ">ชื่อ - นามสกุล</label>
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
            <div className="flex flex-col gap-y-2 col-span-4">
              <label className=" text-text-gray">ที่อยู่</label>
              <input
                type="text"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* หมายเหตุ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-lg ">หมายเหตุ</div>
          <textarea
            maxLength=""
            className="h-[250px] border-[1px] mt-5  rounded-md w-full focus:border-sky-300"
          ></textarea>
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-end items-center gap-5 p-3 text-sm mr-3 ">
        <Link
          to="/borrowApprove"
          className="border-[1px] border-red-400 px-7 hover:bg-gray-100 text-red-600 text-sm rounded-md p-2"
        >
          ไม่อนุมัติ
        </Link>
        <button
          type="button"
          className="bg-text-green px-10 hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          อนุบัติ
        </button>
      </div>
    </>
  )
}

export default BorrowDetailApprove
