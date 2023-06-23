import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Selector from "../components/selector/Selector";
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import docIcon from "../public/pics/docIcon.png";
import { useRef } from "react";
import { getMerchantById } from "../api/merchant";

const ViewMerchant = () => {
  const { merchantId } = useParams();
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMerchantById(merchantId)
        let relation = ""
        res.data.merchant.merchantRelation?.map((ele, ind) => {
          if (ind == 0) {
            relation = ele.companyCategory
          } else {
            relation = relation.concat(', ', ele.companyCategory)
          }
        })
        setData({ ...res.data.merchant, relation })
        setArrayDocument(res.data.merchant.documentArray)
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
            to="/merchantIndex"
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
              to="/merchantIndex"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              รายการข้อมูลหลักผู้ค้า
            </Link>

            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">รายละเอียดข้อมูลหลักผู้ค้า</div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 my-7 p-3">
          <div>ข้อมูลผู้ค้า</div>
          <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="mb-1 col-span-1 sm:col-span-3">รหัสผู้ค้า</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.realMerchantId}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">เลขที่ประจำตัวผู้เสียภาษี</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.idCardNumber}
            </div>

            <div className="mb-1 col-span-1 sm:col-span-3">คำนำหน้าบริษัท</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.companyPrefix}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">ชื่อบริษัท</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.companyName}
            </div>

            <div className="mb-1 col-span-1 sm:col-span-3">คำนำหน้าบุคคล</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.prefix}
            </div>

            <div className="mb-1 col-span-1 sm:col-span-3">ชื่อบุคคล</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.name}
            </div>

            <div className="mb-1 col-span-1 sm:col-span-3">เบอร์โทรศัพท์</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.phoneNumber}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">E-mail</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.email}
            </div>

            <div className="mb-1 col-span-1 sm:col-span-3">กลุ่มประเภท</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.creditorCategory}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">ความสัมพันธ์</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.relation}
            </div>
          </div>

          {data?.merchantAddress?.map((ele, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
              {/* <div className="mt-1 text-sm">ที่อยู่</div> */}

              <div className='col-span-2 border border-gray-300 rounded-md p-2'>
                <div className="flex">
                  <div className="mt-2 mr-2 flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
                    {index + 1}
                  </div>
                  {/* <div className="grid grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs"> */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-x-4 gap-y-3 mt-3 text-xs">
                    <div className='grid grid-cols-3 gap-x-4'>
                      <div className='col-span-2'>
                        บ้านเลขที่
                        <input
                          className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                          disabled
                          value={ele.address}
                        />
                      </div>
                      <div>
                        หมู่ที่
                        <input
                          className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                          disabled
                          value={ele.group}
                        />
                      </div>
                    </div>
                    <div>
                      หมู่บ้าน
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.village}
                      />
                    </div>
                    <div>
                      ซอย
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.alley}
                      />
                    </div>

                    <div>
                      ถนน
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.street}
                      />
                    </div>
                    <div>
                      ตำบล
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.subDistrict}
                      />
                    </div>
                    <div>
                      อำเภอ
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.district}
                      />
                    </div>

                    <div>
                      จังหวัด
                      <input
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        disabled
                        value={ele.province}
                      />
                    </div>
                    <div>
                      รหัสไปรษณีย์
                      <input
                        disabled
                        className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md"
                        value={ele.postalCode}
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
          ))}
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-7 p-3">
          <div>ข้อมูลการจัดซื้อ</div>
          <div className="grid grid-cols-3 md:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="mb-1 col-span-1 sm:col-span-3">เงื่อนไขการชำระเงิน</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.paymentTerm}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">ชื่อผู้ติดต่อ</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.contactName}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-7 p-3">
          <div>ข้อมูลบัญชี</div>
          <div className="grid grid-cols-3 sm:grid-cols-14 gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="mb-1 col-span-1 sm:col-span-3">เลขที่บัญชีธนาคาร</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.bankAccountNumber}
            </div>
            <div className="mb-1 col-span-1 sm:col-span-3">รายละเอียดบัญชีธนาคาร</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.bankAccountDetail}
            </div>

            <div className="col-span-1 sm:col-span-3">รหัสธนาคาร</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.bankCode}
            </div>
            <div className="col-span-1 sm:col-span-3">รหัสสาขา</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.bankBranchCode}
            </div>

            <div className="col-span-1 sm:col-span-3">เลขที่บัตรประชาชน</div>
            <div className="col-span-2 sm:col-span-4">
              {data?.idCardNumber}
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default ViewMerchant
