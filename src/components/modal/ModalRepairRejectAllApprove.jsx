import React, { useState } from 'react'
import DropdownModalBorrowApprove from '../dropdown/DropdownModalBorrowApprove'
import { IoIosClose } from 'react-icons/io'
import { rejectAllWaitingTransfer } from '../../api/transferApi'
import DropdownRejectReason from '../dropdown/DropdownRejectReason'

const ModalRepairRejectAllApprove = ({ state, setState, isFetch }) => {
  const [showModal, setShowModal] = useState(false)
  const [isAllReject, setAllReject] = useState('แยกการให้สาเหตุแต่ละรายการ')
  const [error, setError] = useState(false)

  const callback = (payload) => {
    setAllReject(payload)
  }

  const handleSubmitReject = async (e) => {
    e.preventDefault();
    let err
    const allReason = isAllReject == "สาเหตุแบบหลายรายการ" && state[0].reason
    const result = state?.map((el) => {
      if (!allReason && !el.reason) err = true
      const modifiedPackageAssetIdArray = el.packageAssetIdArray.map((asset) => ({
        // const modifiedPackageAssetIdArray = el.subComponentTransfer.map((asset) => ({
        ...asset,
        reason: allReason || el.reason,
      }));

      const modifiedAssetIdArray = el.assetIdArray.map((asset) => ({
        ...asset,
        reason: allReason || el.reason,
      }));

      return {
        ...el,
        packageAssetIdArray: modifiedPackageAssetIdArray,
        assetIdArray: modifiedAssetIdArray,
      };
    })
    console.log(result, err, allReason)
    if (err) {
      setError(err)
      return
    }
    try {
      await rejectAllWaitingTransfer({
        topApproveList: (result),
      });
      setShowModal(false)
      isFetch(true)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <button
        className="p-2 px-3 border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-500/[.15]"
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
                  <h3 className="text-xl">ระบุสาเหตุที่ไม่อนุมัติ</h3>
                  {/* <div className="flex items-center gap-5 mr-[5vw] px-5">
                    <div>ประเภทการให้เหตุผล</div>
                    <DropdownModalBorrowApprove
                      callback={callback}
                      header={isAllReject}
                    />
                  </div> */}
                  <button
                    className="border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    {/* <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full"> */}
                    <span
                      className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                    >
                      <IoIosClose className="text-2xl" />
                    </span>
                  </button>
                </div>
                {!state.length
                  ? <div className="flex justify-center items-center h-40">
                    ยังไม่มีรายการที่เลือก
                  </div>
                  : <div className="flex items-center gap-5 px-5 mb-3">
                    <div>ประเภทการให้เหตุผล</div>
                    <DropdownRejectReason
                      callback={callback}
                      header={isAllReject}
                    />
                  </div>
                }
                {isAllReject === 'แยกการให้สาเหตุแต่ละรายการ' ? (
                  <EachReject state={state} setState={setState} error={error} />
                ) : (
                  <AllReject state={state} setState={setState} error={error} />
                )}
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md hover:bg-gray-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="p-2 px-10 border-[2px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
                    type="button"
                    onClick={handleSubmitReject}
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

const EachReject = ({ state, setState, error }) => {

  const handleReasonChange = (index) => (e) => {
    const updatedTopApproveList = [...state];
    updatedTopApproveList[index].reason = e.target.value;
    updatedTopApproveList[index].subComponentTransfer.forEach((subComponent) => {
      subComponent.reason = e.target.value;
    });
    setState(updatedTopApproveList);
  };
  return (
    <>
      {state.map((item, idx) => {
        return (
          <div key={idx} className="p-3">
            <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
              <div className="md:flex justify-between">
                <div className="flex space-x-10">
                <h1>เลขที่ใบแจ้งซ่อม</h1>
                  <h1>{item.informRepairIdDoc}</h1>
                </div>
                <div className="flex space-x-2 mr-5">
                  <h1>{item.transferPendingDate}</h1>
                  <h1>{item.transferPendingTime}</h1>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex space-x-5">
                <h1>หน่วยงานที่ส่งซ่อม</h1>
                  <h1>{item.repairSector}</h1>
                </div>
                <div className="flex items-center space-x-5 mt-2">
                  <label>สาเหตุที่ไม่อนุมัติ</label>
                  <input
                    type="text"
                    // placeholder="Example"
                    onChange={handleReasonChange(idx)}
                    className={`${error && !item.reason && "border-red-500"} border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    value={item.reason}
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

const AllReject = ({ state, setState, error }) => {
  const [reason, setReason] = useState("")

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    const updatedTopApproveList = state.map(item => {
      item.reason = e.target.value;
      item.subComponentTransfer = item.subComponentTransfer.map(subItem => {
        subItem.reason = e.target.value;
        return subItem;
      });
      return item;
    });
    console.log(updatedTopApproveList)
    setState(updatedTopApproveList);
  };

  return (
    <>
      <div className="flex items-center space-x-5 px-5">
        <label>สาเหตุที่ไม่อนุมัติ</label>
        <input
          type="text"
          value={reason}
          onChange={handleReasonChange}
          className={`${error && !reason && "border-red-500"} border-[1px] w-9/12 p-2 h-[38px]  text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none focus:border-focus-blue`}
        />
      </div>
      {state.map((item, idx) => {
        return (
          <div key={idx} className="p-3">
            <div className="bg-background-page border-[2px] rounded-md p-6 w-full">
              <div className="md:flex justify-between">
                <div className="flex space-x-10">
                  <h1>เลขที่ใบแจ้งซ่อม</h1>
                  <h1>{item.informRepairIdDoc}</h1>
                </div>
                <div className="flex space-x-2 mr-5">
                  <h1>{item.transferPendingDate}</h1>
                  <h1>{item.transferPendingTime}</h1>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex space-x-5">
                  <h1>หน่วยงานที่ส่งซ่อม</h1>
                  <h1>{item.repairSector}</h1>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ModalRepairRejectAllApprove
