import React from 'react'
import { Link } from 'react-router-dom'
import { BorrowApproveListItem, BorrowApprovedListItem } from '../components/'

const BorrowApprove = () => {
  const dataApproveList = [
    {
      id: '1271',
      agencyName: 'ภาควิชาอายุรศาสตร์',
      date: '29/12/2565',
      time: '18:00',
    },
    {
      id: '1272',
      agencyName: 'ภาควิชาเวทมนต์ศาสตร์มืด',
      date: '30/12/2565',
      time: '19:00',
    },
    {
      id: '1273',
      agencyName: 'ภาควิชาปรุงยาแมนเดรก',
      date: '31/12/2565',
      time: '20:10',
    },
  ]

  const dataApprovedList = [
    {
      id: '1271',
      agencyName: 'ภาควิชาศาสตร์มืด',
      date: '29/12/2565',
      time: '18:00',
      offerDate: '9/03/2565',
      offerTime: '9:31',
    },
    {
      id: '1272',
      agencyName: 'ภาควิชาศาสตร์มืดมิด',
      date: '30/12/2565',
      time: '19:00',
      offerDate: '12/03/2565',
      offerTime: '20:22',
    },
    {
      id: '1273',
      agencyName: 'ภาควิชาศาสตร์มืดมน',
      date: '23/11/2565',
      time: '12:00',
      offerDate: '22/05/2565',
      offerTime: '8:22',
    },
  ]

  const boxStyle = {
    boxStatus: `p-2 rounded-md flex flex-col items-center border-[2px] shadow-md`,
  }

  return (
    <>
      {/* body */}
      <div className="bg-background-page pt-5 p-3 w-[100vw] sm:w-[85vw] ">
        {/* Header */}
        <div className="text-2xl text-text-green ">อนุมัติยืมครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">อนุมัติยืมครุภัณฑ์</div>
          </div>
        </div>
        {/* รายการเสนออนุมัติประจำวัน */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg ">รายการเสนออนุมัติประจำวัน</div>
          {/* วันที่ */}
          <div className="grid grid-cols-3 pt-4 gap-10">
            <div className="flex flex-col gap-y-2">
              <label className=" text-text-gray flex">วันที่</label>
              <input
                type="date"
                placeholder="Example"
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-text-gray">
                หน่วยงานที่เสนอ(รหัส P4P)
              </label>
              <select className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md">
                <option className="">select</option>
                <option>select</option>
                <option>select</option>
                <option>select</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-text-gray">รายการ</label>
              <select className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md">
                <option selected>ดูทั้งหมด</option>
                <option>all</option>
                <option>all</option>
                <option>all</option>
              </select>
            </div>
          </div>
          {/* status */}
          <div className="grid grid-cols-4 pt-5 gap-20 p-2">
            <div className={`${boxStyle.boxStatus} border-blue-500`}>
              <h1>ทั้งหมด (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-blue-500">
                10
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-yellow-300`}>
              <h1>รออนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-yellow-700">
                4
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-green-500`}>
              <h1>อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-green-600">
                5
              </div>
            </div>
            <div className={`${boxStyle.boxStatus} border-red-500`}>
              <h1>ไม่อนุมัติ (รายการ)</h1>
              <div className="text-2xl font-semibold pt-3 text-red-500">1</div>
            </div>
          </div>
          {/* header approve list */}
          <div className="flex justify-between mt-5 pt-5 border-t-2">
            <div className="flex items-center space-x-5">
              <div className="flex">
                <input
                  type="checkbox"
                  className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <h1 className="ml-2">เลือกทั้งหมด</h1>
              </div>
              <h1 className="">เลือกแล้ว {3} รายการ</h1>
            </div>
            <div className="space-x-10">
              <button
                type="button"
                className=" p-2 border-[2px] text-red-500 border-red-400 rounded-sm hover:bg-red-200"
              >
                ไม่อนุมัติทั้งหมด
              </button>
              <button
                type="button"
                className=" p-2 border-[2px] bg-text-green border-text-green text-white rounded-sm hover:bg-green-800"
              >
                อนุมัติทั้งหมด
              </button>
            </div>
          </div>
          {/* approve list item */}
          <BorrowApproveListItem data={dataApproveList} />
        </div>
        {/* รายการคำขอที่จัดการแล้ว */}
        <div className="bg-white border-[1px] mb-5 p-4 rounded-lg shadow-sm text-sm mt-3">
          {/* header */}
          <div className="flex items-center space-x-10">
            <div className="text-lg">รายการคำขอที่จัดการแล้ว</div>
            <div className="flex space-x-5">
              <div className="flex text-text-green bg-sidebar-green p-2 border rounded-2xl ">
                อนุมัติแล้ว
                <div className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#38821D"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex text-red-500 bg-red-100 p-2 border rounded-2xl">
                ไม่อนุมัติ
                <div className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#CE4646"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* approved list item */}
          <BorrowApprovedListItem data={dataApprovedList} />
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        {/* <Link
          // type="button"
          to="/borrowList"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </Link>
        <button
          type="button"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          บันทึกคืนครุภัณฑ์
        </button> */}
      </div>
    </>
  )
}

export default BorrowApprove
