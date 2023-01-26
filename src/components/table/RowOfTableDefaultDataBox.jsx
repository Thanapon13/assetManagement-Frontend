import Selector from "../selector/Selector";
import barcodeReader from "../../public/pics/barcodeReader.png";
import { useState } from "react";

function RowOfTableDefaultDataBox({ index, rowArray, setRowArray ,deleteRow}) {
  const [disabled,setDisabled] = useState(true)

  const handleChangeName = (e) => {
    const clone = [...rowArray];
    // console.log(clone);
    clone[index].name = e.target.value;
    setRowArray(clone);
  };

  return (
    <div
      className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs mr-3 bg-white`}
    >
      <div className="ml-6 col-span-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <input
        className={`col-span-6 ${disabled ? "bg-gray-200":"bg-white" } border-[1px]  border-gray-300 text-center flex justify-center items-center  py-2 rounded focus:border-2 focus:outline-none  focus:border-focus-blue`}
        disabled={disabled}
        onChange={handleChangeName}
        value={rowArray && rowArray[index]?.name}
      />
      <button
        className="-ml-2 flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-7 h-8  py-2 "
        onClick={() => {
          setDisabled(false)
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8196 5.60337L10.3663 2.1907L11.5038 1.05315C11.8153 0.741674 12.198 0.585938 12.652 0.585938C13.1054 0.585938 13.4878 0.741674 13.7993 1.05315L14.9368 2.1907C15.2483 2.50218 15.4108 2.87811 15.4243 3.31851C15.4379 3.75836 15.2889 4.13403 14.9775 4.4455L13.8196 5.60337ZM12.6414 6.80186L4.02849 15.4148H0.575195V11.9615L9.18811 3.34857L12.6414 6.80186Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        className="-ml-2 flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-7 h-8  py-2 "
        onClick={() => {
          deleteRow(index);
        }}
      >
        <svg
          width="13"
          height="17"
          viewBox="0 0 13 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.892857 14.2857C0.892857 15.2679 1.69643 16.0714 2.67857 16.0714H9.82143C10.8036 16.0714 11.6071 15.2679 11.6071 14.2857V5.35714C11.6071 4.375 10.8036 3.57143 9.82143 3.57143H2.67857C1.69643 3.57143 0.892857 4.375 0.892857 5.35714V14.2857ZM11.6071 0.892857H9.375L8.74107 0.258929C8.58036 0.0982142 8.34821 0 8.11607 0H4.38393C4.15179 0 3.91964 0.0982142 3.75893 0.258929L3.125 0.892857H0.892857C0.401786 0.892857 0 1.29464 0 1.78571C0 2.27679 0.401786 2.67857 0.892857 2.67857H11.6071C12.0982 2.67857 12.5 2.27679 12.5 1.78571C12.5 1.29464 12.0982 0.892857 11.6071 0.892857Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default RowOfTableDefaultDataBox;
