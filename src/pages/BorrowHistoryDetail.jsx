import React from 'react'
import { Link } from 'react-router-dom'
import TableBorrowCheckDetail from '../components/table/TableBorrowCheckDetail'
import { FaArrowLeft } from 'react-icons/fa'

const BorrowHistoryDetail = () => {
  const tableData = [
    {
      ID: '1',
      assetId: '7440-001-001',
      assetName: 'พัดลม hatari แบบ',
      assetOwner: 'สำนักบริหารศาสตร์มืด',
      quantity: '3',
      serialNumber: 'MRVG981F2JHZ13B',
      status: 'ปกติ',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
    {
      ID: '2',
      assetId: '6301-018-0131',
      assetName: 'พัดลม hatari แบบ',
      assetOwner: 'สำนักบริหารศาสตร์มืด',
      quantity: '5',
      serialNumber: 'MRVG981F2JHZ13B',
      unit: 'ตัว',
      totalPrice: '19000.00',
      status: 'ปกติ',
    },
    {
      ID: '3',
      assetId: '1314-013-1331',
      assetName: 'พัดลม hatari แบบ',
      assetOwner: 'สำนักบริหารศาสตร์มืด',
      quantity: '7',
      serialNumber: 'MRVG981F2JHZ13B',
      unit: 'ตัว',
      totalPrice: '19000.00',
      status: 'ปกติ',
    },
    {
      ID: '4',
      assetId: '1314-013-1331',
      assetName: 'พัดลม hatari แบบ',
      assetOwner: 'สำนักบริหารศาสตร์มืด',
      quantity: '7',
      serialNumber: 'MRVG981F2JHZ13B',
      unit: 'ตัว',
      totalPrice: '19000.00',
      status: 'ปกติ',
    },
  ]
  const borrowData = {
    borrowID: 'br.6602/1677',
    pricePerDay: '1300.00',
  }
  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green flex items-center space-x-5 ">
          <Link to={`/borrowHistory`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>รายละเอียดประวัติการยืม</h1>
        </div>
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
              to="/borrowHistory"
              className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              ประวัติการยืม
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดประวัติการยืม</div>
          </div>
        </div>
        {/* ข้อมูลครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการยืมครุภัณฑ์</div>
          {/* row 1 เลขที่เอกสารการยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่เอกสารการยืม
            </div>
            <div className="flex items-center ">{borrowData.borrowID}</div>
            <div className="text-text-gray flex items-center ">วันที่ยืม</div>
            <div className="flex items-center ">{'09/09/2565 , 12:30'}</div>
          </div>
          {/* row 2 กำหนดคืน*/}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">กำหนดคืน</div>
            <div className="flex items-center">{'09/09/2565 , 12:30'}</div>
            <div className="text-text-gray flex items-center">วันที่คืน</div>
            <div className="flex items-center">{'18/02/2566 , 09:00'}</div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* row 1 ผู้ดำเนินการ */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              ผู้ดำเนินการ
            </div>
            <div className="flex items-center ">{'ชัชชาติ เชิดชูจิต'}</div>
            <div className="text-text-gray flex items-center ">หน่วยงาน</div>
            <div className="flex items-center ">{'สำนักคอมพิวเตอร์'}</div>
          </div>
          {/* row 2 ภาควิชา */}
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ภาควิชา</div>
            <div className="flex items-center">{'วิทยาการคอมพิวเตอร์'}</div>
          </div>
          {/* row 3 ที่อยู่ */}
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ที่อยู่</div>
            <div className="flex items-center col-span-3">
              {'888 อาคารรัตนวิดี ถนนสุขุมวิท เขตดุสิต กรุงเทพฯ 10310'}
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] h-auto lg:w-full">
              <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">ID ครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">Serial Number</div>
                <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                <div className="col-span-1">สถานะครุภัณฑ์</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableBorrowCheckDetail data={tableData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BorrowHistoryDetail
