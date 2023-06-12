import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import { FaArrowLeft } from "react-icons/fa";
import { getBorrowById, updateBorrow } from "../api/borrowApi";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { Spinner } from "flowbite-react";
import { BsArrowLeft } from "react-icons/bs";
import SearchSelector from "../components/selector/SearchSelector";
import { getBuildingData, getPurposeOfUse, getSector, getSubsector } from "../api/masterApi";

const BorrowEdit = () => {
  const { borrowId } = useParams();
  const [countRow, setCountRow] = useState(0);

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
  });

  const [sectorList, setSectorList] = useState([])
  const [subSectorList, setSubSectorList] = useState([])
  const [purposeOfUseList, setPurposeOfUseList] = useState([])
  const [buildingList, setBuildingList] = useState()
  const [floorList, setFloorList] = useState()
  const [roomList, setRoomList] = useState()

  useEffect(() => {
    getMasterData()
  }, [])

  const getMasterData = async () => {
    const sector = await getSector()
    const arrSector = formArrayOption(sector.data.sector)
    setSectorList(arrSector)
    const subSector = await getSubsector()
    const arrSubSector = formArrayOption(subSector.data.subSector)
    setSubSectorList(arrSubSector)
    const purposeOfUse = await getPurposeOfUse()
    const arrPurposeOfUse = formArrayOption(purposeOfUse.data.purposeOfUse)
    setPurposeOfUseList(arrPurposeOfUse)
    const building = await getBuildingData()
    const arrBuilding = formArrayOption(building.data)
    setBuildingList(arrBuilding)
  }

  const handleSelect = (value, label, ele) => {
    setInput({ ...input, [label]: value })
  }

  function formArrayOption(data) {
    const array = []
    data.map(ele => {
      array.push({ label: ele.name, value: ele.name, ele: ele })
    })
    return array
  }

  useEffect(() => {
    buildingList?.map((list) => {
      if (list.value == input.building) {
        const floors = []
        list.ele.floors.forEach(floor => {
          floors.push({ label: floor.name, value: floor.name, ele: floor })
        })
        setFloorList(floors)
      }
    })
    handleSelect({ value: "" }, { name: "floor" })
    handleSelect({ value: "" }, { name: "room" })
  }, [input.building])

  useEffect(() => {
    floorList?.map((list) => {
      if (list.value == input.floor) {
        const rooms = []
        list.ele.rooms.forEach(room => {
          rooms.push({ label: room.name, value: room.name })
        })
        setRoomList(rooms)
      }
    })
    handleSelect({ value: "" }, { name: "room" })
  }, [input.floor])

  const [countIndexArray, setCountIndexArray] = useState([0]);

  const [saveAssetWithdrawTableArray, setSaveAssetWithdrawTableArray] = useState([]);
  const newSaveAssetWithdrawTableArray = {
    index: countRow,
    assetNumber: "",
    productName: "",
    brand: "",
    amount: "",
    unit: "",
    pricePerUnit: "",
    maxQuantity: 0,
    isPackage: false,
  };

  const [deleteAssetArray, setDeleteAssetArray] = useState([])
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
      isFetching: false
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
    setDeleteAssetArray([...deleteAssetArray, deleteOneRow[0]])
    console.log([...deleteAssetArray, deleteOneRow[0]])
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

  const [errorInput, setErrorInput] = useState(false)
  const [errorAssestTable, setErrorAssestTable] = useState(false)
  //Modal
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const handleForm = () => {
    let errInput, errAssetTable
    Object.values(input).map((value, index) => {
      if (errInput) return
      if (!value) errInput = true
    })
    if (!saveAssetWithdrawTableArray.length) {
      setSaveAssetWithdrawTableArray([newSaveAssetWithdrawTableArray])
      errAssetTable = true
    }
    saveAssetWithdrawTableArray.map(list => {
      Object.entries(list).forEach(([key, value], index) => {
        if (errAssetTable || key === "isPackage" || key === "index") return
        if (!value) errAssetTable = true
      })
    })
    setErrorInput(errInput)
    setErrorAssestTable(errAssetTable)
    console.log(errAssetTable, deleteAssetArray);
    // if (!(errInput || errAssetTable))
    setShowModalConfirm(true)
  }

  const handleSubmit = async () => {
    // const user = await getUserInfo
    const inputs = {
      ...input,
      name_recorder: "userTestEdit", //
      // dateTime_recorder: new Date(dataBorrow.dateTime_recorder) || "",
      // name_courier: dataBorrow.name_courier || "",
      // dateTime_courier: new Date(dataBorrow.dateTime_courier) || "",
      // name_approver: dataBorrow.name_approver || "",
      // dateTime_approver: new Date(dataBorrow.dateTime_approver) || "",
      // status: dataBorrow.status,
    }
    const inputJSON = JSON.stringify(inputs);
    const sortsaveAssetWithdrawTableArray = sortArray(
      saveAssetWithdrawTableArray
    );
    const saveAssetWithdrawTableArrayJSON = JSON.stringify(
      sortsaveAssetWithdrawTableArray
    );

    const deleteAssetArrayJSON = JSON.stringify(deleteAssetArray)
    const response = await updateBorrow({
      input: inputJSON,
      saveAssetWithdrawTableArray: saveAssetWithdrawTableArrayJSON,
      deleteAssetArray: deleteAssetArrayJSON
    }, borrowId);
    console.log(response.data);
    if (response.data.message.includes("updated success")) {
      setShowModalConfirm(false)
      setShowModalSuccess(true)
    }
  };

  const [dataBorrow, setDataBorrow] = useState()
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
          // name_recorder: borrow.name_recorder,
          // dateTime_recorder: new Date(borrow.dateTime_recorder),
          // name_courier: borrow.name_courier,
          // dateTime_courier: new Date(borrow.dateTime_courier),
          // name_approver: borrow.name_approver,
          // dateTime_approver: new Date(borrow.dateTime_approver),
          // status: borrow.status,
        });

        const assetData = borrow.assets.map((asset, index) => ({
          index: index,
          assetNumber: asset.assetNumber,
          productName: asset.productName,
          brand: asset.brand,
          amount: 1,
          unit: asset.unit,
          pricePerUnit: asset.pricePerUnit,
          maxQuantity: 1,
          isPackage: false,
          isFetching: true
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
          isFetching: true
        }));

        const saveData = [...assetData, ...packageAssetData]
        setCountRow(saveData.length)
        setSaveAssetWithdrawTableArray(saveData);
        // if (saveData.length) 
        setDataBorrow(borrow)
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
      {/* body */}
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}
        <div className="text-2xl text-text-green flex items-center">
          <Link
            to="/borrowList"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <h1>แก้ไขใบยืมครุภัณฑ์</h1>
        </div>
        <div className="flex">
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
        {!dataBorrow
          ? <div className="mt-5 min-h-[70vh] w-full text-center"><Spinner size="xl" /></div>
          : <>
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
                    value={input.borrowIdDoc}
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
                    value={input.pricePerDay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                    isValid={!input.borrowSetReturnDate}
                  />
                </div>
              </div>
            </div>
            {/* รายการครุภัณฑ์ที่เลือก */}
            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
              <div className="text-xl">รายการครุภัณฑ์ที่เลือก</div>
              {/* table */}
              <div className="overflow-x-auto scrollbar pt-4 min-h-[14rem]">
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
                        errorAssestTable={errorAssestTable}
                      />
                    );
                  })}
                  <button
                    type="button"
                    className="mt-2 w-full h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                    onClick={handleClickIncrease}
                  >
                    + เพิ่มครุภัณฑ์
                  </button>

                </div>
              </div>
            </div>
            {/* รายละเอียดผู้ยืม */}
            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
              <div className="text-xl">รายละเอียดผู้ยืม</div>
              <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
                <div className="flex flex-col gap-y-2 col-span-2">
                  <div className="flex flex-col gap-y-2 col-span-2">
                    <label className=" text-text-gray flex">
                      หน่วยงาน
                      <h1 className="text-red-500 ml-2 font-bold">*</h1>
                    </label>
                  </div>
                  <SearchSelector
                    options={sectorList}
                    name="sector"
                    onChange={handleSelect}
                    noClearButton
                    error={errorInput && !input.sector}
                    value={input.sector && { label: input.sector, value: input.sector }}
                  />
                </div>
                <div className="flex flex-col gap-y-2 col-span-2">
                  <label className="text-text-gray">ภาควิชา</label>
                  <SearchSelector
                    options={subSectorList}
                    name="subSector"
                    onChange={handleSelect}
                    noClearButton
                    error={errorInput && !input.subSector}
                    value={input.subSector && { label: input.subSector, value: input.subSector }}
                  />
                </div>
              </div>
              {/* Row 2 วัตถุประสงค์การขอยืม */}
              <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
                <div className="flex flex-col gap-y-2 col-span-2">
                  <label className=" text-text-gray">วัตถุประสงค์การขอยืม</label>
                  <SearchSelector
                    options={purposeOfUseList}
                    name="borrowPurpose"
                    onChange={handleSelect}
                    noClearButton
                    error={errorInput && !input.borrowPurpose}
                    value={input.borrowPurpose && { label: input.borrowPurpose, value: input.borrowPurpose }}
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
                    className={`${!input.handler && 'border-red-500'} border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
              <div className="text-xl">สถานที่ตั้งใหม่</div>
              <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
                <div className="flex flex-col gap-y-2 col-span-2">
                  <label className=" text-text-gray flex">
                    อาคาร
                    <h1 className="text-red-500 ml-2 font-bold">*</h1>
                  </label>
                  <SearchSelector
                    options={buildingList}
                    name="building"
                    onChange={handleSelect}
                    noClearButton
                    error={errorInput && !input.building}
                    value={input.building && { label: input.building, value: input.building }}
                  />
                </div>
                <div className="flex flex-col gap-y-2 col-span-1">
                  <label className="text-text-gray">ชั้น</label>
                  <SearchSelector
                    isDisabled={!input.building}
                    options={floorList}
                    onChange={handleSelect}
                    name="floor"
                    noClearButton
                    error={errorInput && !input.floor}
                    value={input.floor && { label: input.floor, value: input.floor } || floorList?.find(list => list.value == input.floor)}
                  />
                </div>
                <div className="flex flex-col gap-y-2 col-span-1">
                  <label className="text-text-gray">ห้อง</label>
                  <SearchSelector
                    noClearButton
                    name="room"
                    options={roomList}
                    onChange={handleSelect}
                    isDisabled={!input.floor}
                    error={errorInput && !input.room}
                    value={input?.room && { label: input.room, value: input.room } || roomList?.find(list => list.value == input.room)}
                  />
                </div>
              </div>
            </div>
          </>}
      </div>
      {/* footer */}
      <div className="bottom-0 bg-white  flex justify-between items-center gap-6 p-3 text-sm mr-3 ">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="bg-text-green hover:bg-green-800 text-white text-sm rounded-md py-2 px-4"
          onClick={handleForm}
        >
          บันทึกขอยืมครุภัณฑ์
        </button>

        <ModalConfirmSave
          isVisible={showModalConfirm}
          onClose={() => setShowModalConfirm(false)}
          onSave={handleSubmit}
        />
        {showModalSuccess && <ModalSuccess urlPath='/borrowList' />}
      </div>
    </>
  );
};

export default BorrowEdit;
