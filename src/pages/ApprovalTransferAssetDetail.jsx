import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RowofTableApprovalTransferDetail from "../components/table/RowofTableApprovalTransferDetail";
import { useEffect } from "react";
import { approvePartiallyTransfer, getTransferById } from "../api/transferApi";
import { IoIosClose } from "react-icons/io";
import DropdownModalBorrowApprove from "../components/dropdown/DropdownModalBorrowApprove";
import DropdownRejectReason from "../components/dropdown/DropdownRejectReason";

const ApprovalTransferAssetDetail = () => {
  let { transferId } = useParams();

  // const fetchData = {
  //   transferDocumentNumber: "trf.6603/1723011",
  //   transferSector: "ภาควิชาอายุรศาสตร์",
  //   subSector: "งานบริหารเภสัช",
  //   handler: "นายธรรมกร นามสมมุติ",
  //   transfereeSector: "สำนักบริหารงานเภสัช",
  //   building: "อาคารสำนักงานบริหารกิจการ",
  //   floor: "7",
  //   room: "704",
  //   note: "",
  //   transferPendingDate: "29/12/2565",
  //   transferPendingTime: "18:00",
  //   transferActiveDate: "1/1/2566",
  //   transferActiveTime: "18:00",
  //   firstName_recorder: "สุริวิภา",
  //   lastName_recorder: "ภาวนาจิต",
  //   dateTime_recorder: "12/12/2565",
  //   firstName_courier: "สุริวิภา",
  //   lastName_courier: "ภาวนาจิต",
  //   dateTime_courier: "12/12/2565",
  //   firstName_approver: "สุริวิภา",
  //   lastName_approver: "ภาวนาจิต",
  //   dateTime_approver: "12/12/2565",
  //   status: "waiting",

  //   reason: "",
  //   subComponentTransfer: [
  //     {
  //       assetNumber: "7440-001-0001",
  //       productName: "พัดลม hatari แบบ...",
  //       serialNumber: "HjYn12wert434th/a",
  //       hostSector: "สำนักคอมพิวเตอร์",
  //       reason: "",
  //       status: "wating",
  //       checked: false,
  //     },
  //     {
  //       assetNumber: "8440-001-0001",
  //       productName: "พัดลม hatari แบบ...",
  //       serialNumber: "HjYn12wert434th/a",
  //       hostSector: "สำนักคอมพิวเตอร์",
  //       reason: "",
  //       status: "wating",
  //       checked: false,
  //     },
  //     {
  //       assetNumber: "9440-001-0001",
  //       productName: "พัดลม hatari แบบ...",
  //       serialNumber: "HjYn12wert434th/a",
  //       hostSector: "สำนักคอมพิวเตอร์",
  //       reason: "",
  //       status: "wating",
  //       checked: false,
  //     },
  //     {
  //       assetNumber: "2440-001-0001",
  //       productName: "พัดลม hatari แบบ...",
  //       serialNumber: "HjYn12wert434th/a",
  //       hostSector: "สำนักคอมพิวเตอร์",
  //       reason: "",
  //       status: "wating",
  //       checked: false,
  //     },
  //   ],
  // };

  // const [data, setData] = useState(fetchData);
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransferById(transferId)
        console.log(res, '//*')
        const totalArr = res.data.transfer.assets.concat(res.data.transfer.packageAssets)
        totalArr.map(ele => {
          ele.checked = false
        })
        setData({
          ...res.data.transfer,
          subComponentTransfer: totalArr
        })
        console.log({
          ...res.data.transfer,
          subComponentTransfer: totalArr
        })
      } catch (err) {
        setData([])
      }
    }
    fetchData()
  }, [])

  const [isChecked, setIsChecked] = useState(false);

  const handleAllCheckboxChange = () => {
    setIsChecked(!isChecked);
    const newCheck = !isChecked;
    const newList = data.subComponentTransfer.map((item) => {
      return { ...item, checked: newCheck };
    });
    setData({ ...data, subComponentTransfer: newList });
  };

  const handleCheckboxChange = (list, index) => {
    const newList = list.map((item, idx) => {
      if (index === idx) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setData({ ...data, subComponentTransfer: newList });

    if (!isChecked && newList?.filter(ele => ele.checked).length == data.subComponentTransfer.length) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  };

  const handleChange = (e) => {
    const clone = { ...data };
    clone[e.target.name] = e.target.value;
    console.log(clone);
    setData(clone);
  };

  async function handleSubmit(isAllReason) {
    let err
    const modifiedAssetIdArray = data.assetIdArray?.map(asset => {
      if (err) return
      const ele = data.subComponentTransfer.find(ele => ele._id == asset.assetId)
      if (ele.checked == false) {
        if (isAllReason == "สาเหตุแบบหลายรายการ") {
          if (!data.reason) err = true
        } else {
          if (!ele.reason) err = true
        }
        return { ...asset, reason: ele.reason }
      }
    })

    const modifiedPackageAssetIdArray = data.packageAssetIdArray?.map(asset => {
      if (err) return
      if (data.subComponentTransfer.find(ele => ele._id == asset.assetId).checked == false) {
        if (ele.checked == false) {
          if (isAllReason == "สาเหตุแบบหลายรายการ") {
            if (!data.reason) err = true
          } else {
            if (!ele.reason) err = true
          }
          return { ...asset, reason: ele.reason }
        }

      }
    })
    console.log(modifiedAssetIdArray, modifiedPackageAssetIdArray)
    if (err) return err
    try {
      await approvePartiallyTransfer(transferId, {
        input: {
          assetIdArray: modifiedAssetIdArray,
          packageAssetIdArray: modifiedPackageAssetIdArray
        }
        // ...data,
        // assetIdArray: modifiedAssetIdArray,
        // packageAssetIdArray: modifiedPackageAssetIdArray
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green ">รายละเอียดการขออนุมัติ</div>
        <div className="flex pt-3">
          {/* left home */}
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">
              <Link
                to="/approvalTransferAsset"
                className='className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2'
              >
                อนุมัติโอน-ย้ายครุภัณฑ์
              </Link>
            </div>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการขออนุมัติ</div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg">รายละเอียดการโอน-ย้ายครุภัณฑ์</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3">
            <div className="text-gray-500">เลขที่เอกสารการโอนย้าย</div>
            <div>
              {data?.transferDocumentNumber}
            </div>
            <div className="text-gray-500">หน่วยงาน</div>
            <div>
              {data?.transferSector}
            </div>
            <div className="text-gray-500">ภาควิชา</div>
            <div>{data?.subSector}</div>
            <div className="text-gray-500">ผู้ดำเนินการ</div>
            <div>{data?.name_recorder}</div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ขอโอนย้าย</div>
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-14 gap-2 text-center">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleAllCheckboxChange}
                      className=" text-text-green rounded-md placeholder-text-green focus:ring-0"
                    />
                  </div>
                  <div className="col-span-1 ">ลำดับ</div>
                  <div className="col-span-3">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-3">Serial Number</div>
                  <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                </div>
              </div>
              <div className="scrollbar overflow-y-auto max-h-[300px]">
                {data.subComponentTransfer?.map((el, idx) => {
                  return (
                    <RowofTableApprovalTransferDetail
                      key={idx}
                      index={idx}
                      row={el}
                      data={data}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  );
                })}

              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg">สถานที่ตั้งใหม่</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3">
            <div className="text-gray-500">หน่วยงานที่รับโอน</div>
            <div>
              {data?.transferDocumentNumber}
            </div>
            <div className="text-gray-500">อาคาร</div>
            <div>{data?.building}</div>
            <div className="text-gray-500">ชั้น</div>
            <div>{data?.floor}</div>
            <div className="text-gray-500">ห้อง</div>
            <div>{data?.room}</div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-lg ">หมายเหตุ</div>
          <textarea
            maxLength=""
            name="note"
            className="min-h-[7em] scrollbar border-[1px] mt-5 rounded-md w-full focus:border-sky-300"
            onChange={handleChange}
          ></textarea>
        </div>
        {/* footer */}
        <div className="flex justify-between items-center gap-5 p-3 text-sm ">
          {/* <Link
            to="/approvalTransferAsset"
            className="border-[1px] border-red-400 px-7 hover:bg-red-500/[.15] text-red-600 text-sm rounded-md p-2"
          >
            ไม่อนุมัติ
          </Link> */}
          <ModalIndividualReject
            state={data}
            setState={setData}
          //  index={idx}
          //  item={item}
          />
          <ModalSummary state={data} setState={setData} handleSubmit={handleSubmit} />
        </div>

        {/* user log progress */}
        <div className="bg-white border-[1px] p-4 mb-5 rounded-lg shadow-sm text-sm mt-3 md:flex items-center gap-5">
          <div className="text-md space-y-3">
            <div>ผู้บันทึก</div>
            <div className="font-semibold">{data.name_recorder}</div>
            <div className="text-sm text-text-gray">{new Date(data.dateTime_recorder
            ).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          <div className="text-md space-y-3">
            <div>ผู้แก้ไข</div>
            <div className="font-semibold">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          <div className="text-md space-y-3">
            <div>ผู้ส่งเรื่อง</div>
            <div className="font-semibold">{data.name_courier}</div>
            <div className="text-sm text-text-gray">{new Date(data.dateTime_recorder
            ).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
          </div>
          {/* icon */}
          <svg
            width="63"
            height="16"
            viewBox="0 0 63 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431 0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384 1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805 54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0 9H1.9375V7H0V9ZM5.8125 9H9.6875V7H5.8125V9ZM13.5625 9H17.4375V7H13.5625V9ZM21.3125 9H25.1875V7H21.3125V9ZM29.0625 9H32.9375V7H29.0625V9ZM36.8125 9H40.6875V7H36.8125V9ZM44.5625 9H48.4375V7H44.5625V9ZM52.3125 9H56.1875V7H52.3125V9ZM60.0625 9H62V7H60.0625V9Z"
              fill="#CCCCCC"
            />
          </svg>
          <div className="text-md space-y-3">
            <div>ผู้อนุมัติ</div>
            <div className="font-semibold">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModalIndividualReject = ({ state, setState, item }) => {
  const [showModal, setShowModal] = useState(false);

  console.log(state)

  const handleChangeArray = (e) => {
    const clone = [...state];
    clone[index] = clone[index] || {};
    clone[index][e.target.name] = e.target.value;
    console.log(clone);
    setState(clone);
  };

  const onChangeAllInIndexReason = (e, index) => {
    setState((prevState) => {
      const updatedDataTopApproveList = [...prevState];
      updatedDataTopApproveList[index].reason = e.target.value;
      updatedDataTopApproveList[index].subComponentTransfer?.forEach(
        (subComponent) => (subComponent.reason = e.target.value)
      );
      console.log(updatedDataTopApproveList);
      return updatedDataTopApproveList;
    });
  };

  const handleReject = async (e) => {
    e.preventDefault()
    try {
      await rejectIndividualWaitingTransfer({ topApproveList: state[index] })
      setShowModal(false)
    } catch (err) {
      console.log('err', state[index].reason)
    }
  }

  return (
    <>
      <button
        className="p-2 w-[115px] text-center border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-500/[.15]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ไม่อนุมัติ
      </button>
      {showModal &&
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                <div>
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl">สาเหตุที่ไม่อนุมัติ</h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        // className="flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center">
                        <IoIosClose className="text-2xl" />
                      </span>
                    </button>
                  </div>
                  {/* {state.subComponentTransfer?.map(item => ( */}
                  <div className="p-3">
                    <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
                      <div className="md:flex justify-between">
                        <div className="flex space-x-3">
                          <h1>เลขที่ ID เลขที่การโอน-ย้าย</h1>
                          <h1>{state.transferDocumentNumber}</h1>
                        </div>
                        <div className="flex space-x-5 mr-5">
                          <h1>{new Date(state.dateTime_recorder).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", our12: false })}
                          </h1>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-5">
                          <h1>หน่วยงานที่เสนอ</h1>
                          <h1>{state.transferSector}</h1>
                        </div>
                        <div className="flex items-center space-x-5 mt-2">
                          <label>สาเหตุที่ไม่อนุมัติ</label>
                          <input
                            type="text"
                            name="reason"
                            required
                            className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                            onChange={(e) => onChangeAllInIndexReason(e)}
                            value={state.reason}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>

                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md hover:bg-gray-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-red-600 px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={handleReject}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

const ModalSummary = ({ state, setState, handleSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [isAllReject, setAllReject] = useState("สาเหตุแบบหลายรายการ");
  const [error, setError] = useState(false);

  const callback = (payload) => {
    setAllReject(payload);
  };

  async function submit() {
    const res = await handleSubmit(isAllReject)
    setError(res)
  }
  return (
    <>
      <button
        className="bg-text-green px-10 hover:bg-green-800 text-white text-sm rounded-md p-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        อนุมัติ
      </button>
      {showModal && (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0  z-40 md:inset-0 w-screen">
            <div className="w-10/12 md:w-10/12 max-w-[1000px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                <div>
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่อนุมัติ
                    </h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                      >
                        <IoIosClose className="text-2xl" />
                      </span>
                    </button>
                  </div>

                  <div className="overflow-x-auto  scrollbar pt-4 mb-3">
                    <div className="w-[800px] lg:w-full mb-5">
                      <div className="grid grid-cols-13 gap-2 h-12  items-center text-center bg-table-gray rounded-md">
                        <div className="ml-2 col-span-1 ">ลำดับ</div>
                        <div className="col-span-3">เลขครุภัณฑ์</div>
                        <div className="col-span-3">ชื่อครุภัณฑ์</div>
                        <div className="col-span-3">Serial Number</div>
                        <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                      </div>
                      <TableSummaryApprove
                        subComponentTransfer={state.subComponentTransfer}
                        setState={setState}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่ไม่อนุมัติ
                    </h3>
                    {state.subComponentTransfer.find(ele => !ele.checked) &&
                      <div className="flex items-center gap-5">
                        <h3>ประเภทการให้เหตุผล</h3>
                        <DropdownRejectReason
                          callback={callback}
                          header={isAllReject}
                        />
                      </div>
                    }
                  </div>
                  {isAllReject === "สาเหตุแบบหลายรายการ" ? (
                    <AllReject state={state} setState={setState} error={error} />
                  ) : (
                    <EachReject state={state} setState={setState} error={error} />
                  )}
                </div>

                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md hover:bg-gray-200"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    to="/borrowApprove"
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={submit}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const EachReject = ({ state, setState, error }) => {
  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto  scrollbar pt-4 mb-3">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-14 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-2">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-2">Serial Number</div>
            <div className="col-span-2">เจ้าของครุภัณฑ์</div>
            <div className="col-span-4">สาเหตุที่ไม่อนุมัติ</div>
          </div>
          <TableSummaryEachReject state={state} setState={setState} error={error} />
        </div>
      </div>
    </div>
  );
};

const AllReject = ({ state, setState, error }) => {
  const handleChangeReason = (e) => {
    setState({
      ...state,
      reason: e.target.value,
      subComponentTransfer: state.subComponentTransfer.map((item) => ({
        ...item,
        reason: e.target.value,
      })),
    });
  };

  return (
    <div>
      <div className="overflow-x-auto  scrollbar pt-4 mb-3">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-13 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-3">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-3">Serial Number</div>
            <div className="col-span-3">เจ้าของครุภัณฑ์</div>
          </div>
          <TableSummaryAllReject state={state} setState={setState} />
        </div>
      </div>
      {state.subComponentTransfer.find(ele => !ele.checked) &&
        < div className="p-4 text-sm mt-3 ">
          <div className="text-lg ">สาเหตุที่ไม่อนุมัติ</div>
          <textarea
            maxLength=""
            name="reason"
            className={`min-h-[100px] resize-none border-[1px] mt-5 rounded-md w-full focus:border-sky-300 ${error && !state.reason && 'border-red-500'}`}
            onChange={handleChangeReason}
            value={state.reason}
          ></textarea>
        </div>
      }
    </div >
  );
};

const TableSummaryApprove = ({ subComponentTransfer }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <div className={`scrollbar overflow-y-auto min-h-[4rem] ${subComponentTransfer.find(ele => !ele.checked) ? "max-h-[20vh]" : "max-h-[40vh]"}`}>
      {subComponentTransfer.map((item, idx) => {
        return item.checked === true ? (
          <div className="grid grid-cols-13 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1 text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.serialNumber}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.sector}d
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};
const TableSummaryEachReject = ({ state, setState, error }) => {
  const handleChangeSubComponentTransfer = (e, index) => {
    const cloneSubComponentTransfer = [...state.subComponentTransfer];
    cloneSubComponentTransfer[index][e.target.name] = e.target.value;
    // console.log(cloneSubComponentTransfer);
    setState({ ...state, subComponentTransfer: cloneSubComponentTransfer });
  };

  return (
    <div className={`scrollbar overflow-y-auto min-h-[5rem] mb-3 ${state.subComponentTransfer.find(ele => ele.checked) ? "max-h-[30vh]" : "max-h-45vh]"}`}>
      {state.subComponentTransfer.map((item, idx) => {
        console.log(item)
        return item.checked === false ? (
          <div className="grid grid-cols-14 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-2 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-2 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.serialNumber}
            </div>
            <div className="col-span-2 bg-gray-200 h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.sector}
            </div>
            <div className="col-span-4">
              <input
                type="text"
                name="reason"
                onChange={(e) => handleChangeSubComponentTransfer(e, idx)}
                value={item.reason}
                className={`border-[1px] w-full p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none focus:border-focus-blue ${error && !item.reason && 'border-red-500'}`}
              />
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};
const TableSummaryAllReject = ({ state, setState }) => {

  return (
    <div className={`scrollbar overflow-y-auto min-h-[4rem] ${state.subComponentTransfer.find(ele => ele.checked) ? "max-h-[20vh]" : "max-h-[40vh]"}`}>
      {state.subComponentTransfer.map((item, idx) => {
        return item.checked === false ? (
          <div className="grid grid-cols-13 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
            <div className="col-span-1  text-center flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                {idx + 1}
              </div>
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.assetNumber}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.productName}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] flex justify-center items-center border-[2px] rounded-md">
              {item.serialNumber}
            </div>
            <div className="col-span-3 bg-gray-200 h-[42px] border-[2px] flex justify-center items-center rounded-md">
              {item.sector}
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

const DropdownModalBorrowReject = ({ callback, header }) => {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className=" text-text-gray border-[1px] rounded-md text-xs px-6 py-2.5 text-center inline-flex items-center"
        onClick={handleDropDown}
      >
        {header}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* menu */}
      <div
        className={
          isOpen
            ? "absolute z-10 w-[225px] inset-x-0 top-10 border border-gray-100 rounded-md shadow-lg"
            : "hidden"
        }
      >
        <ul
          className="bg-white rounded divide-y divide-gray-100 shadow text-text-gray"
          onClick={handleDropDown}
        >
          <li>
            <button
              className="py-2 px-4 w-full hover:bg-gray-100"
              onClick={() => callback("สาเหตุแบบหลายรายการ")}
            >
              สาเหตุแบบหลายรายการ
            </button>
          </li>
          <li>
            <button
              className="py-2 px-4 w-full hover:bg-gray-100"
              onClick={() => callback("แยกการให้สาเหตุแต่ละรายการ")}
            >
              แยกการให้สาเหตุแต่ละรายการ
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ApprovalTransferAssetDetail;
