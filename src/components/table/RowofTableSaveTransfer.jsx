import { HiTrash } from "react-icons/hi";
import {
  getByProductSelector,
  getByAssetNumberSelector,
} from "../../api/assetApi";
import { useEffect } from "react";
import { useState } from "react";
import SearchSelector from "../selector/SearchSelector";

function RowofTableSaveTransfer({
  index,
  saveTransferTableArray,
  setSaveTransferTableArray,
  deleteRow,
  modeEdit,
  error,
  assetList,
  productList,
  callbackList
}) {

  // useEffect(() => {
  //   fetchList()
  // }, [])
  const ele = saveTransferTableArray[index]
  const [search, setSearch] = useState({
    assetNumber: ele.assetNumber || "",
    productName: ele.productName || "",
  });
  // const [assetList, setAssetList] = useState([])
  // const [productList, setProductList] = useState([])

  // const fetchList = async () => {
  //   const resAssetNumber = await getByAssetNumberSelector(search.assetNumber)
  //   const arrAsset = []
  //   resAssetNumber.data.asset.map(ele => {
  //     arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
  //   })
  //   if (modeEdit) {
  //     // saveTransferTableArray.forEach(ele => {
  //     //   arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
  //     // })
  //   }
  //   setAssetList(arrAsset)

  //   const resProduct = await getByProductSelector(search.productName)
  //   const arrProduct = []
  //   resProduct.data.asset.map(ele => {
  //     arrProduct.push({ label: ele._id, value: ele._id, ele: ele.results })
  //   })
  //   setProductList(arrProduct)

  //   // console.log( assetList?.find(list => list.value == search.assetNumber))
  //   assetList?.find(list => console.log(list.value, search.assetNumber))
  // }

  const handleNumber = async (value, label, ele) => {
    const clone = { ...search };
    clone.assetNumber = value || ""
    if (value) {
      clone.productName = ele?.productName
      clone.serialNumber = ele?.serialNumber
    }
    setSearch(clone);
    const val = saveTransferTableArray[index]
    saveTransferTableArray[index] = {
      ...clone,
      sector: ele?.sector || val.sector,
      quantity: 1,
      unit: ele?.unit || val.unit,
      isFetching: false
    }

    // const resProduct = await getByProductSelector(search)
    // const arrProduct = []
    // resProduct.data.asset.map(ele => {
    //   arrProduct.push({ label: ele._id, value: ele._id })
    // })
    callbackList()
  }

  const handleName = async (value, label, ele) => {
    const clone = { ...search };
    clone.productName = value || ""
    if (!value) {
      clone.assetNumber = ""
      clone.serialNumber = ""
    }
    setSearch(clone);
    fetchList()

    saveTransferTableArray[index] = {
      ...clone,
      sector: ele ? ele[0].sector : "",
      quantity: value ? 1 : "",
      unit: ele ? ele[0].unit : "",
      //  isFetching: false
    }
    console.log(saveTransferTableArray[index], '*********')
    callbackList()
  }

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
          value={modeEdit && ele.assetNumber && { label: ele.assetNumber, value: ele.assetNumber }}
        />
      </div>
      <div className="col-span-3 ">
        <SearchSelector
          id="ชื่อครุภัณฑ์"
          name="productName"
          options={productList}
          onChange={handleName}
          error={error && !ele.productName}
          value={(ele.productName) && { label: ele.productName, value: ele.productName }}
        />
      </div>
      {modeEdit &&
        <input
          className="col-span-2 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={
            saveTransferTableArray &&
            ele?.serialNumber
          }
        />
      }
      <input
        className="col-span-3 bg-table-gray px-2 flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        disabled
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
