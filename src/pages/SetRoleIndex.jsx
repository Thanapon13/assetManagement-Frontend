import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs"
import { IoMdTrash } from "react-icons/io"

export const SetRoleIndex = () => {
  const [search, setSearch] = useState({
    inventoryNumber: '',
    wordSearch: '',
    department: '',
    sector: '',
  })
  const [perPage, setPerPage] = useState(10)

  // data
  let merchantTableArray = [
    {
      ID: '84745',
      billNumber: '4140-001-004',
      documentRegistration: 'พล072565',
      sector: 'ภาควิชาศัลยกรรมศาสตร์',
      withdrawDate: '14/12/2565 ',
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: '4140-001-004',
      documentRegistration: 'พล072565',
      sector: 'ภาควิชาศัลยกรรมศาสตร์',
      withdrawDate: '14/12/2565 ',
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: '4140-001-004',
      documentRegistration: 'พล072565',
      sector: 'ภาควิชาศัลยกรรมศาสตร์',
      withdrawDate: '14/12/2565 ',
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: '4140-001-004',
      documentRegistration: 'พล072565',
      sector: 'ภาควิชาศัลยกรรมศาสตร์',
      withdrawDate: '14/12/2565 ',
      allPrice: 1100,
      count: 20,
    },
    {
      billNumber: '4140-001-004',
      documentRegistration: 'พล072565',
      sector: 'ภาควิชาศัลยกรรมศาสตร์',
      withdrawDate: '14/12/2565 ',
      allPrice: 1100,
      count: 20,
    },
  ]

  // const fetchMerchantList = async () => {
  //   try {
  //     const res = await getAllMerchant();
  //     console.log('RES', res);
  //     // setAssetList(res.data.asset);
  //     // setSearch({
  //     //   ...search,
  //     //   page: res.data.page,
  //     //   limit: res.data.limit,
  //     //   total: res.data.total,
  //     // });
  //     // setAmountPage(Math.ceil(res.data.total / res.data.limit));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // fetchAssetWithdrawList();
  }, []);

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

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <Selector placeholder={'รหัสผู้ใช้งาน'} />
        </div>

        <div className="md:col-span-4 h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            // name="requestedId"
            // id="requestedId"
            // onChange={(e) => setRequestedId(e.target.value)}
            // value={requestedId}
            placeholder="รหัสผู้ใช้งาน"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-2">
          <Selector placeholder={'หน่วยงาน'} />
        </div>

        <div className="flex justify-end">
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

      {/* table */}
      <div className="bg-white rounded-lg my-3 overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full h-[500px] ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">25 รายการ </div>
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
          {merchantTableArray?.map((ele, index) => {
            return (
              <div
                className={`grid grid-cols-6 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
              >
                <div className="ml-2 text-center">{index + 1}</div>
                <div className="col-span-2">{ }</div>
                <div className="col-span-2">{ }</div>
                <div className="col-span-1 flex justify-center gap-2 mr-2">
                  <Link
                    to={`/editRole/`}
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
          <div className="flex justify-end gap-2 h-12 pr-8 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex items-center mr-10">
              <div>Rows per page:</div>
              <select
                id="perPage"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPerPage(e.target.value)}
              >
                {/* <option value="" selected disabled hidden>
            ประเภทครุภัณฑ์
          </option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10" selected="selected">
                  10
                </option>
              </select>
            </div>

            <div>1-{perPage} of 13</div>

            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1"
            // onClick={() => {
            //   deleteRow(index)
            // }}
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1"
            // onClick={() => {
            //   deleteRow(index)
            // }}
            >
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetRoleIndex
