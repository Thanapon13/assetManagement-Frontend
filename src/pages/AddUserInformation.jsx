import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import DateInput from "../components/date/DateInput";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import OnlyDateInput from "../components/date/onlyDateInput";
import InputAddress from "react-thailand-address-autocomplete";
import { createUser } from "../api/userApi";
import { getDoctorType, getEngPrefix, getMedicalField, getThaiPrefix } from "../api/masterApi";
import SearchSelector from "../components/selector/SearchSelector";

function AddUserInformation() {

  const [input, setInput] = useState({
    thaiPrefix: "",
    thaiFirstName: "",
    thaiLastName: "",
    engPrefix: "",
    engFirstName: "",
    engLastName: "",
    idCard: "",
    sex: "",
    birthDate: "",
    password: "",
    username: "",
    passwordStartDate: "",
    passwordEndDate: "",
    // ข้อมูลพนักงาน
    employeeId: "",
    professionalLicenseNumber: "",
    sector: "",
    medicalBranchCode: "",
    thaiPosition: "",
    engPosition: "",
    personnelTypeCode: "",
    hospital: "",
    fromHospital: "",
    toHospital: "",
    // ที่อยู่
    houseNo: "",
    villageNo: "",
    soi: "",
    separatedSoi: "",
    road: "",
    village: "",
    district: "",
    subdistrict: "",
    province: "",
    zipcode: "",
    // ข้อมูลการติดต่อ
    email: "",
    phoneNumber: "",
    homePhoneNumber: "",
    lineId: "",
    facebook: "",
    // ตำแหน่ง
    userType: "",
    docterType: "",
    medicalField: "",
    // บันทึกเหตุการณ์

    dateTimeRecord: new Date(),
    dateTimeModify: "",
    dateTimeUpdatePassword: "",
    userEndDateTime: "",
    PACSDateTime: "",
    lastRevisionDateTime: "",
    level: "",
    note: "",
    status: false,
  });

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getMasterData()
  }, []);

  function formArrayOption(data) {
    const array = []
    data?.map(ele => {
      array.push({ label: ele.name, value: ele.name, ele: ele })
    })
    return array
  }
  const [thaiPrefixList, setThaiPrefixList] = useState([])
  const [engPrefixList, setEngPrefixList] = useState([])
  const [doctorTypeList, setDoctorTypeList] = useState([])
  const [medicalFieldList, setMedicalFieldList] = useState([])

  const getMasterData = async () => {
    const thaiPrefix = await getThaiPrefix()
    const arrThaiPrefix = formArrayOption(thaiPrefix.data.thaiPrefix)
    setThaiPrefixList(arrThaiPrefix)
    const engPrefix = await getEngPrefix()
    const arrEngPrefix = formArrayOption(engPrefix.data.engPrefix)
    setEngPrefixList(arrEngPrefix)
    const doctorType = await getDoctorType()
    const arrDoctorType = formArrayOption(doctorType.data.docterType)
    setDoctorTypeList(arrDoctorType)
    const medicalField = await getMedicalField()
    const arrMedicalField = formArrayOption(medicalField.data.medicalField)
    setMedicalFieldList(arrMedicalField)
  }

  const onChange = (e) => {
    if (e.target.name === "status") {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: !e.target.value,
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));

    }
  };

  const onSelectAddress = ({ subdistrict, district, province, zipcode }) => {
    setInput({ ...input, subdistrict, district, province, zipcode });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const inputJSON = JSON.stringify({...input, role: "role"});
    await createUser({
      input: inputJSON,
    });
  };

  const handleSelect = (value, label) => {
    setInput({ ...input, [label]: value })
    // const clone = [...input];
    // clone[index] = { ...input[index], [label]: value }
    // if (value) setInput(clone)
  }

  return (
    <form>
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}

        <div className="flex items-center">
          <Link
            to="/userInformationIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">เพิ่มผู้ใช้งาน</div>
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
              to="/userInformationIndex"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline ml-2"
            >
              ข้อมูลผู้ใช้งาน
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">เพิ่มผู้ใช้</div>
          </div>
        </div>

        {/* block white top */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">ข้อมูลทั่วไป</div>
          {/* 2 row */}
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-x-5 gap-y-3 mt-3 text-xs">

            <div className="w-full">
              <div className="mb-1">คำนำหน้า (ภาษาไทย)</div>
              {/* <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"คำนำหน้า (ภาษาไทย)"}
                name="thaiPrefix"
              /> */}
              <SearchSelector
                options={thaiPrefixList}
                name="thaiPrefix"
                onChange={handleSelect}
                // error={error && !genData[index]?.sector}
                noClearButton
              // value={input?.thaiPrefix && { label: input?.thaiPrefix, value: input?.thaiPrefix }}
              />
            </div>

            <div className="col-span-2">
              <div className="mb-1 md:mb-5 lg:mb-1 ">ชื่อ (ภาษาไทย)</div>
              <input
                type="text"
                name="thaiFirstName"
                id="thaiFirstName"
                onChange={onChange}
                value={input?.thaiFirstName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            <div className="col-span-2">
              <div className="mb-1 md:mb-5 lg:mb-1 ">นามสกุล (ภาษาไทย)</div>
              <input
                type="text"
                name="thaiLastName"
                id="thaiLastName"
                onChange={onChange}
                value={input?.thaiLastName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>


            <div>
              <div className="mb-1">คำนำหน้าชื่อ (ภาษาอังกฤษ)</div>
              <SearchSelector
                options={engPrefixList}
                name="engPrefix"
                onChange={handleSelect}
                // error={error && !input?.engPrefix}
                noClearButton
              // value={input?.engPrefix && { label: input?.engPrefix, value: input?.engPrefix }}
              />
            </div>
            {/* คำนำหน้าชื่อ (ภาษาอังกฤษ) */}
            <div className="col-span-2">
              <div className="mb-1 md:mb-5 lg:mb-1 ">
                คำนำหน้าชื่อ (ภาษาอังกฤษ)
              </div>
              <input
                type="text"
                name="engFirstName"
                id="engFirstName"
                onChange={onChange}
                value={input?.engFirstName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* นามสกุล (ภาษาอังกฤษ) */}
            <div className="col-span-2">
              <div className="mb-1 md:mb-5 lg:mb-1">นามสกุล (ภาษาอังกฤษ)</div>
              <input
                type="text"
                name="engLastName"
                id="engLastName"
                onChange={onChange}
                value={input?.engLastName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* เลขบัตรประชาชน (ID Card No.) */}
            <div className="col-span-2">
              <div className="mb-1">เลขบัตรประชาชน (ID Card No.)</div>
              <input
                type="text"
                name="idCard"
                id="idCard"
                onChange={onChange}
                value={input?.idCard}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เพศ */}
            <div className="">
              <div className="mb-1">เพศ</div>
              <select
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md w-full"
                name="status"
                value={input?.sex}
                onChange={e => setInput({ ...input, sex: e.target.value })}
              >
                <option defaultValue value="">
                  Select
                </option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>
              {/* <input
                type="text"
                name="sex"
                id="sex"
                onChange={onChange}
                value={input?.sex}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            </div>
            {/* วัน / เดือน / ปี เกิด */}
            <div className="col-span-2">
              <div className="mb-1">วัน / เดือน / ปี เกิด</div>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  state={input}
                  setState={setInput}
                  id={"birthDate"}
                />
              </div>
            </div>
            {/* รหัสผู้ใช้งาน (Username) */}
            <div className="col-span-2">
              <div className="mb-1">รหัสผู้ใช้งาน (Username)</div>
              <input
                type="text"
                name="username"
                id="username"
                onChange={onChange}
                value={input?.username}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* รหัสผ่าน (Password) */}
            <div className="col-span-2">
              <div className="mb-1">รหัสผ่าน (Password)</div>
              <div className="flex relative">
                <input
                  type={toggle ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={onChange}
                  value={input?.password}
                  className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
                <button
                  className=" absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggle(!toggle);
                  }}
                >
                  {toggle ? (
                    <AiOutlineEyeInvisible className="text-text-green" />
                  ) : (
                    <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
                  )}
                </button>
              </div>
              {/* <input
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                value={input?.password}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              /> */}
            </div>

            {/* วันที่เริ่มใช้งานรหัส */}
            <div className="col-span-2">
              <div className="mb-1">วันที่เริ่มใช้งานรหัส</div>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  state={input}
                  setState={setInput}
                  id={"passwordStartDate"}
                />
              </div>
            </div>
            {/* วันที่สิ้นสุดการใช้งานรหัส */}
            <div className="col-span-2">
              <div className="mb-1">วันที่สิ้นสุดการใช้งานรหัส</div>
              <div className="flex h-[38px]">
                <OnlyDateInput
                  state={input}
                  setState={setInput}
                  id={"passwordEndDate"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ข้อมูลพนักงาน */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">ข้อมูลพนักงาน</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-x-5 gap-y-3 mt-3 text-xs">
            {/* รหัสพนักงาน */}
            <div className="col-span-2">
              <div className="mb-1">รหัสพนักงาน</div>
              <input
                type="text"
                name="employeeId"
                id="employeeId"
                onChange={onChange}
                value={input?.employeeId}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เลขที่ใบประกอบวิชาชีพ */}
            <div className="col-span-2">
              <div className="mb-1">เลขที่ใบประกอบวิชาชีพ</div>
              <input
                type="text"
                name="professionalLicenseNumber"
                id="professionalLicenseNumber"
                onChange={onChange}
                value={input?.professionalLicenseNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* รหัสสถานที่ทำงาน หรือ หน่วยงานที่สังกัด */}
            <div className="col-span-2">
              <div className="mb-1">
                รหัสสถานที่ทำงาน หรือ หน่วยงานที่สังกัด
              </div>
              <input
                type="text"
                name="sector"
                id="sector"
                onChange={onChange}
                value={input?.sector}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* รหัสสาขาทางการแพทย์ */}
            <div className="col-span-2">
              <div className="mb-1">รหัสสาขาทางการแพทย์</div>
              <input
                type="text"
                name="medicalBranchCode"
                id="medicalBranchCode"
                onChange={onChange}
                value={input?.medicalBranchCode}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* ตำแหน่งของผู้ใช้งานระบบ (ภาษาไทย) */}
            <div className="col-span-2">
              <div className="mb-1">ตำแหน่งของผู้ใช้งานระบบ (ภาษาไทย)</div>
              <input
                type="text"
                name="thaiPosition"
                id="thaiPosition"
                onChange={onChange}
                value={input?.thaiPosition}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ตำแหน่งของผู้ใช้งานระบบ (ภาษาอังกฤษ) */}
            <div className="col-span-2">
              <div className="mb-1">ตำแหน่งของผู้ใช้งานระบบ (ภาษาอังกฤษ)</div>
              <input
                type="text"
                name="engPosition"
                id="engPosition"
                onChange={onChange}
                value={input?.engPosition}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* รหัสประเภทบุคคลากร */}
            <div className="col-span-2">
              <div className="mb-1 md:mb-5 lg:mb-1">รหัสประเภทบุคคลากร</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"รหัสประเภทบุคคลากร"}
                  name="personnelTypeCode"
                />
              </div>
            </div>
            {/* โรงพยาบาลที่ออกตรวจประจำ (แพทย์ Part-time) */}
            <div className="col-span-2">
              <div className="mb-1">
                โรงพยาบาลที่ออกตรวจประจำ (แพทย์ Part-time)
              </div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"โรงพยาบาลที่ออกตรวจประจำ (แพทย์ Part-time)"}
                  name="hospital"
                />
              </div>
            </div>

            {/* ย้ายมาจากโรงพยาบาล */}
            <div className="col-span-2">
              <div className="mb-1">ย้ายมาจากโรงพยาบาล</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ย้ายมาจากโรงพยาบาล"}
                  name="fromHospital"
                />
              </div>
            </div>
            {/* ย้ายไปโรงพยาบาล */}
            <div className="col-span-2">
              <div className="mb-1">ย้ายไปโรงพยาบาล</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ย้ายไปโรงพยาบาล"}
                  name="toHospital"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ที่อยู่ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>ที่อยู่</div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5 gap-y-3 mt-3 text-xs">
            <div className="grid grid-cols-3 gap-x-5">
              {/* บ้านเลขที่ */}
              <div className="col-span-2">
                <div className="mb-1">บ้านเลขที่</div>
                <input
                  type="text"
                  name="houseNo"
                  id="houseNo"
                  onChange={onChange}
                  value={input?.houseNo}
                  className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              {/* หมู่ที่ */}
              <div className="">
                <div className="mb-1">หมู่ที่</div>
                <input
                  type="text"
                  name="villageNo"
                  id="villageNo"
                  onChange={onChange}
                  value={input?.villageNo}
                  className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
            </div>
            {/* ซอย */}
            <div>
              <div className="mb-1">ซอย</div>
              <input
                type="text"
                name="soi"
                id="soi"
                onChange={onChange}
                value={input?.soi}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ซอย (แยก) */}
            <div>
              <div className="mb-1">ซอย (แยก)</div>
              <input
                type="text"
                name="separatedSoi"
                id="separatedSoi"
                onChange={onChange}
                value={input?.separatedSoi}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ถนน */}
            <div>
              <div className="mb-1">ถนน</div>
              <input
                type="text"
                name="road"
                id="road"
                onChange={onChange}
                value={input?.road}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* หมู่บ้าน */}
            <div>
              <div className="mb-1">หมู่บ้าน</div>
              <input
                type="text"
                name="village"
                id="village"
                onChange={onChange}
                value={input?.village}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เขต / อำเภอ */}
            <div className="w-full">
              <div className="mb-1">เขต / อำเภอ</div>
              {/* <input
              type="text"
              name="district"
              id="district"
              disabled
              onChange={onChange}
              value={district}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            /> */}
              <div id="a" className="w-full block">
                <InputAddress
                  address="district"
                  value={input?.district}
                  onChange={onChange}
                  onSelect={onSelectAddress}
                  filter={(items) =>
                    items.filter(
                      (item) =>
                        (!input?.district ||
                          item?.district?.includes(input?.district)) &&
                        (!input?.subdistrict ||
                          item?.subdistrict?.includes(input?.subdistrict)) &&
                        (!input?.province ||
                          item?.province?.includes(input?.province)) &&
                        (!input?.zipcode ||
                          item?.zipcode?.includes(input?.zipcode))
                    )
                  }
                  // className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                  style={{ width: "100% !important", display: "inline" }}
                />
              </div>
            </div>
            {/* แขวง / ตำบล */}
            <div>
              <div className="mb-1">แขวง / ตำบล</div>
              {/* <input
              type="text"
              name="subdistrict"
              id="subdistrict"
              disabled
              onChange={onChange}
              value={subdistrict}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            /> */}
              <InputAddress
                address="subdistrict"
                value={input?.subdistrict}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) =>
                  console.log(items)
                  // items.filter(
                  //   (item) =>
                  //     // (!district || item.district.includes(district)) &&
                  //     (!input?.subdistrict ||
                  //       item?.subdistrict?.includes(input?.subdistrict)) &&
                  //     (!input?.province ||
                  //       item.province.includes(input?.province)) &&
                  //     (!input?.zipcode || item?.zipcode?.includes(input?.zipcode))
                  // )
                }
              />
            </div>
            {/* จังหวัด */}
            <div>
              <div className="mb-1">จังหวัด</div>
              {/* <input
              type="text"
              name="province"
              id="province"
              disabled
              onChange={onChange}
              value={province}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            /> */}
              <InputAddress
                address="province"
                value={input?.province}
                onChange={onChange}
                onSelect={onSelectAddress}
                // filter={(items) => items.filter(item => item.province !== 'กรุงเทพมหานคร')}
                filter={(items) =>
                  items.filter(
                    (item) =>
                      (!input?.district ||
                        item?.district?.includes(input?.district)) &&
                      (!input?.subdistrict ||
                        item?.subdistrict?.includes(input?.subdistrict)) &&
                      (!input?.province ||
                        item?.province?.includes(input?.province)) &&
                      (!input?.zipcode || item?.zipcode?.includes(input?.zipcode))
                  )
                }
              />
            </div>
            {/* รหัสไปรษณีย์ */}
            <div>
              <div className="mb-1">รหัสไปรษณีย์</div>
              {/* <input
              type="text"
              name="zipcode"
              id="zipcode"
              disabled
              onChange={onChange}
              value={zipcode}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            /> */}
              <InputAddress
                address="zipcode"
                value={input?.zipcode}
                onChange={onChange}
                onSelect={onSelectAddress}
                filter={(items) =>
                  items.filter(
                    (item) =>
                      (!input?.district ||
                        item?.district?.includes(input?.district)) &&
                      (!input?.subdistrict ||
                        item?.subdistrict?.includes(input?.subdistrict)) &&
                      (!input?.province ||
                        item?.province?.includes(input?.province)) &&
                      (!input?.zipcode || item?.zipcode?.includes(input?.zipcode))
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* ข้อมูลการติดต่อ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">ข้อมูลการติดต่อ</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-x-5 gap-y-3 mt-3 text-xs">
            {/* E-mail */}
            <div className="col-span-2">
              <div className="mb-1">E-mail</div>
              <input
                type="text"
                name="email"
                id="email"
                onChange={onChange}
                value={input?.email}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เบอร์มือถือ */}
            <div className="col-span-2">
              <div className="mb-1">เบอร์มือถือ</div>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={onChange}
                value={input?.phoneNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* เบอร์บ้าน */}
            <div className="col-span-2">
              <div className="mb-1">เบอร์บ้าน</div>
              <input
                type="text"
                name="homePhoneNumber"
                id="homePhoneNumber"
                onChange={onChange}
                value={input?.homePhoneNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* Line ID */}
            <div className="col-span-2">
              <div className="mb-1">Line ID</div>
              <input
                type="text"
                name="lineId"
                id="lineId"
                onChange={onChange}
                value={input?.lineId}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* Facebook */}
            <div className="col-span-2">
              <div className="mb-1">Facebook</div>
              <input
                type="text"
                name="facebook"
                id="facebook"
                onChange={onChange}
                value={input?.facebook}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>

        {/* ตำแหน่ง */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">ตำแหน่ง</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-x-5 gap-y-3 mt-3 text-xs">
            {/* ประเภทของผู้ใช้ */}
            <div className="col-span-2">
              <div className="mb-1">กำหนด Role ผู้ใช้งาน</div>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ประเภทของผู้ใช้"}
                name={"userType"}
              />
            </div>

            <div className="col-span-2">
              <div className="mb-1">ประเภทของแพทย์</div>
              <SearchSelector
                options={doctorTypeList}
                name="docterType"
                onChange={handleSelect}
                // error={error && !input?.docterType}
                noClearButton
              // value={input?.docterType && { label: input?.docterType, value: input?.docterType }}
              />
            </div>

            <div className="col-span-2">
              <div className="mb-1">สาขาแพทย์</div>
              <SearchSelector
                options={medicalFieldList}
                name="medicalField"
                onChange={handleSelect}
                // error={error && !input?.medicalField}
                noClearButton
              // value={input?.medicalField && { label: input?.medicalField, value: input?.medicalField }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">บันทึกเหตุการณ์</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-x-5 gap-y-3 mt-3 text-xs">
            {/* วัน-เวลาที่บันทึกข้อมูล */}
            <div className="col-span-2">
              <div className="mb-1">วัน-เวลาที่บันทึกข้อมูล</div>
              {/* <input
              type="date"
              name="dateTimeRecord"
              id="dateTimeRecord"
              onChange={onChange}
              value={dateTimeRecord}
              className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
            /> */}
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"dateTimeRecord"}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-1">วัน-เวลาที่แก้ไขข้อมูลล่าสุด</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"dateTimeModify"}
                />
              </div>
            </div>


            <div className="col-span-2">
              <div className="mb-1">อัพเดทรหัสผ่านล่าสุด</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"dateTimeUpdatePassword"}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-1">วันที่สิ้นสุดการใช้งานของผู้ใช้</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"PACSDateTime"}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-1">วันเวลาที่ PACS มาดึงข้อมูล</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"userEndDate"}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-1">รหัสผู้แก้ไขข้อมูลล่าสุด</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={input}
                  setState={setInput}
                  id={"lastRevisionDateTime"}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-1">หมายเหตุ</div>
              <input
                type="text"
                name="note"
                id="note"
                onChange={onChange}
                value={input?.note}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            <div className="col-span-2 ">
              <div className="h-[16px] mb-1"></div>
              <div className="flex items-center justify-end  sm:justify-start">
                <span class="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Cancel flag
                </span>
                <div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      value=""
                      class="sr-only peer"
                      onClick={onChange}
                    />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>

      {/* footer */}
      <div className="bottom-0 bg-white  flex justify-between items-center gap-10 p-3 text-sm mx-5 ">
        <button
          type="button"
          className="px-8 hover:bg-gray-100 text-black text-sm rounded-md p-2  text-gray-700"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2 px-8"
          onClick={handleSubmit}
        >
          บันทึก
        </button>
      </div>
    </form>
  );
}

export default AddUserInformation;
