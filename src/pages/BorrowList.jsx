import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import TableBorrowList from '../components/table/TableBorrowList'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'

const BorrowList = () => {
  // useState
  const [perPage, setPerPage] = useState(10)
  const [totalRow, setTotalRow] = useState(25)

  // data
  let tableData = [
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
    {
      borrowDocId: '001',
      ID: '202123',
      assetId: '411-3124-213',
      assetName: 'พัดลมโคจรติดเพดาน 16 นิ้ว',
      borrowerName: 'กิตติศักดิ์',
      borrowDateAt: '20/12/2565',
      borrowSetDateReturn: '22/12/2565',
      borrowReturnDate: '23/12/2565',
      borrowPricePerDay: '150 บ.',
      totalDay: '5',
      totalPrice: '750 บ.',
    },
  ]

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">รายการยืม-คืน ครุภัณฑ์</div>
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
          <div className="text-text-gray ml-2">รายการเบิกจ่าย</div>
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
      <div className="grid grid-cols-12 gap-2 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="col-span-2">
          <Selector placeholder={'เลขที่ใบเบิก'} />
        </div>

        <div className="col-span-6 h-full relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            placeholder="ค้นหาโดยเลขที่ใบเบิก"
            className="pl-8 w-full h-full border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <button
          type="button"
          className="flex justify-center h-full items-center  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          <div className="text-xl text-white">
            <AiOutlineSearch />
          </div>
        </button>

        <div className="col-span-2">
          <Selector placeholder={'สถานะการยืม'} />
        </div>
      </div>

      {/* table */}
      <div className="text-text-black-table text-xs font-semibold bg-white rounded-t-lg border-b-[1px] border-border-gray-table p-2">
        <div>ผลการค้นหา {totalRow} รายการ</div>
        {/* top bar */}
        <div className="grid grid-cols-16 gap-2 h-12 items-center text-center">
          <div className="col-span-1">ขอยืม</div>
          <div className="col-span-1">ID</div>
          <div className="col-span-2">เลขครุภัณฑ์</div>
          <div className="col-span-2">ชื่อครุภัณฑ์</div>
          <div className="col-span-2">ชื่อผู้ขอยืม</div>
          <div className="col-span-1">วันที่ยืม</div>
          <div className="col-span-1">กำหนดคืน</div>
          <div className="col-span-1">วันที่คืน</div>
          <div className="col-span-1">ค่ายืม/วัน</div>
          <div className="col-span-1">จำนวนวัน</div>
          <div className="col-span-1">มูลค่าการยืม</div>
          <div className="col-span-2">Action</div>
        </div>
      </div>
      {tableData?.map((val, idx) => {
        return (
          <TableBorrowList
            key={idx}
            index={idx}
            borrowDocId={val.borrowDocId}
            ID={val.ID}
            assetId={val.assetId}
            assetName={val.assetName}
            borrowerName={val.borrowerName}
            borrowDateAt={val.borrowDateAt}
            borrowSetDateReturn={val.borrowSetDateReturn}
            borrowReturnDate={val.borrowReturnDate}
            borrowPricePerDay={val.borrowPricePerDay}
            totalDay={val.totalDay}
            totalPrice={val.totalPrice}
          />
        )
      })}
      <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
        <div className="flex mr-10">
          <div>Rows per page:</div>
          <select
            id="perPage"
            className="w-12 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  )
}

export default BorrowList
