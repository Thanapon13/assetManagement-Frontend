import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const Selector = ({
  placeholder,
  fetchDataDropdown,
  state,
  setState,
  id,
  index,
  api
}) => {
  let location = useLocation();
  // console.log(location.pathname)
  const refDropdown = useRef(null);

  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  // const fetchApi = async () => {
  //   const dataApi = await axios.get(
  //     "https://restcountries.com/v2/all?fields=name"
  //   );
  //   console.log(dataApi);
  //   setData(dataApi);
  // };

  const handleClickOutSide = (e) => {
    if (!refDropdown?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  // handle state from outside
  // assetInformation
  // ชนิดครุภัณฑ์
  const handleChangeType = (value) => {
    const clone = { ...state };
    clone.type = value;
    setState(clone);
  };
  // ชนิดครุภัณฑ์
  const handleChangeKind = (value) => {
    const clone = { ...state };
    clone.kind = value;
    setState(clone);
  };
  // หน่วยนับ
  const handleChangeUnit = (value) => {
    const clone = { ...state };
    clone.unit = value;
    setState(clone);
  };
  // ยี่ห้อ
  const handleChangeBrand = (value) => {
    const clone = { ...state };
    clone.brand = value;
    setState(clone);
  };
  // ประเภทที่ได้มา
  const handleChangeAcquiredType = (value) => {
    const clone = { ...state };
    clone.acquiredType = value;
    setState(clone);
  };
  // หมวดหมู่ครุภัณฑ์
  const handleChangeCategory = (value) => {
    const clone = { ...state };
    clone.category = value;
    setState(clone);
  };
  // กลุ่ม
  const handleChangeGroup = (value) => {
    const clone = { ...state };
    clone.group = value;
    setState(clone);
  };
  // วัตถุประสงค์ในการใช้งาน
  const handleChangePurposeOfUse = (value) => {
    const clone = { ...state };
    clone.purposeOfUse = value;
    setState(clone);
  };
  // แหล่งที่ได้มา
  const handleChangeSource = (value) => {
    const clone = { ...state };
    clone.source = value;
    setState(clone);
  };
  // แทนครุภัณฑ์ที่ถูกแทงจำหน่าย object
  const handleChangeReplacedAssetNumberInEditInfo = (value) => {
    const clone = { ...state };
    clone.replacedAssetNumber = value;
    setState(clone);
  };
  // แทนครุภัณฑ์ที่ถูกแทงจำหน่าย array assetInformation
  const handleChangeReplacedAssetNumber = (value) => {
    const clone = [...state];
    clone[index].replacedAssetNumber = value;
    setState(clone);
  };

  // หน่วยงาน editAssetInformation ,index search ,borrowRecord
  const handleChangeSectorInEditAssetInfo = (value) => {
    console.log(2)
    const clone = { ...state };
    clone.sector = value;
    setState(clone);
  };
  // หน่วยงาน assetInformation
  const handleChangeSectorInAssetInfo = (value) => {
    const clone = [...state];
    clone[index].sector = value;
    // console.log(clone)
    setState(clone);
  };
  const handleChangeAllSector = (value) => {
    const clone = { ...state };
    clone.allSector = value;
    setState(clone);
  };
  const handleChangeType4 = (value) => {
    const clone = { ...state };
    clone.type4 = value;
    setState(clone);
  };
  const handleChangeType8 = (value) => {
    const clone = { ...state };
    clone.type8 = value;
    setState(clone);
  };
  const handleChangeType13 = (value) => {
    const clone = { ...state };
    clone.type13 = value;
    setState(clone);
  };
  // การจ่ายครุภัณฑ์ให้หน่วยงาน
  const handleChangeDistributeToSector = (value) => {
    const clone = { ...state };
    clone.distributeToSector = value;
    console.log(clone);
    setState(clone);
  };

  // หน่วยงานผู้โอน
  const handleChangeTransferSector = (value) => {
    const clone = { ...state };
    clone.transferSector = value;
    // console.log(clone)
    setState(clone);
  };
  // ภาควิชาผู้โอน, ภาควิชา
  const handleChangeSubSector = (value) => {
    const clone = { ...state };
    clone.subSector = value;
    // console.log(clone)
    setState(clone);
  };
  // วัตถุประสงค์การขอยืม
  const handleChangeBorrowPurpose = (value) => {
    const clone = { ...state };
    clone.borrowPurpose = value;
    // console.log(clone)
    setState(clone);
  };
  // ผู้ดำเนินการ
  const handleChangeHandler = (value) => {
    const clone = { ...state };
    clone.handler = value;
    // console.log(clone)
    setState(clone);
  };
  // หน่วยงานที่รับโอน
  const handleChangeTransfereeSector = (value) => {
    const clone = { ...state };
    clone.transfereeSector = value;
    // console.log(clone);
    setState(clone);
  };
  // อาคาร
  const handleChangeBuilding = (value) => {
    const clone = { ...state };
    clone.building = value;
    // console.log(clone)
    setState(clone);
  };
  // ชั้น
  const handleChangeFloor = (value) => {
    const clone = { ...state };
    clone.floor = value;
    // console.log(clone)
    setState(clone);
  };
  // ห้อง
  const handleChangeRoom = (value) => {
    const clone = { ...state };
    clone.room = value;
    // console.log(clone)
    setState(clone);
  };

  // เลขครุภัณฑ์ saveTransferAsset
  const handleChangeAssetNumberSaveTransfer = (value) => {
    const clone = [...state];
    clone[index].assetNumber = value;
    console.log(clone);
    setState(clone);
  };
  // ชื่อครุภัณฑ์ saveTransferAsset
  const handleChangeProductNameSaveTransferAsset = (value) => {
    const clone = [...state];
    clone[index].productName = value;
    // console.log(clone)
    setState(clone);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);

    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });


    // fetchApi()
  }, []);
  return (
    <div className=" font-medium relative w-full" ref={refDropdown}>
      <div
        onClick={() => setOpen(!open)}
        className={` border border-gray-300 bg-white ${
          location.pathname === "/dashboard" ? "text-md" : "text-sm"
        } rounded-lg focus:ring-blue-500 focus:border-blue-500 z-0  w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 flex items-center justify-between ${
          (
            id === "ประเภทครุภัณฑ์"
              ? state?.type
              : id === "ชนิดครุภัณฑ์"
              ? state?.kind
              : id === "หน่วยนับ"
              ? state?.unit
              : id === "ยี่ห้อ"
              ? state?.brand
              : id === "หมวดหมู่ครุภัณฑ์"
              ? state?.category
              : id === "กลุ่ม"
              ? state?.group
              : id === "ประเภทที่ได้มา"
              ? state?.acquiredType
              : id === "วัตถุประสงค์ในการใช้งาน"
              ? state?.purposeOfUse
              : id === "แหล่งที่ได้มา"
              ? state?.source
              : id === "ประเภทครุภัณฑ์ 4 หลัก"
              ? state?.type4
              : id === "ประเภทครุภัณฑ์ 8 หลัก"
              ? state?.type8
              : id === "ประเภทครุภัณฑ์ 13 หลัก"
              ? state?.type13
              : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
              ? state?.distributeToSector
              : id === "หน่วยงานผู้โอน"
              ? state?.transferSector
              : id === "ภาควิชาผู้โอน"
              ? state?.subSector
              : id === "ผู้ดำเนินการ"
              ? state?.handler
              : id === "หน่วยงานที่รับโอน"
              ? state?.transfereeSector
              : id === "อาคาร"
              ? state?.building
              : id === "ชั้น"
              ? state?.floor
              : id === "ห้อง"
              ? state?.room
              : id === "ภาควิชา"
              ? state?.subSector
              : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                (location.pathname === "/assetInformation" ||
                  location.pathname === "/packageAssetInformation")
              ? state[index]?.replacedAssetNumber
              : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
              ? state?.replacedAssetNumber
              : id === "หน่วยงานเจ้าของครุภัณฑ์"
              ? state?.allSector
              : id === "หน่วยงาน" &&
                (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                  location.pathname === "/assetInformationIndex" ||
                  location.pathname === "/borrowRecord" 
                  )
              ? state?.sector
              : id === "หน่วยงาน" &&
                (location.pathname === "/assetInformation" ||
                  location.pathname === "/packageAssetInformation")
              ? state[index]?.sector
              : id === "เลขครุภัณฑ์" &&
                (location.pathname === "/saveTransferAsset" ||
                  location.pathname === "/saveTransferAsset")
              ? state[index]?.assetNumber
              : id === "ชื่อครุภัณฑ์" &&
                (location.pathname === "/saveTransferAsset" ||
                  location.pathname === "/saveTransferAsset")
              ? state[index]?.productName
              : id === "วิธีการได้มา" ||
                id === "ประเภทเงิน" ||
                id === "ผู้ขาย" ||
                id === "สถานะ" ||
                id === "ชื่อ - นามสกุล"
              ? state
              : null
          )
            ? "text-gray-700"
            : "text-gray-500"
        }`}
      >
        {(
          id === "ประเภทครุภัณฑ์"
            ? state?.type
            : id === "ชนิดครุภัณฑ์"
            ? state?.kind
            : id === "หน่วยนับ"
            ? state?.unit
            : id === "ยี่ห้อ"
            ? state?.brand
            : id === "หมวดหมู่ครุภัณฑ์"
            ? state?.category
            : id === "กลุ่ม"
            ? state?.group
            : id === "ประเภทที่ได้มา"
            ? state?.acquiredType
            : id === "วัตถุประสงค์ในการใช้งาน"
            ? state?.purposeOfUse
            : id === "แหล่งที่ได้มา"
            ? state?.source
            : id === "ประเภทครุภัณฑ์ 4 หลัก"
            ? state?.type4
            : id === "ประเภทครุภัณฑ์ 8 หลัก"
            ? state?.type8
            : id === "ประเภทครุภัณฑ์ 13 หลัก"
            ? state?.type13
            : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
            ? state?.distributeToSector
            : id === "หน่วยงานผู้โอน"
            ? state?.transferSector
            : id === "ภาควิชาผู้โอน"
            ? state?.subSector
            : id === "ผู้ดำเนินการ"
            ? state?.handler
            : id === "หน่วยงานที่รับโอน"
            ? state?.transfereeSector
            : id === "อาคาร"
            ? state?.building
            : id === "ชั้น"
            ? state?.floor
            : id === "ห้อง"
            ? state?.room
            : id === "ภาควิชา"
            ? state?.subSector
            : id === "วัตถุประสงค์การขอยืม"
            ? state?.borrowPurpose
            : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
              (location.pathname === "/assetInformation" ||
                location.pathname === "/packageAssetInformation")
            ? state[index]?.replacedAssetNumber
            : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
            ? state?.replacedAssetNumber
            : id === "หน่วยงานเจ้าของครุภัณฑ์"
            ? state?.allSector
            : id === "หน่วยงาน" &&
            (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
              location.pathname === "/assetInformationIndex" ||
              location.pathname === "/borrowRecord" 
              )
          ? state?.sector
            : id === "หน่วยงาน" &&
              (location.pathname === "/assetInformation" ||
                location.pathname === "/packageAssetInformation")
            ? state[index]?.sector
            : id === "เลขครุภัณฑ์" &&
              (location.pathname === "/saveTransferAsset" ||
                location.pathname === "/saveTransferAsset")
            ? state[index]?.assetNumber
            : id === "ชื่อครุภัณฑ์" &&
              (location.pathname === "/saveTransferAsset" ||
                location.pathname === "/saveTransferAsset")
            ? state[index]?.productName
            : id === "วิธีการได้มา" ||
              id === "ประเภทเงิน" ||
              id === "ผู้ขาย" ||
              id === "สถานะ" ||
              id === "ชื่อ - นามสกุล"
            ? state
            : null
        )
          ? (id === "ประเภทครุภัณฑ์"
              ? state?.type
              : id === "ชนิดครุภัณฑ์"
              ? state?.kind
              : id === "หน่วยนับ"
              ? state?.unit
              : id === "ยี่ห้อ"
              ? state?.brand
              : id === "หมวดหมู่ครุภัณฑ์"
              ? state?.category
              : id === "กลุ่ม"
              ? state?.group
              : id === "ประเภทที่ได้มา"
              ? state?.acquiredType
              : id === "วัตถุประสงค์ในการใช้งาน"
              ? state?.purposeOfUse
              : id === "แหล่งที่ได้มา"
              ? state?.source
              : id === "ประเภทครุภัณฑ์ 4 หลัก"
              ? state?.type4
              : id === "ประเภทครุภัณฑ์ 8 หลัก"
              ? state?.type8
              : id === "ประเภทครุภัณฑ์ 13 หลัก"
              ? state?.type13
              : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
              ? state?.distributeToSector
              : id === "หน่วยงานผู้โอน"
              ? state?.transferSector
              : id === "ภาควิชาผู้โอน"
              ? state?.subSector
              : id === "ผู้ดำเนินการ"
              ? state?.handler
              : id === "หน่วยงานที่รับโอน"
              ? state?.transfereeSector
              : id === "อาคาร"
              ? state?.building
              : id === "ชั้น"
              ? state?.floor
              : id === "ห้อง"
              ? state?.room
              : id === "ภาควิชา"
              ? state?.subSector
              : id === "วัตถุประสงค์การขอยืม"
              ? state?.borrowPurpose
              : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                (location.pathname === "/assetInformation" ||
                  location.pathname === "/packageAssetInformation")
              ? state[index]?.replacedAssetNumber
              : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
              ? state?.replacedAssetNumber
              : id === "หน่วยงานเจ้าของครุภัณฑ์"
              ? state?.allSector
              : id === "หน่วยงาน" &&
              (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                location.pathname === "/assetInformationIndex" ||
                location.pathname === "/borrowRecord" 
                )
            ? state?.sector
              : id === "หน่วยงาน" &&
                (location.pathname === "/assetInformation" ||
                  location.pathname === "/packageAssetInformation")
              ? state[index]?.sector
              : id === "เลขครุภัณฑ์" &&
                (location.pathname === "/saveTransferAsset" ||
                  location.pathname === "/saveTransferAsset")
              ? state[index]?.assetNumber
              : id === "ชื่อครุภัณฑ์" &&
                (location.pathname === "/saveTransferAsset" ||
                  location.pathname === "/saveTransferAsset")
              ? state[index]?.productName
              : id === "วิธีการได้มา" ||
                id === "ประเภทเงิน" ||
                id === "ผู้ขาย" ||
                id === "สถานะ" ||
                id === "ชื่อ - นามสกุล"
              ? state
              : null
            )?.length > 25
            ? (id === "ประเภทครุภัณฑ์"
                ? state?.type
                : id === "ชนิดครุภัณฑ์"
                ? state?.kind
                : id === "หน่วยนับ"
                ? state?.unit
                : id === "ยี่ห้อ"
                ? state?.brand
                : id === "หมวดหมู่ครุภัณฑ์"
                ? state?.category
                : id === "กลุ่ม"
                ? state?.group
                : id === "ประเภทที่ได้มา"
                ? state?.acquiredType
                : id === "วัตถุประสงค์ในการใช้งาน"
                ? state?.purposeOfUse
                : id === "แหล่งที่ได้มา"
                ? state?.source
                : id === "ประเภทครุภัณฑ์ 4 หลัก"
                ? state?.type4
                : id === "ประเภทครุภัณฑ์ 8 หลัก"
                ? state?.type8
                : id === "ประเภทครุภัณฑ์ 13 หลัก"
                ? state?.type13
                : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                ? state?.distributeToSector
                : id === "หน่วยงานผู้โอน"
                ? state?.transferSector
                : id === "ภาควิชาผู้โอน"
                ? state?.subSector
                : id === "ผู้ดำเนินการ"
                ? state?.handler
                : id === "หน่วยงานที่รับโอน"
                ? state?.transfereeSector
                : id === "อาคาร"
                ? state?.building
                : id === "ชั้น"
                ? state?.floor
                : id === "ห้อง"
                ? state?.room
                : id === "ภาควิชา"
                ? state?.subSector
                : id === "วัตถุประสงค์การขอยืม"
                ? state?.borrowPurpose
                : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                  (location.pathname === "/assetInformation" ||
                    location.pathname === "/packageAssetInformation")
                ? state[index]?.replacedAssetNumber
                : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
                ? state?.replacedAssetNumber
                : id === "หน่วยงานเจ้าของครุภัณฑ์"
                ? state?.allSector
                : id === "หน่วยงาน" &&
                (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                  location.pathname === "/assetInformationIndex" ||
                  location.pathname === "/borrowRecord" 
                  )
              ? state?.sector
                : id === "หน่วยงาน" &&
                  (location.pathname === "/assetInformation" ||
                    location.pathname === "/packageAssetInformation")
                ? state[index]?.sector
                : id === "เลขครุภัณฑ์" &&
                  (location.pathname === "/saveTransferAsset" ||
                    location.pathname === "/saveTransferAsset")
                ? state[index]?.assetNumber
                : id === "ชื่อครุภัณฑ์" &&
                  (location.pathname === "/saveTransferAsset" ||
                    location.pathname === "/saveTransferAsset")
                ? state[index]?.productName
                : id === "วิธีการได้มา" ||
                  id === "ประเภทเงิน" ||
                  id === "ผู้ขาย" ||
                  id === "สถานะ" ||
                  id === "ชื่อ - นามสกุล"
                ? state
                : null
              )?.substring(0, 25) + "..."
            : id === "ประเภทครุภัณฑ์"
            ? state?.type
            : id === "ชนิดครุภัณฑ์"
            ? state?.kind
            : id === "หน่วยนับ"
            ? state?.unit
            : id === "ยี่ห้อ"
            ? state?.brand
            : id === "หมวดหมู่ครุภัณฑ์"
            ? state?.category
            : id === "กลุ่ม"
            ? state?.group
            : id === "ประเภทที่ได้มา"
            ? state?.acquiredType
            : id === "วัตถุประสงค์ในการใช้งาน"
            ? state?.purposeOfUse
            : id === "แหล่งที่ได้มา"
            ? state?.source
            : id === "ประเภทครุภัณฑ์ 4 หลัก"
            ? state?.type4
            : id === "ประเภทครุภัณฑ์ 8 หลัก"
            ? state?.type8
            : id === "ประเภทครุภัณฑ์ 13 หลัก"
            ? state?.type13
            : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
            ? state?.distributeToSector
            : id === "หน่วยงานผู้โอน"
            ? state?.transferSector
            : id === "ภาควิชาผู้โอน"
            ? state?.subSector
            : id === "ผู้ดำเนินการ"
            ? state?.handler
            : id === "หน่วยงานที่รับโอน"
            ? state?.transfereeSector
            : id === "อาคาร"
            ? state?.building
            : id === "ชั้น"
            ? state?.floor
            : id === "ห้อง"
            ? state?.room
            : id === "ภาควิชา"
            ? state?.subSector
            : id === "วัตถุประสงค์การขอยืม"
            ? state?.borrowPurpose
            : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
              (location.pathname === "/assetInformation" ||
                location.pathname === "/packageAssetInformation")
            ? state[index]?.replacedAssetNumber
            : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
            ? state?.replacedAssetNumber
            : id === "หน่วยงานเจ้าของครุภัณฑ์"
            ? state?.allSector
            : id === "หน่วยงาน" &&
            (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
              location.pathname === "/assetInformationIndex" ||
              location.pathname === "/borrowRecord" 
              )
          ? state?.sector
            : id === "หน่วยงาน" &&
              (location.pathname === "/assetInformation" ||
                location.pathname === "/packageAssetInformation")
            ? state[index]?.sector
            : id === "เลขครุภัณฑ์" &&
              (location.pathname === "/saveTransferAsset" ||
                location.pathname === "/saveTransferAsset")
            ? state[index]?.assetNumber
            : id === "ชื่อครุภัณฑ์" &&
              (location.pathname === "/saveTransferAsset" ||
                location.pathname === "/saveTransferAsset")
            ? state[index]?.productName
            : id === "วิธีการได้มา" ||
              id === "ประเภทเงิน" ||
              id === "ผู้ขาย" ||
              id === "สถานะ" ||
              id === "ชื่อ - นามสกุล"
            ? state
            : null
          : placeholder}
        <BiChevronDown
          size={20}
          className={`${open && "rotate-180"} text-black`}
        />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto scrollbar h-60 w-full z-10 border border-gray-300 rounded-lg ${
          open ? "absolute" : "hidden"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-gray-100 ">
          <div>
            <AiOutlineSearch className="text-gray-500 " />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter "
            className="bg-gray-100 border-none focus:ring-0 placeholder:text-gray-500 text-gray-700 p-2 "
          />
        </div>
        {data?.map((data) => (
          <li
            key={data?.name}
            className={`p-2 text-xs hover:bg-sky-600 hover:text-white
            ${
              data?.name?.toLowerCase() ===
                (id === "ประเภทครุภัณฑ์"
                  ? state?.type
                  : id === "ชนิดครุภัณฑ์"
                  ? state?.kind
                  : id === "หน่วยนับ"
                  ? state?.unit
                  : id === "ยี่ห้อ"
                  ? state?.brand
                  : id === "หมวดหมู่ครุภัณฑ์"
                  ? state?.category
                  : id === "กลุ่ม"
                  ? state?.group
                  : id === "ประเภทที่ได้มา"
                  ? state?.acquiredType
                  : id === "วัตถุประสงค์ในการใช้งาน"
                  ? state?.purposeOfUse
                  : id === "แหล่งที่ได้มา"
                  ? state?.source
                  : id === "ประเภทครุภัณฑ์ 4 หลัก"
                  ? state?.type4
                  : id === "ประเภทครุภัณฑ์ 8 หลัก"
                  ? state?.type8
                  : id === "ประเภทครุภัณฑ์ 13 หลัก"
                  ? state?.type13
                  : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                  ? state?.distributeToSector
                  : id === "หน่วยงานผู้โอน"
                  ? state?.transferSector
                  : id === "ภาควิชาผู้โอน"
                  ? state?.subSector
                  : id === "ผู้ดำเนินการ"
                  ? state?.handler
                  : id === "หน่วยงานที่รับโอน"
                  ? state?.transfereeSector
                  : id === "อาคาร"
                  ? state?.building
                  : id === "ชั้น"
                  ? state?.floor
                  : id === "ห้อง"
                  ? state?.room
                  : id === "ภาควิชา"
                  ? state?.subSector
                  : id === "วัตถุประสงค์การขอยืม"
                  ? state?.borrowPurpose
                  : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                    (location.pathname === "/assetInformation" ||
                      location.pathname === "/packageAssetInformation")
                  ? state[index]?.replacedAssetNumber
                  : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
                  ? state?.replacedAssetNumber
                  : id === "หน่วยงานเจ้าของครุภัณฑ์"
                  ? state?.allSector
                  : id === "หน่วยงาน" &&
                (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                  location.pathname === "/assetInformationIndex" ||
                  location.pathname === "/borrowRecord" 
                  )
              ? state?.sector
                  : id === "หน่วยงาน" &&
                    (location.pathname === "/assetInformation" ||
                      location.pathname === "/packageAssetInformation")
                  ? state[index]?.sector
                  : id === "เลขครุภัณฑ์" &&
                    (location.pathname === "/saveTransferAsset" ||
                      location.pathname === "/saveTransferAsset")
                  ? state[index]?.assetNumber
                  : id === "ชื่อครุภัณฑ์" &&
                    (location.pathname === "/saveTransferAsset" ||
                      location.pathname === "/saveTransferAsset")
                  ? state[index]?.productName
                  : ""
                )?.toLowerCase() && "bg-sky-600 text-white"
            }
            ${
              data?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (
                data?.name?.toLowerCase() !==
                (id === "ประเภทครุภัณฑ์"
                  ? state?.type
                  : id === "ชนิดครุภัณฑ์"
                  ? state?.kind
                  : id === "หน่วยนับ"
                  ? state?.unit
                  : id === "ยี่ห้อ"
                  ? state?.brand
                  : id === "หมวดหมู่ครุภัณฑ์"
                  ? state?.category
                  : id === "กลุ่ม"
                  ? state?.group
                  : id === "ประเภทที่ได้มา"
                  ? state?.acquiredType
                  : id === "วัตถุประสงค์ในการใช้งาน"
                  ? state?.purposeOfUse
                  : id === "แหล่งที่ได้มา"
                  ? state?.source
                  : id === "ประเภทครุภัณฑ์ 4 หลัก"
                  ? state?.type4
                  : id === "ประเภทครุภัณฑ์ 8 หลัก"
                  ? state?.type8
                  : id === "ประเภทครุภัณฑ์ 13 หลัก"
                  ? state?.type13
                  : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                  ? state?.distributeToSector
                  : id === "หน่วยงานผู้โอน"
                  ? state?.transferSector
                  : id === "ภาควิชาผู้โอน"
                  ? state?.subSector
                  : id === "ผู้ดำเนินการ"
                  ? state?.handler
                  : id === "หน่วยงานที่รับโอน"
                  ? state?.transfereeSector
                  : id === "อาคาร"
                  ? state?.building
                  : id === "ชั้น"
                  ? state?.floor
                  : id === "ห้อง"
                  ? state?.room
                  : id === "ภาควิชา"
                  ? state?.subSector
                  : id === "วัตถุประสงค์การขอยืม"
                  ? state?.borrowPurpose
                  : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                    (location.pathname === "/assetInformation" ||
                      location.pathname === "/packageAssetInformation")
                  ? state[index]?.replacedAssetNumber
                  : id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"
                  ? state?.replacedAssetNumber
                  : id === "หน่วยงานเจ้าของครุภัณฑ์"
                  ? state?.allSector
                  : id === "หน่วยงาน" &&
                  (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                    location.pathname === "/assetInformationIndex" ||
                    location.pathname === "/borrowRecord" 
                    )
                ? state?.sector
                  : id === "หน่วยงาน" &&
                    (location.pathname === "/assetInformation" ||
                      location.pathname === "/packageAssetInformation")
                  ? state[index]?.sector
                  : id === "เลขครุภัณฑ์" &&
                    (location.pathname === "/saveTransferAsset" ||
                      location.pathname === "/saveTransferAsset")
                  ? state[index]?.assetNumber
                  : id === "ชื่อครุภัณฑ์" &&
                    (location.pathname === "/saveTransferAsset" ||
                      location.pathname === "/saveTransferAsset")
                  ? state[index]?.productName
                  : ""
                )?.toLowerCase()
              ) {
                // setSelected(data?.name);
                // id === "ชนิดครุภัณฑ์"?handleChangeKind() : null
                if (id === "ประเภทครุภัณฑ์") {
                  handleChangeType(data?.name);
                } else if (id === "ชนิดครุภัณฑ์") {
                  handleChangeKind(data?.name);
                } else if (id === "หน่วยนับ") {
                  handleChangeUnit(data?.name);
                } else if (id === "ยี่ห้อ") {
                  handleChangeBrand(data?.name);
                } else if (id === "หมวดหมู่ครุภัณฑ์") {
                  handleChangeCategory(data?.name);
                } else if (id === "กลุ่ม") {
                  handleChangeGroup(data?.name);
                } else if (id === "ประเภทที่ได้มา") {
                  handleChangeAcquiredType(data?.name);
                } else if (id === "วัตถุประสงค์ในการใช้งาน") {
                  handleChangePurposeOfUse(data?.name);
                } else if (id === "หน่วยงานเจ้าของครุภัณฑ์") {
                  handleChangeAllSector(data?.name);
                } else if (id === "แหล่งที่ได้มา") {
                  handleChangeSource(data?.name);
                } else if (id === "ประเภทครุภัณฑ์ 4 หลัก") {
                  handleChangeType4(data?.name);
                } else if (id === "ประเภทครุภัณฑ์ 8 หลัก") {
                  handleChangeType8(data?.name);
                } else if (id === "ประเภทครุภัณฑ์ 13 หลัก") {
                  handleChangeType13(data?.name);
                } else if (id === "การจ่ายครุภัณฑ์ให้หน่วยงาน") {
                  handleChangeDistributeToSector(data?.name);
                } else if (id === "หน่วยงานผู้โอน") {
                  handleChangeTransferSector(data?.name);
                } else if (id === "ภาควิชาผู้โอน") {
                  handleChangeSubSector(data?.name);
                } else if (id === "ผู้ดำเนินการ") {
                  handleChangeHandler(data?.name);
                } else if (id === "หน่วยงานที่รับโอน") {
                  handleChangeTransfereeSector(data?.name);
                } else if (id === "อาคาร") {
                  handleChangeBuilding(data?.name);
                } else if (id === "ชั้น") {
                  handleChangeFloor(data?.name);
                } else if (id === "ห้อง") {
                  handleChangeRoom(data?.name);
                } else if (id === "ภาควิชา") {
                  handleChangeSubSector(data?.name);
                } else if (id === "วัตถุประสงค์การขอยืม") {
                  handleChangeBorrowPurpose(data?.name);
                } else if (
                  id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย" &&
                  (location.pathname === "/assetInformation" ||
                    location.pathname === "/packageAssetInformation")
                ) {
                  handleChangeReplacedAssetNumber(data?.name);
                } else if (id === "แทนครุภัณฑ์ที่ถูกแทงจำหน่าย") {
                  handleChangeReplacedAssetNumberInEditInfo(data?.name);
                } else if (
                  id === "หน่วยงาน" &&
                  (`/${location.pathname.split('/')[1]}` === "/editAssetInformation" ||
                    location.pathname === "/assetInformationIndex" ||
                    location.pathname === "/borrowRecord" 
                    )
                ) {
                  handleChangeSectorInEditAssetInfo(data?.name);
                } else if (
                  id === "หน่วยงาน" &&
                  (location.pathname === "/assetInformation" ||
                    location.pathname === "/packageAssetInformation")
                ) {
                  handleChangeSectorInAssetInfo(data?.name);
                } else if (
                  id === "หน่วยงานเจ้าของครุภัณฑ์" &&
                  (location.pathname === "/editAssetInformation" ||
                    location.pathname === "/editAssetInformation")
                ) {
                  handleChangeSectorInEditAssetInfo(data?.name);
                } else if (
                  id === "เลขครุภัณฑ์" &&
                  location.pathname === "/saveTransferAsset"
                ) {
                  handleChangeAssetNumberSaveTransfer(data?.name);
                } else if (
                  id === "ชื่อครุภัณฑ์" &&
                  location.pathname === "/saveTransferAsset"
                ) {
                  handleChangeProductNameSaveTransferAsset(data?.name);
                } else if (
                  id === "วิธีการได้มา" ||
                  id === "ประเภทเงิน" ||
                  id === "ผู้ขาย" ||
                  id === "สถานะ" ||
                  id === "ชื่อ - นามสกุล"
                ) {
                  setState(data?.name);
                  // console.log(state);
                  // console.log(setState);
                }

                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {data?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
