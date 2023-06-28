import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import {
  getByProductSelector,
  getByAssetNumberSelector,
} from "../../api/assetApi";
import AssetNumberSelector from "../selector/AssetNumberSelector";
import ProductNameSelector from "../selector/ProductNameSelector";
import { ToastContainer, toast } from "react-toastify";
import SearchSelector from "../selector/SearchSelector";

function TableBorrowRecord({
  index,
  saveAssetWithdrawTableArray,
  setSaveAssetWithdrawTableArray,
  errorAssestTable,
  deleteRow,
  assetList,
  productList,
  callbackList
}) {
  const [dataProductName, setDataProductName] = useState([]);
  const [dataAssetNumber, setDataAssetNumber] = useState([]);

  const [search, setSearch] = useState({
    assetNumber: "",
    productName: "",
  });

  function filterAssetByProductName(productName) {
    let filtered = {};
    console.log(productName);
    for (let i = 0; i < dataProductName.length; i++) {
      if (dataProductName[i]._id === productName) {
        console.log(dataProductName[i]);
        return dataProductName[i];
      }
    }
    // return null; // if no matching object is found
  }

  function filterAssetByAssetNumber(assetNumber) {
    let filtered = {};
    console.log(assetNumber);
    for (let i = 0; i < dataAssetNumber.length; i++) {
      console.log(dataAssetNumber[i].assetNumber);
      if (dataAssetNumber[i].assetNumber === assetNumber) {
        console.log(dataAssetNumber[i]);
        return dataAssetNumber[i];
      }
    }
    // return null; // if no matching object is found
  }

  const checkMaxQuantity = (productName, maxQuantity) => {
    let sumAmounts = 0;
    saveAssetWithdrawTableArray.forEach((item) => {
      if (item.productName === productName && item.isFetching === false) {
        sumAmounts += parseInt(item.amount);
      }
    });
    // console.log(sumAmounts);
    // console.log(maxQuantity)
    if (sumAmounts > maxQuantity) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    const clone = [...saveAssetWithdrawTableArray];
    // console.log(clone);
    clone[index][e.target.name] = e.target.name === "amount" ? parseInt(e.target.value) : e.target.value;
    // console.log(e.target.value)
    // console.log(saveAssetWithdrawTableArray[index].maxQuantity)

    const invalid = checkMaxQuantity(
      clone[index].productName,
      clone[index].maxQuantity
    );
    // console.log(invalid,"invalid");

    if (
      e.target.name === "amount" &&
      e.target.value > saveAssetWithdrawTableArray[index].maxQuantity
    ) {
      toast.warn(
        `Cannot set quantity of ${saveAssetWithdrawTableArray[index].productName} more than ${saveAssetWithdrawTableArray[index].maxQuantity} !`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      clone[index].amount = "";
    } else if (invalid) {
      toast.warn(
        `Cannot set quantity of ${saveAssetWithdrawTableArray[index].productName} more than ${saveAssetWithdrawTableArray[index].maxQuantity} !`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      clone[index].amount = "";
    }

    setSaveAssetWithdrawTableArray(clone);
  };

  // fetch all data asset
  const fetchAssetListByProductName = async () => {
    try {
      const resAssetNumber = await getByAssetNumberSelector(search);
      // console.log(resAssetNumber.data.asset);
      setDataAssetNumber(resAssetNumber.data.asset);
    } catch (err) {
      console.log(err);
    }
  };

  // // fetch all data asset
  // const fetchAssetList = async () => {
  //   try {
  //     const res = await getByProductSelector(search);
  //     console.log(res.data.asset);
  //     setDataProductName(res.data.asset);
  //     const resAssetNumber = await getByAssetNumberSelector(search);
  //     console.log(resAssetNumber.data.asset);
  //     setDataAssetNumber(resAssetNumber.data.asset);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchAssetList();
  // }, []);

  useEffect(() => {
    fetchAssetListByProductName(search);
  }, [search.productName]);

  const ele = saveAssetWithdrawTableArray[index]

  const handleNumber = async (value, label, ele) => {
    const clone = { ...search };
    clone.assetNumber = value || ""
    if (value) {
      clone.productName = ele?.productName
      clone.serialNumber = ele?.serialNumber
    }
    setSearch(clone);
    const val = saveAssetWithdrawTableArray[index]
    saveAssetWithdrawTableArray[index] = {
      ...clone,
      sector: ele?.sector || val.sector,
      quantity: 1,
      unit: ele?.unit || val.unit,
      isFetching: false
    }

    console.log(saveAssetWithdrawTableArray)
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
    // fetchList()

    saveAssetWithdrawTableArray[index] = {
      ...clone,
      sector: ele ? ele[0].sector : "",
      quantity: value ? 1 : "",
      unit: ele ? ele[0].unit : "",
      //  isFetching: false
    }
    console.log(saveAssetWithdrawTableArray[index], '*********')
    callbackList()
  }

  return (
    <div
      className={` p-2 grid grid-cols-14 justify-center items-center gap-x-4 text-xs bg-white`}
    >
      <div className="col-span-1 ml-2 text-center flex justify-center items-center ">
        <div className=" flex justify-center items-center bg-gray-200 rounded-full w-6 h-6 px-2 py-2">
          {index + 1}
        </div>
      </div>

      <div className="col-span-3 ">
      <SearchSelector
          id="เลขครุภัณฑ์"
          name="assetNumber"
          options={assetList}
          onChange={handleNumber}
          // error={error && !ele.assetNumber}
          value={ele.assetNumber && { label: ele.assetNumber, value: ele.assetNumber }}
        />
        {/* <AssetNumberSelector
          placeholder={"Select"}
          state={saveAssetWithdrawTableArray}
          setState={setSaveAssetWithdrawTableArray}
          data={dataAssetNumber}
          id={"assetNumber"}
          index={index}
          filterAssetByAssetNumber={filterAssetByAssetNumber}
          disabled={
            saveAssetWithdrawTableArray[index].amount > 1
              ? false
              // : saveAssetWithdrawTableArray[index].isFetching
              //   ? false
                : true
          }
          search={search}
          setSearch={setSearch}
          errors={errorAssestTable}
        /> */}
      </div>
      <div className="col-span-3 ">
      <SearchSelector
          id="ชื่อครุภัณฑ์"
          name="productName"
          options={productList}
          onChange={handleName}
          // error={error && !ele.productName}
          value={(ele.productName) && { label: ele.productName, value: ele.productName }}
        />
        {/* <ProductNameSelector
          placeholder={"Select"}
          state={saveAssetWithdrawTableArray}
          setState={setSaveAssetWithdrawTableArray}
          id={"productName"}
          data={dataProductName}
          index={index}
          filterAssetByProductName={filterAssetByProductName}
          disabled={
            search.assetNumber !== ""
              ? false
              // : saveAssetWithdrawTableArray[index].isFetching
              //   ? false
                : true
          }
          search={search}
          setSearch={setSearch}
          errors={errorAssestTable}
        /> */}
      </div>
      <input
        className="col-span-2 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
        id="brand"
        disabled
        value={
          saveAssetWithdrawTableArray &&
          saveAssetWithdrawTableArray[index]?.brand
        }
      />
      {/* <div className="col-span-3 grid grid-cols-4 gap-5"> */}
        <input
          className={`${errorAssestTable && !saveAssetWithdrawTableArray[index]?.amount && 'border-red-500'} border-gray-300 text-sm col-span-1 text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue`}
          name="amount"
          type="text" inputmode="numeric"
          min="0"
          // required
          disabled={
            saveAssetWithdrawTableArray[index]?.isFetching === true
              ? true
              : search.assetNumber === ""
                ? false
                : true
          }
          onChange={handleChange}
          value={
            saveAssetWithdrawTableArray &&
            saveAssetWithdrawTableArray[index]?.amount?.toLocaleString()
          }
          placeholder={saveAssetWithdrawTableArray[index]?.maxQuantity}
        />
        <input
          className="col-span-1 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          id="unit"
          disabled
          value={
            saveAssetWithdrawTableArray &&
            saveAssetWithdrawTableArray[index]?.unit
          }
        />
        <input
          className="col-span-2 bg-table-gray text-center flex justify-center items-center py-2 border-[1px] border-block-green rounded focus:border-2 focus:outline-none  focus:border-focus-blue"
          disabled
          value={
            saveAssetWithdrawTableArray &&
            saveAssetWithdrawTableArray[index]?.pricePerUnit?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        />
      {/* </div> */}
      <div className="flex justify-center items-center">
        <button
          className="flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 "
          onClick={(e) => {
            e.preventDefault();
            deleteRow(index);
          }}
        >
          <HiTrash className="text-lg" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TableBorrowRecord;
