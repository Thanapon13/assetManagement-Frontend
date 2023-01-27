import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'

const RepairDetail = () => {
  const location = useLocation()
  const item = location.state.data

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
            {item.repairStatus === 'waitApprove' ? (
              <>
                <ModalApproveDone />
                <div className="flex items-center gap-2">
                  <h1>สถานะใบแจ้งซ่อม</h1>
                  <div className="bg-purple-600 text-white text-sm py-2 px-4 rounded-2xl">
                    {'รอตรวจรับ'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="px-6 py-2 bg-red-500 hover:bg-red-700  text-white rounded-md">
                  ยกเลิก
                </button>
                <div className="flex items-center gap-2">
                  <h1>สถานะใบแจ้งซ่อม</h1>
                  <div className="bg-sky-200 text-blue-600 text-sm py-2 px-4 rounded-2xl">
                    {'รอช่างรับงาน'}
                  </div>
                </div>
              </>
            )}
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
        {item.repairStatus === 'waitApprove' ? (
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
                    {'เปลี่ยนสายไฟเรียบร้อย'}
                  </div>
                </div>
                {/* row 2 ความเห็นช่าง*/}
                <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                  <div className="text-text-gray flex items-center">
                    ความเห็นช่าง
                  </div>
                  <div className="flex items-center">
                    {'ระวังหนูกัดสายไฟซ้ำ'}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* footer */}
      {item.repairStatus === 'waitApprove' ? (
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
  )
}

const TableRepairCost = (props) => {
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
            )
          })}
          <div className="bg-table-data h-[40px] p-6 flex justify-between items-center mt-10">
            <div className="text-sm  font-semibold">รวมจำนวนเงินทั้งหมด</div>
            <div className="text-sm font-semibold">{'11300.00'} บาท</div>
          </div>
        </div>
      </div>
    </>
  )
}

const ModalApproveDone = () => {
  const [showModal, setShowModal] = useState(false)

  const callback = (payload) => {
    setAllReject(payload)
  }
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
  )
}

export default RepairDetail
