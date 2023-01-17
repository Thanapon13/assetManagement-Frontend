import React from 'react'
import { Link } from 'react-router-dom'
import TableBorrowSaving from '../components/table/TableBorrowSaving'
import { FaArrowLeft } from 'react-icons/fa'

const BorrowSaving = () => {
  const tableData = [
    {
      ID: '1',
      assetId: '7440-001-001',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '3',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
    {
      ID: '2',
      assetId: '6301-018-0131',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '5',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
    {
      ID: '3',
      assetId: '1314-013-1331',
      assetName: 'พัดลม hatari แบบ',
      assetModelDetail: 'hatari/extream/18',
      quantity: '7',
      unit: 'ตัว',
      totalPrice: '19000.00',
    },
  ]
  const imageList = [
    {
      imageName: 'image1.png',
    },
    {
      imageName: 'image2.png',
    },
    {
      imageName: 'image3.png',
    },
  ]
  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green flex items-center space-x-5 ">
          <Link to={`/borrowList`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>บันทึกคืนครุภัณฑ์</h1>
        </div>
        <div className="flex pt-3">
          {/* left home */}
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกการคืนครุภัณฑ์</div>
          </div>
        </div>
        {/* ข้อมูลการคืนครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการคืนครุภัณฑ์</div>
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10">
            {/* col 1 เลขที่เอกสารการยืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-2 ">
                <label className=" text-text-gray flex">
                  เลขที่เอกสารการยืม
                </label>
                <input
                  type="text"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่ยืม</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">วันที่คืน</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">วัตถุประสงค์การขอยืม</label>
                <input
                  type="text"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
            {/* col 2 ราคายืม */}
            <div className="grid grid-rows-3 md:col-span-2 pt-4 md:gap-10 gap-1">
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className=" text-text-gray flex">ราคายืม (ต่อวัน)</label>
                <input
                  type="number"
                  placeholder="Example"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-1">
                <label className="text-text-gray">จำนวนวันที่ยืม (วัน) </label>
                <input
                  type="number"
                  placeholder="5"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">กำหนดส่งคืน</label>
                <input
                  type="date"
                  placeholder="12/05/10"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">มูลค่าการยืม (บาท)</label>
                <input
                  type="number"
                  placeholder="400.00"
                  readOnly
                  className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่คืน */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="flex justify-between">
            <div className="text-xl">รายการครุภัณฑ์ที่คืน</div>
            <button
              type="button"
              className="px-4 py-2 flex gap-2 items-center rounded-md bg-text-green text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H10V10H4V4ZM20 4V10H14V4H20ZM14 15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15ZM16 15V18H18V15H16ZM4 20V14H10V20H4ZM6 6V8H8V6H6ZM16 6V8H18V6H16ZM6 16V18H8V16H6ZM4 11H6V13H4V11ZM9 11H13V15H11V13H9V11ZM11 6H13V10H11V6ZM2 2V6H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L6 0V2H2ZM22 0C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V6H22V2H18V0H22ZM2 18V22H6V24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V18H2ZM22 22V18H24V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H18V22H22Z"
                  fill="white"
                />
              </svg>
              สแกนครุภัณฑ์
            </button>
          </div>
          {/* table */}
          <div className="overflow-x-auto  scrollbar pt-4">
            <div className="w-[1000px] lg:w-full">
              <div className="grid grid-cols-11 gap-2 h-12 items-center text-center bg-table-gray rounded-md">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className=" text-text-green placeholder-text-green focus:ring-0"
                  />
                </div>
                <div className="col-span-1">ลำดับ</div>
                <div className="col-span-2">ID ครุภัณฑ์</div>
                <div className="col-span-3">ชื่อครุภัณฑ์</div>
                <div className="col-span-2">เจ้าของครุภัณฑ์</div>
                <div className="col-span-1">สถานะครุภัณฑ์</div>
                <div className="col-span-1">จำนวน(บาท)</div>
              </div>
              <TableBorrowSaving data={tableData} />
              {/* upload image */}
              <div className="flex flex-col justify-center items-center border-dashed border-2 bg-upload-pic rounded-2xl p-10 mt-16 text-text-green mr-10 ml-10 space-y-5">
                <div className="text-xl">วางรูปครุภัณฑ์ หรือ</div>
                <svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_621_95362)">
                    <rect
                      width="48"
                      height="48"
                      transform="translate(0.5)"
                      fill="white"
                      fill-opacity="0.01"
                    />
                    <g clip-path="url(#clip1_621_95362)">
                      <path
                        d="M15.4398 11.999C15.215 11.9993 14.9931 12.0502 14.7906 12.1478C14.5881 12.2454 14.4101 12.3873 14.2698 12.563L5.11983 23.999H18.4998C18.8977 23.999 19.2792 24.1571 19.5605 24.4384C19.8418 24.7197 19.9998 25.1012 19.9998 25.499C19.9998 26.6925 20.4739 27.8371 21.3179 28.681C22.1618 29.5249 23.3064 29.999 24.4998 29.999C25.6933 29.999 26.8379 29.5249 27.6818 28.681C28.5257 27.8371 28.9998 26.6925 28.9998 25.499C28.9998 25.1012 29.1579 24.7197 29.4392 24.4384C29.7205 24.1571 30.102 23.999 30.4998 23.999H43.8798L34.7298 12.563C34.5895 12.3873 34.4116 12.2454 34.209 12.1478C34.0065 12.0502 33.7847 11.9993 33.5598 11.999H15.4398ZM45.3018 26.999H31.8498C31.5056 28.6945 30.5857 30.2187 29.2462 31.3136C27.9067 32.4084 26.2299 33.0065 24.4998 33.0065C22.7698 33.0065 21.093 32.4084 19.7534 31.3136C18.4139 30.2187 17.4941 28.6945 17.1498 26.999H3.69783L4.65783 34.685C4.70323 35.0483 4.87987 35.3824 5.1545 35.6244C5.42913 35.8664 5.78278 35.9997 6.14883 35.999H42.8508C43.2164 35.9989 43.5693 35.8653 43.8433 35.6234C44.1173 35.3814 44.2935 35.0477 44.3388 34.685L45.2988 26.999H45.3018ZM11.9268 10.688C12.3486 10.1607 12.8837 9.73514 13.4923 9.44276C14.101 9.15039 14.7676 8.99873 15.4428 8.99902H33.5568C34.2321 8.99873 34.8987 9.15039 35.5074 9.44276C36.116 9.73514 36.651 10.1607 37.0728 10.688L48.1728 24.563C48.2975 24.7196 48.3897 24.8995 48.4438 25.0922C48.4978 25.2849 48.5128 25.4864 48.4878 25.685L47.3178 35.057C47.1818 36.1457 46.6527 37.1472 45.8301 37.8731C45.0075 38.599 43.948 38.9994 42.8508 38.999H6.14883C5.0517 38.9994 3.99221 38.599 3.16958 37.8731C2.34696 37.1472 1.81788 36.1457 1.68183 35.057L0.511835 25.685C0.487246 25.4862 0.502716 25.2846 0.557332 25.0919C0.611948 24.8992 0.704604 24.7193 0.829835 24.563L11.9298 10.688H11.9268Z"
                        fill="#38821D"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_621_95362">
                      <rect
                        width="48"
                        height="48"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                    <clipPath id="clip1_621_95362">
                      <rect
                        width="48"
                        height="48"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <button
                  type="button"
                  className="px-16 py-2 border border-text-green rounded-2xl hover:bg-slate-200"
                >
                  Upload
                </button>
              </div>
              {/* list image */}
              <div className="p-10 space-y-3">
                {imageList.map((item, idx) => {
                  return (
                    <div className=" text-text-green flex gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_621_12945)">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            fill-opacity="0.01"
                          />
                          <g clip-path="url(#clip1_621_12945)">
                            <path
                              d="M12.2498 3.93652V12.249C12.2498 12.7132 12.0654 13.1583 11.7372 13.4865C11.409 13.8146 10.9639 13.999 10.4998 13.999H3.49976C3.03563 13.999 2.59051 13.8146 2.26232 13.4865C1.93413 13.1583 1.74976 12.7132 1.74976 12.249V1.74902C1.74976 1.28489 1.93413 0.839775 2.26232 0.511587C2.59051 0.183398 3.03563 -0.000976562 3.49976 -0.000976562H8.31226L12.2498 3.93652ZM9.62476 3.93652C9.27666 3.93652 8.94282 3.79824 8.69668 3.5521C8.45054 3.30596 8.31226 2.97212 8.31226 2.62402V0.874023H3.49976C3.26769 0.874023 3.04513 0.966211 2.88104 1.1303C2.71694 1.2944 2.62476 1.51696 2.62476 1.74902V12.249C2.62476 12.4811 2.71694 12.7036 2.88104 12.8677C3.04513 13.0318 3.26769 13.124 3.49976 13.124H10.4998C10.7318 13.124 10.9544 13.0318 11.1185 12.8677C11.2826 12.7036 11.3748 12.4811 11.3748 12.249V3.93652H9.62476Z"
                              fill="#38821D"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_621_12945">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_621_12945">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {item.imageName}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* Row 1 ชื่อ - นามสกุล */}
          <div className="grid md:grid-cols-5 pt-4 md:gap-20 gap-3">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">ชื่อ - นามสกุล</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">รหัสเจ้าหน้าที่</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 หน่วยงานผู้ยืม */}
          <div className="grid md:grid-cols-5 pt-4 md:gap-20 gap-3">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">หมายเลขโทรศัพท์</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ที่อยู่</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 3 ที่อยู่ */}
          <div className="grid md:grid-cols-5 pt-4 md:gap-20 gap-3">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">หน่วยงานผู้ยืม</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">ภาควิชา</label>
              <input
                type="text"
                placeholder="Example"
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="bg-white flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        <Link
          // type="button"
          to="/borrowList"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </Link>
        <button
          type="button"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        >
          บันทึกคืนครุภัณฑ์
        </button>
      </div>
    </>
  )
}

export default BorrowSaving
