import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Selector from "../components/selector/Selector";
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import docIcon from "../public/pics/docIcon.png";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const ViewReportMerchantInfo = () => {
  const { assetWithdrawId } = useParams();
  const printRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await getAssetWithdrawById(assetWithdrawId);
        // console.log(res.data.borrow);

        // mock
        setArrayDocument([
          {
            "document": "1676965596734-4026ebafb4e2ed1b.pdf",
            "_id": "63f476dc24121d4c12bc3ae9"
          },
          {
            "document": "1676965596737-SPH Panacea with SAP B1 - Interface Specification_FixedAsset_V1_03.02.2023.docx",
            "_id": "63f476dc24121d4c12bc3aea"
          }
        ])
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const inputDoc = useRef();
  const [arrayDocument, setArrayDocument] = useState([])

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];
  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const cloneFile = [...arrayDocument];
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList[i]);
      // return
      if (fileTypes.includes(fileList[i].type)) {
        cloneFile.push({ document: fileList[i].name });
      } else {
        console.log('Er')
        // toast.warn(
        //   `${fileList[i].name} is wrong file type or size is more than 2mb.!`,
        //   {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   }
        // );
      }
    }
    setArrayDocument(cloneFile);
  };

  const deleteDoc = (idx) => {
    let clone = [...arrayDocument];
    clone.splice(idx, 1);
    setArrayDocument(clone);
  };

  return (
    <>
      <div className="bg-background-page px-5 pt-10 pb-2">
        {/* Header */}
        <div className="flex items-center">
          <Link
            to="/reportMerchantInfo"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">รายละเอียดข้อมูลหลักผู้ค้า</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <Link
              to="/saveMerchant"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              บันทึกข้อมูลหลักผู้ค้า
            </Link>

            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดข้อมูลหลักผู้ค้า</div>
          </div>

          <ReactToPrint
            trigger={() => {
              return (
                <button
                  type="button"
                  className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
                >
                  <div className="flex justify-center items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4 4H3.6V1C3.6 0.716667 3.6861 0.479 3.8583 0.287C4.0311 0.0956666 4.245 0 4.5 0H13.5C13.755 0 13.9686 0.0956666 14.1408 0.287C14.3136 0.479 14.4 0.716667 14.4 1V4ZM14.4 9.5C14.655 9.5 14.8686 9.404 15.0408 9.212C15.2136 9.02067 15.3 8.78333 15.3 8.5C15.3 8.21667 15.2136 7.979 15.0408 7.787C14.8686 7.59567 14.655 7.5 14.4 7.5C14.145 7.5 13.9314 7.59567 13.7592 7.787C13.5864 7.979 13.5 8.21667 13.5 8.5C13.5 8.78333 13.5864 9.02067 13.7592 9.212C13.9314 9.404 14.145 9.5 14.4 9.5ZM5.4 16H12.6V12H5.4V16ZM5.4 18C4.905 18 4.4814 17.8043 4.1292 17.413C3.7764 17.021 3.6 16.55 3.6 16V14H0.9C0.645 14 0.4314 13.904 0.2592 13.712C0.0864001 13.5207 0 13.2833 0 13V8C0 7.15 0.2625 6.43767 0.7875 5.863C1.3125 5.28767 1.95 5 2.7 5H15.3C16.065 5 16.7064 5.28767 17.2242 5.863C17.7414 6.43767 18 7.15 18 8V13C18 13.2833 17.9136 13.5207 17.7408 13.712C17.5686 13.904 17.355 14 17.1 14H14.4V16C14.4 16.55 14.2239 17.021 13.8717 17.413C13.5189 17.8043 13.095 18 12.6 18H5.4Z"
                        fill="white"
                      />
                    </svg>
                    <div className="ml-2 text-sm">Print</div>
                  </div>
                </button>
              );
            }}
            // onBeforeGetContent={async () => { await setIndexGenData(index) }}
            content={() => printRef.current}
            // documentTitle="kiminoto doc"
            // pageStyle="print"
            onAfterPrint={() => console.log("print")}
          />

        </div>

        <div ref={printRef}>
          <div className="bg-white rounded-lg mx-10 my-7 p-3">
            <div>ข้อมูลผู้ค้า</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
              <div>
                <div className="mb-1">รหัสผู้ค้า</div>
                { }
              </div>
              <div>
                <div className="mb-1">เลขที่ประจำตัวผู้เสียภาษี</div>
                { }
              </div>

              <div>
                <div className="mb-1">คำนำหน้าบริษัท</div>
                { }
              </div>
              <div>
                <div className="mb-1">ชื่อบริษัท</div>
                { }
              </div>

              <div>
                <div className="mb-1">คำนำหน้าบุคคล</div>
                { }
              </div>

              <div>
                <div className="mb-1">ชื่อบุคคล</div>
                { }
              </div>

              <div>
                <div className="mb-1">เบอร์โทรศัพท์</div>
                { }
              </div>
              <div>
                <div className="mb-1">E-mail</div>
                { }
              </div>

              <div>
                <div className="mb-1">กลุ่มประเภท</div>
                { }
              </div>
              <div>
                <div className="mb-1">ความสัมพันธ์</div>
                { }
              </div>
            </div>

            <div hidden className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
              {/* <div className="mt-1 text-sm">ที่อยู่</div> */}

              <div className='col-span-2 border border-gray-300 rounded-md p-2'>
                <div className="flex">
                  <div className="mt-2 mr-2 flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                    1  {/* {index + 1} */}
                  </div>
                  {/* <div className="grid grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs"> */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-x-4 gap-y-3 mt-3 text-xs">
                    <div className='grid grid-cols-3 gap-x-4'>
                      <div className='col-span-2'>
                        บ้านเลขที่
                        <input
                          className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                          disabled
                        />
                      </div>
                      <div>
                        หมู่ที่
                        <input
                          className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      หมู่บ้าน
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </div>
                    <div>
                      ซอย
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </div>

                    <div>
                      ถนน
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </div>
                    <div>
                      ตำบล
                      <Selector
                        disabled
                      />
                    </div>
                    <div>
                      อำเภอ
                      <Selector
                        disabled
                      />
                    </div>

                    <div>
                      จังหวัด
                      <Selector
                        disabled
                      />
                    </div>
                    <div>
                      รหัสไปรษณีย์
                      <input
                        disabled
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                  </div>

                  <div className='mt-1 mx-1'>
                    {/* <IoIosClose className="text-2xl" /> */}
                  </div>
                </div>
              </div>

              <div className="col-span-4 sm:my-3">
                {arrayDocument.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] mt-2 pb-2 mx-5"
                  >
                    <div className="flex items-center text-text-green ">
                      <img src={docIcon} className="w-4 h-4 " />
                      <div className="ml-2 text-sm cursor-pointer ">{el.document}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg mx-10 mt-3 mb-7 p-3">
            <div>ข้อมูลการจัดซื้อ</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
              <div>
                <div className="mb-1">เงื่อนไขการชำระเงิน</div>

              </div>
              <div>
                <div className="mb-1">ชื่อผู้ติดต่อ</div>

              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg mx-10 mt-3 mb-7 p-3">
            <div>ข้อมูลบัญชี</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
              <div>
                <div className="mb-1">เลขที่บัญชีธนาคาร</div>

              </div>
              <div>
                <div className="mb-1">รายละเอียดบัญชีธนาคาร</div>

              </div>

              <div>
                <div className="mb-1">รหัสธนาคาร</div>

              </div>
              <div>
                <div className="mb-1">รหัสสาขา</div>

              </div>

              <div>
                <div className="mb-1">เลขที่บัตรประชาชน</div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default ViewReportMerchantInfo
