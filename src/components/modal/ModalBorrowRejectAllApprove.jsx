import { el } from "date-fns/locale";
import React, { useState } from "react";
import { useEffect } from "react";
import { rejectAllWaitingBorrow } from "../../api/borrowApi";
import DropdownModalBorrowApprove from "../dropdown/DropdownModalBorrowApprove";
import { IoIosClose } from "react-icons/io";

const ModalBorrowRejectAllApprove = ({
  state,
  setState,
  fetchFirstBorrowApproveData,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isAllReject, setAllReject] = useState("แยกการให้สาเหตุแต่ละรายการ");

  const callback = (payload) => {
    setAllReject(payload);
  };

  const handleSubmitReject = async(e, state) => {
    e.preventDefault();

    const filteredAndModifiedArray = (input) => {
      const CheckedArray = input.filter((item) => item.checked === true);

      const filteredInput = CheckedArray.map((el) => {
        // add the reason property to each item in the filtered packageAssetIdArray
        const modifiedPackageAssetIdArray = el.packageAssetIdArray.map((asset) => ({
          ...asset,
          reason: el.reason,
        }));

        // add the reason property to each item in the assetIdArray
        const modifiedAssetIdArray = el.assetIdArray.map((asset) => ({
          ...asset,
          reason: el.reason,
        }));

        // create a new object with the modified packageAssetIdArray and assetIdArray
        return {
          ...el,
          packageAssetIdArray: modifiedPackageAssetIdArray,
          assetIdArray: modifiedAssetIdArray,
        };
      });

      return filteredInput;
    };

    const result = filteredAndModifiedArray(state);

    // send api
    const topApproveListJSON = JSON.stringify(result);
    await rejectAllWaitingBorrow({
      topApproveList: topApproveListJSON,
    });
    await fetchFirstBorrowApproveData();
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
                  <div className="flex items-center gap-5 mr-[5vw]">
                    <div>ประเภทการให้เหตุผล</div>
                    <DropdownModalBorrowApprove
                      callback={callback}
                      header={isAllReject}
                    />
                  </div>
                  <button
                    // className="border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                  >
                    <IoIosClose className="text-2xl" />
                    {/* <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                      x
                    </span> */}
                  </button>
                </div>
                {/* body */}
                {isAllReject === "แยกการให้สาเหตุแต่ละรายการ" ? (
                  <EachReject state={state} setState={setState} />
                ) : (
                  <AllReject state={state} setState={setState} />
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
                    className="text-white bg-red-600 px-10 py-2 border rounded-md "
                    type="button"
                    onClick={(e) => {
                      setShowModal(false);
                      handleSubmitReject(e, state);
                    }}
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
  );
};

const EachReject = ({ state, setState }) => {
  const anyChecked = state.some((item) => item.checked);
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const handleChangeEachReject = (e, idx) => {
    const clone = [...state];
    clone[idx][e.target.name] = e.target.value;
    console.log(clone);
    setState(clone);
  };

  return (
    <div>
      {anyChecked ? (
        state.map((item, idx) => {
          if (item.checked) {
            return (
              <div key={idx} className="p-3">
                <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
                  <div className="md:flex justify-between">
                    <div className="flex space-x-10">
                      <h1>เลขที่ ID เลขที่การยืม</h1>
                      <h1>{item.borrowIdDoc}</h1>
                    </div>
                    <div className="flex space-x-5 mr-5">
                      <h1>
                        {" "}
                        {new Date(item.borrowDate).toLocaleDateString(
                          "th-TH",
                          options
                        )}
                      </h1>
                      <h1>
                        {" "}
                        {new Date(item.borrowDate).toLocaleTimeString(
                          "th-TH",
                          hoursOptions
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex space-x-5">
                      <h1>หน่วยงานที่เสนอ</h1>
                      <h1>{item.sector}</h1>
                    </div>
                    <div className="flex items-center space-x-5 mt-2">
                      <label>สาเหตุที่ไม่อนุมัติ</label>
                      <input
                        type="text"
                        name="reason"
                        value={item.reason}
                        onChange={(e) => handleChangeEachReject(e, idx)}
                        placeholder="Example"
                        className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="flex justify-center items-center h-40">
          ยังไม่มีรายการยืมที่ท่านเลือก
        </div>
      )}
    </div>
  );
};

const AllReject = ({ state, setState }) => {
  const [allReason, setAllReason] = useState("");

  const anyChecked = state.some((item) => item.checked);
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const handleChangeAllReject = (e) => {
    setAllReason(e.target.value);
    const clone = [...state];
    const newClone = clone.map((item) => {
      return { ...item, reason: e.target.value };
    });
    setState(newClone);
  };

  return (
    <>
      <div className="flex items-center space-x-5 p-6">
        <label>สาเหตุที่ไม่อนุมัติ</label>
        <input
          type="text"
          value={allReason}
          onChange={handleChangeAllReject}
          placeholder="Example"
          className="border-[1px] w-10/12 p-2 h-[38px]  text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
        />
      </div>
      {anyChecked ? (
        state.map((item, idx) => {
          if (item.checked) {
            return (
              <div key={idx} className="p-3">
                <div className="bg-background-page border-[2px] rounded-md p-6 w-full">
                  <div className="md:flex justify-between">
                    <div className="flex space-x-10">
                      <h1>เลขที่ ID เลขที่การยืม</h1>
                      <h1>{item.borrowIdDoc}</h1>
                    </div>
                    <div className="flex space-x-5 mr-5">
                      <h1>
                        {" "}
                        {new Date(item.borrowDate).toLocaleDateString(
                          "th-TH",
                          options
                        )}
                      </h1>
                      <h1>
                        {" "}
                        {new Date(item.borrowDate).toLocaleTimeString(
                          "th-TH",
                          hoursOptions
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex space-x-5">
                      <h1>หน่วยงานที่เสนอ</h1>
                      <h1>{item.sector}</h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="flex justify-center items-center h-40">
          ยังไม่มีรายการยืมที่ท่านเลือก
        </div>
      )}
    </>
  );
};

export default ModalBorrowRejectAllApprove;
