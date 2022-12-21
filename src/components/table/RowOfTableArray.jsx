function RowOfTableArray({
  index,
  ID,
  inventoryNumber,
  serialNumber,
  processingOrder,
  name,
  invoice,
  department,
  sector,
  agency,
  building,
  floor,
  room,
  status,
  price,
  PM,
  CB,
}) {
  return (
    <div
      className={`grid grid-cols-17 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table `}
    >
      <div className="ml-2">{ID}</div>
      <div className="col-span-3">{inventoryNumber}</div>
      <div className="col-span-3 ">{name}</div>
      {/* <div>{processingOrder}</div> */}
      <div className="col-span-2">{department}</div>
      <div className="col-span-3">{sector}</div>
      {/* <div className="text-center">{department}</div> */}
      <div className="col-span-2 ">{building}</div>
      <div className="col-span-1 text-text-blue text-center bg-background-light-blue p-2 rounded-full">{status}</div>
      <div className="col-span-2 mr-2">{building}</div>
      {/* <div className=" grid grid-cols-2 gap-2">
        <div className="text-center">{floor}</div>
        <div className="text-center">{room}</div>
      </div>
      <div className="col-span-2 border-[1px] border-lime-600 text-lime-600  rounded-md text-center h-5">
        {status}
      </div> */}
      {/* <div className="text-right">{(+price)?.toFixed(1)}</div>
      <div className="grid grid-cols-2 gap-2">
        <div>{PM}</div>
        <div>{CB}</div>
      </div> */}
    </div>
  );
}

export default RowOfTableArray;
