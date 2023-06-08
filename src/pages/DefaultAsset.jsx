import { Link } from "react-router-dom";
import DefaultAssetBox from "../components/defaultData/DefaultAssetBox";
import RowOfTableDefaultDataBox from "../components/table/RowOfTableDefaultDataBox";
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'


function DefaultData() {
  return (
    <div className="bg-background-page px-5 pt-10">
      <div className="flex items-center">
        <div className="text-xl text-text-green ">ตั้งค่าข้อมูลครุภัณฑ์</div>
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
          <div className="text-text-gray ml-2">ตั้งค่าข้อมูลครุภัณฑ์</div>
        </div>
      </div>

      <div className="px-5 py-5 max-w-[1000px] mx-auto min-w-[600px]">
        {/* <div className="grid grid-cols-2 gap-x-6 xl:gap-x-14  gap-y-5"> */}
        <DefaultAssetBox header={"ประเภทครุภัณฑ์"} fieldValue={true} />
        <DefaultAssetBox header={"ชนิดครุภัณฑ์"} fieldValue={true} />
        <DefaultAssetBox header={"หมวดหมู่ครุภัณฑ์"} fieldValue={true} />
        <DefaultAssetBox header={"ประเภทครุภัณฑ์ 4 หลัก"} fieldValue={true} />
        <DefaultAssetBox header={"ประเภทครุภัณฑ์ 8 หลัก"} fieldValue={true} />
        <DefaultAssetBox header={"ประเภทครุภัณฑ์ 13 หลัก"} fieldValue={true} />
        <DefaultAssetBox header={"ยี่ห้อ"} />
        <DefaultAssetBox header={"กลุ่ม"} />
        <DefaultAssetBox header={"ประเภทที่ได้มา"} />
        <DefaultAssetBox header={"แหล่งที่ได้มา"} />
        <DefaultAssetBox header={"วัตถุประสงค์ในการใช้งาน"} />
        <DefaultAssetBox header={"วิธีการได้มา"} />
        <DefaultAssetBox header={"ประเภทเงิน"} />
        <DefaultAssetBox header={"หน่วยนับ"} />
        {/* <DefaultAssetBox header={"สิ้นสภาพการเป็นครุภัณฑ์"} /> */}
        {/* </div> */}
      </div>

      <div className="hidden bg-white border-[1px] p-1 rounded-lg shadow-sm text-sm mt-5">
        {/* <div className="bg-background-gray-table rounded-lg p-4">
          หมวด
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>

          </div>
          <div>
            <RowOfTableDefaultDataBox
            // key={idx}
            // index={idx}
            // rowArray={rowArray}
            // setRowArray={setRowArray}
            // deleteRow={deleteRow}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default DefaultData;
