import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft } from 'react-icons/hi'
import { HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import DateInput from '../components/date/DateInput'
import RowOfWithdrawTableArray from '../components/table/RowOfWithdrawTableArray'
import RowOfTableSaveAssetWithdraw from '../components/table/RowOfTableSaveAssetWithdraw'
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { BsArrowLeft } from "react-icons/bs";

export const SaveAssetWithdraw = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState

  const [input, setInput] = useState({
    ID: '',
    billNumber: '',
    documentRegistration: '',
    sector: '',
    eligiblePerson: '',
    selfSector: '',
    allPrice: 0,
    firstName_recorder: '',
    lastName_recorder: '',
    dateTime_recorder: '',
    firstName_courier: '',
    lastName_courier: '',
    dateTime_courier: '',
    firstName_approver: '',
    lastName_approver: '',
    dateTime_approver: '',
    status: 'not approve',
  })

  const inputAddress = {
    road: "",

    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  }
  const [arrayAddress, setArrayAddress] = useState([inputAddress])
  const addAddress = () => {
    const arr = (arrayAddress.concat({test: "1"}))
    setArrayAddress(arr)
    console.log(arr)
  }

  const delAddress = (index) => {
    setArrayAddress(prev => {
      return prev.splice(index, 1);
    })
  }

  const [saveAssetWithdrawTableArray, setSaveAssetWithdrawTableArray] =
    useState([
      {
        index: 0,
        inventoryNumber: '',
        productName: '',
        brand: '',
        serialNumber: '',
        supplier: '',
        amount: '',
        price: '',
      },
    ])

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState(todayThaiDate)

  const [countRow, setCountRow] = useState(1)
  const [countIndexArray, setCountIndexArray] = useState([0])
  const [perPage, setPerPage] = useState(10)

  // handle
  const handleChangeID = (e) => {
    const clone = { ...input }
    clone.ID = e.target.value
    setInput(clone)
  }
  const handleChangeBillNumber = (e) => {
    const clone = { ...input }
    clone.billNumber = e.target.value
    setInput(clone)
  }
  const handleChangeDocumentRegistration = (e) => {
    const clone = { ...input }
    clone.documentRegistration = e.target.value
    setInput(clone)
  }
  const handleChangeSector = (e) => {
    const clone = { ...input }
    clone.sector = e.target.value
    setInput(clone)
  }
  const handleChangeEligiblePerson = (e) => {
    const clone = { ...input }
    clone.eligiblePerson = e.target.value
    setInput(clone)
  }

  const handleChangeAllPrice = (e) => {
    const clone = { ...input }
    clone.allPrice = e.target.value
    setInput(clone)
  }

  //handle bottom table
  const handleClickIncrease = (e) => {
    e.preventDefault()
    setCountRow(countRow + 1)
    setCountIndexArray([...countIndexArray, countRow])

    let clone = [...saveAssetWithdrawTableArray]
    const newCloneArray = {
      index: countRow,
      inventoryNumber: '',
      productName: '',
      brand: '',
      serialNumber: '',
      supplier: '',
      amount: '',
      price: '',
    }
    setSaveAssetWithdrawTableArray([...clone, newCloneArray])
  }

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1)
    }

    let clone = [...saveAssetWithdrawTableArray]
    clone.splice(index, 1)
    setSaveAssetWithdrawTableArray(clone)
  }

  const inputClassname = "w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"

  return (
    <>
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}
        <div className="flex items-center">
          <Link
            to="/assetWithdraw"
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
              to="/assetWithdraw"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mx-2"
            >
              รายการข้อมูลหลักผู้ค้า
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกข้อมูลหลักผู้ค้า</div>
          </div>
        </div>

        {/* block white top */}
        <div className="bg-white rounded-lg mx-10 my-3 p-3">
          <div>ข้อมูลผู้ค้า</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">รหัสผู้ค้า</div>
              <input
                type="text"
                name="ID"
                id="ID"
                onChange={handleChangeID}
                value={input.ID}
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">เลขที่ประจำตัวผู้เสียภาษี</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                onChange={handleChangeBillNumber}
                value={input.billNumber}
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
                name="sector"
                id="sector"
                onChange={handleChangeSector}
                value={input.sector}
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
                  name="sector"
                  id="sector"
                  onChange={handleChangeSector}
                  value={input.sector}
                  className={`${inputClassname}`}
                />              </div>
            </div>

            <div>
              <div className="mb-1">เบอร์โทรศัพท์</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                readOnly
                value={input.selfSector}
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">E-mail</div>
              <input
                type="email"
                name="allPrice"
                id="allPrice"
                onChange={handleChangeAllPrice}
                value={input.email}
                className={`${inputClassname}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="mt-1 text-sm">ที่อยู่</div>
            {arrayAddress?.map((address, index) => (
              <div className='col-span-2 border border-gray-300 rounded-md p-2'>
                <div className="flex">
                  <div className="mt-2 mr-2 flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 p-2">
                    {index + 1}
                  </div>
                  {/* <div className="grid grid-cols-3 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs"> */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-x-4 gap-y-3 mt-3 text-xs">
                    <div className='grid grid-cols-3 gap-x-4'>
                      <div className='col-span-2'>
                        บ้านเลขที่
                        <input
                          className={`${inputClassname}`}
                        />
                      </div>
                      <div>
                        หมู่ที่
                        <input
                          className={`${inputClassname}`}
                        />
                      </div>
                    </div>
                    <div>
                      หมู่บ้าน
                      <input
                        className={`${inputClassname}`}
                      />
                    </div>
                    <div>
                      ซอย
                      <input
                        className={`${inputClassname}`}
                      />
                    </div>

                    <div>
                      ถนน
                      <input
                        className={`${inputClassname}`}
                      />
                    </div>
                    <div>
                      ตำบล
                      <Selector

                      />
                    </div>
                    <div>
                      อำเภอ
                      <Selector

                      />
                    </div>

                    <div>
                      จังหวัด
                      <Selector

                      />
                    </div>
                    <div>
                      รหัสไปรษณีย์
                      <input
                        className={`${inputClassname}`}
                      />
                    </div>

                  </div>

                  <div className='mt-1 mx-1 hover:bg-gray-200 rounded-full h-fit cursor-pointer p-1'
                    onClick={() => delAddress(index)}>
                    <IoIosClose className="text-2xl" />
                  </div>
                </div>
              </div>
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
              <div className="sm:col-span-4 bg-background-page px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-60">
                <img src={boxIcon} className="w-[50px]" />
                <div className="text-text-green font-semibold text-center">
                  <p>
                    วางไฟล์ หรือ
                  </p>
                  <button
                    className="my-1 min-w-[10em] inline-flex justify-center  items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                  // onClick={() => inputImg.current.click()}
                  >
                    Upload
                  </button>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                // ref={inputImg}
                // onChange={handleFileChange}
                />
                <div className="flex flex-col justify-center items-center text-text-gray text-sm">
                  <p>สามารถอัพโหลดได้หลายไฟล์</p>
                  <p>จำกัด 5 ไฟล์ ไฟล์ละไม่เกิน 2MB.</p>
                </div>
              </div>
              <div className="col-span-4 sm:mt-5">
                {/* {arrayDocument.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] mt-2 pb-2"
                  >
                    <div className="flex items-center text-text-green">
                      <img src={docIcon} className="w-4 h-4 " />
                      <div className="ml-2 text-sm">{el.document.name}</div>
                    </div>
                    <button
                      className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                      onClick={() => deleteDoc(idx)}
                    >
                      <IoIosClose className="text-2xl" />
                    </button>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>ข้อมูลการจัดซื้อ</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">เงื่อนไขการชำระเงิน</div>
              <input
                type="text"
                name="salesDocument"
                id="salesDocument"
                // onChange={handleChangeSales}
                // value={inputSale.salesDocument}
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
                  // value={inputSale.salesDocument}
                  className={`${inputClassname}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>ข้อมูลบัญชี</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">เลขที่บัญชีธนาคาร</div>
              <input
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">รายละเอียดบัญชีธนาคาร</div>
              <input
                className={`${inputClassname}`}
              />
            </div>

            <div>
              <div className="mb-1">รหัสธนาคาร</div>
              <input
                className={`${inputClassname}`}
              />
            </div>
            <div>
              <div className="mb-1">รหัสสาขา</div>
              <input
                className={`${inputClassname}`}
              />
            </div>

            <div>
              <div className="mb-1">เลขที่บัตรประชาชน</div>
              <input
                className={`${inputClassname}`}
              />
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-5 inline gap-x-1 gap-y-3 mt-3 text-xs">
          {/* <div className="sm:grid grid-cols-5  gap-x-1 gap-y-3 mt-3 text-xs"> */}
          {/* <div className="inline gap-x-1 gap-y-3 mt-3 text-xs"> */}
          <div className="col-span-2 bg-white rounded-lg mx-10 lg:mr-0 mt-3 mb-10 p-3">
            <div className='text-sm'>กลุ่มประเภท</div>
            <div className="grid grid-cols-1 gap-y-3 mt-3 text-xs">
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2" name="groupType" value="" />
                <label>เจ้าหนี้การค้าภายในประเทศ</label>
              </div>
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2" name="groupType" value="" />
                <label>เจ้าหนี้การค้าภายนอกประเทศ</label>
              </div>
              <div>
                <input type="radio" className="border border-text-green p-2 mx-2" name="groupType" value="" />
                <label>เจ้าหนี้เฉพาะหน่วยงานย่อย</label>
              </div>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-lg mx-10 lg:ml-0 mt-3 mb-10 p-3">
            <div className='flex justify-between items-end'>
              <div className='text-sm'>ความสัมพันธ์</div>
              <div className='text-text-gray'>
                สถานะ

                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value={""} class="sr-only peer" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                  <span class="ml-2 text-text-green">Active</span>
                </label>
              </div>
            </div>

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

            <button
              className="w-full mx-2 my-3 inline-flex justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
              onClick={() => inputDoc.current.click()}
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
          // onClick={handleSubmit}
          >
            บันทึกข้อมูล
          </button>

          {/* <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={submit}
          />

          {showModalSuccess && <ModalSuccess urlPath='/assetWithdraw' />} */}
        </div>
      </div>
    </>
  )
}

export default SaveAssetWithdraw
