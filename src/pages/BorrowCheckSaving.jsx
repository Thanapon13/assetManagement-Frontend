import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableBorrowCheckSaving from "../components/table/TableBorrowCheckSaving";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import OnlyDateInput from "../components/date/onlyDateInput";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import { useEffect } from "react";
import {
  getBorrowCheckById,
  updateBorrowCheckSavingById,
} from "../api/borrowApi";

const BorrowCheckSaving = () => {
  const inputImg = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const { borrowId } = useParams();
  const [input, setInput] = useState({
    // ข้อมูลการยืม
    borrowIdDoc: 1,
    pricePerDay: 0,
    borrowDate: new Date(),
    borrowReturnDate: "",
    borrowSetReturnDate: "",
    dateDiff: 0,
    totalPrice: 0,
    // รายละเอียดผู้ยืม
    sector: "",
    subSector: "",
    borrowPurpose: "",
    handler: "",
    // สถานที่ตั้งใหม่
    building: "",
    floor: "",
    room: "",

    note: "",
    reason: "",

    name_recorder: "paruj lab",
    dateTime_recorder: "",
    name_courier: "",
    dateTime_courier: "",
    name_approver: "",
    dateTime_approver: "",
    status: "not approve",

    assetIdArray: [],
    packageAssetIdArray: [],
  });


  const [assetList, setAssetList] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  // toggle check all
  const [isChecked, setIsChecked] = useState(false);

  //Show Modal
  const [showViewImageModal, setShowViewImageModal] = useState(false);


  // handle checkbox
  const handleAllCheckboxChange = (list) => {
    setIsChecked(!isChecked);
    const newCheck = !isChecked;
    const newList = list.map((item) => {
      console.log(item.returnDate);
      if (item?.returnDate) {
        return { ...item };
      } else {
        return { ...item, checked: newCheck };
      }
    });
    console.log(newList);
    setAssetList(newList);
  };

  const handleCheckboxChange = (list, id) => {
    const newList = list.map((item) => {
      if (item._id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    console.log(newList);
    setAssetList(newList);
  };

  // handle change value
  const handleChange = (e) => {
    const clone = { ...input };
    clone[e.target.name] = e.target.value;
    setInput(clone);
  };

  const handleSubmit = async (e, borrowReturnDate) => {
    e.preventDefault();

    const anyChecked = assetList.some((item) => item.checked);

    if (anyChecked) {
    const updatedInput = {
      ...input,
      assetIdArray: input.assetIdArray.map((asset) => {
        const item = assetList.find(
          (item) => item._id === asset.assetId
        )
        return {
          ...asset,
          return:
            item.checked === false || item.checked === undefined ?  (item?.return ? item?.return: "") : "watingApprove",
          returnDate:
            item.checked === false || item.checked === undefined ? (item?.returnDate ? item?.returnDate: "") : borrowReturnDate,
        };
      }),
      packageAssetIdArray: input.packageAssetIdArray.map((packageAsset) => {
        const item = assetList.find(
          (item) => item._id === packageAsset.packageAssetId
        )
        return {
          ...packageAsset,
          return:
            item.checked === false || item.checked === undefined ?  (item?.return ? item?.return: ""): "watingApprove",
          returnDate:
            item.checked === false || item.checked === undefined ? (item?.returnDate ? item?.returnDate: "") : borrowReturnDate,
        };
      }),
    };
    setInput(updatedInput);

    const inputJSON = JSON.stringify(updatedInput);

    await updateBorrowCheckSavingById(input._id, { input: inputJSON });
  } else {
    toast.error("You didn't choose some asset", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  };

  useEffect(() => {
    const fetchBorrowById = async () => {
      try {
        const res = await getBorrowCheckById(borrowId);
        const borrow = res.data.borrow;
        const matchedAssets = borrow.matchedAssets;
        const matchedPackageAssets = borrow.matchedPackageAssets;
        // console.log(matchedPackageAssets);
        // setImg(asset.imageArray[0].image);
        const dateDiff = Math.ceil(
          (new Date(res.data.borrow.borrowSetReturnDate) -
            new Date(res.data.borrow.borrowDate)) /
            (1000 * 60 * 60 * 24)
        );
        // console.log(dateDiff);
        const totalPrice = dateDiff * res.data.borrow.pricePerDay;
        // console.log(totalPrice);

        setInput({
          ...input,
          borrowIdDoc: borrow.borrowIdDoc,
          pricePerDay: borrow.pricePerDay,
          borrowDate: borrow.borrowDate,
          borrowSetReturnDate: borrow.borrowSetReturnDate,
          sector: borrow.sector,
          subSector: borrow.subSector,
          borrowPurpose: borrow.borrowPurpose,
          dateDiff: dateDiff,
          totalPrice: totalPrice,
          handler: borrow.handler,
          building: borrow.building,
          floor: borrow.floor,
          room: borrow.room,
          reason: borrow.reason,
          name_recorder: borrow.name_recorder,
          dateTime_recorder: borrow.dateTime_recorder,
          name_courier: borrow.name_courier,
          dateTime_courier: borrow.dateTime_courier,
          name_approver: borrow.name_approver,
          dateTime_approver: borrow.dateTime_approver,
          assetIdArray: borrow.assetIdArray,
          packageAssetIdArray: borrow.packageAssetIdArray,
          _id: borrow._id,
        });

        const matchAllAsset = matchedAssets.concat(matchedPackageAssets);
        // console.log(matchAllAsset);

        setAssetList(matchAllAsset);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBorrowById();
  }, []);

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green flex items-center space-x-5 ">
          <Link to={`/borrowCheckIndex`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>บันทึกคืนครุภัณฑ์</h1>
        </div>
        <div className="flex pt-3">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกคืนครุภัณฑ์</div>
          </div>
        </div>
        {/* ข้อมูลการคืนครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการคืนครุภัณฑ์</div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10">
            {/* col 1 เลขที่เอกสารการยืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-2 ">
                <label className=" text-text-gray flex">
                  เลขที่เอกสารการยืม
                </label>
                <input
                  type="text"
                  placeholder="Example"
                  readOnly
                  value={input.borrowIdDoc}
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่ยืม</label>
                <OnlyDateInput
                  id={"borrowDate"}
                  state={input}
                  setState={setInput}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่คืน</label>
                <OnlyDateInput
                  id={"borrowReturnDate"}
                  state={input}
                  setState={setInput}
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">วัตถุประสงค์การขอยืม</label>
                <input
                  placeholder="Example"
                  readOnly
                  value={input.borrowPurpose}
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
            {/* col 2 ราคายืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className=" text-text-gray flex">ราคายืม (ต่อวัน)</label>
                <input
                  type="number"
                  placeholder="Example"
                  readOnly
                  value={input.pricePerDay.toFixed(2)}
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">จำนวนวันที่ยืม (วัน) </label>
                <input
                  type="number"
                  placeholder="5"
                  readOnly
                  value={input.dateDiff}
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">กำหนดส่งคืน</label>
                <OnlyDateInput
                  id={"borrowSetReturnDate"}
                  state={input}
                  setState={setInput}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">มูลค่าการยืม (บาท)</label>
                <input
                  type="number"
                  placeholder="400.00"
                  readOnly
                  value={input.totalPrice.toFixed(2)}
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="flex justify-between">
            <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
            <button
              type="button"
              className="px-4 py-2 flex gap-2 items-center rounded-md bg-text-green text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H10V10H4V4ZM20 4V10H14V4H20ZM14 15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15ZM16 15V18H18V15H16ZM4 20V14H10V20H4ZM6 6V8H8V6H6ZM16 6V8H18V6H16ZM6 16V18H8V16H6ZM4 11H6V13H4V11ZM9 11H13V15H11V13H9V11ZM11 6H13V10H11V6ZM2 2V6H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L6 0V2H2ZM22 0C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V6H22V2H18V0H22ZM2 18V22H6V24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V18H2ZM22 22V18H24V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H18V22H22Z"
                  fill="white"
                />
              </svg>
              สแกนครุภัณฑ์
            </button>
          </div>
          {/* table */}
          <div className="overflow-x-auto  scrollbar pt-4 mb-5">
            <div className="w-[1000px] lg:w-full">
              <div className="grid grid-cols-11 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    onChange={() => handleAllCheckboxChange(assetList)}
                    className=" text-text-green placeholder-text-green focus:ring-0 rounded-sm"
                  />
                </div>
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">ID ครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                <div className="col-span-1">สถานะครุภัณฑ์</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableBorrowCheckSaving
                assetList={assetList}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>

        </div>
      </div>

      {/* รายละเอียดผู้ยืม */}
      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
        <div className="text-xl">รายละเอียดผู้ยืม</div>
        {/* row 1 หน่วยงานที่ยืม */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5 p-2">
          <div className="text-text-gray flex items-center ">
            หน่วยงานที่ยืม
          </div>
          <div className="flex items-center ">{input.sector}</div>
          <div className="text-text-gray flex items-center ">ภาควิชา</div>
          <div className="flex items-center ">{input.subSector}</div>
        </div>
        {/* row 2 ผู้ดำเนินการ */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 p-2">
          <div className="text-text-gray flex items-center">ผู้ดำเนินการ</div>
          <div className="flex items-center">{input.handler}</div>
        </div>
      </div>
      {/* footer */}
      <div className="bg-white flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        <Link
          // type="button"
          to="/borrowList"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </Link>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, input.borrowReturnDate)}
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
          // onClick={() => setShowModalConfirm(true)}
        >
          บันทึกคืนครุภัณฑ์
        </button>
        {/* <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            // onSave={handleSubmit}
          /> */}
      </div>

      <ToastContainer />

    </>
  );
};

export default BorrowCheckSaving;
