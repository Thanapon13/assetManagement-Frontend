import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillPencilFill, BsFillEyeFill } from 'react-icons/bs'

const TableBorrowList = ({
  index,
  borrowDocId,
  ID,
  assetId,
  assetName,
  borrowerName,
  borrowDateAt,
  borrowSetDateReturn,
  borrowReturnDate,
  borrowPricePerDay,
  totalDay,
  totalPrice,
}) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <div
      className={`grid grid-cols-12 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="col-span-1">{borrowDocId}</div>
      <div className="col-span-2">{assetId}</div>
      <div className="col-span-3 ">{assetName}</div>
      <div className="col-span-1">{borrowerName}</div>
      <div className="col-span-1">{borrowDateAt}</div>
      <div className="col-span-1 ">{borrowSetDateReturn}</div>
      <div className="col-span-1">{borrowReturnDate}</div>
      <div className="col-span-2 flex justify-center space-x-5">
        <Link
          // type="button"
          // to={`/borrowSaving/${ID}`}
          to="borrowSaving"
          onClick={handleClick}
          className={`${
            isClick
              ? 'bg-sidebar-green text-text-green rounded-xl hover:text-white'
              : ' text-white'
          } bg-text-green hover:bg-green-800 border border-spacing-5  rounded-md p-2`}
        >
          {isClick ? 'คืนแล้ว' : 'บันทึกคืน'}
        </Link>
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
        </button>
        <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </button>
      </div>
    </div>
  )
}

export default TableBorrowList
