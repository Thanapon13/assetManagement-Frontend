import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import { useEffect } from "react";

function RowOfTablePackageAssetInformation({
  index,
  genData,
  setGenData,
  errorAssestTable,
  scanBarcodeModal,
  scanQRCodeModal,
  setScanBarcodeModal,
  setScanQRCodeModal,
  setIndexGenData,
  indexGenData,
  barcode,
  setBarcode,
  qr,
  setQr,
}) {

  const onChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div
        className={`grid grid-cols-17 justify-center items-center gap-4 h-16 py-1 text-xs bg-white`}
      >
        <div className="ml-2 text-center flex justify-center items-center ">
          <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
            {index + 1}
          </div>
        </div>

        <input
          className="col-span-4 bg-gray-200 text-center flex justify-center items-center  py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={genData && genData[index]?.assetNumber}
        />
        <input
          className="col-span-4 bg-gray-200 text-left flex justify-center items-center p-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={genData && genData[index]?.productName}
        />

        <div className="col-span-4">
          <div className="flex h-[38px] ">
            <Selector
              placeholder={"Select"}
              index={index}
              state={genData}
              setState={setGenData}
              id={"หน่วยงาน"}
              isValid={errorAssestTable && !genData[index]?.sector}
            />
          </div>
        </div>

        <div className="col-span-4">
          <div className="flex h-[38px] ">
            <Selector
              placeholder={"Select"}
              index={index}
              state={genData}
              setState={setGenData}
              id={"แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"}
              isValid={errorAssestTable && !genData[index]?.replacedAssetNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowOfTablePackageAssetInformation;
