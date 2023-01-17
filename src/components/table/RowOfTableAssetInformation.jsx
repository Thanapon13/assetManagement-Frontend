import { HiTrash } from "react-icons/hi";
import Selector from "../selector/Selector";
import barcodeReader from "../../public/pics/barcodeReader.png"

function RowOfTableAssetInformation({
  index,
  saveAssetWithdrawTableArray,
  setSaveAssetWithdrawTableArray,
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
      className={`grid grid-cols-13 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
    >
      <div className="ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <input
        className="col-span-4 bg-gray-200 text-center flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.inventoryNumber
        }
      />
      <input
        className="col-span-4 bg-gray-200 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.productName
        }
      />
      <div className="flex relative col-span-4">
        <input
          className="w-full text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          onChange={handleChangeSerialNumber}
          value={
            saveAssetWithdrawTableArray &&
            saveAssetWithdrawTableArray[index]?.serialNumber
          }
        />
        <button
          className=" absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-1 focus:rounded focus:ring-green-800"
          // onClick={() => setToggle(!toggle)}
        >
          {/* {toggle ? (
            <AiOutlineEyeInvisible className="text-text-green" />
          ) : (
            <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
          )} */}
          <img src={barcodeReader} />
        </button>
      </div>
    </div>
  );
}

export default RowOfTableAssetInformation;
