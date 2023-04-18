import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { BsArrowLeft } from "react-icons/bs";
import docIcon from "../public/pics/docIcon.png";
import { useRef } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createMerchant } from '../api/merchant';
import RowOfTableAddressMerchant from '../components/table/RowOfTableAddressMerchant';

export const SaveMerchant = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState

  const [input, setInput] = useState({
    realMerchantId: '',
    taxNumber: '',
    companyPrefix: '',
    companyName: '',
    prefix: '',
    name: '',
    phoneNumber: '',
    email: '',
  })

  const [inputBottom, setInputBottom] = useState({
    paymentTerm: "",
    contactName: "",
    bankAccountNumber: "",
    bankAccountDetail: "",
    bankCode: "",
    bankNo: "",
    bankBranchCode: "",
    taxpayerNumber: "",
    idCardNumber: "",
    creditorCategory: "",
  })

  const handleChange = (e) => {
    console.log(e.target.name)
    setInput(prevInput => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value
      }
    })
  };

  // ที่อยู่
  const objAddress = {
    houseNo: "",
    villageNo: "",
    village: "",
    lane: "",
    road: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  }
  const [arrayAddress, setArrayAddress] = useState([objAddress])
  const addAddress = () => {
    const arr = (arrayAddress.concat({ ...objAddress }))
    setArrayAddress(arr)
    console.log(arr)
  }



  //อัพโหลดไฟล์
  const inputDoc = useRef();
  const [arrayDocument, setArrayDocument] = useState([])

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
        if (!fileTypes.includes(fileList[i].type)) {
          toast.warn(`${fileList[i].name} is wrong file type!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (fileList[i].size > 2000000) {
          toast.warn(`${fileList[i].name} has more than 2mb!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
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

  // ความสัมพันธ์
  const [status, setStatus] = useState("active")

  const objRelation = { companyCategory: "", note: "" }
  const [arrayRelation, setArrayRelation] = useState([objRelation])
  const addRelation = () => {
    const arr = arrayRelation.concat(objRelation)
    setArrayRelation(arr)
  }

  const inputClassname = "w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"

  const schema = yup.object().shape({
    companyName: yup
      .number("Must be number")
      .required("Is required")
    // .positive()
    // .integer()
    // .min(0, "Min is 0")
    // .max(22, "max is 20")
    ,
    age: yup
      .number("Must be number")
      .required("Is required")
  });

  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: schema
  });

  const onSubmit = data => {
    console.log(data, errors, control)
  };

  const [errorInput, setErrorInput] = useState()
  const [errorAddress, setErrorAddress] = useState()
  const [errorInpuBottomt, setErrorInputBottom] = useState()

  const handleForm = async () => {
    console.log(JSON.stringify({ input }), inputBottom)
    const data = JSON.stringify({ input, inputBottom })
    const formData = new FormData();
    console.log(data);
    formData.append("data", data);

    const response = createMerchant(formData)
    return
    let errInput, errInputBottom, errAddress
    Object.values(input).map((value) => {
      if (errInput) return
      if (!value) errInput = true
    })
    if (!arrayAddress.length) {
      const locate = (document.getElementById("address").offsetTop)
      window.scrollTo({ top: locate - 10, behavior: 'smooth' })
      setArrayAddress([objAddress])
      errAddress = true
    } else {
      arrayAddress.forEach(arr => {
        Object.entries(arr).forEach(([key, value]) => {
          if (errAddress) return
          if (!value) errAddress = true
        })
      })
    }
    Object.values(inputBottom).map((value) => {
      if (errInputBottom) return
      if (!value) errInputBottom = true
    })
    setErrorInput(errInput)
    setErrorInputBottom(errInputBottom)
    setErrorAddress(errAddress)
    //   if (!(errInput || errAddress || errInputBottom)) setShowModalConfirm(true)
  }

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
          <div className="text-xl text-text-green ">บันทึกข้อมูลหลักผู้ค้า</div>
        </div>
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
            <Link
              to="/merchant"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              รายการข้อมูลหลักผู้ค้า
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกข้อมูลหลักผู้ค้า</div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 my-7 p-3">
          <div>ข้อมูลผู้ค้า</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">รหัสผู้ค้า</div>
              <input
                type="text"
                name="merchantNo"
                onChange={handleChange}
                value={input.merchantNo}
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">เลขที่ประจำตัวผู้เสียภาษี</div>
              <input
                type="text"
                name="taxNumber"
                onChange={handleChange}
                value={input.taxNumber}
                className={`${inputClassname}`}
              />
            </div>

            <div>
              <div className="mb-1">คำนำหน้าบริษัท</div>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"หน่วยนับ"}
              // isValid={!input.unit}
              />
            </div>
            <div>
              <div className="mb-1">ชื่อบริษัท</div>
              <input
                type="text"
                name="companyName"
                control="companyName"
                onChange={handleChange}
                value={input.companyName}
                className={`${inputClassname}`}
              />
            </div>

            <div>
              <div className="mb-1">คำนำหน้าบุคคล</div>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"หน่วยนับ"}
              // isValid={!input.eligiblePerson}
              />
            </div>

            <div>
              <div className="mb-1">ชื่อบุคคล</div>
              <div className="flex h-[38px]">
                <input
                  type="text"
                  name="personName"
                  onChange={handleChange}
                  value={input.personName}
                  className={`${inputClassname}`}
                />
              </div>
            </div>

            <div>
              <div className="mb-1">เบอร์โทรศัพท์</div>
              <input
                type="text"
                name="telNo"
                onChange={handleChange}
                value={input.telNo}
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">E-mail</div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={input.email}
                className={`${inputClassname}`}
              />
            </div>
          </div>

          <div id="address" className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="mt-1 text-sm" id="head-address">ที่อยู่</div>
            {arrayAddress?.map((address, index) => (
              <RowOfTableAddressMerchant
                index={index}
                errorAddress={errorAddress}
                arrayAddress={arrayAddress}
                address={address}
                setArrayAddress={setArrayAddress}
              />
            ))}

            <div className='col-span-2 mx-3'>
              <button
                className="w-full text-sm inline-flex justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                onClick={addAddress}
              >
                + เพิ่มที่อยู่
              </button>
            </div>


            <div className='col-span-2 text-sm'>
              {/* <div className="grid sm:grid-cols-6 gap-6 mt-5"> */}
              <div className="sm:col-span-4 bg-background-page px-30 rounded-lg flex flex-col justify-center items-center gap-4 py-6">
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
              <div className="col-span-4 sm:mt-5 mb-3 max-h-60 scrollbar">
                {arrayDocument.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] mt-2 pb-2 mx-5"
                  >
                    <div className="flex items-center text-text-green ">
                      <img src={docIcon} className="w-4 h-4 " />
                      <div className="ml-2 text-sm cursor-pointer">{el.document}</div>
                      {/* กรณีชื่อยาว ล้น*/}
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
              <input
                type="text"
                name="salesDocument"
                // value={inputBottom.}
                // onChange={handleChangeSales}
                // className={`${errorSale && !inputSale.salesDocument && 'border-red-500'} 
                className={`${inputClassname}`} />
            </div>
            <div>
              <div className="mb-1">ชื่อผู้ติดต่อ</div>
              <div className="flex h-[38px]">
                <input
                  type="text"
                  name="salesDocument"
                  id="salesDocument"
                  // onChange={handleChangeSales}
                  // value={inputBottom.}
                  className={`${inputClassname}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-7 p-3">
          <div>ข้อมูลบัญชี</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">เลขที่บัญชีธนาคาร</div>
              <input
                className={`${inputClassname}`}
                value={inputBottom.bankAccountNum}
              />
            </div>
            <div>
              <div className="mb-1">รายละเอียดบัญชีธนาคาร</div>
              <input
                className={`${inputClassname}`}
                value={inputBottom.detailBankAcc}
              />
            </div>

            <div>
              <div className="mb-1">รหัสธนาคาร</div>
              <input
                className={`${inputClassname}`}
                value={inputBottom.bankCode}
              />
            </div>
            <div>
              <div className="mb-1">รหัสสาขา</div>
              <input
                className={`${inputClassname}`}
                value={inputBottom.branchCode}
              />
            </div>

            <div>
              <div className="mb-1">เลขที่บัตรประชาชน</div>
              <input
                className={`${inputClassname}`}
                value={inputBottom.identificationNumber}
              />
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-5 inline gap-x-1 gap-y-3 text-xs">
          {/* <div className="sm:grid grid-cols-5  gap-x-1 gap-y-3 mt-3 text-xs"> */}
          {/* <div className="inline gap-x-1 gap-y-3 mt-3 text-xs"> */}
          <div className="col-span-2 bg-white rounded-lg mx-10 lg:mr-0 mt-3 mb-10 p-3">
            <div className='text-sm'>กลุ่มประเภท</div>
            <div className="grid grid-cols-1 gap-y-3 mt-3 text-xs">
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2"
                  name="groupType"
                  value="" />
                <label>เจ้าหนี้การค้าภายในประเทศ</label>
              </div>
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2"
                  name="groupType"
                  value="" />
                <label>เจ้าหนี้การค้าภายนอกประเทศ</label>
              </div>
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2"
                  name="groupType"
                  value="" />
                <label>เจ้าหนี้เฉพาะหน่วยงานย่อย</label>
              </div>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-lg mx-10 lg:ml-0 mt-3 mb-10 p-3">
            <div className='flex justify-between items-center'>
              <div className='text-sm'>ความสัมพันธ์</div>
              <div className='text-text-gray  inline-flex items-center'>
                สถานะ
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                  <input type="checkbox" value="" checked={status === "active"} onChange={e => setStatus(e.target.checked ? "active" : "nonActive")} class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                  <span class="ml-2 text-text-green">Active</span>
                </label>
              </div>
            </div>

            {arrayRelation.map((element, index) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
                <div>
                  <div className="mb-1">กลุ่มบริษัท</div>
                  <Selector
                  />
                </div>
                <div>
                  <input
                    placeholder='หมายเหตุ'
                    className={`${inputClassname} mt-5`}
                  />
                </div>
              </div>
            ))}

            <button
              className="w-full my-3 inline-flex justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={addRelation}
            >
              + เพิ่มความสัมพันธ์
            </button>
          </div>
        </div>

      </div>


      {/* footer */}
      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-12">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <div className="flex justify-end gap-4">
          <button
            className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
          >
            บันทึกแบบร่าง
          </button>
          <button
            id="form"
            type="submit"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleForm}
          >
            บันทึกข้อมูล
          </button>

          {/* <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={submit}
          />

          {showModalSuccess && <ModalSuccess urlPath='/merchant' />} */}
        </div>
      </div>
    </>
  )
}

export default SaveMerchant
