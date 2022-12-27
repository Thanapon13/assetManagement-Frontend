import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
export const TableBorrowRecord = ({
  index,
  ID,
  assetId,
  assetName,
  borrowerName,
  quantity,
}) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <div
      className={`grid grid-cols-10 gap-2 h-12 pt-2 p-2 text-xs text-center items-center bg-white`}
    >
      <div className="col-span-1 bg-table-data ml-11 min-[1600px]:ml-14 flex justify-center items-center h-[25px] w-[25px] border-[2px] rounded-full">
        {ID}
      </div>
      <div className="col-span-2 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
        {assetId}
      </div>
      <div className="col-span-3 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
        {assetName}
      </div>
      <div className="col-span-2 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
        {borrowerName}
      </div>
      <div className="col-span-1  h-[30px] border-[2px] flex justify-center items-center rounded-md">
        {quantity}
      </div>
      <div className="col-span-1">
        <button
          type="button"
          onClick={handleClick}
          className={`${
            isClick
              ? 'bg-sidebar-green  rounded-xl hover:text-white'
              : ' text-white'
          } bg-red-500 hover:bg-red-600 border border-spacing-5  rounded-md p-2`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default TableBorrowRecord
