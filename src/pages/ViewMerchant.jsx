import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Selector from "../components/selector/Selector";
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import docIcon from "../public/pics/docIcon.png";
import { useRef } from "react";

const ViewMerchant = () => {
  const { assetWithdrawId } = useParams();

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
            to="/merchant"
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
              to="/merchant"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              รายการข้อมูลหลักผู้ค้า
            </Link>

            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดข้อมูลหลักผู้ค้า</div>
          </div>
        </div>

        {/* block white top */}
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

            <div hidden className='col-span-2 text-sm'>
              {/* <div className="grid sm:grid-cols-6 gap-6 mt-5"> */}
              <div className="sm:col-span-4 bg-background-page px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-60">
                <img src={boxIcon} className="w-[50px]" />
                <div className="text-text-green font-semibold text-center">
                  <p>
                    วางไฟล์ หรือ
                  </p>
                  <button
                    className="my-1 min-w-[10em]  inline-flex justify-center  items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                    onClick={() => inputDoc.current.click()}
                    disabled={arrayDocument.length === 5}
                  >
                    Upload
                  </button>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={inputDoc}
                  onChange={handleFileChange}
                />
                <div className="flex flex-col justify-center items-center text-text-gray text-sm">
                  <p>สามารถอัพโหลดได้หลายไฟล์</p>
                  <p>จำกัด 5 ไฟล์ ไฟล์ละไม่เกิน 2MB.</p>
                  <p>(DOCX , PDF , XLSX)</p>
                </div>
              </div>
              <div className="col-span-4 sm:mt-5 max-h-60 scrollbar">
                {arrayDocument.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] mt-2 pb-2 mx-5"
                  >
                    <div className="flex items-center text-text-green ">
                      <img src={docIcon} className="w-4 h-4 " />
                      <div className="ml-2 text-sm cursor-pointer ">{el.document}</div>
                    </div>
                    <button hidden
                      className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                      onClick={() => deleteDoc(idx)}
                    >
                      <IoIosClose className="text-2xl" />
                    </button>
                  </div>
                ))}
              </div>
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

    </>
  )
}

export default ViewMerchant
