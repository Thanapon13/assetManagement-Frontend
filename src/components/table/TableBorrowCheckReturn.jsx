import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillPencilFill, BsFillEyeFill } from 'react-icons/bs'

const TableBorrowCheckReturn = ({
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

  let navigate = useNavigate()

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
        <div
          className={`${
            isClick
              ? ' bg-green-100 text-green-700 border-green-100'
              : ' bg-orange-100 border-orange-100 text-orange-400 '
          } px-4 py-2 rounded-2xl border`}
        >
          {isClick ? 'คืนสำเร็จ' : 'รอตรวจรับ'}
        </div>
        <Link
          // type="button"
          // to={`/borrowSaving/${ID}`}
          // to="borrowSaving"
          onClick={handleClick}
          className={`${
            isClick
              ? 'bg-sidebar-green hidden text-text-green rounded-xl hover:text-white'
              : ' text-white'
          } bg-text-green hover:bg-green-800 border border-spacing-5  rounded-md p-2`}
        >
          {isClick ? '' : 'ตรวจรับ'}
        </Link>
      </div>
    </div>
  )
}

export default TableBorrowCheckReturn
