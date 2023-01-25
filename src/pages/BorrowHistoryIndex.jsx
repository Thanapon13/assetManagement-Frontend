import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const BorrowHistoryIndex = () => {
  // useState
  const [perPage, setPerPage] = useState(10)
  const [totalRow, setTotalRow] = useState(25)

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState()

  // data
  let tableData = [
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
    {
      borrowIdCode: '031241',
      borrowIdDoc: 'br.2302/10073',
      agencyBorrowerName: 'สำนักเทคโนโลยี',
      borrowDateAt: '20/12/2565',
      borrowSetReturnDate: '22/12/2565',
      borrowRealReturn: '23/12/2565',
    },
  ]

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">ประวัติการยืม</div>
      <div className="flex text-xs mt-3">
        <Link
          to="/"
          className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
        >
          Home
        </Link>
        <div className="text-text-gray">/</div>
        <div className="text-text-gray ml-2">ประวัติการยืม</div>
      </div>
      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center mt-8 mb-3 md:pl-5">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="เลขครุภัณฑ์"
            className="w-full border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="ID"
            className="w-full border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="เลขที่ใบยืม"
            className="w-full border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>
        <div className="md:col-span-2">
          <Selector placeholder={'หน่วยงาน'} />
        </div>
        <div className="md:col-span-1">
          <button
            className="p-2 border-[2px] w-full bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
            type="button"
          >
            ค้นหา
          </button>
        </div>
      </div>
      {/* table */}
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-sm">ผลการค้นหา {totalRow} รายการ</div>
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            {/* top bar */}
            <div className="grid grid-cols-10 gap-2 h-12 items-center text-center">
              <div className="col-span-1">ID ใบยืม</div>
              <div className="col-span-2">เลขที่เอกสารการยืม</div>
              <div className="col-span-3">หน่วยงานที่ยืม</div>
              <div className="col-span-1">วันที่ยืม</div>
              <div className="col-span-1">กำหนดคืน</div>
              <div className="col-span-1">วันที่คืน</div>
              <div className="col-span-1">Action</div>
            </div>
          </div>
          <TableBorrowHistory data={tableData} />
          {/* pagination */}
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex mr-10 items-center">
              <div>Rows per page:</div>
              <select
                id="perPage"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10" defaultValue="selected">
                  10
                </option>
              </select>
            </div>

            <div>1-{perPage} of 13</div>

            <button className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
              <HiChevronLeft className="text-lg" />
            </button>
            <button className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableBorrowHistory = (props) => {
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-10 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">{item.borrowIdCode}</div>
            <div className="col-span-2">{item.borrowIdDoc}</div>
            <div className="col-span-3 ">{item.agencyBorrowerName}</div>
            <div className="col-span-1">{item.borrowDateAt}</div>
            <div className="col-span-1">{item.borrowSetReturnDate}</div>
            <div className="col-span-1 ">{item.borrowRealReturn}</div>
            <div className="col-span-1 flex justify-center">
              <Link
                // type="button"
                to="borrowHistoryDetail"
                className="border flex gap-1 items-center p-2 rounded-md border-text-green text-text-green hover:bg-green-700 hover:text-white"
              >
                <svg
                  width="17"
                  height="11"
                  viewBox="0 0 17 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.49967 8.65592C9.33787 8.65592 10.0492 8.36374 10.6335 7.77936C11.2179 7.19499 11.5101 6.4837 11.5101 5.64551C11.5101 4.80731 11.2179 4.09603 10.6335 3.51165C10.0492 2.92728 9.33787 2.63509 8.49967 2.63509C7.66148 2.63509 6.9502 2.92728 6.36582 3.51165C5.78145 4.09603 5.48926 4.80731 5.48926 5.64551C5.48926 6.4837 5.78145 7.19499 6.36582 7.77936C6.9502 8.36374 7.66148 8.65592 8.49967 8.65592ZM8.49967 7.62884C7.94481 7.62884 7.47554 7.437 7.09186 7.05332C6.70818 6.66964 6.51634 6.20037 6.51634 5.64551C6.51634 5.09065 6.70818 4.62138 7.09186 4.23769C7.47554 3.85401 7.94481 3.66217 8.49967 3.66217C9.05453 3.66217 9.52381 3.85401 9.90749 4.23769C10.2912 4.62138 10.483 5.09065 10.483 5.64551C10.483 6.20037 10.2912 6.66964 9.90749 7.05332C9.52381 7.437 9.05453 7.62884 8.49967 7.62884ZM8.49967 10.958C6.77606 10.958 5.21773 10.4681 3.82467 9.48822C2.43162 8.50835 1.39273 7.22745 0.708008 5.64551C1.39273 4.06356 2.43162 2.78266 3.82467 1.8028C5.21773 0.822938 6.77606 0.333008 8.49967 0.333008C10.2233 0.333008 11.7816 0.822938 13.1747 1.8028C14.5677 2.78266 15.6066 4.06356 16.2913 5.64551C15.6066 7.22745 14.5677 8.50835 13.1747 9.48822C11.7816 10.4681 10.2233 10.958 8.49967 10.958Z"
                    fill="#38821D"
                  />
                </svg>
                ดูรายละเอียด
              </Link>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default BorrowHistoryIndex
