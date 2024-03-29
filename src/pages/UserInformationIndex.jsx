import React, { useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import RowOfTableUserInformationIndex from "../components/table/RowOfTableUserInformationIndex";
import { useEffect } from "react";
import { getSectorOfUser, getUsersAll, getUsersBySearch } from "../api/userApi";
import { getSector } from "../api/masterApi";
import SearchSelector from "../components/selector/SearchSelector";
import Pagination from "../components/pagination";
import { Spinner } from "flowbite-react";

const UserInformationIndex = () => {
  const [search, setSearch] = useState({
    typeTextSearch: "username",
    textSearch: "",
    status: "",
    sector: "",
  });
  const [sectorArray, setSectorArray] = useState([])
  async function getMaster() {
    const sector = await getSectorOfUser()
    const arrSector = []
    sector.data.sector.map(ele => {
      arrSector.push({ label: ele.sector, value: ele.sector })
    })
    setSectorArray(arrSector)
  }

  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])
  const fetchUsersList = async () => {
    const response = await getUsersBySearch(search)
    setData(response.data.user)
    setSearch({
      ...search,
      limit: response.data.limit,
      page: response.data.page,
      total: response.data.total
    })
    setIsLoading(false)
  }
  useEffect(() => {
    fetchUsersList()
    getMaster()
  }, [])

  return (
    <div className="bg-background-page px-5 pt-10 pb-10">
      <div className="text-xl text-text-green ">ข้อมูลผู้ใช้งาน</div>
      <div className="sm:flex justify-between items-center">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ข้อมูลผู้ใช้งาน</div>
        </div>

        <div className="mt-4 sm:mt-0 flex justify-end gap-4">
          <button
            className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
          // onClick={() => inputDoc.current.click()}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 22 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M5.08203 7.79252C4.95093 7.66187 4.84691 7.50663 4.77593 7.3357C4.70496 7.16477 4.66842 6.9815 4.66842 6.79642C4.66842 6.61134 4.70496 6.42808 4.77593 6.25715C4.84691 6.08621 4.95093 5.93097 5.08203 5.80033L10.0039 0.878453C10.1346 0.747353 10.2898 0.643332 10.4607 0.572356C10.6317 0.501379 10.8149 0.464844 11 0.464844C11.1851 0.464844 11.3683 0.501379 11.5393 0.572356C11.7102 0.643332 11.8654 0.747353 11.9961 0.878453L16.918 5.80033C17.0491 5.93097 17.1531 6.08621 17.2241 6.25715C17.295 6.42808 17.3316 6.61134 17.3316 6.79642C17.3316 6.9815 17.295 7.16477 17.2241 7.3357C17.1531 7.50663 17.0491 7.66187 16.918 7.79252C16.6526 8.05445 16.2947 8.20131 15.9219 8.20131C15.549 8.20131 15.1912 8.05445 14.9258 7.79252L12.4062 5.27298V14.9995C12.4062 15.3725 12.2581 15.7302 11.9944 15.9939C11.7306 16.2576 11.373 16.4058 11 16.4058C10.627 16.4058 10.2694 16.2576 10.0056 15.9939C9.74191 15.7302 9.59375 15.3725 9.59375 14.9995V5.27298L7.07422 7.79252C6.94357 7.92362 6.78833 8.02764 6.6174 8.09861C6.44647 8.16959 6.26321 8.20612 6.07812 8.20612C5.89304 8.20612 5.70978 8.16959 5.53885 8.09861C5.36792 8.02764 5.21268 7.92362 5.08203 7.79252ZM19.4375 10.312H16.625C16.252 10.312 15.8944 10.4602 15.6306 10.7239C15.3669 10.9877 15.2188 11.3453 15.2188 11.7183C15.2188 12.0913 15.3669 12.4489 15.6306 12.7127C15.8944 12.9764 16.252 13.1245 16.625 13.1245H18.9688V23.9058H3.03125V13.1245H5.375C5.74796 13.1245 6.10565 12.9764 6.36937 12.7127C6.63309 12.4489 6.78125 12.0913 6.78125 11.7183C6.78125 11.3453 6.63309 10.9877 6.36937 10.7239C6.10565 10.4602 5.74796 10.312 5.375 10.312H2.5625C1.94185 10.3151 1.34749 10.563 0.908622 11.0019C0.469749 11.4408 0.22183 12.0351 0.21875 12.6558V24.3745C0.22183 24.9952 0.469749 25.5896 0.908622 26.0284C1.34749 26.4673 1.94185 26.7152 2.5625 26.7183H19.4375C20.0582 26.7152 20.6525 26.4673 21.0914 26.0284C21.5303 25.5896 21.7782 24.9952 21.7812 24.3745V12.6558C21.7782 12.0351 21.5303 11.4408 21.0914 11.0019C20.6525 10.563 20.0582 10.3151 19.4375 10.312Z"
                fill="#38821D"
              />
            </svg>
            <div>Export</div>
          </button>

          <Link
            to="/addUserInformation"
            type="button"
            className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
          >
            + เพิ่มผู้ใช้
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-3 items-center mt-8 mb-5 pl-3">
        <div className="lg:col-span-3 md:col-span-2 flex items-center">
          <div className="text-xs font-semibold flex-none px-3">ค้นหาโดย</div>
          <select
            className="ml-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
            name="typeTextSearch"
          // onChange={handleChange}
          >
            <option value="assetNumber">รหัสผู้ใช้งาน</option>
          </select>
        </div>

        <div className="lg:col-span-4 md:col-span-3  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            name="textSearch"
            // onChange={handleChange}
            value={search.textSearch}
            placeholder="รหัสผู้ใช้งาน"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="lg:col-span-3 md:col-span-5 flex gap-2 justify-between">
          <div className="w-full md:max-w-[300px]">
            <SearchSelector
              options={sectorArray}
              placeholder={"หน่วยงาน"}
              name={"sector"}
              onChange={(value, label) => setSearch({ ...search, [label]: value || "" })}
              floatLabel
            />
          </div>

            <button
              type="button"
              className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={fetchUsersList}
            >
              <div className="text-xl text-white">
                <AiOutlineSearch />
              </div>
            </button>
        </div>
      </div>

      <div className="grid">
        <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        {isLoading
          ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
          :
          <div className="w-max lg:w-full ">
            <div>
              <div className="flex p-4">
                <div className=" text-sm text-text-gray">ผลการค้นหา </div>
                <div className="ml-2 text-sm">{data.length} รายการ </div>
              </div>
              {/* top bar */}
              <div className="grid grid-cols-13 gap-2 h-12 items-center text-text-black-table text-xs text-center font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
                <div className="col-span-2 ml-2">รหัสผู้ใช้งาน</div>
                <div className="col-span-2">ชื่อ</div>
                <div className="col-span-2">นามสกุล</div>
                <div className="col-span-2">หน่วยงาน</div>
                <div className="col-span-2">วันที่เข้าสู่ระบบล่าสุด</div>
                <div className="col-span-1">สิทธิการเข้าถึง</div>
                <div className="col-span-2 text-center font-bold mr-2">
                  Action
                </div>
              </div>
            </div>
            {data?.map((el, idx) => {
              return (
                <RowOfTableUserInformationIndex
                  key={idx}
                  index={idx}
                  _id={el._id}
                  userId={el.username}
                  thaiFirstName={el.thaiFirstName}
                  thaiLastName={el.thaiLastName}
                  sector={el.sector}
                  lastLoginDate={el.lastLoginDate}
                  level={el.role} //* ?
                />
              );
            })}

            <Pagination search={search} data={data} fetchLists={fetchUsersList} />
          </div>
}
        </div>
      </div>
    </div>
  );
};

export default UserInformationIndex;
