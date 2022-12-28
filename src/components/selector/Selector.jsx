import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const Selector = ({ placeholder, fetchDataDropdown }) => {
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

  const handleClickOutSide = e =>{
    if(!refDropdown.current.contains(e.target)){
        setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click",handleClickOutSide,true)

    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    // fetchApi()
  }, []);
  return (
    <div className=" font-medium relative" ref={refDropdown}>
      <div
        onClick={() => setOpen(!open)}
        className={` border border-gray-300 bg-white ${
          location.pathname === "/dashboard" ? "text-md" : "text-sm"
        } rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 flex items-center justify-between ${
          selected ? "text-gray-700" : "text-gray-500"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : placeholder}
        <BiChevronDown size={20} className={`${open && "rotate-180"} text-black`} />
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
              data?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              data?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (data?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(data?.name);
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
