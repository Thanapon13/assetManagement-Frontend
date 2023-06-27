import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import DateInput from '../components/date/DateInput'
import { getAllMerchant, getMerchantBySearchViewOnly } from '../api/merchant'
import RowOfMerchantTableArray from '../components/table/RowOfMerchantTableArray'
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg'

export const ReportMerchantInfo = () => {
  const [search, setSearch] = useState({
    inventoryNumber: '',
    wordSearch: '',
    department: '',
    sector: '',
  })

  const [merchantList, setMerchantList] = useState([])

  const fetchMerchantList = async (options) => {
    try {
      const res = await getMerchantBySearchViewOnly(options || search);
      console.log('RES', res.data.merchant);
      setMerchantList(res.data.merchant)
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      })
    } catch (err) {
      console.log(err);
    }
  }
  console.log(search)
  useEffect(() => {
    fetchMerchantList()
  }, []);

  const handlePaginationSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
    fetchMerchantList({ ...search, [e.target.name]: e.target.value })
  };

  const handlePage = (num) => {
    setSearch({ ...search, page: num })
    fetchMerchantList({ ...search, page: num })
  }

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-background-page px-5 pt-10 pb-36 h-screen">
      <div className="text-xl text-text-green ">รายงานข้อมูลหลักผู้ค้า</div>
      <div className="flex justify-between items-center">
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
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะทั้งหมด
            </option>
            <option value="active">active</option>
            <option value="inactive">Inactive</option>
            <option value="saveDraft">แบบร่าง</option>
          </select>

          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            onClick={() => fetchMerchantList()}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className='grid'>
        <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
          <div className="min-w-max lg:w-full ">
            <div>
              <div className="flex p-4">
                <div className=" text-sm text-text-gray">ผลการค้นหา </div>
                <div className="ml-2 text-sm">{search.total} รายการ </div>
              </div>

              <div className="grid grid-cols-14 gap-2 h-12 items-center text-center text-text-black-table text-xs font-semibold bg-border-gray-table border-b-[1px] border-border-gray-table">
                <div className="">รหัสผู้ค้า</div>
                <div className="col-span-2">คำนำหน้าบริษัท</div>
                <div className="col-span-3">ชื่อบริษัทผู้ค้า</div>
                <div className="col-span-2">กลุ่มประเภท</div>
                <div className="col-span-2">ชื่อผู้ติดต่อ</div>
                <div className="col-span-2">สถานะ</div>
                <div className="col-span-2 text-center font-bold mr-2">
                  Action
                </div>
              </div>
            </div>
            {merchantList?.map((el, idx) => {
              return (
                <RowOfMerchantTableArray
                  key={idx}
                  index={idx}
                  ele={el}
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
            
            {!merchantList?.length
              ? <center className='p-5'>-</center>
              :
              <div className="flex justify-end gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
                <div className="flex items-center">
                  <div>Rows per page:</div>
                  <select
                    id="limit"
                    name="limit"
                    className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handlePaginationSearch}
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
                  {search.limit * (search.page - 1) + 1}-{search.limit * (search.page - 1) + merchantList.length} of {search.total}
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
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default ReportMerchantInfo
