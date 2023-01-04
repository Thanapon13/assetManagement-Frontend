export const BorrowApprovedListItem = (props) => {
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full"
          >
            <div className="flex justify-between">
              <div className="flex space-x-10">
                <h1>เลขที่ ID เลขที่การยืม</h1>
                <h1>{item.id}</h1>
              </div>
              <div className="flex space-x-2 mr-5 text-text-gray">
                <h1>วันที่อนุมัติ: {item.date} ,</h1>
                <h1>{item.time}</h1>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex space-x-5">
                <h1 className="text-text-gray">หน่วยงานที่เสนอ</h1>
                <h1>{item.agencyName}</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex text-text-gray">
                  วันที่เสนอ
                  <div className="px-5 text-black">
                    {item.offerDate} , {item.offerTime}
                  </div>
                </div>
                <div className="">
                  <div className="text-text-green bg-sidebar-green p-2 border rounded-2xl ">
                    อนุมัติแล้ว
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
