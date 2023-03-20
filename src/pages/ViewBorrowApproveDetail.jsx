import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getBorrowById,
  getViewBorrowApproveDetailById,
  partiallyApproveBorrowApproveDetail,
  rejectAllBorrowApproveDetail,
} from "../api/borrowApi";
import OnlyDateInput from "../components/date/onlyDateInput";
import TableViewApproveAssetListBorrowApprove from "../components/table/TableViewApproveAssetListBorrowApprove";
import TableViewRejectAssetListBorrowApprove from "../components/table/TableViewRejectAssetListBorrowApprove";

const ViewBorrowApproveDetail = () => {
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
    status: "",

    assetIdArray: [],
    packageAssetIdArray: [],
  });

  const [assetList, setAssetList] = useState([]);
  const [approveAssetList, setApproveAssetList] = useState([]);
  const [rejectAssetList, setRejectAssetList] = useState([]);

  useEffect(() => {
    const fetchBorrowById = async () => {
      try {
        const res = await getViewBorrowApproveDetailById(borrowId);
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
          status: borrow.status,
          note: borrow.note,
          packageAssetIdArray: borrow.packageAssetIdArray,
          _id: borrow._id,
        });

        setApproveAssetList(res.data.approveArray);
        setRejectAssetList(res.data.rejectArray);
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
          <div className="flex text-xs grow">
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
          <div
            className={`${
              input.status === "waiting"
                ? " bg-background-light-blue text-text-blue  rounded-2xl "
                : input.status === "approve"
                ? " bg-sidebar-green text-text-green  rounded-2xl  "
                : input.status === "partiallyApprove"
                ? " text-orange-400 bg-orange-100 p-2 border rounded-2xl  "
                : input.status === "watingReturnApprove"
                ? "bg-orange-100 text-orange-400 rounded-2xl"
                : input.status === "cancel" || input.status === "reject"
                ? "bg-red-200 text-red-600  rounded-2xl"
                : "bg-text-green text-white hover:bg-green-800 rounded-2xl"
            } border border-spacing-5 p-2 `}
          >
            {input.status === "waiting"
              ? "รออนุมัติ"
              : input.status === "approve"
              ? "อนุมัติแล้ว"
              : input.status === "partiallyApprove"
              ? "อนุมัติบางส่วน"
              : input.status === "done"
              ? "คืนสำเร็จ"
              : input.status === "waitCheckReturn"
              ? "รอตรวจรับ"
              : input.status === "cancel"
              ? "ยกเลิก"
              : input.status === "reject"
              ? "ไม่อนุมัติ"
              : "บันทึกคืน"}
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
            <div className="w-[900px] lg:w-full p-2 pb-4">
              <div className="grid grid-cols-9 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">เลขครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableViewApproveAssetListBorrowApprove
                approveAssetList={approveAssetList}
              />
            </div>
          </div>

          {/* รายการครุภัณฑ์ที่ไม่อนุมัติ */}
          {rejectAssetList.length > 0 ? (
            <div>
              <div className="text-xl">รายการครุภัณฑ์ที่ไม่อนุมัติ</div>

              <div className="overflow-x-auto  scrollbar pt-4 mb-5">
                <div className="w-[900px] lg:w-full p-2 pb-4">
                  <div className="grid grid-cols-11 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                    <div className="col-span-1">ลำดับ</div>
                    <div className="col-span-2">เลขครุภัณฑ์</div>
                    <div className="col-span-3">ชื่อครุภัณฑ์</div>
                    <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                    <div className="col-span-1">จำนวน(บาท)</div>
                    <div className="col-span-2">สาเหตุที่ไม่อนุมัติ</div>
                  </div>
                  <TableViewRejectAssetListBorrowApprove
                    rejectAssetList={rejectAssetList}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
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
            disabled
            value={input.note}
            className="h-[250px] border-[1px] mt-5 bg-table-data rounded-md w-full border-gray-300"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default ViewBorrowApproveDetail;
