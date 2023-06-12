import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import RowofTableSaveTransfer from "../components/table/RowofTableSaveTransfer";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import { useEffect } from "react";
import { getBuildingData, getSector, getSubsector } from "../api/masterApi";
import Select from "react-select";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { createTransfer } from "../api/transferApi";
import { BsArrowLeft } from "react-icons/bs";
import ModalError from "../components/modal/ModalError"
import ModalSuccess from "../components/modal/ModalSuccess";
import SearchSelector from "../components/selector/SearchSelector";
import { getByAssetNumberSelector, getByProductSelector } from "../api/assetApi";

const SaveTransferAsset = () => {
  const { user } = useContext(AuthContext);

  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  const [countRow, setCountRow] = useState(1);

  useEffect(() => {
    console.log(user?.sector)
    if (user) {
      handleSelect({ value: user.sector }, { name: "transferSector" })
      setInput({
        ...input,
        handler: user.thaiFirstName + " " + user.thaiLastName,
      })
    }
  }, [user])

  const [input, setInput] = useState({
    transferDocumentNumber: "test",
    transferSector: "",
    subSector: "",
    building: "",
    floor: "",
    room: "",
    transfereeSector: "",
  });

  const [countIndexArray, setCountIndexArray] = useState([0]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [saveTransferTableArray, setSaveTransferTableArray] = useState([
    {
      // index: 0,
      assetNumber: "",
      productName: "",
      serialNumber: "",
      hostSector: "",
    },
  ]);
  const newTransferTable = {
    assetNumber: "",
    productName: "",
    serialNumber: "",
    hostSector: "",
  }

  useEffect(() => {
    getMasterData()
    fetchList()
  }, [])

  const [assetList, setAssetList] = useState([])
  const [productList, setProductList] = useState([])
  const fetchList = async () => {
    const resAssetNumber = await getByAssetNumberSelector("")
    const arrAsset = []
    resAssetNumber.data.asset.map(ele => {
      arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
    })
    console.log(arrAsset)
    setAssetList(arrAsset)
    const resProduct = await getByProductSelector("")
    const arrProduct = []
    resProduct.data.asset.map(ele => {
      arrProduct.push({ label: ele._id, value: ele._id, ele: ele.results })
    })
    setProductList(arrProduct)

    assetList?.find(list => console.log(list.value, search.assetNumber))
  }

  function callbackList() {
    console.log('5555555555', saveTransferTableArray)
    console.log(assetList, productList)
    let asset = [], product = []
    saveTransferTableArray?.map(ele => {
      asset = assetList.filter(ass => ele.assetNumber != ass.value)
      product = productList.filter(ass => ele.productName != ass.value)
    })
    setAssetList(asset)
    setProductList(product)
  }

  const [sectorList, setSectorList] = useState()
  const [subSectorList, setSubSectorList] = useState()
  const [buildingList, setBuildingList] = useState()
  const [floorList, setFloorList] = useState()
  const [roomList, setRoomList] = useState()

  const getMasterData = async () => {
    const sector = await getSector()
    const arrSector = formArrayOption(sector.data.sector)
    setSectorList(arrSector)
    const subSector = await getSubsector()
    const arrSubSector = formArrayOption(subSector.data.subSector)
    setSubSectorList(arrSubSector)
    const building = await getBuildingData()
    console.log(building)
    const arrBuilding = formArrayOption(building.data)
    setBuildingList(arrBuilding)
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
    console.log(input)
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

  // const handleSelect = (e, data) => {
  //   const value = e.value
  //   console.log(e, data.name, '<<<<<<<')
  //   const clone = { ...input };
  //   clone[data.name] = value;
  //   setInput(clone);
  // }

  const handleSelect = (value, label) => {
    const clone = { ...input }
    clone[label] = value
    console.log(clone)
    setInput(clone)
  }

  const handleChange = (e) => {
    const value = e.target.value
    console.log(value)
    const clone = { ...input };
    clone[e.target.name] = value;
    console.log(clone)
    setInput(clone);
  }

  const tableData = [
    {
      ID: "1",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
    {
      ID: "2",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
    {
      ID: "3",
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับห้องพิเศษ",
      moveInDate: "19/04/2565",
      moveOutDate: "22/12/2565",
    },
  ];

  // handle
  const handleChangeID = (e) => {
    const clone = { ...input };
    clone.ID = e.target.value;
    setInput(clone);
  };
  const handleChangeBillNumber = (e) => {
    const clone = { ...input };
    clone.billNumber = e.target.value;
    setInput(clone);
  };
  const handleChangeDocumentRegistration = (e) => {
    const clone = { ...input };
    clone.documentRegistration = e.target.value;
    setInput(clone);
  };
  const handleChangeSector = (e) => {
    const clone = { ...input };
    clone.sector = e.target.value;
    setInput(clone);
  };
  const handleChangeEligiblePerson = (e) => {
    const clone = { ...input };
    clone.eligiblePerson = e.target.value;
    setInput(clone);
  };

  const handleChangeAllPrice = (e) => {
    const clone = { ...input };
    clone.allPrice = e.target.value;
    setInput(clone);
  };

  //handle bottom table
  const handleClickIncrease = (e) => {
    console.log('Xxx')
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...saveTransferTableArray];
    const newCloneArray = {
      index: countRow,
      inventoryNumber: "",
      productName: "",
      brand: "",
      serialNumber: "",
      supplier: "",
      amount: "",
      price: "",
    };
    console.log(clone)
    setSaveTransferTableArray([...clone, newCloneArray]);
  };

  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1);
    }

    let clone = [...saveTransferTableArray];
    clone.splice(index, 1);
    setSaveTransferTableArray(clone);
  };

  const [errorInput, setErrorInput] = useState(false)
  const [errorTable, setErrorTable] = useState(false)

  const handleForm = () => {
    let errInput, errTable
    console.log(input, saveTransferTableArray[0])
    Object.values(input).map((value, index) => {
      if (errInput) return
      console.log(value)
      if (!value) errInput = true
      // if (Object.keys(input).length == index + 1) errInput = false
    })
    if (!saveTransferTableArray.length) {
      setSaveTransferTableArray([newTransferTable])
      errTable = true
    }
    saveTransferTableArray.map(list => {
      Object.entries(list).forEach(([key, value], index) => {
        if (errTable) return
        if (key == "productName" && !value) errTable = true
      })
    })
    setErrorInput(errInput)
    setErrorTable(errTable)
    console.log(errInput,errTable)
    if (!(errInput || errTable)) setShowModalConfirm(true)
  }

  const handleSubmit = async () => {
    console.log(saveTransferTableArray)
    try {
      await createTransfer({
        input: {
          ...input,
          name_recorder: user.thaiFirstName + " " + user.thaiLastName,
          // transferPendingDateTime: todayThaiDate,
          // firstName_recorder: "",
          // lastName_recorder: "",
          // dateTime_recorder: "",
          // firstName_courier: "",
          // lastName_courier: "",
          // dateTime_courier: "",
          // firstName_approver: "",
          // lastName_approver: "",
          // dateTime_approver: "",
          // status: "waiting",
        },
        saveTransferTableArray
      })
      setShowModalConfirm(false)
      setShowModalSuccess(true)
    } catch (err) {
      setShowModalError(err)
    }
  }

  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        <div className="flex items-center mr-10">
          <Link
            to="/transferIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-2xl text-text-green ">บันทึกโอน-ย้ายครุภัณฑ์</div>
        </div>
        <div className="flex pt-3">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">บันทึกโอน-ย้ายครุภัณฑ์</div>
          </div>
        </div>
        {/* {user && */}
        <>
          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
            <div className="text-xl">การโอน-ย้ายครุภัณฑ์</div>
            <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  เลขที่เอกสารการโอนย้าย
                  {/* <h1 className="text-red-500 ml-2 font-bold">*</h1> */}
                </label>
                <input
                  // type="text"
                  disabled
                  className="border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                  value={input.transferDocumentNumber}
                />
              </div>

              <div className="flex flex-col gap-y-2 col-span-2">
                <div>
                  <div className="text-text-gray mb-1">หน่วยงานผู้โอน</div>
                  {/* <div className="flex flex-col gap-y-2 col-span-2"> */}
                  <div className="flex h-[38px] flex-col">
                    {/* <Select
                      options={sectorList}
                      onChange={handleSelect}
                      id="หน่วยงานผู้โอน"
                      name="transferSector"
                      value={sectorList?.find(list => list.value == input.transferSector)}
                    /> */}
                    <SearchSelector
                      id={"หน่วยงานผู้โอน"}
                      options={sectorList}
                      onChange={handleSelect}
                      name="transferSector"
                      error={errorInput && !input.transferSector}
                      noClearButton
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
              <div className="flex flex-col gap-y-2 col-span-2">
                <div>
                  <div className="text-text-gray mb-1">ภาควิชาผู้โอน</div>
                  <div className="flex h-[38px] flex-col">
                    <SearchSelector
                      id="ภาควิชาผู้โอน"
                      options={subSectorList}
                      onChange={handleSelect}
                      name="subSector"
                      error={errorInput && !input.subSector}
                      noClearButton
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <div>
                  <div className="text-text-gray mb-1">ผู้ดำเนินการ</div>
                  <div className="flex h-[38px] ">
                    <input
                      className={`w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                      onChange={handleChange}
                      name="handler"
                      value={input.handler}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
            <div className="text-xl">ข้อมูลครุภัณฑ์ที่เลือก</div>
            <div className="overflow-x-auto scrollbar pt-4">
              <div className="w-[1000px] lg:w-full p-2 ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                  <div className="grid grid-cols-13 gap-2 text-center">
                    <div className="ml-2 col-span-1">ลำดับ</div>
                    <div className="col-span-3">เลขครุภัณฑ์</div>
                    <div className="col-span-3">ชื่อครุภัณฑ์</div>
                    <div className="col-span-3">เจ้าของครุภัณฑ์</div>
                    <div className="col-span-1">จำนวน</div>
                    <div className="col-span-1">หน่วยนับ</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                {saveTransferTableArray?.map((el, idx) => {
                  return (
                    <RowofTableSaveTransfer
                      key={idx}
                      index={idx}
                      saveTransferTableArray={saveTransferTableArray}
                      setSaveTransferTableArray={setSaveTransferTableArray}
                      deleteRow={deleteRow}
                      error={errorTable}
                      assetList={assetList}
                      productList={productList}
                      setAssetList={setAssetList}
                      setProductList={setProductList}
                      callbackList={callbackList}
                    />
                  );
                })}
                <button
                  type="button"
                  className="w-full h-[38px] flex justify-center items-center py-1 px-6 mr-5 border-2 focus:border-transparent border-text-green shadow-sm text-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 my-2"
                  onClick={handleClickIncrease}
                >
                  + เพิ่มครุภัณฑ์
                </button>

              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3 ">
            <div className="text-xl">สถานที่ตั้งใหม่</div>
            <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  หน่วยงานที่รับโอน
                  <h1 className="text-red-500 ml-2 font-bold">*</h1>
                </label>
                <SearchSelector
                  id="หน่วยงานที่รับโอน"
                  options={sectorList}
                  onChange={handleSelect}
                  name="transfereeSector"
                  error={errorInput && !input.transfereeSector}
                  noClearButton
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className=" text-text-gray flex">
                  อาคาร
                  <h1 className="text-red-500 ml-2 font-bold">*</h1>
                </label>
                <SearchSelector
                  id="อาคาร"
                  options={buildingList}
                  onChange={handleSelect}
                  name="building"
                  error={errorInput && !input.building}
                  noClearButton
                />
              </div>
            </div>

            <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">ชั้น</label>
                <SearchSelector
                  isDisabled={!input.building}
                  id="ชั้น"
                  options={floorList}
                  onChange={handleSelect}
                  name="floor"
                  error={errorInput && !input.floor}
                  value={input.floor && floorList?.find(list => list.value == input.floor)}
                  noClearButton
                />
              </div>
              <div className="flex flex-col gap-y-2 col-span-2">
                <label className="text-text-gray">ห้อง</label>
                <SearchSelector
                  id="ห้อง"
                  name="room"
                  options={roomList}
                  onChange={handleSelect}
                  isDisabled={!input.floor}
                  error={errorInput && !input.room}
                  value={input?.room && roomList?.find(list => list.value == input.room)}
                  noClearButton
                />
              </div>
            </div>
          </div>
        </>
        {/* } */}
      </div>

      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-3">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <div className="flex justify-end gap-4">
          <button
            className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
          >
            บันทึกแบบร่าง
          </button>
          <button
            type="button"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleForm}
          >
            บันทึกขออนุมัติ
          </button>
          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={handleSubmit}
          />
          {showModalError && <ModalError message={showModalError} didClose={() => setShowModalError(false)} />}
          {showModalSuccess && <ModalSuccess urlPath='/transferIndex' />}
        </div>
      </div>
    </>
  );
};

export default SaveTransferAsset;
