import { Link } from 'react-router-dom'

export const BorrowApproveListItem = (props) => {
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div key={idx} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
            />
            <div className="bg-background-page border-[2px] rounded-md mt-5 p-3 w-full">
              <div className="flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.id}</h1>
                </div>
                <div className="flex space-x-5 mr-5">
                  <h1>{item.date}</h1>
                  <h1>{item.time}</h1>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่เสนอ</h1>
                  <h1>{item.agencyName}</h1>
                </div>
                <div className="flex justify-end space-x-5">
                  <button
                    type="button"
                    className=" p-2 px-10 border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-200"
                  >
                    ไม่อนุมัติ
                  </button>
                  <Link
                    // type="button"
                    to="borrowDetailApprove"
                    className=" p-2 px-10 border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
                  >
                    อนุมัติ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
