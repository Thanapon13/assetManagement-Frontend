import React from "react";
import { Link, useParams } from "react-router-dom";
import TableBorrowCheckDetail from "../components/table/TableBorrowCheckDetail";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { getViewBorrowApproveDetailById } from "../api/borrowApi";
import TableViewBorrowHistoryListBorrowApprove from "../components/table/TableViewBorrowHistoryListBorrowApprove";
import TableViewBorrowHistoryListBorrowReject from "../components/table/TableViewBorrowHistoryListBorrowReject";

const BorrowHistoryDetail = () => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

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
        <div className="text-2xl text-text-green flex items-center space-x-5 ">
          <Link to={`/borrowHistory`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>รายละเอียดประวัติการยืม</h1>
        </div>
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
            <Link
              to="/borrowHistory"
              className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              ประวัติการยืม
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดประวัติการยืม</div>
          </div>
        </div>
        {/* ข้อมูลครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการยืมครุภัณฑ์</div>
          {/* row 1 เลขที่เอกสารการยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่เอกสารการยืม
            </div>
            <div className="flex items-center ">{input.borrowIdDoc}</div>
            <div className="text-text-gray flex items-center ">วันที่ยืม</div>
            <div className="flex items-center ">
              {" "}
              {new Date(input.borrowDate).toLocaleDateString(
                "th-TH",
                options
              )}{" "}
              ,{" "}
              {new Date(input.borrowDate).toLocaleTimeString(
                "th-TH",
                hoursOptions
              )}
            </div>
          </div>
          {/* row 2 กำหนดคืน*/}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">กำหนดคืน</div>
            <div className="flex items-center">
              {" "}
              {new Date(input.borrowSetReturnDate).toLocaleDateString(
                "th-TH",
                options
              )}{" "}
              ,{" "}
              {new Date(input.borrowSetReturnDate).toLocaleTimeString(
                "th-TH",
                hoursOptions
              )}
            </div>
            <div className="text-text-gray flex items-center">วันที่คืน</div>
            <div className="flex items-center">
              {" "}
              {input.borrowReturnDate === ""
                ? ""
                : new Date(input.borrowReturnDate).toLocaleDateString(
                    "th-TH",
                    options
                  )}{" "}
              {input.borrowReturnDate === "" ? "" : ","}{" "}
              {input.borrowReturnDate === ""
                ? ""
                : new Date(input.borrowReturnDate).toLocaleTimeString(
                    "th-TH",
                    hoursOptions
                  )}
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* row 1 ผู้ดำเนินการ */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              ผู้ดำเนินการ
            </div>
            <div className="flex items-center ">{input.handler}</div>
            <div className="text-text-gray flex items-center ">หน่วยงาน</div>
            <div className="flex items-center ">{input.sector}</div>
          </div>
          {/* row 2 ภาควิชา */}
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ภาควิชา</div>
            <div className="flex items-center">{input.subSector}</div>
          </div>
          {/* row 3 ที่อยู่ */}
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ที่อยู่</div>
            <div className="flex items-center col-span-3">
              {"888 อาคารรัตนวิดี ถนนสุขุมวิท เขตดุสิต กรุงเทพฯ 10310"}
            </div>
          </div>
        </div>

        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
          {/* table */}
          <div className="overflow-x-auto  scrollbar pt-4 mb-5">
            <div className="w-[1000px] h-[300px] lg:w-full p-2 pb-4">
              <div className="grid grid-cols-12 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">เลขครุภัณฑ์</div>
                <div className="col-span-2">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">Serial Number</div>
                <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                <div className="col-span-2">สถานะครุภัณฑ์</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableViewBorrowHistoryListBorrowApprove
                approveAssetList={approveAssetList}
              />
            </div>
          </div>

          {/* รายการครุภัณฑ์ที่ไม่อนุมัติ */}
          {rejectAssetList.length > 0 ? (
            <div>
              <div className="text-xl">รายการครุภัณฑ์ที่ไม่อนุมัติ</div>

              <div className="overflow-x-auto  scrollbar pt-4 mb-5">
                <div className="w-[1000px] h-[300px] lg:w-full p-2 pb-4">
                  <div className="grid grid-cols-14 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                    <div className="col-span-1">ลำดับ</div>
                    <div className="col-span-2">เลขครุภัณฑ์</div>
                    <div className="col-span-2">ชื่อครุภัณฑ์</div>
                    <div className="col-span-2">Serial Number</div>
                    <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                    <div className="col-span-2">สถานะครุภัณฑ์</div>
                    <div className="col-span-1">จำนวน(บาท)</div>
                    <div className="col-span-2">สาเหตุ</div>
                  </div>
                  <TableViewBorrowHistoryListBorrowReject
                    rejectAssetList={rejectAssetList}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
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

export default BorrowHistoryDetail;
