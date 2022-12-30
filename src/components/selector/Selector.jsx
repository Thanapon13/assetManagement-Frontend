import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const Selector = ({ placeholder, fetchDataDropdown, state, setState, id }) => {
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
    if (!refDropdown.current.contains(e.target)) {
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
  // หมวด
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
  // const handleChangeBrand = (value) => {
  //   const clone = { ...state };
  //   clone.brand = value;
  //   setState(clone);
  // };

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
        } rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 flex items-center justify-between ${
          (
            id === "ประเภทครุภัณฑ์"
              ? state?.type
              : id === "ชนิดครุภัณฑ์"
              ? state?.kind
              : id === "หน่วยนับ"
              ? state?.unit
              : id === "ยี่ห้อ"
              ? state?.brand
              : id === "หมวด"
              ? state?.category
              : id === "กลุ่ม"
              ? state?.group
              : id === "ประเภทที่ได้มา"
              ? state?.acquiredType
              : id === "วัตถุประสงค์ในการใช้งาน"
              ? state?.purposeOfUse
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
            : id === "หมวด"
            ? state?.category
            : id === "กลุ่ม"
            ? state?.group
            : id === "ประเภทที่ได้มา"
            ? state?.acquiredType
            : id === "วัตถุประสงค์ในการใช้งาน"
            ? state?.purposeOfUse
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
              : id === "หมวด"
              ? state?.category
              : id === "กลุ่ม"
              ? state?.group
              : id === "ประเภทที่ได้มา"
              ? state?.acquiredType
              : id === "วัตถุประสงค์ในการใช้งาน"
              ? state?.purposeOfUse
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
                : id === "หมวด"
                ? state?.category
                : id === "กลุ่ม"
                ? state?.group
                : id === "ประเภทที่ได้มา"
                ? state?.acquiredType
                : id === "วัตถุประสงค์ในการใช้งาน"
                ? state?.purposeOfUse
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
            : id === "หมวด"
            ? state?.category
            : id === "กลุ่ม"
            ? state?.group
            : id === "ประเภทที่ได้มา"
            ? state?.acquiredType
            : id === "วัตถุประสงค์ในการใช้งาน"
            ? state?.purposeOfUse
            : null
          : placeholder}
        <BiChevronDown
          size={20}
          className={`${open && "rotate-180"} text-black`}
        />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto scrollbar h-60 w-full z-20 border border-gray-300 rounded-lg ${
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
                  : id === "หมวด"
                  ? state?.category
                  : id === "กลุ่ม"
                  ? state?.group
                  : id === "ประเภทที่ได้มา"
                  ? state?.acquiredType
                  : id === "วัตถุประสงค์ในการใช้งาน"
                  ? state?.purposeOfUse
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
                  : id === "หมวด"
                  ? state?.category
                  : id === "กลุ่ม"
                  ? state?.group
                  : id === "ประเภทที่ได้มา"
                  ? state?.acquiredType
                  : id === "วัตถุประสงค์ในการใช้งาน"
                  ? state?.purposeOfUse
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
                } else if (id === "หมวด") {
                  handleChangeCategory(data?.name);
                } else if (id === "กลุ่ม") {
                  handleChangeGroup(data?.name);
                } else if (id === "ประเภทที่ได้มา") {
                  handleChangeAcquiredType(data?.name);
                } else if (id === "วัตถุประสงค์ในการใช้งาน") {
                  handleChangePurposeOfUse(data?.name);
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
