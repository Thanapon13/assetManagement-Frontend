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

export const MerchantInfo = () => {
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
      <div className="text-xl text-text-green ">ข้อมูลหลักผู้ค้า</div>
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
          <div className="text-text-gray ml-2">ข้อมูลหลักผู้ค้า</div>
        </div>

        <div className="md:flex gap-5 space-y-2 md:space-y-0">
          <button
            type="button"
            className="bg-background-page px-4 py-2  flex items-center gap-3 text-text-green border border-text-green rounded hover:bg-green-800"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.08203 7.79252C4.95093 7.66187 4.84691 7.50663 4.77593 7.3357C4.70496 7.16477 4.66842 6.9815 4.66842 6.79642C4.66842 6.61134 4.70496 6.42808 4.77593 6.25715C4.84691 6.08621 4.95093 5.93097 5.08203 5.80033L10.0039 0.878453C10.1346 0.747353 10.2898 0.643332 10.4607 0.572356C10.6317 0.501379 10.8149 0.464844 11 0.464844C11.1851 0.464844 11.3683 0.501379 11.5393 0.572356C11.7102 0.643332 11.8654 0.747353 11.9961 0.878453L16.918 5.80033C17.0491 5.93097 17.1531 6.08621 17.2241 6.25715C17.295 6.42808 17.3316 6.61134 17.3316 6.79642C17.3316 6.9815 17.295 7.16477 17.2241 7.3357C17.1531 7.50663 17.0491 7.66187 16.918 7.79252C16.6526 8.05445 16.2947 8.20131 15.9219 8.20131C15.549 8.20131 15.1912 8.05445 14.9258 7.79252L12.4062 5.27298V14.9995C12.4062 15.3725 12.2581 15.7302 11.9944 15.9939C11.7306 16.2576 11.373 16.4058 11 16.4058C10.627 16.4058 10.2694 16.2576 10.0056 15.9939C9.74191 15.7302 9.59375 15.3725 9.59375 14.9995V5.27298L7.07422 7.79252C6.94357 7.92362 6.78833 8.02764 6.6174 8.09861C6.44647 8.16959 6.26321 8.20612 6.07812 8.20612C5.89304 8.20612 5.70978 8.16959 5.53885 8.09861C5.36792 8.02764 5.21268 7.92362 5.08203 7.79252ZM19.4375 10.312H16.625C16.252 10.312 15.8944 10.4602 15.6306 10.7239C15.3669 10.9877 15.2188 11.3453 15.2188 11.7183C15.2188 12.0913 15.3669 12.4489 15.6306 12.7127C15.8944 12.9764 16.252 13.1245 16.625 13.1245H18.9688V23.9058H3.03125V13.1245H5.375C5.74796 13.1245 6.10565 12.9764 6.36937 12.7127C6.63309 12.4489 6.78125 12.0913 6.78125 11.7183C6.78125 11.3453 6.63309 10.9877 6.36937 10.7239C6.10565 10.4602 5.74796 10.312 5.375 10.312H2.5625C1.94185 10.3151 1.34749 10.563 0.908622 11.0019C0.469749 11.4408 0.22183 12.0351 0.21875 12.6558V24.3745C0.22183 24.9952 0.469749 25.5896 0.908622 26.0284C1.34749 26.4673 1.94185 26.7152 2.5625 26.7183H19.4375C20.0582 26.7152 20.6525 26.4673 21.0914 26.0284C21.5303 25.5896 21.7782 24.9952 21.7812 24.3745V12.6558C21.7782 12.0351 21.5303 11.4408 21.0914 11.0019C20.6525 10.563 20.0582 10.3151 19.4375 10.312Z"
                fill="#38821D"
              />
            </svg>
            Export
          </button>
          <Link
            to="/SaveMerchant"
            type="button"
            className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
          >
            + เพิ่มข้อมูลหลักผู้ค้า
          </Link>
        </div>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <Selector placeholder={'ID'} />
        </div>

        <div className="md:col-span-4 h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            // name="requestedId"
            // id="requestedId"
            // onChange={(e) => setRequestedId(e.target.value)}
            // value={requestedId}
            placeholder="เลขที่โอน"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-2">
          <Selector placeholder={'อาคาร'} />
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

export default MerchantInfo
