import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const RepairTechnicianDetail = () => {
  const location = useLocation()
  // const item = location.state?.data
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const item = {
    informRepairDate: '12/09/2565 14:36 น.',
    informRepairIdDoc: '20212334512',
    assetIdCode: '7440-0036-032/1512',
    repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
    agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
    repairSender: 'ศรีตรัง',
    repairStatus: 'waitApprove',
    technicianStatus: 'waitTechnicianConfirm',
    emerygencyStatus: 'normal',
    repairCostList: [
      {
        list: 'รางไฟ',
        quannity: '1',
        unit: '-',
        pricePerUnit: '3000',
        totalPrice: '3000',
      },
      {
        list: 'สายไฟ 220v outside wire 2.5sqm',
        quannity: '10',
        unit: 'เมตร',
        pricePerUnit: '200',
        totalPrice: '2000',
      },
      {
        list: 'switch relay 220v to 12v for sn.7103671688',
        quannity: '1',
        unit: 'ตัว',
        pricePerUnit: '6300',
        totalPrice: '6300',
      },
    ],
  }

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div>
          {/* รายละเอียดการแจ้งซ่อม (รับงาน) */}
          <div className="text-2xl text-text-green flex items-center space-x-5 ">
            <Link to={`/repairTechnicianIndex`}>
              <FaArrowLeft className="text-gray-400" />
            </Link>
            <h1>รายละเอียดการแจ้งซ่อม (รับงาน)</h1>
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
                to="/repairTechnicianIndex"
                className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                รายการรอลงรายละเอียดแจ้งซ่อม
              </Link>
              <div className="text-text-gray">/</div>
              <div className="text-text-gray ml-2">รายละเอียดการแจ้งซ่อม</div>
            </div>
          </div>
          {/* status */}
          <div className="flex justify-end gap-5 mr-5">
            <div className="flex items-center gap-2">
              <h1>สถานะใบแจ้งซ่อม</h1>
              <div className="bg-[#245BD826] text-blue-500 text-sm p-2 rounded-2xl">
                {'แจ้งซ่อม'}
              </div>
            </div>
          </div>
        </div>
        {/* Component 1 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          {/* ข้อมูลครุภัณฑ์ */}
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 เลขที่ใบแจ้งซ่อม */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center ">{'br.6602/1677'}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div className="flex justify-center items-center p-2 w-12 text-blue-500 bg-sky-100 rounded-2xl">
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
                ส่วนที่ชำรุด เสียหาย
                <h1 className="text-red-500">*</h1>
              </div>
              <div className="flex items-center">{'มอเตอร์'}</div>
            </div>
            {/* row 6 วันที่สิ้นสุดการรับประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center">{'09/12/2566'}</div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center">{'-'}</div>
            </div>
            {/* row 7 รหัส cost center*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center">{'000123'}</div>
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
        {/* Component 2 */}
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
      {/* footer */}
      {item.repairStatus === 'waitApprove' ? (
        <>
          {/* footer */}
          <div className="flex justify-between p-3 border-t-[1px] bg-white">
            <div className="text-text-gray border px-6 rounded-md text-sm flex items-center hover:text-white hover:bg-gray-600">
              ยกเลิก
            </div>
            <div className="flex gap-5">
              <ModalRejectRepair />
              <button className="px-14 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-800"
                onClick={() => setShowModalConfirm(true)}
              >
                รับงาน
              </button>
              <ModalConfirmSave
                isVisible={showModalConfirm}
                onClose={() => setShowModalConfirm(false)}
              // onSave={handleSubmit}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

const ModalRejectRepair = () => {
  const [showModal, setShowModal] = useState(false)

  const callback = (payload) => {
    setAllReject(payload)
  }
  return (
    <>
      <button
        className="px-4 py-2 rounded-md text-sm border bg-red-500 text-white hover:bg-red-800"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ไม่รับงาน
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* ยกเลิกการแจ้งซ่อม */}
                <div>
                  {/* header*/}
                  <div className="flex justify-center items-center gap-5 p-5 ">
                    <h1 className="text-2xl text-red-700">
                      ระบุสาเหตุที่ไม่รับงาน
                    </h1>
                  </div>
                  {/* Component 1 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                    {/* สาเหตุที่ยกเลิก */}
                    <div className="text-text-gray flex  justify-center items-center">
                      สาเหตุที่ยกเลิก
                    </div>
                    <textarea className="col-span-3 border-[1px] p-2 h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"></textarea>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-3 border-[1px] bg-[#999999] text-white shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/repairTechnicianIndex"
                    className="text-white bg-red-600 px-10 py-3 border rounded-md "
                    // type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default RepairTechnicianDetail
