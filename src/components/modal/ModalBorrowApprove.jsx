import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownModalBorrowApprove from '../dropdown/DropdownModalBorrowApprove'

const ModalBorrowApprove = () => {
  const [showModal, setShowModal] = useState(false)
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
      id: '1273',
      agencyName: 'ภาควิชาศาสตร์มืดมน',
      date: '23/11/2565',
      time: '12:00',
      offerDate: '22/05/2565',
      offerTime: '8:22',
    },
  ]
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
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 w-screen">
            <div className="relative w-11/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                {/* header */}
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl text-text-green">
                    ระบุสาเหตุที่ไม่อนุมัติ
                  </h3>
                  <div className="flex items-center gap-5">
                    <div>ประเภทการให้เหตุผล</div>
                    <DropdownModalBorrowApprove />
                  </div>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                {/* body */}
                {approveList.map((item, idx) => {
                  return (
                    <div className="relative p-6 flex-auto">
                      <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
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

export default ModalBorrowApprove
