import React from "react";
import { Link, useParams } from "react-router-dom";
import TableBorrowCheckDetail from "../components/table/TableBorrowCheckDetail";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { getBorrowById } from "../api/borrowApi";
import TableBorrowDetailList from "../components/table/TableBorrowDetailList";

const ViewBorrowCheckDetail = () => {
  let options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const hoursOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const { borrowId } = useParams();

  const [input, setInput] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);
  const [borrowArrayImageURL, setBorrowArrayImageURL] = useState([]);

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
          borrowReturnDate: borrow.borrowReturnDate || "",
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

        // image for borrow
        let borrowImageArray = borrow.imageArray;

        borrowImageArray.forEach((el) => {
          el["imgURL"] = `http://localhost:4000/images/${el.image}`;
        });

        console.log("borrowImageArray", borrowImageArray);
        setBorrowArrayImageURL(borrowImageArray);

        // image for asset
        let totalAssetAndPackageArray = [];

        totalAssetAndPackageArray = assets.concat(packageAssets);
        setAssetList(totalAssetAndPackageArray);
        // console.log(totalAssetAndPackageArray);

        let imageArrayList = [];
        for (let el of totalAssetAndPackageArray) {
          imageArrayList.push(el.imageArray);
        }

        imageArrayList.forEach((array) => {
          array.forEach((img) => {
            img["imgURL"] = `http://localhost:4000/images/${img.image}`;
          });
        });

        console.log(imageArrayList);
        setArrayImageURL(imageArrayList);
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
          <h1>รายละเอียดการตรวจรับคืน</h1>
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
              to="/borrowCheckIndex"
              className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              รายการรอตรวจรับคืน
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดการตรวจรับคืน</div>
          </div>
        </div>

        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการยืมครุภัณฑ์</div>
          {/* row 1 เลขที่เอกสารการยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 mt-5 p-2">
            <div className="text-text-gray flex items-center ">
              เลขที่เอกสารการยืม
            </div>
            <div className="flex items-center ">{input.borrowIdDoc}</div>
            <div className="text-text-gray flex items-center ">
              ราคายืมต่อวัน (บาท)
            </div>
            <div className="flex items-center ">{input.pricePerDay}</div>
          </div>
          {/* row 2 จำนวนวันที่ยืม (วัน) */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              จำนวนวันที่ยืม (วัน)
            </div>
            <div className="flex items-center">{input.dateDiff}</div>
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่ยืม
            </div>
            <div className="flex items-center">
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
          {/* row 3 วัน-เวลาที่กำหนดส่งคืน */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่กำหนดส่งคืน
            </div>
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
            <div className="text-text-gray flex items-center">
              วัน-เวลาที่คืน
            </div>
            <div className="flex items-center">
              {" "}
              {input.borrowReturnDate === ""
                ? "-"
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
          {/* row 4 วัตถุประสงค์การขอยืม */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">
              วัตถุประสงค์การขอยืม
            </div>
            <div className="flex items-center">{input.borrowPurpose}</div>
            <div className="text-text-gray flex items-center">
              มูลค่าการยืม (บาท)
            </div>
            <div className="flex items-center">
              {input.totalPrice?.toFixed(2)}
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
          <div className="grid grid-cols-2 md:grid-cols-5 p-2">
            <div className="text-text-gray flex items-center">ผู้ดำเนินการ</div>
            <div className="flex items-center">{input.handler}</div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่ยืม</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] h-auto lg:w-full">
              <div className="grid grid-cols-14 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">ID ครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">Serial Number</div>
                <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                <div className="col-span-2">สถานะครุภัณฑ์</div>
                <div className="col-span-1">จำนวน(บาท)</div>
                <div className="col-span-1">ดูรูปภาพ</div>
              </div>
              <TableBorrowDetailList
                assetList={assetList}
                arrayImageURL={arrayImageURL}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 mb-5 ">
          <div className="text-xl">ภาพครุภัณฑ์</div>
          <div className="border-2 border-gray-300  px-30 rounded-lg flex flex-col justify-center items-center gap-4  ">
            <div className="overflow-y-auto scrollbar ">
              <div className="h-[550px]">
                <div className=" px-5 pt-5  pb-10">
                  {borrowArrayImageURL?.map((el, idx) => (
                    <img
                      key={idx}
                      crossOrigin="true"
                      src={el.imgURL}
                      className="w-[640px] mb-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBorrowCheckDetail;
