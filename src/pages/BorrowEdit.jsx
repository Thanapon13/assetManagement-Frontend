import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import { FaArrowLeft } from "react-icons/fa";
import { getBorrowById, updateBorrow } from "../api/borrowApi";
import OnlyDateInput from "../components/date/onlyDateInput";

const BorrowEdit = () => {
  const { borrowId } = useParams();
  const [countRow, setCountRow] = useState(1);

  const [input, setInput] = useState({
    // ข้อมูลการยืม
    borrowIdDoc: 1,
    pricePerDay: 0,
    borrowDate: new Date(),
    borrowSetReturnDate: "",
    // รายละเอียดผู้ยืม
    sector: "",
    subSector: "",
    borrowPurpose: "",
    handler: "",
    // สถานที่ตั้งใหม่
    building: "",
    floor: "",
    room: "",

    firstName_recorder: "paruj lab",
    lastName_recorder: "paruj lab",
    dateTime_recorder: "",
    firstName_courier: "",
    lastName_courier: "",
    dateTime_courier: "",
    firstName_approver: "",
    lastName_approver: "",
    dateTime_approver: "",
    status: "not approve",
  });
  const [countIndexArray, setCountIndexArray] = useState([0]);

  const [saveAssetWithdrawTableArray, setSaveAssetWithdrawTableArray] =
    useState([
      {
        index: 0,
        assetNumber: "",
        productName: "",
        brand: "",
        amount: "",
        unit: "",
        pricePerUnit: "",
        maxQuantity: 0,
        isPackage: false,
        isFetching:false
      },
    ]);

    const [deleteAssetArray,setDeleteAssetArray] = useState([])

  //handle bottom table
  const handleClickIncrease = (e) => {
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...saveAssetWithdrawTableArray];
    const newCloneArray = {
      index: countRow,
      assetNumber: "",
      productName: "",
      brand: "",
      amount: "",
      unit: "",
      pricePerUnit: "",
      maxQuantity: 0,
      isPackage: false,
      isFetching:false
    };
    setSaveAssetWithdrawTableArray([...clone, newCloneArray]);
  };

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1);
    }

    let clone = [...saveAssetWithdrawTableArray];
    let deleteOneRow = clone.splice(index, 1);
    console.log(deleteOneRow[0]);
    setDeleteAssetArray([...deleteAssetArray,deleteOneRow[0]])
    console.log([...deleteAssetArray,deleteOneRow[0]])
    setSaveAssetWithdrawTableArray(clone);
  };

  const handleChange = (e) => {
    const clone = { ...input };
    clone[e.target.name] = e.target.value;
    setInput(clone);
  };

  function sortArray(dataArray) {
    // Filter objects with assetNumber !== ""
    const objectsWithAssetNumber = dataArray.filter(
      (obj) => obj.assetNumber !== ""
    );

    // Sort objectsWithAssetNumber by index
    objectsWithAssetNumber.sort((a, b) => a.index - b.index);

    // Filter objects with assetNumber === ""
    const objectsWithoutAssetNumber = dataArray.filter(
      (obj) => obj.assetNumber === ""
    );

    // Sort objectsWithoutAssetNumber by index
    objectsWithoutAssetNumber.sort((a, b) => a.index - b.index);

    // Concatenate the two arrays
    const sortedDataArray = objectsWithAssetNumber.concat(
      objectsWithoutAssetNumber
    );

    // Return the sorted array
    return sortedDataArray;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputJSON = JSON.stringify(input);
    console.log(saveAssetWithdrawTableArray);
    const sortsaveAssetWithdrawTableArray = sortArray(
      saveAssetWithdrawTableArray
    );
    const saveAssetWithdrawTableArrayJSON = JSON.stringify(
      sortsaveAssetWithdrawTableArray
    );

    const deleteAssetArrayJSON = JSON.stringify(deleteAssetArray)
    await updateBorrow({
      input: inputJSON,
      saveAssetWithdrawTableArray: saveAssetWithdrawTableArrayJSON,
      deleteAssetArray:deleteAssetArrayJSON
    },borrowId);
  };

  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        const res = await getBorrowById(borrowId);
        console.log(res.data.borrow);
        const borrow = res.data.borrow;

        setInput({
          // ข้อมูลการยืม
          borrowIdDoc: borrow.borrowIdDoc,
          pricePerDay: borrow.pricePerDay,
          borrowDate: borrow.borrowDate,
          borrowSetReturnDate: borrow.borrowSetReturnDate,
          // รายละเอียดผู้ยืม
          sector: borrow.sector,
          subSector: borrow.subSector,
          borrowPurpose: borrow.borrowPurpose,
          handler: borrow.handler,
          // สถานที่ตั้งใหม่
          building: borrow.building,
          floor: borrow.floor,
          room: borrow.room,

          firstName_recorder: borrow.firstName_recorder,
          lastName_recorder: borrow.lastName_recorder,
          dateTime_recorder: new Date(borrow.dateTime_recorder),
          firstName_courier: borrow.firstName_courier,
          lastName_courier: borrow.lastName_courier,
          dateTime_courier:
            borrow.dateTime_courier === ""
              ? new Date()
              : new Date(borrow.dateTime_courier),
          firstName_approver: borrow.firstName_approver,
          lastName_approver: borrow.lastName_approver,
          dateTime_approver:
            borrow.dateTime_approver === ""
              ? new Date()
              : new Date(borrow.dateTime_approver),
          status: borrow.status,
        });

        const assetData = borrow.assets.map((asset, index) => ({
          index: index,
          assetNumber: asset.assetNumber,
          productName: asset.productName,
          brand: asset.brand,
          amount:1,
          unit: asset.unit,
          pricePerUnit: asset.pricePerUnit,
          maxQuantity: 1,
          isPackage: false,
          isFetching:true
        }));
      
        const packageAssetData = borrow.packageAssets.map((packageAsset, index) => ({
          index: index + borrow.assets.length,
          assetNumber: packageAsset.assetNumber,
          productName: packageAsset.productName,
          brand: packageAsset.brand,
          amount: 1,
          unit: packageAsset.unit,
          pricePerUnit: packageAsset.pricePerUnit,
          maxQuantity: 1,
          isPackage: true,
          isFetching:true
        }));

        const saveData = [...assetData, ...packageAssetData]
        setCountRow(saveData.length)
      
        setSaveAssetWithdrawTableArray(saveData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAssetById();
  }, []);

  useEffect(() => {
    // Calculate the total price of all items in saveAssetWithdrawTableArray
    const totalPrice = saveAssetWithdrawTableArray.reduce(
      (acc, cur) => acc + +cur.pricePerUnit * +cur.amount,
      0
    );
    let diffDays = 1;
    if (input.borrowSetReturnDate) {
      const diffTime = Math.abs(
        new Date(input.borrowSetReturnDate).getTime() -
          new Date(input.borrowDate)?.getTime()
      );
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Update the pricePerDay key in the input state with the total price
    setInput((prevState) => ({
      ...prevState,
      pricePerDay: totalPrice / diffDays,
    }));
  }, [saveAssetWithdrawTableArray, input]);

  return (
    <>
    <form>
      {/* body */}
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div className="text-2xl text-text-green flex items-center space-x-5 ">
          <Link to={`/borrowList`}>
            <FaArrowLeft className="text-gray-400" />
          </Link>
          <h1>แก้ไขใบยืมครุภัณฑ์</h1>
        </div>
        <div className="flex pt-3">
          {/* left home */}
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <Link
              to="/borrowList"
              className=" text-text-green ml-2 underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              รายการ ยืม-คืน
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">แก้ไขใบยืมครุภัณฑ์</div>
          </div>
        </div>
        {/* ข้อมูลการยืมครุภัณฑ์ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
          <div className="text-xl">ข้อมูลการยืมครุภัณฑ์</div>
          {/* Row 1 เลขที่เอกสารการยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                เลขที่เอกสารการยืม
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ราคายืม (ต่อวัน)</label>
              <input
                type="text"
                placeholder="Example"
                readOnly
                value={input.pricePerDay}
                className="bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
          {/* Row 2 วันที่ยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วันที่ยืม</label>
              <OnlyDateInput
                id={"borrowDate"}
                state={input}
                setState={setInput}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">กำหนดส่งคืน</label>
              <OnlyDateInput
                id={"borrowSetReturnDate"}
                state={input}
                setState={setInput}
              />
            </div>
          </div>
        </div>
        {/* รายการครุภัณฑ์ที่เลือก */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
          <div className="text-xl">รายการครุภัณฑ์ที่เลือก</div>
          {/* table */}
          <div className="overflow-x-auto scrollbar pt-4">
            <div className="w-[1000px] lg:w-full p-2 ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-12 gap-2 text-center">
                  <div className="ml-2 col-span-1 ">ลำดับ</div>
                  <div className="col-span-2">เลขครุภัณฑ์</div>
                  <div className="col-span-3">ชื่อครุภัณฑ์</div>
                  <div className="col-span-2">ยี่ห้อ/รุ่น/ขนาด</div>
                  <div className="col-span-3 grid grid-cols-4 gap-5">
                    <div className="col-span-1">จำนวน</div>
                    <div className="col-span-1">หน่วยนับ</div>
                    <div className="col-span-2">จำนวนเงิน (บาท)</div>
                  </div>
                </div>
              </div>
              {saveAssetWithdrawTableArray?.map((el, idx) => {
                return (
                  <TableBorrowRecord
                    key={idx}
                    index={idx}
                    saveAssetWithdrawTableArray={saveAssetWithdrawTableArray}
                    setSaveAssetWithdrawTableArray={
                      setSaveAssetWithdrawTableArray
                    }
                    deleteRow={deleteRow}
                  />
                );
              })}
              <button
                type="button"
                className="w-full h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                onClick={handleClickIncrease}
              >
                + เพิ่มครุภัณฑ์
              </button>

              <div className="h-[24px]"></div>
            </div>
          </div>
        </div>
        {/* รายละเอียดผู้ยืม */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">รายละเอียดผู้ยืม</div>
          {/* Row 1 หน่วยงาน */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  หน่วยงาน
                  <h1 className="text-red-500 ml-2 font-bold">*</h1>
                </label>
              </div>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"หน่วยงาน"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-text-gray">ภาควิชา</label>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ภาควิชา"}
              />
            </div>
          </div>
          {/* Row 2 วัตถุประสงค์การขอยืม */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">วัตถุประสงค์การขอยืม</label>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"วัตถุประสงค์การขอยืม"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray">ผู้ดำเนินการ</label>
              <input
                type="text"
                placeholder="Example"
                name="handler"
                value={input.handler}
                onChange={handleChange}
                className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>
        {/* สถานที่ตั้งใหม่ */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
          <div className="text-xl">สถานที่ตั้งใหม่</div>
          {/* Row 1 ชื่อ */}
          <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className=" text-text-gray flex">
                อาคาร
                <h1 className="text-red-500 ml-2 font-bold">*</h1>
              </label>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"อาคาร"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-1">
              <label className="text-text-gray">ชั้น</label>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ชั้น"}
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-1">
              <label className="text-text-gray">ห้อง</label>
              <Selector
                placeholder={"Select"}
                state={input}
                setState={setInput}
                id={"ห้อง"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="bottom-0 bg-white  flex justify-end items-center gap-10 p-3 text-sm mr-3 ">
        <button
          type="button"
          className="border-[2px] hover:bg-gray-100 text-black text-sm rounded-md p-2"
        >
          ยกเลิก
        </button>
        <button
        type="submit"
        className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md p-2"
        onClick={handleSubmit}
        >
          บันทึกขอยืมครุภัณฑ์
        </button>
      </div>
      </form>
    </>
  );
};

export default BorrowEdit;
