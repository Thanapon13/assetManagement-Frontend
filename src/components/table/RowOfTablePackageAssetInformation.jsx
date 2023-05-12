import Selector from "../selector/Selector";
import ScanDropdown from "../dropdown/ScanDropdown";
import { useEffect, useState } from "react";
import { getSector } from "../../api/masterApi";
import SearchSelector from "../selector/SearchSelector";

function RowOfTablePackageAssetInformation({
  index,
  genData,
  setGenData,
  error,
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
  sectorList,
  assetList,
}) {

  const onChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const [sectorList, setSectorList] = useState([])
  // useEffect(() => {
  //   const getMasterData = async () => {
  //     const sector = await getSector()
  //     const array = []
  //     sector.data.sector.map(ele => {
  //       array.push({ label: ele.name, value: ele.name })
  //     })
  //     setSectorList(array)
  //   }

  //   getMasterData()
  // }, [])

  const handleSelect = (value, label) => {
    const clone = [...genData];
    clone[index] = { ...genData[index], [label]: value || ""}
    setGenData(clone)
  }

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
          <SearchSelector
            options={sectorList}
            name="sector"
            onChange={handleSelect}
            error={error && !genData[index]?.sector}
            noClearButton
          />
        </div>

        <div className="col-span-4">
          <SearchSelector
            options={assetList}
            name="replacedAssetNumber"
            onChange={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default RowOfTablePackageAssetInformation;
