import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import TableBorrowCheckIndex from '../components/table/TableBorrowCheckIndex'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import DateInput from '../components/date/DateInput'

const BorrowCheckIndex = () => {
  // useState
  const [perPage, setPerPage] = useState(10)
  const [totalRow, setTotalRow] = useState(25)

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState()

  // data
  let tableData = [
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'inProgress',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'inProgress',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'done',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'inProgress',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'done',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'done',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'inProgress',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'inProgress',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'done',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '7440-0036-032 ร.พ.น - 2031(2)-65',
      assetName: 'HP DESKTOP AIO 24-cb1005d',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
      status: 'done',
    },
  ]

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">รายการรอตรวจรับคืน</div>
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
          <div className="text-text-gray ml-2">รายการรอตรวจรับคืน</div>
        </div>

        {/* right button เพิ่มใบเบิก */}
        <button
          type="button"
          className="bg-text-green text-white px-4 py-2 rounded hover:bg-green-800"
        >
          + เพิ่มใบครุภัณฑ์
        </button>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <Selector placeholder={'ID'} />
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            // name="requestedId"
            // id="requestedId"
            // onChange={(e) => setRequestedId(e.target.value)}
            // value={requestedId}
            placeholder="ค้นหาโดยเลขที่ใบเบิก"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3">
          <Selector placeholder={'สถานะ'} />
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <Selector placeholder={'ฝ่าย/กลุ่มงาน'} />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            // onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>
      {/* table */}
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-sm">ผลการค้นหา {totalRow} รายการ</div>
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            {/* top bar */}
            <div className="grid grid-cols-12 gap-2 h-12 items-center text-center">
              <div className="col-span-1">ID ใบยืม</div>
              <div className="col-span-2">เลขครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-1">ชื่อผู้ขอยืม</div>
              <div className="col-span-1">วันที่ยืม</div>
              <div className="col-span-1">กำหนดคืน</div>
              <div className="col-span-1">วันที่คืน</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>
          <TableBorrowCheckIndex data={tableData} />
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

export default BorrowCheckIndex
