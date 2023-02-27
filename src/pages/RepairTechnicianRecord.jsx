import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi'
import Selector from '../components/selector/Selector'

const RepairTechnicianRecord = () => {
  const location = useLocation()
  // const item = location.state?.data
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

  const [countRow, setCountRow] = useState(1)
  const [countRow1, setCountRow1] = useState(1)
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
  const [saveAssetWithdrawTableArray1, setSaveAssetWithdrawTableArray1] =
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
  const handleClickIncrease1 = (e) => {
    e.preventDefault()
    setCountRow(countRow + 1)
    setCountIndexArray([...countIndexArray, countRow])

    let clone = [...saveAssetWithdrawTableArray1]
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
    setSaveAssetWithdrawTableArray1([...clone, newCloneArray])
  }

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1)
    }

    let clone = [...saveAssetWithdrawTableArray]
    clone.splice(index, 1)
    setSaveAssetWithdrawTableArray(clone)
  }
  const deleteRow1 = (index) => {
    if (countRow1 > 0) {
      setCountRow(countRow1 - 1)
    }

    let clone = [...saveAssetWithdrawTableArray1]
    clone.splice(index, 1)
    setSaveAssetWithdrawTableArray1(clone)
  }

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div>
          {/* ลงบันทึกรายละเอียดการซ่อม */}
          <div className="text-2xl text-text-green flex items-center space-x-5 ">
            <Link to={`/repairTechnicianIndex`}>
              <FaArrowLeft className="text-gray-400" />
            </Link>
            <h1>ลงบันทึกรายละเอียดการซ่อม</h1>
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
              <div className="text-text-gray ml-2">
                ลงบันทึกรายละเอียดการซ่อม
              </div>
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
            {/* row 3 ผู้รับซ่อม */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">ผู้รับซ่อม</div>
              <Selector placeholder={'Select'} />
            </div>
          </div>
        </div>
        {/* Component 2 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          {/* วันที่-เวลาซ่อม */}
          <div>
            <div className="text-xl">วันที่-เวลาซ่อม</div>
            {/* row 1 วันที่-เวลาจ่ายงานช่าง */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาจ่ายงานช่าง
              </div>
              <div className="flex items-center ">{'09/12/2565 12:30'}</div>
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาถึงสถานที่ซ่อม
              </div>
              <input type="date" className="border-[1px]  rounded-md " />
            </div>
            {/* row 2 วันที่-เวลาทำการซ่อม*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                วันที่-เวลาทำการซ่อม
              </div>
              <div className="flex items-center">{'09/12/2565 12:30'}</div>
              <div className="text-text-gray flex items-center ">
                วันที่-เวลาซ่อมเสร็จ
              </div>
              <input type="date" className="border-[1px]  rounded-md " />
            </div>
          </div>
        </div>
        {/* Component 3 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">ข้อมูลรายชื่อช่าง</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-8 gap-2 text-center">
                  <div className="col-span-2">ชื่อช่าง</div>
                  <div className="col-span-1">จำนวนชั่วโมงที่ทำ</div>
                  <div className="col-span-1">อัตราต่อชั่วโมง</div>
                  <div className="col-span-1">รวมเป็นเงิน</div>
                  <div className="col-span-1">เงินพิเศษ</div>
                  <div className="col-span-1">รวมทั้งหมด(บาท)</div>
                  <div className="col-span-1">Action</div>
                </div>
              </div>
              {saveAssetWithdrawTableArray?.map((el, idx) => {
                return (
                  <TableTechnicianRecord
                    key={idx}
                    index={idx}
                    deleteRow={deleteRow}
                  />
                )
              })}
              <button
                type="button"
                className="w-full mt-5 h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มรายชื่อช่าง
              </button>

              <div className="h-[24px]"></div>
            </div>
          </div>
        </div>
        {/* Component 4 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">ค่าใช้จ่ายในการซ่อม</div>
          {/* table */}
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
                  <div className="col-span-1">Action</div>
                </div>
              </div>
              {saveAssetWithdrawTableArray1?.map((el, idx) => {
                return (
                  <TableTechnicianRepairCost
                    key={idx}
                    index={idx}
                    deleteRow={deleteRow1}
                  />
                )
              })}
              <button
                type="button"
                className="w-full mt-5 h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease1}
              >
                + เพิ่มรายการ
              </button>

              <div className="p-4 rounded-md bg-background-gray-table mt-10 flex justify-between">
                <h1>รวมจำนวนเงินทั้งหมด</h1>
                <div>{'11,300.00  บาท'}</div>
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
            <div className="text-text-gray text-sm flex items-center">
              ยกเลิก
            </div>
            <div className="flex gap-5">
              <button className="px-4 py-2 rounded-md text-sm border border-text-green text-text-green hover:bg-green-100">
                บันทึก
              </button>
              <button className="px-4 py-2 rounded-md text-sm bg-text-green text-white hover:bg-green-800">
                บันทึกและขออนุมัติ
              </button>
            </div>
          </div>
        </>
      ) : null}
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

const TableTechnicianRepairCost = ({ index, deleteRow }) => {
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
export default RepairTechnicianRecord
