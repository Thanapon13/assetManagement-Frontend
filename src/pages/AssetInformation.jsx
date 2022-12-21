import React from "react";
import { Link } from "react-router-dom";

export const AssetInformation = () => {
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
    </div>
  );
};

export default AssetInformation;
