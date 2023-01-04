import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import DateInput from '../components/date/DateInput'
import RowOfWithdrawTableArray from '../components/table/RowOfWithdrawTableArray'
import RowOfTableSaveAssetWithdraw from '../components/table/RowOfTableSaveAssetWithdraw'

export const SaveAssetWithdraw = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState

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

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState(todayThaiDate)

  const [countRow, setCountRow] = useState(1)
  const [countIndexArray, setCountIndexArray] = useState([0])
  const [perPage, setPerPage] = useState(10)

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
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}
        <div className="text-xl text-text-green ">บันทึกเบิกจ่ายครุภัณฑ์</div>
        <div className="flex justify-between items-center">
          {/* left home */}
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>

            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกเบิกจ่าย</div>
          </div>
        </div>

        {/* block white top */}
        <div className="bg-white rounded-lg mx-10 my-3 p-3">
          <div>บันทึกใบเบิกจ่ายครุภัณฑ์</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* ID */}
            <div>
              <div className="mb-1">ID</div>
              <input
                type="text"
                name="ID"
                id="ID"
                onChange={handleChangeID}
                value={input.ID}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เลขที่ใบเบิก */}
            <div>
              <div className="mb-1">เลขที่ใบเบิก</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                onChange={handleChangeBillNumber}
                value={input.billNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ทะเบียนเอกสาร */}
            <div>
              <div className="mb-1">ทะเบียนเอกสาร</div>
              <input
                type="text"
                name="documentRegistration"
                id="documentRegistration"
                onChange={handleChangeDocumentRegistration}
                value={input.documentRegistration}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* หน่วยงาน */}
            <div>
              <div className="mb-1">หน่วยงาน</div>
              <input
                type="text"
                name="sector"
                id="sector"
                onChange={handleChangeSector}
                value={input.sector}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ผู้มีสิทธิ์เบิก */}
            <div>
              <div className="mb-1">ผู้มีสิทธิ์เบิก</div>
              <input
                type="text"
                name="eligiblePerson"
                id="eligiblePerson"
                onChange={handleChangeEligiblePerson}
                value={input.eligiblePerson}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* วันที่เบิก */}
            <div>
              <div className="mb-1">วันที่เบิก</div>
              <div className="flex h-[38px]">
                <DateInput state={withdrawDate} setState={setWithdrawDate} />
              </div>
            </div>
            {/* หน่วยงาน */}
            <div>
              <div className="mb-1">หน่วยงาน</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                readOnly
                value={input.selfSector}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* จำนวนเงิน (บาท) */}
            <div>
              <div className="mb-1">จำนวนเงิน (บาท)</div>
              <input
                type="text"
                name="allPrice"
                id="allPrice"
                onChange={handleChangeAllPrice}
                value={input.allPrice}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>

        {/* block white bottom */}
        <div className="bg-white rounded-lg mx-10 my-3 p-3">
          <div className="pb-3 font-semibold">รายการบันทึกใบเบิกครุภัณฑ์</div>
          <div className="overflow-x-auto scrollbar pb-3">
            <div className="w-[1000px] lg:w-full h-[500px] p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-23 gap-2 text-center">
                  <div className="ml-2">ลำดับ</div>
                  <div className="col-span-3">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-3">ยี่ห้อ/รุ่น/ขนาด</div>
                  <div className="col-span-3">Serial No.</div>
                  <div className="col-span-3">ผู้ผลิต/จำหน่าย</div>
                  <div className="col-span-3">จำนวน</div>
                  <div className="col-span-3">จำนวนเงิน (บาท)</div>
                </div>
              </div>
              {saveAssetWithdrawTableArray?.map((el, idx) => {
                return (
                  <RowOfTableSaveAssetWithdraw
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
      </div>

      {/* footer */}
      <div className="flex justify-end items-center gap-10 p-5 text-sm mr-16 ">
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

export default SaveAssetWithdraw
