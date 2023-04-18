import { Link } from "react-router-dom";
import DefaultDataBox from "../components/defaultData/DefaultDataBox";
import RowOfTableDefaultDataBox from "../components/table/RowOfTableDefaultDataBox";
import BuidingFloorRoomBox from "../components/defaultData/BuidingFloorRoomBox";

function DefaultData() {
  return (
    <div className="bg-background-page px-5 pt-10">
      <div className="flex items-center">
        <div className="text-xl text-text-green ">ตั้งค่าทั่วไป</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ตั้งค่าทั่วไป</div>
        </div>
      </div>

      <div className="px-5 py-5 max-w-[1000px] mx-auto min-w-[600px]">
        {/* <DefaultDataBox header={"ประเภทครุภัณฑ์"} fieldValue={true} /> */}
        <DefaultDataBox header={"หน่วยงาน"} />
        <DefaultDataBox header={"ภาควิชา"} />
        <DefaultDataBox header={"วัตถุประสงค์การขอยืม"} />
        <BuidingFloorRoomBox />
        <DefaultDataBox header={"คำนำหน้าบริษัท"} />
        <DefaultDataBox header={"คำนำหน้าชื่อ (ไทย)"} />
        <DefaultDataBox header={"คำนำหน้าชื่อ (อังกฤษ)"} />
        <DefaultDataBox header={"รหัสประเภทบุคคลากร"} />
        <DefaultDataBox header={"โรงพยาบาล"} />
        <DefaultDataBox header={"ประเภทของแพทย์"} />
        <DefaultDataBox header={"สาขาแพทย์"} />
      </div>
    </div>
  );
}

export default DefaultData;
