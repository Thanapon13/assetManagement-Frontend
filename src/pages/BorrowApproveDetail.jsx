import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TableBorrowApprove from '../components/table/TableBorrowApprove'

const BorrowApproveDetail = () => {
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
          <div className="flex justify-between">
            <div className="text-lg">ข้อมูลการยืมครุภัณฑ์</div>
            <button className="p-1 px-7 mr-5 border-[1px] border-gray-500 rounded-md hover:bg-slate-200">
              พิมพ์
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10">
            {/* col 1 เลขที่เอกสารการยืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-2 ">
                <label className=" text-text-gray flex">
                  เลขที่เอกสารการยืม
                </label>
                <input
                  type="text"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่ยืม</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่คืน</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">วัตถุประสงค์การขอยืม</label>
                <input
                  type="text"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
            {/* col 2 ราคายืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className=" text-text-gray flex">ราคายืม (ต่อวัน)</label>
                <input
                  type="number"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">จำนวนวันที่ยืม (วัน) </label>
                <input
                  type="number"
                  placeholder="5"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">กำหนดส่งคืน</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">มูลค่าการยืม (บาท)</label>
                <input
                  type="number"
                  placeholder="400.00"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
          {/* table */}
          <div className="overflow-x-auto  scrollbar pt-4 mb-5">
            <div className="w-[1000px] lg:w-full">
              <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className=" text-text-green placeholder-text-green focus:ring-0"
                  />
                </div>
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">เลขครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                <div className="col-span-1">จำนวน</div>
                <div className="col-span-1">หน่วยนับ</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableBorrowApprove data={tableData} />
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* Row 1 ชื่อ */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray ">ชื่อ - นามสกุล</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">รหัสเจ้าหน้าที่</label>
              <input
                type="text"
                placeholder="00000000"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 หมายเลขโทรศัพท์ */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หมายเลขโทรศัพท์</label>
              <input
                type="number"
                placeholder="120301230123"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ที่อยู่</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 3 หน่วยงานผู้ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หน่วยงานผู้ยืม</label>
              <input
                type="text"
                placeholder="ไอ่สองงงงงงง"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ภาควิชาผู้ยืม</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
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
        {/* footer */}
        <div className="flex justify-between items-center gap-5 p-3 text-sm ">
          <Link
            to="/borrowApprove"
            className="border-[1px] border-red-400 px-7 hover:bg-gray-100 text-red-600 text-sm rounded-md p-2"
          >
            ไม่อนุมัติ
          </Link>
          <ModalSummary />
        </div>
        {/* user log progress */}
        <div className="bg-white border-[1px] p-4 mb-5 rounded-lg shadow-sm text-sm mt-3 md:flex items-center gap-5">
          {/* ผู้บันทึก */}
          <div className="text-md space-y-3">
            <div>ผู้บันทึก</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          {/* ผู้แก้ไข */}
          <div className="text-md space-y-3">
            <div>ผู้แก้ไข</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          {/* ผู้ส่งเรื่อง */}
          <div className="text-md space-y-3">
            <div>ผู้ส่งเรื่อง</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          {/* ผู้อนุมัติ */}
          <div className="text-md space-y-3">
            <div>ผู้อนุมัติ</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
        </div>
      </div>
    </>
  )
}

const ModalSummary = () => {
  const [showModal, setShowModal] = useState(false)
  const [isAllReject, setAllReject] = useState('สาเหตุแบบหลายรายการ')

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

  const tableDataReject = [
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
  ]

  const callback = (payload) => {
    setAllReject(payload)
  }
  return (
    <>
      <button
        className="bg-text-green px-10 hover:bg-green-800 text-white text-sm rounded-md p-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        อนุมัติ
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* รายการครุภัณฑ์ที่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่อนุมัติ
                    </h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  {/* table */}
                  <div className="overflow-x-auto  scrollbar pt-4 mb-5">
                    <div className="w-[1000px] lg:w-full">
                      <div className="grid grid-cols-10 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                        <div className="col-span-1">ลำดับ</div>
                        <div className="col-span-2">เลขครุภัณฑ์</div>
                        <div className="col-span-3">ชื่อครุภัณฑ์</div>
                        <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                        <div className="col-span-1">จำนวน</div>
                        <div className="col-span-1">จำนวน(บาท)</div>
                      </div>
                      <TableSummaryApprove data={tableData} />
                    </div>
                  </div>
                </div>
                {/* รายการครุภัณฑ์ที่ไม่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่ไม่อนุมัติ
                    </h3>
                    <div className="flex items-center gap-5">
                      <h3>ประเภทการให้เหตุผล</h3>
                      <DropdownModalBorrowReject
                        callback={callback}
                        header={isAllReject}
                      />
                    </div>
                  </div>
                  {isAllReject === 'สาเหตุแบบหลายรายการ' ? (
                    <AllReject tableDataReject={tableDataReject} />
                  ) : (
                    <EachReject tableDataReject={tableDataReject} />
                  )}
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
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

const EachReject = ({ tableDataReject }) => {
  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto  scrollbar pt-4 mb-5">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-2">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
            <div className="col-span-1">จำนวน</div>
            <div className="col-span-1">จำนวน(บาท)</div>
            <div className="col-span-2">สาเหตุที่ไม่อนุมัติ</div>
          </div>
          <TableSummaryEachReject data={tableDataReject} />
        </div>
      </div>
    </div>
  )
}

const AllReject = ({ tableDataReject }) => {
  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto  scrollbar pt-4 mb-5">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-10 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-2">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
            <div className="col-span-1">จำนวน</div>
            <div className="col-span-1">จำนวน(บาท)</div>
          </div>
          <TableSummaryAllReject data={tableDataReject} />
        </div>
      </div>
      {/* สาเหตุที่ไม่อนุมัติ */}
      <div className="p-4 text-sm mt-3 ">
        <div className="text-lg ">สาเหตุที่ไม่อนุมัติ</div>
        <textarea
          maxLength=""
          className="h-[100px] border-[1px] mt-5  rounded-md w-full focus:border-sky-300"
        ></textarea>
      </div>
    </div>
  )
}

const TableSummaryApprove = (props) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div className="grid grid-cols-10 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetId}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetModelDetail}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.quantity}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.totalPrice}
            </div>
          </div>
        )
      })}
    </>
  )
}
const TableSummaryEachReject = (props) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div className="grid grid-cols-12 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetId}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetModelDetail}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.quantity}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.totalPrice}
            </div>
            <div className="col-span-2">
              <input
                type="text"
                className="border-[1px] w-full p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
const TableSummaryAllReject = (props) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div className="grid grid-cols-10 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetId}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetModelDetail}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.quantity}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.totalPrice}
            </div>
          </div>
        )
      })}
    </>
  )
}

const DropdownModalBorrowReject = ({ callback, header }) => {
  const [isOpen, setOpen] = useState(false)

  const handleDropDown = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        className=" text-text-gray border-[1px] rounded-md text-xs px-6 py-2.5 text-center inline-flex items-center"
        onClick={handleDropDown}
      >
        {header}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* menu */}
      <div
        className={
          isOpen
            ? 'absolute z-10 w-[225px] inset-x-0 top-10 border border-gray-100 rounded-md shadow-lg'
            : 'hidden'
        }
      >
        <ul
          className="bg-white rounded divide-y divide-gray-100 shadow text-text-gray"
          onClick={handleDropDown}
        >
          <li>
            <button
              className="py-2 px-4 w-full hover:bg-gray-100"
              onClick={() => callback('สาเหตุแบบหลายรายการ')}
            >
              สาเหตุแบบหลายรายการ
            </button>
          </li>
          <li>
            <button
              className="py-2 px-4 w-full hover:bg-gray-100"
              onClick={() => callback('แยกการให้สาเหตุแต่ละรายการ')}
            >
              แยกการให้สาเหตุแต่ละรายการ
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default BorrowApproveDetail
