import { HiTrash } from "react-icons/hi";
import {
  getByProductSelector,
  getByAssetNumberSelector,
} from "../../api/assetApi";
import { useEffect } from "react";
import { useState } from "react";
import { getBuildingData } from "../../api/masterApi";
import SearchSelector from "../selector/SearchSelector";

function RowofTableSaveTransfer({
  index,
  saveTransferTableArray,
  setSaveTransferTableArray,
  deleteRow,
  modeEdit,
  error
}) {

  useEffect(() => {
    fetchList()
    console.log(saveTransferTableArray)
  }, [])
  const ele = saveTransferTableArray[index]
  const [search, setSearch] = useState({
    assetNumber: ele.assetNumber || "",
    productName: ele.productName || "",
  });
  const [assetList, setAssetList] = useState([])
  const [productList, setProductList] = useState([])

  const fetchList = async () => {
    const resAssetNumber = await getByAssetNumberSelector(search.assetNumber)
    const arrAsset = []
    resAssetNumber.data.asset.map(ele => {
      console.log(ele)
      arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
    })
    if(modeEdit) {
      // saveTransferTableArray.forEach(ele => {
      //   arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
      // })
    }
    setAssetList(arrAsset)

    const resProduct = await getByProductSelector(search.productName)
    const arrProduct = []
    resProduct.data.asset.map(ele => {
      console.log(ele)
      arrProduct.push({ label: ele._id, value: ele._id, ele: ele.results })
    })
    setProductList(arrProduct)
    console.log(saveTransferTableArray, search)

    // console.log( assetList?.find(list => list.value == search.assetNumber))
    assetList?.find(list => console.log(list.value, search.assetNumber))
  }

  const handleNumber = async (value,label) => {
    const clone = { ...search };
    clone.assetNumber = e.value;
    clone.productName = e.ele.productName;
    clone.serialNumber = e.ele.serialNumber;
    console.log(e.ele)
    setSearch(clone);
    saveTransferTableArray[index] = {
      ...clone,
      sector: e.ele.sector,
      quantity: 1,
      unit: e.ele.unit,
      isFetching: false
    }

    const resProduct = await getByProductSelector(search)
    const arrProduct = []
    resProduct.data.asset.map(ele => {
      arrProduct.push({ label: ele._id, value: ele._id })
    })
  }
  const handleName = async (value,label) => {
    const clone = { ...search };
    clone.productName = e.value;
    // console.log(clone)
    // console.log(e.ele)
    setSearch(clone);
    fetchList()
    saveTransferTableArray[index] = {
      ...clone,
      sector: e.ele[0].sector,
      quantity: 1,
      unit: e.ele[0].unit,
      //  isFetching: false
    }
  }

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
  const handleChangeHostSector = (e) => {
    const clone = [...saveTransferTableArray];
    // console.log(clone);
    clone[index].hostSector = e.target.value;
    setSaveTransferTableArray(clone);
  };
  // console.log(saveTransferTableArray)
  return (
    <div
      className={` p-2 grid grid-cols-13 justify-center items-center gap-4 h-16 text-xs bg-white`}
    >
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <div className="col-span-3 ">
        {/* <Select
          options={assetList}
          onChange={handleNumber}
          id="เลขครุภัณฑ์"
          name="assetNumber"
          menuPosition="fixed"
          value={modeEdit ? { label: ele.assetNumber, value: ele.assetNumber } : assetList?.find(list => list.value == ele.assetNumber)}
        /> */}
        <SearchSelector
          id="เลขครุภัณฑ์"
          name="assetNumber"
          options={assetList}
          onChange={handleNumber}
          // error={error && !ele.assetNumber}
          // value={ele.assetNumber}
          value={modeEdit && { label: ele.assetNumber, value: ele.assetNumber } }

        />
        {/* {ele.assetNumber} */}
      </div>
      <div className="col-span-3 ">
        <SearchSelector
          id="ชื่อครุภัณฑ์"
          name="productName"
          options={productList}
          onChange={handleName}
          error={error && !ele.productName}
          value={modeEdit && { label: ele.productName, value: ele.productName }}

        />
      </div>
      {modeEdit &&
        <input
          className="col-span-2 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          onChange={handleChangeSerialNumber}
          value={
            saveTransferTableArray &&
            ele?.serialNumber
          }
        />
      }
      <input
        className="col-span-3 bg-table-gray px-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
        onChange={handleChangeSerialNumber}
        value={
          saveTransferTableArray &&
          ele?.hostSector || ele?.sector
        }
      />
      {!modeEdit &&
        <>
          <input
            className="col-span-1 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled={!ele.productName}
            value={
              saveTransferTableArray &&
              ele?.quantity
            }
          />
          <input
            className="col-span-1 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
            disabled
            value={
              saveTransferTableArray &&
              ele?.unit
            }
          />
        </>
      }
      <div className="flex justify-center items-center col-span-1">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={() => {
            console.log(index)
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
