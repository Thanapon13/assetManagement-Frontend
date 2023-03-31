import React, { useState } from "react";
import dayjs from "dayjs";
import { WatDatePicker } from "thaidatepicker-react";
import { AiTwotoneCalendar } from "react-icons/ai";

const onlyDateInput = ({ state, setState, disabled, id }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());

  const handleWatDatePickerChange = (christDate) => {
    // setSelectedDate(christDate);
    if (
      location.pathname === "/borrowRecord" ||
      `/${location.pathname.split("/")[1]}` === "/borrowEdit" ||
      location.pathname === "/borrowApprove" ||
      `/${location.pathname.split("/")[1]}` === "/borrowApproveDetail" ||
      `/${location.pathname.split("/")[1]}` === "/viewBorrowApproveDetail" ||
      `/${location.pathname.split("/")[1]}` === "/borrowCheckSaving" ||
      `/${location.pathname.split("/")[1]}` === "/borrowCheckApprove"
    ) {
      setState((prevState) => ({ ...prevState, [id]: christDate }));
    } else {
      setState(christDate);
    }
  };

  return (
    <div className="relative w-full">
      <WatDatePicker
        // value={selectedDate} // Can be replace with string or dayjs object (e.g. "2020-12-31" or `dayjs()`)
        // onChange={handleWatDatePickerChange}
        value={
          location.pathname === "/borrowRecord" ||
          `/${location.pathname.split("/")[1]}` === "/borrowEdit" ||
          location.pathname === "/borrowApprove" ||
          `/${location.pathname.split("/")[1]}` === "/borrowApproveDetail" ||
          `/${location.pathname.split("/")[1]}` ===
            "/viewBorrowApproveDetail" ||
          `/${location.pathname.split("/")[1]}` === "/borrowCheckSaving" ||
          `/${location.pathname.split("/")[1]}` === "/borrowCheckApprove"
            ? state[id]
            : state
        } // Can be replace with string or dayjs object (e.g. "2020-12-31" or `dayjs()`)
        onChange={handleWatDatePickerChange}
        dateFormat={"yyyy-MM-dd"} // for set data purpose [using date-fns format](https://date-fns.org/v2.12.0/docs/format)
        displayFormat={"DD/MM/YYYY"} // for display purpose (using dayjs format)[https://day.js.org/docs/en/display/format]
        inputStyle={{
          borderRadius: "6px",
          width: "100%",
          height: "38px",
          borderColor: "rgb(209 213 219)",
          backgroundColor: disabled ? "rgb(229 231 235)" : "",
        }} // styles for input
        // clearable={true} // true | false
        // minDate={'2020-12-26'} // supported date as string
        // maxDate={dayjs().add(20, 'day')} // also supported dayjs or moment
        disabled={disabled} // true | false
        // readOnly={true} // true | false
        yearBoundary={99} // number of boundary ±X Year
      />
      <div className="absolute top-1/2 right-7 transform -translate-y-1/2">
        <AiTwotoneCalendar />
      </div>
    </div>
  );
};

export default onlyDateInput;
