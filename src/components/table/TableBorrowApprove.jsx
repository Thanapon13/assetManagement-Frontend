import React, { useState } from 'react'
import DropdownStatus from '../dropdown/DropdownStatus'

const TableBorrowApprove = ({assetList,handleCheckboxChange}) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <>
      {assetList.map((item, idx) => {
        return (
          <div className="grid grid-cols-12 gap-2 pt-2 pb-2 text-xs text-center items-center bg-white">
            <div className="col-span-1">
              <input
                type="checkbox"
                className=" text-text-green placeholder-text-green focus:ring-0 rounded"
                checked={item.checked}
                onChange={() => handleCheckboxChange(assetList, item._id)}
              />
            </div>
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.brand}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.quantity}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.unit}
            </div>
            <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.pricePerUnit}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TableBorrowApprove
