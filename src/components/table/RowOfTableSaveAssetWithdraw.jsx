import { HiTrash } from "react-icons/hi";
import Selector from "../selector/Selector";

function RowOfTableSaveAssetWithdraw({
  index,
  saveAssetWithdrawTableArray,
  setSaveAssetWithdrawTableArray,
  deleteRow,
}) {
  const handleChangeInventoryNumber = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].inventoryNumber = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangeProductName = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].productName = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangeBrand = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].brand = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangeSerialNumber = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].serialNumber = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangeSupplier = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].supplier = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangeAmount = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].amount = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };
  const handleChangePrice = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index].price = e.target.value;
    setSaveAssetWithdrawTableArray(clone);
  };

  return (
    <div
      className={`grid grid-cols-23 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
    >
      <div className="ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <div className="col-span-3 ">
        <Selector placeholder={"เลขครุภัณฑ์"}/>
      </div>
      {/* <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        onChange={handleChangeInventoryNumber}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.inventoryNumber
        }
      /> */}
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        onChange={handleChangeProductName}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.productName
        }
      />
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        onChange={handleChangeBrand}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.brand
        }
      />
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        onChange={handleChangeSerialNumber}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.serialNumber
        }
      />
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        onChange={handleChangeSupplier}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.supplier
        }
      />
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        placeholder="xxxx"
        onChange={handleChangeAmount}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.amount
        }
      />
      <input
        className="col-span-3 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue mr-2"
        placeholder="xxxx.xx"
        onChange={handleChangePrice}
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.price
        }
      />

      <button
        className="-ml-2 flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 px-2 py-2 "
        onClick={() => {
          deleteRow(index);
        }}
      >
        <HiTrash className="text-lg" />
      </button>
    </div>
  );
}

export default RowOfTableSaveAssetWithdraw;
