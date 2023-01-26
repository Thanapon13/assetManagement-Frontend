import { Link } from "react-router-dom";
import DefaultDataBox from "../components/defaultData/DefaultDataBox";

function DefaultData() {
  return (
    <div className="bg-background-page px-5 pt-10 pb-36">
      {/* Header */}
      <div className="flex items-center">
        <div className="text-xl text-text-green ">ตั้งค่าข้อมูลครุภัณฑ์</div>
      </div>
      <div className="flex justify-between items-center">
        {/* left home */}
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ตั้งค่าข้อมูลครุภัณฑ์</div>
        </div>
      </div>
      <div className="px-5 py-5">
        <div className="grid grid-cols-2 gap-x-6 xl:gap-x-14  gap-y-5">

        <DefaultDataBox header={"หมวด"}/>
        <DefaultDataBox header={"กลุ่ม"}/>
        <DefaultDataBox header={"ประเภท"}/>
        <DefaultDataBox header={"ชนิด"}/>
        <DefaultDataBox header={"วิธีการได้มา"}/>
        <DefaultDataBox header={"ประเภทที่ได้มา"}/>
        <DefaultDataBox header={"สิ้นสภาพการเป็นครุภัณฑ์"}/>
        <DefaultDataBox header={"แหล่งที่ได้มา"}/>
        <DefaultDataBox header={"วัตถุประสงค์ในการใช้"}/>
        </div>
      </div>
    </div>
  );
}

export default DefaultData;
