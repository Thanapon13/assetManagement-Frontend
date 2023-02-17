import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from "date-fns/locale/th";
import { useLocation } from "react-router-dom";

function DateInput({ state, setState, lable,id }) {
  const location = useLocation()
  setDefaultLocale("th", th);
  registerLocale("th", th);

  const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  };
  // คศ to พศ + อีก10ปี
  const years = range(
    new Date().getFullYear() + 543 - 10,
    new Date().getFullYear() + 543 + 10,
    1
  );

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน ",
    "พฤษภาคม",
    "มิถุนายน ",
    "กรกฎาคม ",
    "สิงหาคม ",
    "กันยายน ",
    "ตุลาคม ",
    "พฤศจิกายน ",
    "ธันวาคม ",
  ];

  return (
    <>
      <div className="relative">
        <div className="text-xs font-semibold w-20 absolute -top-2 z-10 left-2">
          {lable}
        </div>
      </div>
      <DatePicker
        locale="th"
        wrapperClassName="datePicker"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: "2px 10px ",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              style={{
                border: "1px solid black",
                padding: "0 5px",
              }}
            >
              {"<"}
            </button>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
              style={{
                fontSize: "0.8rem",
                padding: "0px 40px 0px 10px",
              }}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              style={{
                fontSize: "0.8rem",
                padding: "0px 40px 0px 10px",
              }}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              style={{
                border: "1px solid black",
                padding: "0 5px",
              }}
            >
              {">"}
            </button>
          </div>
        )}
        showTimeSelect
        showMonthDropdown
        showYearDropdown
        // dropdownMode="select"
        timeFormat="p"
        dateFormat="Pp"
        timeIntervals={1}
        className="  w-full h-[38px] shadow-sm focus:border-2 focus:outline-none  focus:border-focus-blue  sm:text-xs border-[1px] border-gray-300 rounded-md pl-2"
        selected={location.pathname === "/assetInformationIndex"?state[id]:state}
        onChange={(date) => {
          if (location.pathname === "/assetInformationIndex") {
            setState((prevState) => ({ ...prevState, [id]: date }));
          } else {
            setState(date);
          }
          // console.log(date);
        }}
      />
      <div className="items-center relative">
        <i className="fa-regular fa-calendar absolute top-3.5 -left-6  text-black text-sm sm:text-xs"></i>
      </div>
    </>
  );
}

export default DateInput;
