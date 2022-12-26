import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from "date-fns/locale/th";

function YearInput({ state, setState }) {
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

  return (
    <>
      <DatePicker
        locale="th"
        wrapperClassName="datePicker"
        dateFormat="yyyy"
        showYearPicker
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
          </div>
        )}
        className="  w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
        selected={state}
        onChange={(date) => {
          setState(date);
          console.log(date);
        }}
      />
      <div className="items-center relative">
        <i className="fa-regular fa-calendar absolute top-3.5 sm:top-2.5 -left-6  text-black text-sm sm:text-xs"></i>
      </div>
    </>
  );
}

export default YearInput;
