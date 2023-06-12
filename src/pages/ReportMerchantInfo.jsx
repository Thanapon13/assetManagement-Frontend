import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import DateInput from '../components/date/DateInput'
import { getAllMerchant } from '../api/merchant'
import RowOfMerchantTableArray from '../components/table/RowOfMerchantTableArray'

export const ReportMerchantInfo = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState
  const [search, setSearch] = useState({
    inventoryNumber: '',
    wordSearch: '',
    department: '',
    sector: '',
    // "merchantDate":todayThaiDate
  })
  const [perPage, setPerPage] = useState(10)

  //Main Date
  const [merchantDate, setmerchantDate] = useState(todayThaiDate)

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
    <div className="bg-background-page px-5 pt-10 pb-36">
      {/* Header */}
      <div className="text-xl text-text-green ">รายงานข้อมูลหลักผู้ค้า</div>
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
          <div className="text-text-gray ml-2">รายงานข้อมูลหลักผู้ค้า</div>
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
            <option value="assetNumber">รหัสผู้ค้า</option>
          </select>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            name="textSearch"
            // onChange={handleChange}
            value={search.textSearch}
            placeholder="รหัสผู้ค้า"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3 flex gap-2">
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
          // onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะทั้งหมด
            </option>
            <option value="inStock">ใช้งานได้</option>
            <option value="transfered">โอน</option>
            <option value="borrowed">ยืม</option>
            <option value="broken">ชำรุด</option>
            <option value="repair">ซ่อม</option>
            <option value="sell">จำหน่าย</option>
            <option value="">แทงจำหน่าย</option>
          </select>

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
      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full h-[500px] ">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">25 รายการ </div>
            </div>
            {/* top bar */}
            <div className="grid grid-cols-15 gap-2 h-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-t-lg border-b-[1px] border-border-gray-table">
              <div className="">รหัสผู้ค้า</div>
              <div className="col-span-2">คำนำหน้าบริษัท</div>
              <div className="col-span-3">ชื่อบริษัทผู้ค้า</div>
              <div className="col-span-3">กลุ่มประเภท</div>
              <div className="col-span-2">ชื่อผู้ติดต่อ</div>
              <div className="col-span-2">สถานะ</div>
              <div className="col-span-2 text-center font-bold mr-2">
                Action
              </div>
            </div>
          </div>
          {merchantTableArray?.map((el, idx) => {
            return (
              <RowOfMerchantTableArray
                key={idx}
                index={idx}
                billNumber={el.billNumber}
                documentRegistration={el.documentRegistration}
                sector={el.sector}
                withdrawDate={el.withdrawDate}
                allPrice={el.allPrice}
                count={el.count}
                _id={el._id}
                mode="reportInfo"
              />
            )
          })}
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
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

export default ReportMerchantInfo
