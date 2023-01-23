import React, { useState } from 'react'
import DropdownModalBorrowApprove from '../dropdown/DropdownModalBorrowApprove'

const ModalBorrowApprove = () => {
  const [showModal, setShowModal] = useState(false)
  const [isAllReject, setAllReject] = useState('แยกการให้สาเหตุแต่ละรายการ')

  const approveList = [
    {
      id: '1271',
      agencyName: 'ภาควิชาศาสตร์มืด',
      date: '29/12/2565',
      time: '18:00',
      offerDate: '9/03/2565',
      offerTime: '9:31',
    },
    {
      id: '1272',
      agencyName: 'ภาควิชาศาสตร์มืดมิด',
      date: '30/12/2565',
      time: '19:00',
      offerDate: '12/03/2565',
      offerTime: '20:22',
    },
    {
      id: '1272',
      agencyName: 'ภาควิชาศาสตร์มืดมิด',
      date: '30/12/2565',
      time: '19:00',
      offerDate: '12/03/2565',
      offerTime: '20:22',
    },
    {
      id: '1272',
      agencyName: 'ภาควิชาศาสตร์มืดมิด',
      date: '30/12/2565',
      time: '19:00',
      offerDate: '12/03/2565',
      offerTime: '20:22',
    },
  ]

  const callback = (payload) => {
    setAllReject(payload)
  }
  return (
    <>
      <button
        className="p-2 border-[2px] text-red-500 border-red-400 rounded-sm hover:bg-red-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ไม่อนุมัติทั้งหมด
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* header */}
                <div className="flex items-center justify-between p-5 ">
                  <h3 className="text-xl text-text-green">
                    ระบุสาเหตุที่ไม่อนุมัติ
                  </h3>
                  <div className="flex items-center gap-5 mr-[5vw]">
                    <div>ประเภทการให้เหตุผล</div>
                    <DropdownModalBorrowApprove
                      callback={callback}
                      header={isAllReject}
                    />
                  </div>
                  <button
                    className="border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                {/* body */}
                {isAllReject === 'แยกการให้สาเหตุแต่ละรายการ' ? (
                  <EachReject data={approveList} />
                ) : (
                  <AllReject data={approveList} />
                )}
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

const EachReject = (props) => {
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div key={idx} className="p-3">
            <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
              <div className="md:flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.id}</h1>
                </div>
                <div className="flex space-x-5 mr-5">
                  <h1>{item.date}</h1>
                  <h1>{item.time}</h1>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่เสนอ</h1>
                  <h1>{item.agencyName}</h1>
                </div>
                <div className="flex items-center space-x-5 mt-2">
                  <label>สาเหตุที่ไม่อนุมัติ</label>
                  <input
                    type="text"
                    placeholder="Example"
                    className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

const AllReject = (props) => {
  return (
    <>
      <div className="flex items-center space-x-5 p-6">
        <label>สาเหตุที่ไม่อนุมัติ</label>
        <input
          type="text"
          placeholder="Example"
          className="border-[1px] w-10/12 p-2 h-[38px]  text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      {props.data.map((item, idx) => {
        return (
          <div key={idx} className="p-3">
            <div className="bg-background-page border-[2px] rounded-md p-6 w-full">
              <div className="md:flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ ID เลขที่การยืม</h1>
                  <h1>{item.id}</h1>
                </div>
                <div className="flex space-x-5 mr-5">
                  <h1>{item.date}</h1>
                  <h1>{item.time}</h1>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่เสนอ</h1>
                  <h1>{item.agencyName}</h1>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ModalBorrowApprove
