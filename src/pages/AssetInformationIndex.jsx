import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import { deleteAsset, getAllAsset, getBySearch } from "../api/assetApi";
import { IoIosClose } from "react-icons/io";

const AssetInformationIndex = () => {
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [amountPage, setAmountPage] = useState(1);
  const [showModalDeleteAsset, setShowModalDeleteAsset] = useState(false);

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
    total: 0,
  });

  const [assetList, setAssetList] = useState([]);

  // handle
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFirstPage = () => {
    if (search.page === 1) {
      // window.alert("You are already on the first page.");
    } else {
      setSearch({ ...search, page: 1 });
      fetchSearchAssetList({ ...search, page: 1 });
    }
  };
  const handleLastPage = () => {
    if (search.page === amountPage) {
      // window.alert("You are already on the last page.");
    } else {
      setSearch({ ...search, page: amountPage });
      fetchSearchAssetList({ ...search, page: amountPage });
    }
  };
  const handlePageDecrease = () => {
    // console.log(search.page)
    if (search.page > 1) {
      let newPage = search.page - 1;
      setSearch({ ...search, page: newPage });
      fetchSearchAssetList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the first page.");
    }
  };
  const handlePageIncrease = () => {
    // console.log(search.page)
    // console.log(amountPage)
    if (search.page < amountPage) {
      let newPage = search.page + 1;
      setSearch({ ...search, page: newPage });
      fetchSearchAssetList({ ...search, page: newPage });
    } else {
      // window.alert("You are already on the last page.");
    }
  };

  const fetchSearchAssetList = async (paginationSearchObj) => {
    try {

      let res = [];
      // console.log(paginationSearchObj);
      if (paginationSearchObj) {
        res = await getBySearch(paginationSearchObj);
      } else {
        res = await getBySearch(search);
      }
      console.log(res.data.asset);

      // handle the response data
      setAssetList(res.data.asset);
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
    fetchSearchAssetList();
  };

  const handlePaginationSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    fetchSearchAssetList({ ...search, [e.target.name]: e.target.value });
  };



  // fetch all data
  const fetchAssetList = async () => {
    try {
      const res = await getAllAsset();
      console.log(res.data.asset);
      setAssetList(res.data.asset);
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

  const handleDelete = async (id, remark) => {
    try {
      await deleteAsset(id);
      // const response = await deleteAsset(id, สาเหตุที่ยกเลิก)
      // if(response...) {}
      setShowModalDeleteAsset(false)
      fetchAssetList()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssetList();
  }, []);


  return (
    <div className="bg-background-page px-5 pt-10 pb-36">
      {/* Header */}
      <div className="text-xl text-text-green ">ข้อมูลครุภัณฑ์</div>
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
          <div className="text-text-gray ml-2">ข้อมูลครุภัณฑ์</div>
        </div>

        {/* right button เพิ่มใบเบิก */}
        <Link
          to="/assetInformation"
          type="button"
          className=" text-white px-4 py-2 rounded  bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
        >
          + เพิ่มใบครุภัณฑ์
        </Link>
      </div>

      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          {/* <Selector placeholder={"ID"} /> */}
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="typeTextSearch"
            value={search.typeTextSearch}
            onChange={handleChange}
          >
            <option defaultValue value="assetNumber">
              เลขครุภัณฑ์
            </option>
            <option>all</option>
            <option>all</option>
            <option>all</option>
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

        <div className="md:col-span-3">
          {/* <Selector placeholder={"สถานะ"} /> */}
          <select
            className="border-[1px] p-2 h-[38px] text-xs text-gray-500 sm:text-sm border-gray-300 rounded-md w-full"
            name="status"
            value={search.status}
            onChange={handleChange}
          >
            <option defaultValue value="">
              สถานะ
            </option>
            <option value="inStock">ใช้งานได้</option>
            <option value="transfered">โอน</option>
            <option value="borrowws">ยืม</option>
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
          <Selector
            placeholder={"หน่วยงาน"}
            id={"หน่วยงาน"}
            state={search}
            setState={setSearch}
          />
        </div>

        <div className="flex justify-end">
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

      {/* table */}
      <div className="bg-white rounded-lg  my-3  overflow-x-auto scrollbar">
        <div className="w-[1000px] lg:w-full max-h-[50em] mb-4">
          <div>
            <div className="flex p-4">
              <div className=" text-sm text-text-gray">ผลการค้นหา </div>
              <div className="ml-2 text-sm">{search.total} รายการ </div>
            </div>
            {/* top bar */}
            <div className="grid grid-cols-17 gap-5 h-12 items-center text-center text-text-black-table text-xs font-semibold bg-border-gray-table  border-b-[1px] border-border-gray-table">
              <div className="ml-2">ลำดับ</div>
              <div className="col-span-3">เลขครุภัณฑ์</div>
              <div className="col-span-3">ชื่อครุภัณฑ์</div>
              <div className="col-span-2">ราคา</div>
              {/* <div className="col-span-1">ฝ่าย/กลุ่มงาน</div> */}
              <div className="col-span-2">หน่วยงาน</div>
              <div className="col-span-1">อาคาร</div>
              <div className="col-span-2 text-center">สถานะ</div>
              <div className="col-span-2 text-center font-bold mr-2">
                Action
              </div>
            </div>
          </div>
          {assetList?.map((el, idx) => {
            return (
              <RowOfTableArray
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
                // handleDelete={handleDelete}
                handleDelete={() => setShowModalDeleteAsset(el)}
              />
            );
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
              {search.limit * (search.page - 1) + 1}-{search.limit * (search.page - 1) + assetList.length} of
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
  );
};

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
              <div className="flex items-center justify-between p-5 ">
                <h3 className="text-xl text-text-green self-end">
                  ลบครุภัณฑ์
                </h3>
                <button
                  className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"

                  onClick={() => props.close()}
                >
                  <IoIosClose className="text-2xl" />
                </button>
              </div>
              {/* content */}
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
                {/* row 2 */}
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
                  <textarea className={`${error && !remark && "border-red-500"} col-span-5 border-[1px] p-2 h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                    onChange={e => setRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* footer */}
            <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
              <button
                // className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                className="px-10 py-3 text-white bg-gray-400 shadow-sm rounded-md "
                type="button"
                onClick={() => props.close()}
              >
                ย้อนกลับ
              </button>
              <button
                className="text-white bg-red-600 px-10 py-3 border rounded-md "
                // type="button"
                onClick={() => remark ? props.confirmDelete(props._id, remark) : setError(true)}
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

export default AssetInformationIndex;
