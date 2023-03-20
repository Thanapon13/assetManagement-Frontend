import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getBorrowById,
  partiallyApproveBorrowApproveDetail,
  rejectAllBorrowApproveDetail,
} from "../api/borrowApi";
import TableBorrowApprove from "../components/table/TableBorrowApprove";
import OnlyDateInput from "../components/date/onlyDateInput";

const BorrowApproveDetail = () => {
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
  // toggle check all
  const [isChecked, setIsChecked] = useState(false);

  // handle checkbox
  const handleAllCheckboxChange = (list) => {
    setIsChecked(!isChecked);
    const newCheck = !isChecked;
    const newList = list.map((item) => {
      return { ...item, checked: newCheck };
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

  useEffect(() => {
    const fetchBorrowById = async () => {
      try {
        const res = await getBorrowById(borrowId);
        console.log(res.data.borrow);
        const borrow = res.data.borrow;
        const assets = borrow.assets;
        const packageAssets = borrow.packageAssets;
        // setImg(asset.imageArray[0].image);
        const dateDiff = Math.ceil(
          (new Date(res.data.borrow.borrowSetReturnDate) -
            new Date(res.data.borrow.borrowDate)) /
            (1000 * 60 * 60 * 24)
        );
        const totalPrice = dateDiff * res.data.borrow.pricePerDay;

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

        let totalAssetAndPackageArray = [];
        for (let el of assets) {
          totalAssetAndPackageArray.push(el);
        }
        for (let el of packageAssets) {
          totalAssetAndPackageArray.push(el);
        }
        setAssetList(totalAssetAndPackageArray);
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
        <div className="text-2xl text-text-green ">อนุมัติการยืมครุภัณฑ์</div>
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
                to="/borrowApprove"
                className='className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2'
              >
                อนุมัติยืมครุภัณฑ์
              </Link>
            </div>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการขออนุมัติ</div>
          </div>
         
        </div>

        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="flex justify-between">
            <div className="text-lg">ข้อมูลการยืมครุภัณฑ์</div>
            <button className="p-1 px-7 mr-5 border-[1px] border-gray-500 rounded-md hover:bg-slate-200">
              พิมพ์
            </button>
          </div>
          {/* Row 1 เลขที่เอกสารการยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                เลขที่เอกสารการยืม
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.borrowIdDoc}
                className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ราคายืม (ต่อวัน)</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.pricePerDay.toFixed(2)}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 วันที่ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วันที่ยืม</label>
              <OnlyDateInput
                id={"borrowDate"}
                state={input}
                setAssetList={setInput}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">วันที่คืน</label>
              <OnlyDateInput
                id={"borrowReturnDate"}
                state={input}
                setAssetList={setInput}
                disabled={true}
              />
            </div>
          </div>
          {/* Row 3 กำหนดส่งคืน */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">กำหนดส่งคืน</label>
              <OnlyDateInput
                id={"borrowSetReturnDate"}
                state={input}
                setAssetList={setInput}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">จำนวนวันที่ยืม (วัน) </label>
              <input
                type="number"
                placeholder="5"
                readOnly
                value={input.dateDiff}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>

          {/* Row 4 กำหนดส่งคืน */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">วัตถุประสงค์การขอยืม</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.borrowPurpose}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">มูลค่าการยืม (บาท)</label>
              <input
                type="number"
                placeholder="0.00"
                readOnly
                value={input.totalPrice.toFixed(2)}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>

        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
          {/* table */}
          <div className="overflow-x-auto  scrollbar pt-4 mb-5">
            <div className="w-[1000px] lg:w-full">
              <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    onChange={() => handleAllCheckboxChange(assetList)}
                    className=" text-text-green placeholder-text-green focus:ring-0"
                  />
                </div>
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">เลขครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                <div className="col-span-1">จำนวน</div>
                <div className="col-span-1">หน่วยนับ</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableBorrowApprove
                assetList={assetList}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* Row 1 ชื่อ */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray ">ชื่อ - นามสกุล</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.handler}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">รหัสเจ้าหน้าที่</label>
              <input
                type="text"
                placeholder="00000000"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 หมายเลขโทรศัพท์ */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หมายเลขโทรศัพท์</label>
              <input
                type="number"
                placeholder="120301230123"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ที่อยู่</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 3 หน่วยงานผู้ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-5 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">หน่วยงานผู้ยืม</label>
              <input
                type="text"
                placeholder="ไอ่สองงงงงงง"
                readOnly
                value={input.sector}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ภาควิชาผู้ยืม</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.subSector}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* หมายเหตุ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-lg ">หมายเหตุ</div>
          <textarea
            maxLength=""
            name="note"
            value={input.note}
            onChange={(e) => handleChange(e)}
            className="h-[250px] border-[1px] mt-5  rounded-md w-full focus:border-sky-300"
          ></textarea>
        </div>
        {/* footer button */}
        <div className="flex justify-between items-center gap-5 p-3 text-sm ">
          <ModalIndividualReject
            input={input}
            setInput={setInput}
            assetList={assetList}
            setAssetList={setAssetList}
            // fetchFirstBorrowApproveData={props.fetchFirstBorrowApproveData}
          />
          <ModalSummary
            assetList={assetList}
            input={input}
            setInput={setInput}
          />
        </div>

        {/* user log progress */}
        <div className="bg-white border-[1px] p-4 mb-5 rounded-lg shadow-sm text-sm mt-3 md:flex items-center gap-5">
          {/* ผู้บันทึก */}
          <div className="text-md space-y-3">
            <div>ผู้บันทึก</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
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
          {/* ผู้แก้ไข */}
          <div className="text-md space-y-3">
            <div>ผู้แก้ไข</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
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
          {/* ผู้ส่งเรื่อง */}
          <div className="text-md space-y-3">
            <div>ผู้ส่งเรื่อง</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
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
          {/* ผู้อนุมัติ */}
          <div className="text-md space-y-3">
            <div>ผู้อนุมัติ</div>
            <div className="text-lg">สุริวิภา ภาวนาจิต</div>
            <div className="text-sm text-text-gray">12/12/2565</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModalSummary = ({ assetList, input, setInput }) => {
  const [showModal, setShowModal] = useState(false);
  const [isAllReject, setAllReject] = useState("สาเหตุแบบหลายรายการ");

  const callback = (payload) => {
    setAllReject(payload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputJSON = JSON.stringify(input);
    await partiallyApproveBorrowApproveDetail(input._id, { input: inputJSON });
  };
  return (
    <>
      <button
        className="bg-text-green px-10 hover:bg-green-800 text-white text-sm rounded-md p-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        อนุมัติ
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* รายการครุภัณฑ์ที่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่อนุมัติ
                    </h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  {/* table */}
                  <div className="overflow-x-auto  scrollbar pt-4 mb-5">
                    <div className="w-[1000px] lg:w-full">
                      <div className="grid grid-cols-10 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                        <div className="col-span-1">ลำดับ</div>
                        <div className="col-span-2">เลขครุภัณฑ์</div>
                        <div className="col-span-3">ชื่อครุภัณฑ์</div>
                        <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                        <div className="col-span-1">จำนวน</div>
                        <div className="col-span-1">จำนวน(บาท)</div>
                      </div>
                      <TableSummaryApprove assetList={assetList} />
                    </div>
                  </div>
                </div>
                {/* รายการครุภัณฑ์ที่ไม่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl text-text-green">
                      รายการครุภัณฑ์ที่ไม่อนุมัติ
                    </h3>
                    <div className="flex items-center gap-5">
                      <h3>ประเภทการให้เหตุผล</h3>
                      <DropdownModalBorrowReject
                        callback={callback}
                        header={isAllReject}
                      />
                    </div>
                  </div>
                  {isAllReject === "สาเหตุแบบหลายรายการ" ? (
                    <AllReject
                      assetList={assetList}
                      input={input}
                      setInput={setInput}
                    />
                  ) : (
                    <EachReject
                      assetList={assetList}
                      input={input}
                      setInput={setInput}
                    />
                  )}
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    // to="/borrowApprove"
                    className="text-white bg-text-green px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={(e) => {
                      setShowModal(false);
                      handleSubmit(e);
                    }}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const EachReject = ({ assetList, input, setInput }) => {
  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto  scrollbar pt-4 mb-5">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-2">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
            <div className="col-span-1">จำนวน</div>
            <div className="col-span-1">จำนวน(บาท)</div>
            <div className="col-span-2">สาเหตุที่ไม่อนุมัติ</div>
          </div>
          <TableSummaryEachReject
            assetList={assetList}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  );
};

const AllReject = ({ assetList, input, setInput }) => {
  const [allReason, setAllReason] = useState("");

  const handleChangeAllReject = (e) => {
    setAllReason(e.target.value);
    const clone = { ...input };
    clone[e.target.name] = e.target.value;

    const updatedInput = {
      ...input,
      assetIdArray: input.assetIdArray.map((asset) => {
        const checked = assetList.find(
          (item) => item._id === asset.assetId
        )?.checked;
        return {
          ...asset,
          reason:
            checked === false || checked === undefined
              ? e.target.value
              : asset.reason,
        };
      }),
      packageAssetIdArray: input.packageAssetIdArray.map((packageAsset) => {
        const checked = assetList.find(
          (item) => item._id === packageAsset.packageAssetId
        )?.checked;
        return {
          ...packageAsset,
          reason:
            checked === false || checked === undefined
              ? e.target.value
              : packageAsset.reason,
        };
      }),
    };
    setInput(updatedInput);
  };

  return (
    <div>
      {/* table */}
      <div className="overflow-x-auto  scrollbar pt-4 mb-5">
        <div className="w-[1000px] lg:w-full">
          <div className="grid grid-cols-10 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
            <div className="col-span-1">ลำดับ</div>
            <div className="col-span-2">เลขครุภัณฑ์</div>
            <div className="col-span-3">ชื่อครุภัณฑ์</div>
            <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
            <div className="col-span-1">จำนวน</div>
            <div className="col-span-1">จำนวน(บาท)</div>
          </div>
          <TableSummaryAllReject
            assetList={assetList}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
      {/* สาเหตุที่ไม่อนุมัติ */}
      <div className="p-4 text-sm mt-3 ">
        <div className="text-lg ">สาเหตุที่ไม่อนุมัติ</div>
        <textarea
          maxLength=""
          className="h-[100px] border-[1px] mt-5  rounded-md w-full focus:border-sky-300"
          value={allReason}
          onChange={(e) => handleChangeAllReject(e)}
        ></textarea>
      </div>
    </div>
  );
};

const TableSummaryApprove = ({ assetList }) => {
  const [isClick, setIsClick] = useState(false);

  const anyChecked = assetList.some((item) => item.checked);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {anyChecked ? (
        assetList.map((item, idx) => {
          if (item.checked) {
            return (
              <div className="grid grid-cols-10 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
                <div className="col-span-1  text-center flex justify-center items-center ">
                  <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                    {idx + 1}
                  </div>
                </div>
                <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                  {item.assetNumber}
                </div>
                <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                  {item.productName}
                </div>
                <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                  {item.brand}
                </div>
                <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                  {item.quantity}
                </div>
                <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                  {item.pricePerUnit}
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
const TableSummaryEachReject = ({ assetList, input, setInput }) => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleChangeEachReject = (e, idx) => {
    const clone = { ...input };
    // console.log(assetList[idx]);
    if (assetList[idx].hasOwnProperty("type4")) {
      const packageAssetIdIdx = clone.packageAssetIdArray.findIndex(
        (el) => el.packageAssetId === assetList[idx]._id
      );
      console.log(packageAssetIdIdx);
      if (packageAssetIdIdx !== -1) {
        clone.packageAssetIdArray[packageAssetIdIdx][e.target.name] =
          e.target.value;
      }
      // clone.packageAssetIdArray[packageAssetId][e.target.name] = e.target.value;
    } else {
      const assetIdIdx = clone.assetIdArray.findIndex(
        (el) => el.assetId === assetList[idx]._id
      );
      if (assetIdIdx !== -1) {
        clone.assetIdArray[assetIdIdx][e.target.name] = e.target.value;
      }
    }
    setInput(clone);
  };

  return (
    <>
      {assetList.map((item, idx) => {
        if (
          item.checked === false ||
          item.hasOwnProperty("checked") === false
        ) {
          return (
            <div className="grid grid-cols-12 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
              <div className="col-span-1  text-center flex justify-center items-center ">
                <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                  {idx + 1}
                </div>
              </div>
              <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.assetNumber}
              </div>
              <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.productName}
              </div>
              <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.brand}
              </div>
              <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                {item.quantity}
              </div>
              <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                {item.pricePerUnit}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="reason"
                  value={
                    assetList[idx].hasOwnProperty("type4")
                      ? (
                          input.packageAssetIdArray.find(
                            (el) => el.packageAssetId === assetList[idx]._id
                          ) || {}
                        ).reason
                      : (
                          input.assetIdArray.find(
                            (el) => el.assetId === assetList[idx]._id
                          ) || {}
                        ).reason
                  }
                  onChange={(e) => handleChangeEachReject(e, idx)}
                  placeholder="Example"
                  className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
const TableSummaryAllReject = ({ assetList, input, setInput }) => {
  return (
    <>
      {assetList.map((item, idx) => {
        console.log(item.hasOwnProperty("checked"));
        if (
          item.checked === false ||
          item.hasOwnProperty("checked") === false
        ) {
          return (
            <div className="grid grid-cols-10 gap-2 h-12 pt-2 text-xs text-center items-center bg-white">
              <div className="col-span-1  text-center flex justify-center items-center ">
                <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                  {idx + 1}
                </div>
              </div>
              <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.assetNumber}
              </div>
              <div className="col-span-3 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.productName}
              </div>
              <div className="col-span-2 bg-table-data h-[42px] flex justify-center items-center border-[2px] rounded-md">
                {item.brand}
              </div>
              <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                {item.quantity}
              </div>
              <div className="col-span-1 bg-table-data  h-[42px] border-[2px] flex justify-center items-center rounded-md">
                {item.pricePerUnit}
              </div>
            </div>
          );
        }
      })}
    </>
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
export default BorrowApproveDetail;

const ModalIndividualReject = ({
  input,
  setInput,
  fetchFirstBorrowApproveData,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const state = props.state;

  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const handleChangeIndividualReject = (e) => {
    const clone = { ...input };
    clone[e.target.name] = e.target.value;
    setInput(clone);
  };

  const handleSubmitIndividualReject = async (e) => {
    e.preventDefault();
    const cloneInput = { ...input };

    const filteredAndModifiedObject = (input) => {
      // add the reason property to each item in the filtered packageAssetIdArray
      const modifiedPackageAssetIdArray = input.packageAssetIdArray.map(
        (asset) => ({
          ...asset,
          reason: input.reason,
        })
      );

      // add the reason property to each item in the assetIdArray
      const modifiedAssetIdArray = input.assetIdArray.map((asset) => ({
        ...asset,
        reason: input.reason,
      }));

      // create a new object with the modified packageAssetIdArray and assetIdArray
      return {
        ...input,
        packageAssetIdArray: modifiedPackageAssetIdArray,
        assetIdArray: modifiedAssetIdArray,
      };
    };

    const result = filteredAndModifiedObject(cloneInput);

    // only one that you select
    const inputJSON = JSON.stringify(result);
    await rejectAllBorrowApproveDetail(input._id, { input: inputJSON });
    // const topApproveListJSON = JSON.stringify(result);
    // await rejectIndividualWaitingBorrow({
    //   topApproveList: topApproveListJSON,
    // });
    // await fetchFirstBorrowApproveData();
  };

  return (
    <>
      <button
        className="p-2 px-10 border-[2px] text-red-500 border-red-400 rounded-md hover:bg-red-200"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ไม่อนุมัติ
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* สาเหตุที่ไม่อนุมัติ */}
                <div>
                  {/* header*/}
                  <div className="flex items-center justify-between p-5 ">
                    <h3 className="text-xl">สาเหตุที่ไม่อนุมัติ</h3>
                    <button
                      className="border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" flex justify-center items-center text-white opacity-7 h-6 w-6 text-xl bg-text-sidebar py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  {/* reject information */}
                  <div className="p-3">
                    <div className="bg-background-page border-[2px] rounded-md p-3 w-full">
                      <div className="md:flex justify-between">
                        <div className="flex space-x-10">
                          <h1>เลขที่ ID เลขที่การยืม</h1>
                          <h1>{input.borrowIdDoc}</h1>
                        </div>
                        <div className="flex space-x-5 mr-5">
                          <h1>
                            {" "}
                            {new Date(input.borrowDate).toLocaleDateString(
                              "th-TH",
                              options
                            )}
                          </h1>
                          <h1>
                            {" "}
                            {new Date(input.borrowDate).toLocaleTimeString(
                              "th-TH",
                              hoursOptions
                            )}
                          </h1>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-5">
                          <h1>หน่วยงานที่เสนอ</h1>
                          <h1>{input.sector}</h1>
                        </div>
                        <div className="flex items-center space-x-5 mt-2">
                          <label>สาเหตุที่ไม่อนุมัติ</label>
                          <input
                            type="text"
                            name="reason"
                            value={input.reason}
                            onChange={(e) => handleChangeIndividualReject(e)}
                            placeholder="Example"
                            required
                            className="border-[1px] p-2 h-[38px] w-7/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <Link
                    to="/borrowApprove"
                    className="text-white bg-red-600 px-10 py-2 border rounded-md "
                    // type="button"
                    onClick={(e) => {
                      setShowModal(false);
                      handleSubmitIndividualReject(e);
                    }}
                  >
                    ยืนยัน
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
