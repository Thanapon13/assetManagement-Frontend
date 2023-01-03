import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TableApprovalWithdrawList = ({
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
      className={`grid grid-cols-16 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      <div className="col-span-1">{borrowDocId}</div>
      <div className="col-span-1">{ID}</div>
      <div className="col-span-2">{assetId}</div>
      <div className="col-span-2 ">{assetName}</div>
      <div className="col-span-2">{borrowerName}</div>
      <div className="col-span-1">{borrowDateAt}</div>
      <div className="col-span-1 ">{borrowSetDateReturn}</div>
      <div className="col-span-1">{borrowReturnDate}</div>
      <div className="col-span-1">{borrowPricePerDay}</div>
      <div className="col-span-1">{totalDay}</div>
      <div className="col-span-1">{totalPrice}</div>
      <div className="col-span-2">
        <Link
          // type="button"
          // to={`/borrowSaving/${ID}`}
          to={`/borrowSaving`}
          onClick={handleClick}
          className={`${
            isClick
              ? 'bg-sidebar-green text-text-green rounded-xl hover:text-white'
              : ' text-white'
          } bg-text-green hover:bg-green-800 border border-spacing-5  rounded-md p-2`}
        >
          {isClick ? 'คืนแล้ว' : 'บันทึกคืน'}
        </Link>
      </div>
    </div>
  )
}

export default TableApprovalWithdrawList
