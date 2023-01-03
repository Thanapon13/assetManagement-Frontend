import React, { useState } from 'react'

const TableBorrowApprove = (props) => {
  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    setIsClick(!isClick)
  }

  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div className="grid grid-cols-12 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1">
              <input
                type="checkbox"
                className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
              />
            </div>
            <div className="col-span-1 bg-table-data ml-11 min-[1600px]:ml-13 flex justify-center items-center h-[25px] w-[25px] border-[2px] rounded-full">
              {item.ID}
            </div>
            <div className="col-span-2 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetId}
            </div>
            <div className="col-span-3 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetName}
            </div>
            <div className="col-span-2 bg-table-data h-[30px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetModelDetail}
            </div>
            <div className="col-span-1  h-[30px] border-[2px] flex justify-center items-center rounded-md">
              {item.quantity}
            </div>
            <div className="col-span-1  h-[30px] border-[2px] flex justify-center items-center rounded-md">
              {item.unit}
            </div>
            <div className="col-span-1  h-[30px] border-[2px] flex justify-center items-center rounded-md">
              {item.totalPrice}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TableBorrowApprove
