import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import {  getQuantitySelector } from "../../api/assetApi";

const AssetNumberSelector = ({
  placeholder,
  fetchDataDropdown,
  state,
  setState,
  data,
  id,
  index,
  filterAssetByAssetNumber,
  disabled,
  search,
  setSearch,
}) => {
  let location = useLocation();
  // console.log(location.pathname);
  const refDropdown = useRef(null);
  // console.log(id, disabled);

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOutSide = (e) => {
    if (!refDropdown?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  // handle state from outside
  // assetInformation
  // ชนิดครุภัณฑ์
  const handleChange = async(value) => {
    const clone = [...state];
    clone[index][id] = value;

    // console.log(value)
    
    const filterData = filterAssetByAssetNumber(value);
    console.log(filterData);
    // console.log(clone[index]);
    const hasType4 = filterData.hasOwnProperty("type4");
    if(hasType4){
      clone[index].isPackage = true;
    }
    clone[index].productName = filterData.productName;
    clone[index].brand = filterData.brand;
    clone[index].unit = filterData.unit;
    clone[index].pricePerUnit = filterData.pricePerUnit;
    clone[index].amount = 1
    // console.log(clone);
    
    
    const cloneSearch = { ...search };
    cloneSearch[id] = value;
    console.log(cloneSearch)
    setSearch(cloneSearch)
    const res = await getQuantitySelector(cloneSearch);
    const quantity = res.data.quantity
    // console.log("quantity",quantity);
    clone[index].maxQuantity = quantity;
    // console.log(clone[index])
    setState(clone);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  return (
    <div className=" font-medium relative w-full" ref={refDropdown}>
      <div
        onClick={() => {
          disabled ? setOpen(!open) : setOpen(false);
        }}
        className={` border border-gray-300 bg-white ${
          location.pathname === "/dashboard" ? "text-md" : "text-sm"
        } rounded-lg focus:ring-blue-500 focus:border-blue-500 z-0  w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 flex items-center justify-between ${
          state[index][id] ? "text-gray-700" : "text-gray-500"
        } ${disabled ? "" : "bg-gray-100"}`}
      >
        {state[index][id]
          ? state[index][id]?.length > 25
            ? state[index][id]?.substring(0, 25) + "..."
            : // : id === "ประเภทครุภัณฑ์"

              // ? state[index][id]
              state[index][id]
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
            key={data?._id}
            className={`p-2 text-xs hover:bg-sky-600 hover:text-white
            ${
              data[id]?.toLowerCase() === state[index][id]?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              data[id]?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (data[id]?.toLowerCase() !== state[index][id]?.toLowerCase()) {
                handleChange(data?.[id]);
                // setState(data?.[id]);
                // console.log(state);
                // console.log(setState);

                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {data?.[id]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetNumberSelector;
