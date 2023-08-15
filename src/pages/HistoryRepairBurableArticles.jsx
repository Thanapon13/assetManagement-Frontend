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

      const dataArray = [res.data.repair];
      // console.log("dataArray:", dataArray);
      setData(dataArray);
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
        {data.map((el, idx) => (
          <>
            <div key={idx}>
              <div className="flex justify-between">
                <div className="text-xl">รายละเอียดครุภัณฑ์</div>
              </div>
              {/* row 1 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center ">
                  ID ครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">{el.assetId}</div>

                <div className="text-text-gray flex items-center ">
                  ราคาที่ซื้อ
                </div>
                <div className={"flex items-center col-span-2"}>
                  {el.totalPrice}
                </div>
              </div>
              {/* row 2 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  เลขครุภัณฑ์{" "}
                </div>
                <div className="flex items-center col-span-2">
                  {el.assetNumber}
                </div>

                <div className="text-text-gray flex items-center">ผู้ขาย</div>
                <div className="flex items-center col-span-2">
                  {el.seller || "-"}
                </div>
              </div>
              {/* row 3 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  ชื่อครุภัณฑ์
                </div>
                <div className="flex items-center col-span-2">
                  {el.productName}
                </div>

                <div className="text-text-gray flex items-center">
                  หน่วยงานเจ้าของ
                </div>
                <div className="flex items-center col-span-2">{el.sector}</div>
              </div>
              {/* row 4 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  วันที่ซื้อ
                </div>
                <div className="flex items-center col-span-2">
                  {el.purchaseDate || "-"}
                </div>

                <div className="text-text-gray flex items-center">
                  ผู้รับผิดชอบ
                </div>
                <div className="flex items-center col-span-2">
                  {el.responsiblePerson || "-"}
                </div>
              </div>

              {/* row 6 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  การรับประกัน (เดือน)
                </div>
                <div className="flex items-center col-span-2">
                  {el.insuranceEndDate
                    ? `${new Date(el.insuranceEndDate).toLocaleString("th", {
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
                <div className="flex items-center col-span-2">
                  {el.insuranceStartDate
                    ? `${new Date(el.insuranceStartDate).toLocaleString("th", {
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

              {/* row 8 */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6 p-2">
                <div className="text-text-gray flex items-center">
                  วันที่สิ้นสุดการรับประกัน
                </div>
                <div className="flex items-center col-span-2">
                  {el.insuranceEndDate
                    ? `${new Date(el.insuranceEndDate).toLocaleString("th", {
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
          </>
        ))}
      </div>

      <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
        <div className="text-lg">ประวัติการซ่อม</div>

        <div className="overflow-x-auto scrollbar pt-4">
          <div className="w-[1000px] lg:w-full p-2">
            <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
              <div className="grid grid-cols-12 gap-2 text-center">
                <div className="ml-2 col-span-1 ">ลำดับ</div>
                <div className="col-span-2">เลขที่ใบซ่อม</div>
                <div className="col-span-3">อาการเสีย</div>
                <div className="col-span-2">หน่วยซ่อม</div>
                <div className="col-span-2">มูลค่างาน</div>
                <div className="col-span-2 pr-2">สถานะใบซ่อม</div>
              </div>
            </div>

            <div className="scrollbar max-h-[45vh] overflow-y-auto">
              {data.map((el, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 gap-2 h-12 pt-2 text-xs text-center items-center bg-white`}
                >
                  <div className="col-span-1  text-center flex justify-center items-center ">
                    <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="col-span-2 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                    {el.informRepairIdDoc}
                  </div>
                  <div className="col-span-3 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                    {el.productName}
                  </div>
                  <div className="col-span-2 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md ">
                    {el.hostSector}
                  </div>
                  <div className="col-span-2 bg-table-data h-[40px] flex justify-center items-center border-[1px] rounded-md">
                    {el.totalPrice}
                  </div>

                  <div className="col-span-2 m-auto">
                    <div
                      className={`flex items-center justify-center ${
                        el.statusOfDetailRecord === "waiting"
                          ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-xs p-2 rounded-2xl"
                          : el.statusOfDetailRecord === "waitingRecord"
                          ? "bg-[#F2994A] bg-opacity-[15%] text-[#F2994A] text-xs p-2 rounded-2xl"
                          : el.statusOfDetailRecord === "waitingApproval"
                          ? "bg-yellow-300 text-yellow-700 text-sm p-2 rounded-2xl"
                          : el.statusOfDetailRecord === "completeOfDetailRecord"
                          ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-xs p-2 rounded-2xl"
                          : el.statusOfDetailRecord === "cancelOfDetailRecord"
                          ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-xs p-2 rounded-2xl"
                          : el.statusOfDetailRecord === "reject"
                          ? "bg-[#38821D] bg-opacity-[15%] text-[#38821D] text-xs p-2 rounded-2xl"
                          : ""
                      }`}
                    >
                      {el.statusOfDetailRecord === "waiting"
                        ? "รอช่างรับงาน"
                        : el.statusOfDetailRecord === "waitingRecord"
                        ? "รอลงบันทึก"
                        : el.statusOfDetailRecord === "waitingApproval"
                        ? "รออนุมัติ"
                        : el.statusOfDetailRecord === "completeOfDetailRecord"
                        ? "เสร็จสิ้น"
                        : el.statusOfDetailRecord === "cancelOfDetailRecord"
                        ? "ไม่รับงาน"
                        : el.statusOfDetailRecord === "reject"
                        ? "ไม่อนุมัติ"
                        : ""}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-table-data h-[40px] p-6 flex justify-between items-center mt-10">
                <div className="w-full flex justify-between text-sm  font-semibold">
                  รวมจำนวนเงินทั้งหมด
                  <div className="text-sm font-semibold">
                    {" "}
                    {data.reduce((sum, ele) => sum + ele.totalPrice, 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryRepairBurableArticles;
