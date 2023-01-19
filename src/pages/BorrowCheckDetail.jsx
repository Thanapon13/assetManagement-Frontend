import React from 'react'
import { Link } from 'react-router-dom'
import TableBorrowCheckDetail from '../components/table/TableBorrowCheckDetail'
import { FaArrowLeft } from 'react-icons/fa'
import pic from '../assets/pic.png'

const BorrowCheckDetail = () => {
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
  const imageList = [
    {
      imageName: 'image1.png',
      image: pic,
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
          <Link to={`/borrowCheckIndex`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>รายละเอียดการตรวจรับคืน</h1>
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
              to="/borrowCheckIndex"
              className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              รายการรอตรวจรับคืน
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการตรวจรับคืน</div>
          </div>
        </div>
        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการยืมครุภัณฑ์</div>
          {/* row 1 เลขที่เอกสารการยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่เอกสารการยืม
            </div>
            <div className="flex items-center ">{borrowData.borrowID}</div>
            <div className="text-text-gray flex items-center ">
              ราคายืมต่อวัน (บาท)
            </div>
            <div className="flex items-center ">{borrowData.pricePerDay}</div>
          </div>
          {/* row 2 จำนวนวันที่ยืม (วัน) */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              จำนวนวันที่ยืม (วัน)
            </div>
            <div className="flex items-center">{7}</div>
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่ยืม
            </div>
            <div className="flex items-center">{'18/02/2566 , 09.00'}</div>
          </div>
          {/* row 3 วัน-เวลาที่กำหนดส่งคืน */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่กำหนดส่งคืน
            </div>
            <div className="flex items-center">{'25/02/2566 , 16.00'}</div>
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่คืน
            </div>
            <div className="flex items-center">{'25/02/2566 , 15.32'}</div>
          </div>
          {/* row 4 วัตถุประสงค์การขอยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              วัตถุประสงค์การขอยืม
            </div>
            <div className="flex items-center">{'ใช้ในงานราชการ'}</div>
            <div className="text-text-gray flex items-center">
              มูลค่าการยืม (บาท)
            </div>
            <div className="flex items-center">{9100.0}</div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* row 1 หน่วยงานที่ยืม */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              หน่วยงานที่ยืม
            </div>
            <div className="flex items-center ">{'สำนักบริหารงานเภสัช'}</div>
            <div className="text-text-gray flex items-center ">ภาควิชา</div>
            <div className="flex items-center ">{'งานบริหารเภสัช'}</div>
          </div>
          {/* row 2 ผู้ดำเนินการ */}
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ผู้ดำเนินการ</div>
            <div className="flex items-center">{'นายธรรมกร นามสมมุติ'}</div>
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
        {/* image list */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 mb-5 ">
          <div className="text-xl">ภาพครุภัณฑ์</div>
          {imageList.map((item, idx) => {
            return (
              <div className="flex justify-center pt-10 border-[2px] rounded-xl shadow-sm">
                <img
                  className="object-cover hover:object-scale-down h-[30em] w-[50em]"
                  src={item.image}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BorrowCheckDetail
