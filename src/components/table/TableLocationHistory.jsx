const TableLocationHistory = (props) => {
  // table = {
  //   tableBlock: `py-2 border-[1px] border-block-green rounded`,
  // }
  return (
    <>
      {props.data.map((item, index) => {
        return (
          <div className="p-2 grid grid-cols-11 justify-center items-center gap-4 h-16 text-xs bg-white">
            <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {index + 1}
              </div>
            </div>
            <div className="col-span-3 bg-table-data text-center py-2 border-[1px] border-block-green rounded">
              {item.building}
            </div>
            <div className="col-span-1 bg-table-data text-center py-2 border-[1px] border-block-green rounded">
              {item.floor}
            </div>
            <div className="col-span-2 bg-table-data text-center py-2 border-[1px] border-block-green rounded">
              {item.room}
            </div>
            <div className="col-span-2 bg-table-data text-center py-2 border-[1px] border-block-green rounded">
              {item.moveInDate}
            </div>
            <div className="col-span-2 bg-table-data text-center py-2 border-[1px] border-block-green rounded">
              {item.moveOutDate}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TableLocationHistory
