import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import DateInput from '../components/date/DateInput'
import RowOfTablePackageIndex from '../components/table/RowOfTablePackageIndex'
import { deletePackageAsset, getAllPackageAsset, getPackageAssetBySearch } from "../api/packageAssetApi";
import SearchSelector from '../components/selector/SearchSelector';
import { getSector } from '../api/masterApi';
import { IoIosClose } from 'react-icons/io';

const PackageAssetInformationIndex = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState
  const [amountPage, setAmountPage] = useState(1);

  // search
  const [search, setSearch] = useState({
    typeTextSearch: "assetNumber",
    textSearch: "",
    status: "",
    dateFrom: "",
    dateTo: todayThaiDate,
    sector: "",
    page: "",
    limit: 10,
    total: "",
  });

  const [packageAssetList, setPackageAssetList] = useState([]);
  const [showModalDeleteAsset, setShowModalDeleteAsset] = useState(false);
  // handle
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFirstPage = () => {
    if (search.page === 1) {
      // window.alert("You are already on the first page.");
    } else {
      setSearch({ ...search, page: 1 });
      fetchSearchPackageAssetList({ ...search, page: 1 });
    }
  };
  const handleLastPage = () => {
    if (search.page === amountPage) {
      // window.alert("You are already on the last page.");
    } else {
      setSearch({ ...search, page: amountPage });
      fetchSearchPackageAssetList({ ...search, page: amountPage });
    }
  };
  const handlePageDecrease = () => {
    // console.log(search.page)
    console.log(search.page)
    console.log(amountPage)
    if (search.page > 1) {
      let newPage = search.page - 1;
      setSearch({ ...search, page: newPage });
      fetchSearchPackageAssetList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the first page.");
    }
  };
  const handlePageIncrease = () => {
    console.log(search.page)
    console.log(amountPage)
    if (search.page < amountPage) {
      let newPage = search.page + 1;
      setSearch({ ...search, page: newPage });
      fetchSearchPackageAssetList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the last page.");
    }
  };

  const fetchSearchPackageAssetList = async (paginationSearchObj) => {
    try {

      let res = [];
      // console.log(paginationSearchObj);
      if (paginationSearchObj) {
        res = await getPackageAssetBySearch(paginationSearchObj);
      } else {
        res = await getPackageAssetBySearch(search);
      }
      console.log(res.data.packageAsset);

      // handle the response data
      setPackageAssetList(res.data.packageAsset);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
      setAmountPage(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    fetchSearchPackageAssetList();
  };

  const handlePaginationSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchSearchPackageAssetList({ ...search, [e.target.name]: e.target.value });
  };



  // fetch all data
  const fetchPackageAssetList = async () => {
    try {
      const res = await getAllPackageAsset();
      console.log(res.data.packageAsset);
      setPackageAssetList(res.data.packageAsset);
      setSearch({
        ...search,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
      });
      setAmountPage(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id, reason) => {
    try {
      await deletePackageAsset(id, { reason: reason });
      fetchPackageAssetList()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPackageAssetList();
    getMaster()
  }, []);

  const [sectorArray, setSectorArray] = useState([])
  async function getMaster() {
    const sector = await getSector()
    const arrSector = []
    sector.data.sector.map(ele => {
      arrSector.push({ label: ele.name, value: ele.name })
    })
    setSectorArray(arrSector)
  }

  return (
    <div className="bg-background-page px-5 py-10 min-h-full">
      <div className="text-xl text-text-green ">ข้อมูลครุภัณฑ์เป็นชุด</div>
      <div className="flex justify-between items-center">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>

          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">ข้อมูลครุภัณฑ์เป็นชุด</div>
        </div>

        <Link
          to="/packageAssetInformation"
          type="button"
          className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          + เพิ่มใบครุภัณฑ์เป็นชุด
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="md:col-span-3 flex items-center">
          <div className="text-xs font-semibold flex-none px-3">ค้นหาโดย</div>
          <select
            className="ml-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
            name="typeTextSearch"
            onChange={handleChange}

          >
            <option value="assetNumber">เลขครุภัณฑ์</option>
          </select>
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            name="textSearch"
            onChange={handleChange}
            value={search.textSearch}
            placeholder="เลขครุภัณฑ์"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3 md:pr-4">
          {/* <Selector placeholder={"สถานะ"} /> */}
          <select
            className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
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
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateFrom"
              state={search}
              setState={setSearch}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              id="dateTo"
              state={search}
              setState={setSearch}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3 ">
          <SearchSelector
            options={sectorArray}
            placeholder={"หน่วยงานที่โอน"}
            name={"transferSector"}
            onChange={(value, label) => setSearch({ ...search, [label]: value })}
            floatLabel
          />
        </div>

        <div className="flex justify-end pr-4">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full max-h-[50em] mb-4">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">{search.total} รายการ </div>
            </div>
            <div className="grid grid-cols-19 gap-2 h-12 items-center text-center text-text-black-table text-xs font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
              <div className="ml-2">ลำดับ</div>
              <div className="col-span-3">เลขครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-2">ราคา</div>
              <div className="col-span-2">ฝ่าย/กลุ่มงาน</div>
              <div className="col-span-2">หน่วยงาน</div>
              <div className="col-span-2">อาคาร</div>
              <div className="col-span-2 text-center">สถานะ</div>
              <div className="col-span-2 text-center font-bold mr-2">
                Action
              </div>
            </div>
          </div>
          {packageAssetList?.map((el, idx) => {
            console.log(el)
            return (
              <RowOfTablePackageIndex
                key={idx}
                index={idx}
                _id={el._id}
                realAssetId={el.realAssetId}
                assetNumber={el.assetNumber}
                productName={el.productName}
                department={el.department}
                sector={el.sector}
                // agency={el.agency}
                building={el.building}
                // floor={el.floor}
                // room={el.room}
                status={el.status}
                price={el.pricePerUnit}
                handleDelete={() => setShowModalDeleteAsset(el)}
              />
            )
          })}
          {showModalDeleteAsset &&
            <ModalDeleteAsset
              element={showModalDeleteAsset}
              close={() => setShowModalDeleteAsset(false)}
              confirmDelete={handleDelete}
            />
          }
          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex items-center mr-10">
              <div>Rows per page:</div>
              <select
                id="limit"
                name="limit"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlePaginationSearch}
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

            <div>
              {search.limit * (search.page - 1) + 1}-{search.limit * (search.page - 1) + packageAssetList.length} of
              {search.total}
            </div>

            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={handleFirstPage}
            >
              <CgPushChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={handlePageDecrease}
            >
              <HiChevronLeft className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={handlePageIncrease}
            >
              <HiChevronRight className="text-lg" />
            </button>
            <button
              className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
              onClick={handleLastPage}
            >
              <CgPushChevronRight className="text-lg font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModalDeleteAsset(props) {
  const elem = props.element
  const [remark, setRemark] = useState("")
  const [error, setError] = useState(false)
  return (
    <>
      {/* responsive not done */}
      <div className="fixed inset-0 -left-10 bg-black opacity-50" />
      <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
        <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
          <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
            <div>
              <div className="flex items-center justify-center p-5 relative">
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42 0.333344C39.9167 0.333344 37.8334 1.12501 36.125 2.79168L2.79169 36.125C-0.49998 39.375 -0.49998 44.625 2.79169 47.875L36.125 81.2083C39.375 84.5 44.625 84.5 47.875 81.2083L81.2084 47.875C84.5 44.625 84.5 39.375 81.2084 36.125L47.875 2.79168C46.1667 1.12501 44.0834 0.333344 42 0.333344ZM37.8334 21.1667H46.1667V46.1667H37.8334V21.1667ZM37.8334 54.5H46.1667V62.8333H37.8334V54.5Z" fill="#EB5757" />
                </svg>
                <p className="text-2xl text-red-600 ml-4">
                  ลบครุภัณฑ์
                </p>
                <div className="absolute w-full flex justify-end pr-5 mb-8">
                  <button
                    className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"

                    onClick={() => props.close()}
                  >
                    <IoIosClose className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="px-5 py-4 text-base">
                <div className="grid grid-cols-2  md:grid-cols-6 p-2">
                  <div className="text-text-gray flex items-center ">
                    เลขครุภัณฑ์
                  </div>
                  <div className="flex items-center md:col-span-2">
                    {elem.assetNumber}
                  </div>
                  <div className="text-text-gray flex items-center ">
                    ชื่อครุภัณฑ์
                  </div>
                  <div className="flex items-center md:col-span-2">
                    {elem.productName}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                  <div className="text-text-gray flex items-center">
                    หน่วยงาน
                  </div>
                  <div className="flex items-center md:col-span-2">
                    {elem.sector}
                  </div>
                  <div className="text-text-gray flex items-center">
                    ราคา
                  </div>
                  <div className="flex items-center md:col-span-2">
                    {elem.pricePerUnit}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                  <div className="text-text-gray flex items-center">
                    สาเหตุที่ยกเลิก
                  </div>
                  <textarea className={`${error && !remark && "border-red-500"} col-span-5 border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                    onChange={e => setRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
              <button
                className="px-10 py-3 text-white bg-gray-400/[.8] hover:bg-gray-400 bg-[#999999] shadow-sm rounded-md "
                type="button"
                onClick={() => props.close()}
              >
                ย้อนกลับ
              </button>
              <button
                className="text-white hover:bg-red-600 bg-[#EB5757] px-10 py-3 border rounded-md "
                onClick={() => remark ? props.confirmDelete(elem._id, remark) : setError(true)}
              >
                ยืนยันลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PackageAssetInformationIndex
