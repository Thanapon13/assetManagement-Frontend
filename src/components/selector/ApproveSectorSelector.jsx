import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const ApproveSectorSelector = ({
  placeholder,
  fetchDataDropdown,
  state,
  setState,
  data,
  id,
  index,
  filterAssetByProductName,
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
  const handleChange = (value) => {
    const cloneSearch = { ...search };
    cloneSearch[id] = value;
    setSearch(cloneSearch)
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  return (
    <div className=" font-medium relative w-full" ref={refDropdown}>
      <div
        onClick={() => {
          // disabled ? setOpen(!open) : setOpen(false);
          setOpen(!open)
        }}
        className={` border border-gray-300 bg-white ${
          location.pathname === "/dashboard" ? "text-md" : "text-sm"
        } rounded-lg focus:ring-blue-500 focus:border-blue-500 z-0  w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 flex items-center justify-between ${
          state[id] ? "text-gray-700" : "text-gray-500"
        } `}
      >
        {state[id]
          ? state[id]?.length > 25
            ? state[id]?.substring(0, 25) + "..."
            : // : id === "ประเภทครุภัณฑ์"

              // ? state[id]
              state[id]
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
            key={data}
            className={`p-2 text-xs hover:bg-sky-600 hover:text-white
            ${
              data?.toLowerCase() === state[id]?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              data?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (data?.toLowerCase() !== state[id]?.toLowerCase()) {
                handleChange(data);
                // setState(data?.[id]);
                // console.log(state);
                // console.log(setState);

                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveSectorSelector;
