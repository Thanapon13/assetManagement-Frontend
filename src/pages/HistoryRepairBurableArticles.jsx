import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft, HiChevronRight, HiTrash } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import DateInput from "../components/date/DateInput";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import {
  getBorrowHistorySector,
  getBySearchBorrowHistory
} from "../api/borrowApi";
import BorrowHistorySectorSelector from "../components/selector/BorrowHistorySectorSelector";
import { getRepairById } from "../api/repairApi";
import { BsArrowLeft, BsFillEyeFill } from "react-icons/bs";

const HistoryRepairBurableArticles = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log("data:", data);

  const fetchDataList = async () => {
    try {
      const res = await getRepairById(id);
      console.log(res.data, id);
      setData(res.data.repair);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <div className="bg-background-page py-5 p-3 min-h-full">
      <div className="flex items-center mr-10">
        <Link
          to="/repairOutsourceIndex"
          className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
        >
          <BsArrowLeft className="text-lg" />
        </Link>
        <div className="text-2xl text-text-green ">ประวัติการซ่อมครุภัณฑ์ </div>
      </div>

      <div className="flex pt-3 justify-between">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ประวัติการซ่อมครุภัณฑ์</div>
        </div>
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
        <div className="flex justify-between">
          <div className="text-xl">รายละเอียดครุภัณฑ์</div>
        </div>
        {/* row 1 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center ">ID ครุภัณฑ์</div>
          <div className="flex items-center col-span-2">
            {" "}
            {/* {data.assets[0].serialNumber} */}-
          </div>

          <div className="text-text-gray flex items-center ">ราคาที่ซื้อ</div>
          <div className={"flex items-center col-span-2"}>
            {" "}
            <p>-</p>
          </div>
        </div>
        {/* row 2 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">เลขครุภัณฑ์ </div>
          <div className="flex items-center col-span-2">
            {" "}
            {data.assetNumber}
          </div>

          <div className="text-text-gray flex items-center">ผู้ขาย</div>
          <div className="flex items-center col-span-2">ผู้ขาย</div>
        </div>
        {/* row 3 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">ชื่อครุภัณฑ์</div>
          <div className="flex items-center col-span-2">
            {" "}
            {data.productName}
          </div>

          <div className="text-text-gray flex items-center">
            หน่วยงานเจ้าของ
          </div>
          <div className="flex items-center col-span-2">
            <p>-</p>
          </div>
        </div>
        {/* row 4 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">วันที่ซื้อ</div>
          <div className="flex items-center col-span-2">
            {" "}
            <p>-</p>
          </div>

          <div className="text-text-gray flex items-center">ผู้รับผิดชอบ</div>
          <div className="flex items-center col-span-2">
            {data.responsibleName}
          </div>
        </div>

        {/* row 6 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">
            การรับประกัน (เดือน)
          </div>
          <div className="flex items-center col-span-2">
            {data.insuranceEndDate
              ? `${new Date(data.insuranceEndDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`
              : "-"}
          </div>

          <div className="text-text-gray flex items-center">
            รายละเอียดประกัน
          </div>
          <div className="flex items-center col-span-2">
            {" "}
            <p>-</p>
          </div>
        </div>
        {/* row 7 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">
            วันที่เริ่มรับประกัน
          </div>
          <div className="flex items-center col-span-2">-</div>
        </div>

        {/* row 8 */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
          <div className="text-text-gray flex items-center">
            วันที่สิ้นสุดการรับประกัน
          </div>
          <div className="flex items-center col-span-2">
            {data.insuranceEndDate
              ? `${new Date(data.insuranceEndDate).toLocaleString("th", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })} น.`
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryRepairBurableArticles;
