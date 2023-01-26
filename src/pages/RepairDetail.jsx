import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const RepairDetail = () => {
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
        <div>
          {/* รายละเอียดการแจ้งซ่อม */}
          <div className="text-2xl text-text-green flex items-center space-x-5 ">
            <Link to={`/repairIndex`}>
              <FaArrowLeft className="text-gray-400" />
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
            <button className="px-6 py-2 bg-red-500 hover:bg-red-700  text-white rounded-md">
              ยกเลิก
            </button>
            <div className="flex items-center gap-2">
              <h1>สถานะใบแจ้งซ่อม</h1>
              <div className="bg-sky-200 text-blue-700 py-1 px-4 rounded-2xl">
                {'รอช่างรับงาน'}
              </div>
            </div>
          </div>
        </div>
        {/* Body 1 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          {/* ข้อมูลครุภัณฑ์ */}
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 เลขที่ใบแจ้งซ่อม */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center ">{borrowData.borrowID}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div className="flex justify-center items-center py-2 w-12 text-blue-500 bg-sky-100 rounded-2xl">
                {'ปกติ'}
              </div>
            </div>
            {/* row 2 เวลาที่แจ้งซ่อม*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center">{'09/09/2565 , 12:30'}</div>
              <div className="text-text-gray flex items-center">
                รหัสครุภัณฑ์
              </div>
              <div className="flex items-center">{'18/02/2566 , 09:00'}</div>
            </div>
            {/* row 3 อยู่ในประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div className="flex items-center text-text-green">
                {'อยู่ในประกัน'}
              </div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center">{'pc-hphz-360/071'}</div>
            </div>
            {/* row 4 เจ้าของครุภัณฑ์*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center">{'กองคลังหลัก'}</div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center">
                {'Notebook HP Pavilian16'}
              </div>
            </div>
            {/* row 5 วันที่เริ่มรับประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center">{'10/08/2565'}</div>
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center">{'09/08/2566'}</div>
            </div>
            {/* row 6 รหัส cost center*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center">{'000123'}</div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center">{'-'}</div>
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
              <div className="flex items-center ">{'อาคารเพชรไมตรี'}</div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center ">{'7'}</div>
            </div>
            {/* row 2 ห้อง */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center">{'304'}</div>
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
              <div className="flex items-center ">{'กรขจิน กลิ่นขจร'}</div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center ">{'098-7654321'}</div>
            </div>
            {/* row 2 ผู้ประสานงาน */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center">
                {'เมตตา ดวงรุ่งเรืองโรจน์'}
              </div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>
              <div className="flex items-center">{'กองงานบัญชีกลาง'}</div>
            </div>
          </div>
        </div>
        {/* Body 2 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          {/* รายละเอียดการซ่อม */}
          <div>
            <div className="text-xl">รายละเอียดการซ่อม</div>
            {/* row 1 ประเภทการซ่อม */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ประเภทการซ่อม
              </div>
              <div className="flex items-center ">{'ซ่อมครุภัณฑ์'}</div>
            </div>
            {/* row 2 หน่วยงานซ่อม*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                หน่วยงานซ่อม
              </div>
              <div className="flex items-center">{'ศูนย์คอมพิวเตอร์'}</div>
            </div>
            {/* row 3 ส่วนที่ชำรุดหรือเหตุขัดข้อง*/}
            <div className="grid grid-cols-3 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ส่วนที่ชำรุดหรือเหตุขัดข้อง
              </div>
              <div className="flex items-center col-span-2">
                {
                  'เครื่องเปิดไม่ติด ไม่รู้เป็นอะไรเหมือนกัน อยู่ๆดับไปเองตอนทำงาน'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RepairDetail
