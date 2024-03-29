import React, { useState } from "react";
import { Link } from "react-router-dom";
import RowofTableViewWatingTransfer from "../components/table/RowofTableViewWatingTransfer";
import { BsArrowLeft } from "react-icons/bs";
import { getTransferHistoryById } from "../api/transferApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom/dist";

const ViewTransferAsset = () => {
  let { transferId } = useParams()
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransferHistoryById(transferId)
        const totalArr = res.data.transfer.assets.concat(res.data.transfer.packageAssets)
        setData({
          ...res.data.transfer,
          subComponentTransfer: totalArr
        })
      } catch (err) {
        setData([])
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="bg-background-page py-5 p-3 min-h-full">
        <div className="flex items-center mr-10">
          <Link
            to="/historyTransferAsset"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-2xl text-text-green ">
            รายละเอียดประวัติการโอน-ย้าย
          </div>
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
            <Link
              to="/historyTransferAsset"
              className="text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              ประวัติการโอน-ย้าย
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">
              รายละเอียดประวัติการโอน-ย้าย
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-lg">การโอน-ย้ายครุภัณฑ์</div>

          <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
            <div className="text-gray-500 sm:col-span-3 col-span-1">เลขที่เอกสารการโอนย้าย</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.transferDocumentNumber}
            </div>
            <div className="text-gray-500 sm:col-span-3 col-span-1">หน่วยงานที่โอน</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.transferSector}
            </div>
            <div className="text-gray-500 sm:col-span-3 col-span-1">ภาควิชาที่โอน</div>
            <div className="sm:col-span-4 col-span-2">{data?.subSector}</div>
            <div className="text-gray-500 sm:col-span-3 col-span-1">ผู้ดำเนินการ</div>
            <div className="sm:col-span-4 col-span-2">{data?.name_courier}</div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">ข้อมูลครุภัณฑ์ที่เลือก</div>

          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-14 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-3">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-3">Serial Number</div>
                  <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                  <div className="col-span-1 pr-2">รูปภาพ</div>
                </div>
              </div>
              <div className="scrollbar max-h-[45vh] overflow-y-auto">
                {data.subComponentTransfer?.map((el, idx) => {
                  el.imageArray.forEach((img) => {
                    img["imgURL"] = `http://localhost:4000/images/${img.image}`;
                  })
                  return (
                    <RowofTableViewWatingTransfer
                      key={idx}
                      index={idx}
                      row={el}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">สถานที่ตั้งใหม่</div>
          {/* <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20"> */}
          <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-sm">
            <div className="text-gray-500 sm:col-span-3 col-span-1"> หน่วยงานที่รับโอน</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.transfereeSector}
            </div>
            <div className="text-gray-500 sm:col-span-3 col-span-1"> อาคาร</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.building}
            </div>
            <div className="text-gray-500 sm:col-span-3 col-span-1"> ชั้น</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.floor}
            </div>
            <div className="text-gray-500 sm:col-span-3 col-span-1"> ห้อง</div>
            <div className="sm:col-span-4 col-span-2">
              {data?.room}
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default ViewTransferAsset;
