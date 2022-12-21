import React from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";

export const AssetInformation = () => {
  let dashboardTableArray = [
    {
      ID: "84745",
      inventoryNumber: "4140-001-004/545353435",
      serialNumber: "ertert234346546",
      name: "พัดลมโคจรติดเพดาน 16 นิ้ว",
      // invoice: "BB00CC2342342342",
      department: "ไม่ระบุฝ่าย",
      sector:"D041 - หอผู้ป่วยพิเศษสงค์อาพาธ ",
      agency: "D043-หกดหกดหกดหกด",
      building: "สงค์อาพาธ",
      floor: "6",
      room: "2",
      status: "ใช้งานได้",
      price: "1550",
      PM: "",
      CB: "",
    },
    {
      ID: "84745",
      inventoryNumber: "4140-001-004/545353435",
      serialNumber: "ertert234346546",
      processingOrder: "64545",
      name: "จรวดโคจรติดเพดาน 16 นิ้ว",
      // invoice: "BB00CC2342342342",
      department: "ไม่ระบุฝ่าย",
      sector:"D041 - หอผู้ป่วยพิเศษสงค์อาพาธ ",
      agency: "D043-หกดหกดหกดหกด",
      building: "สงค์อาพาธ",
      floor: "6",
      room: "2",
      status: "ใช้งานได้",
      price: "1550",
      PM: "",
      CB: "",
    },
  ];

  return (
    <div className="bg-background-page px-5 pt-20 pb-36">
      {/* Header */}
      <div className="text-xl text-text-green ">ข้อมูลครุภัณฑ์</div>
      <div className="flex justify-between items-center">
        {/* left home */}
        <div className="flex text-xs">
          <Link
            to="#"
            className=" text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ข้อมูลครุภัณฑ์</div>
        </div>

        {/* right button เพิ่มใบเบิก */}
        <div className="bg-text-green text-white px-4 py-2 rounded">
          + เพิ่มใบเบิกครุภัณฑ์
        </div>
      </div>

      {/* search bar */}
      <div className="flex items-center mt-5 mb-3">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <Selector placeholder={"ID"} />
      </div>

      {/* table */}
      <div>
        {/* top bar */}
        <div className="grid grid-cols-17 gap-2 h-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-t-lg border-b-[1px] border-border-gray-table">
          <div className="ml-2">ID</div>
          <div className="col-span-3">เลขครุภัณฑ์</div>
          <div className="col-span-3">ชื่อครุภัณฑ์</div>
          <div className="col-span-2">ฝ่าย/กลุ่มงาน</div>
          <div className="col-span-3">หน่วยงาน</div>
          <div className="col-span-2">อาคาร</div>
          <div className="col-span-1 text-center">สถานะ</div>
          <div className="col-span-2 text-center mr-2">Action</div>
        </div>
      </div>
      {dashboardTableArray?.map((el, idx) => {
        return (
          <RowOfTableArray
            key={idx}
            index={idx}
            ID={el.ID}
            inventoryNumber={el.inventoryNumber}
            name={el.name}
            department={el.department}
            sector={el.sector}
            agency={el.agency}
            building={el.building}
            floor={el.floor}
            room={el.room}
            status={el.status}
            price={el.price}
            PM={el.PM}
            CB={el.CB}
          />
        );
      })}
    </div>
  );
};

export default AssetInformation;
