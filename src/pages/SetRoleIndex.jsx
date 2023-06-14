import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs"
import { IoMdTrash } from "react-icons/io"
import { getSector } from '../api/masterApi'
import SearchSelector from '../components/selector/SearchSelector'
import { getAllRole, getRoleBySearch } from '../api/userApi'
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg'

export const SetRoleIndex = () => {
  const [search, setSearch] = useState({
    typeTextSearch: "",
    textSearch: "",
    status: "",
    sector: "",
  });
  const [sectorArray, setSectorArray] = useState([])
  async function getMaster() {
    const sector = await getSector()
    const arrSector = []
    sector.data.sector.map(ele => {
      arrSector.push({ label: ele.name, value: ele.name })
    })
    setSectorArray(arrSector)
  }

  const [data, setData] = useState([])


  const fetchLists = async () => {
    try {
      const res = await getRoleBySearch(search);
      setData(res.data.role);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLists()
    getMaster()
  }, []);

  const handlePagination = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
    fetchLists({ ...search, [e.target.name]: e.target.value })
  };

  const handlePage = (num) => {
    setSearch({ ...search, page: num })
    fetchLists({ ...search, page: num })
  };

  return (
    <div className="bg-background-page px-5 pt-10 pb-5">
      <div className="text-xl text-text-green ">กำหนด Role การทำงาน</div>
      <div className="flex justify-between items-center">
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

        <div className="md:flex gap-5 space-y-2 md:space-y-0">
          <Link
            to="/setRole"
            type="button"
            className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
          >
            + เพิ่ม Role
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-3 items-center mt-8 mb-5 pl-3">
        <div className="md:col-span-3 flex items-center">
          <div className="text-xs font-semibold flex-none px-3">ค้นหาโดย</div>
          <select
            className="ml-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
            name="typeTextSearch"
          // onChange={handleChange}
          >
            <option value="assetNumber">รหัสผู้ใช้งาน</option>
          </select>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
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

        <div className="md:col-span-3 flex gap-2">
          <div className="w-full">
            <SearchSelector
              options={sectorArray}
              placeholder={"หน่วยงาน"}
              name={"sector"}
              onChange={(value, label) => setSearch({ ...search, [label]: value })}
              floatLabel
            />
          </div>

          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
          // onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg my-3 overflow-x-auto scrollbar">
        <div className="w-[600px] lg:w-full h-[500px] ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">{search.total} รายการ </div>
            </div>

            <div className="grid grid-cols-6 gap-2 h-12 items-center text-text-black-table text-xs text-center font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
              <div className="">รหัสผู้ใช้งาน</div>
              {/* <div className="col-span-2">ชื่อภาษาอังกฤษ</div> */}
              <div className="col-span-4">ชื่อภาษาไทย</div>
              <div className="col-span-1 text-center font-bold mr-2">
                {/* Action */}
              </div>
            </div>
          </div>
          {data?.map((ele, index) => {
            return (
              <div key={index}
                className={`grid grid-cols-6 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
              >
                <div className="ml-2 text-center">{index + 1}</div>
                <div className="col-span-4">{ele.roleName}</div>
                <div className="col-span-1 flex justify-center gap-2 mr-2">
                  <Link
                    to={`/editRole/${ele._id}`}
                    className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
                    <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
                  </Link>
                  <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
                    <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
                  </button>
                </div>
              </div>
            )
          })}
          <div className="flex justify-end gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex items-center">
              <div>Rows per page:</div>
              <select
                id="limit"
                name="limit"
                className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlePagination}
              >
                <option value="5">5</option>
                <option value="10" selected="selected">
                  10
                </option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="mx-5">
              {search.limit * (search.page - 1) + 1}-{search.limit * (search.page - 1) + data.length} of {search.total}
            </div>

            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 my-2"
              onClick={() => {
                if (1 == search.page) return
                handlePage(1)
              }}
            >
              <CgPushChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={() => handlePage(search.page - 1)}
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={() => handlePage(search.page + 1)}
            >
              <HiChevronRight className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={() => {
                if (search.page == search.limit) return
                handlePage(search.limit)
              }}
            >
              <CgPushChevronRight className="text-lg font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetRoleIndex
