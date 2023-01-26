import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const Selector = ({ placeholder, fetchDataDropdown, state, setState, id ,index}) => {
  let location = useLocation();
  const refDropdown = useRef(null);

  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const fetchApi = async () => {
    const dataApi = await axios.get(
      "https://restcountries.com/v2/all?fields=name"
    );
    console.log(dataApi);
    setData(dataApi);
  };

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
  // หน่วยงาน
  const handleChangeSector = (value) => {
    // console.log(index)
    // console.log(state)
    // console.log(value)
    const clone = [ ...state ];
    // console.log(clone)
    clone[index].sector = value;
    // console.log(clone)
    setState(clone);
  };
  const handleChangeAllSector = (value) => {
    const clone = [ ...state ];
    clone[index].allSector = value;
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
              : id === "หน่วยงาน"
              ? state[index]?.sector
              : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
              ? state[index]?.allSector
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
            : id === "หน่วยงาน"
            ? state[index]?.sector
            : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
            ? state[index]?.allSector
            : id === "วิธีการได้มา" ||
              id === "ประเภทเงิน" ||
              id === "ผู้ขาย" ||
              id === "สถานะ"||
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
              : id === "หน่วยงาน"
              ? state[index]?.sector
              : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
              ? state[index]?.allSector
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
                : id === "หน่วยงาน"
                ? state[index]?.sector
                : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                ? state[index]?.allSector
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
            : id === "หน่วยงาน"
            ? state[index]?.sector
            : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
            ? state[index]?.allSector
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
                  : id === "หน่วยงาน"
                  ? state[index]?.sector
                  : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                  ? state[index]?.allSector
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
                  : id === "วัตถุประสงค์ในการใช้งาน"
                  ? state?.purposeOfUse
                  : id === "หน่วยงาน"
                  ? state[index]?.sector
                  : id === "การจ่ายครุภัณฑ์ให้หน่วยงาน"
                  ? state[index]?.allSector
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
                } else if (id === "หน่วยงาน") {
                  handleChangeSector(data?.name);
                } else if (id === "การจ่ายครุภัณฑ์ให้หน่วยงาน") {
                  handleChangeAllSector(data?.name);
                } 
                else if (
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
