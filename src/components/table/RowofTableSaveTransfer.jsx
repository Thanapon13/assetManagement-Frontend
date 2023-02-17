import { HiTrash } from "react-icons/hi";
import Selector from "../selector/Selector";

function RowofTableSaveTransfer({
  index,
  saveTransferTableArray,
  setSaveTransferTableArray,
  deleteRow,
}) {
  const handleChangeInventoryNumber = (e) => {
    const clone = [...saveTransferTableArray];
    // console.log(clone);
    clone[index].inventoryNumber = e.target.value;
    setSaveTransferTableArray(clone);
  };
  const handleChangeProductName = (e) => {
    const clone = [...saveTransferTableArray];
    // console.log(clone);
    clone[index].productName = e.target.value;
    setSaveTransferTableArray(clone);
  };
  const handleChangeSerialNumber = (e) => {
    const clone = [...saveTransferTableArray];
    // console.log(clone);
    clone[index].serialNumber = e.target.value;
    setSaveTransferTableArray(clone);
  };
  const handleChangeHostSector= (e) => {
    const clone = [...saveTransferTableArray];
    // console.log(clone);
    clone[index].hostSector = e.target.value;
    setSaveTransferTableArray(clone);
  };

  return (
    <div
      className={` p-2 grid grid-cols-14 justify-center items-center gap-4 h-16 text-xs bg-white`}
    >
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <div className="col-span-3 ">
        <Selector
          state={saveTransferTableArray}
          setState={setSaveTransferTableArray}
          index={index}
          id={"เลขครุภัณฑ์"}
          placeholder={"เลขครุภัณฑ์"}
        />
      </div>
      <div className="col-span-3 ">
        <Selector
          state={saveTransferTableArray}
          setState={setSaveTransferTableArray}
          index={index}
          id={"ชื่อครุภัณฑ์"}
          placeholder={"ชื่อครุภัณฑ์"}
        />
      </div>
      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        onChange={handleChangeSerialNumber}
        value={
          saveTransferTableArray &&
          saveTransferTableArray[index]?.serialNumber
        }
      />
      <input
        className="col-span-3 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        onChange={handleChangeHostSector}
        value={
          saveTransferTableArray &&
          saveTransferTableArray[index]?.hostSector
        }
      />
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => {
            deleteRow(index);
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default RowofTableSaveTransfer;
