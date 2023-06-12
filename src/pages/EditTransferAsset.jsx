import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableBorrowRecord from "../components/table/TableBorrowRecord";
import Selector from "../components/selector/Selector";
import TableLocationHistory from "../components/table/TableLocationHistory";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import RowofTableSaveTransfer from "../components/table/RowofTableSaveTransfer";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import { getTransferById, updateTransfer } from "../api/transferApi";
import { useParams } from "react-router-dom";
import { getBuildingData, getSector, getSubsector } from "../api/masterApi";
import Select from "react-select";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Spinner } from "flowbite-react/lib/esm";
import { BsArrowLeft } from "react-icons/bs";
import ModalError from "../components/modal/ModalError"
import ModalSuccess from "../components/modal/ModalSuccess";
import SearchSelector from "../components/selector/SearchSelector";
import { getByAssetNumberSelector, getByProductSelector } from "../api/assetApi";

const EditTransferAsset = () => {
  const { user } = useContext(AuthContext);
  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  const [countRow, setCountRow] = useState(1);
  let { transferId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState();

  useEffect(() => {
    const fetchList = async () => {
      const res = await getTransferById(transferId)
      const data = (res.data.transfer)
      setInput({
        // ...input,
        transferDocumentNumber: data.transferDocumentNumber,
        transferSector: data.transferSector,
        subSector: data.subSector,
        handler: data.name_recorder,
        transfereeSector: data.transfereeSector,
        building: data.building,
        floor: data.floor,
        room: data.room,
      })
      const arrTable = []
      data.assets?.forEach(ele => {
        arrTable.push({ ...ele, isFetching: false, isPackage: false })
      })
      data.packageAssets?.forEach(ele => {
        arrTable.push({ ...ele, isFetching: false, isPackage: true })
      })
      setSaveTransferTableArray(data.assets.concat(data.packageAssets))
      getMasterData(data.building, data.floor)
    }
    fetchList()
    getLists()
  }, [])

  const [assetList, setAssetList] = useState([])
  const [productList, setProductList] = useState([])

  const getLists = async () => {
    const resAssetNumber = await getByAssetNumberSelector("")
    const arrAsset = []
    resAssetNumber.data.asset.map(ele => {
      arrAsset.push({ label: ele.assetNumber, value: ele.assetNumber, ele })
    })
    setAssetList(arrAsset)
    const resProduct = await getByProductSelector("")
    const arrProduct = []
    resProduct.data.asset.map(ele => {
      arrProduct.push({ label: ele._id, value: ele._id, ele: ele.results })
    })
    setProductList(arrProduct)
  }
  async function callbackList() {
    console.log('5555555555', saveTransferTableArray)
    console.log(assetList, productList)
    let asset = [], product = []
    await getLists()
    console.log(assetList)
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

  const getMasterData = async (resBuilding, resFloor) => {
    const sector = await getSector()
    const arrSector = formArrayOption(sector.data.sector)
    setSectorList(arrSector)
    const subSector = await getSubsector()
    const arrSubSector = formArrayOption(subSector.data.subSector)
    setSubSectorList(arrSubSector)
    const building = await getBuildingData()
    const arrBuilding = formArrayOption(building.data)
    setBuildingList(arrBuilding)

    const floors = []
    arrBuilding?.map((list) => {
      if (list.value == resBuilding) {
        list.ele.floors.forEach(floor => {
          floors.push({ label: floor.name, value: floor.name, ele: floor })
        })
        setFloorList(floors)
      }
    })
    floors?.map((list) => {
      const rooms = []
      if (list.value == resFloor) {
        list.ele.rooms.forEach(room => {
          rooms.push({ label: room.name, value: room.name })
        })
        setRoomList(rooms)
      }
    })
    setIsLoading(false)

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
    // handleSelect({ value: "" }, { name: "floor" })
  }, [input?.building])

  useEffect(() => {
    // handleSelect({ value: "" }, { name: "room" })
    floorList?.map((list) => {
      if (list.value == input.floor) {
        const rooms = []
        list.ele.rooms.forEach(room => {
          rooms.push({ label: room.name, value: room.name })
        })
        setRoomList(rooms)
      }
    })
  }, [input?.floor])

  const handleSelect = (value, label) => {
    const clone = { ...input }
    clone[label] = value
    setInput(clone)
  }

  const [countIndexArray, setCountIndexArray] = useState([0]);
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [saveTransferTableArray, setSaveTransferTableArray] = useState([]);

  //handle bottom table
  const handleClickIncrease = (e) => {
    e.preventDefault();
    setCountRow(countRow + 1);
    setCountIndexArray([...countIndexArray, countRow]);

    let clone = [...saveTransferTableArray];
    const newCloneArray = {
      // index: countRow,
      inventoryNumber: "",
      productName: "",
      brand: "",
      serialNumber: "",
      supplier: "",
      amount: "",
      price: "",
    };
    setSaveTransferTableArray([...clone, newCloneArray]);
  };

  const [deleteAssetArray, setDeleteAssetArray] = useState([])
  const deleteRow = (index) => {
    if (countRow > 0) {
      setCountRow(countRow - 1);
    }

    let clone = [...saveTransferTableArray];
    let deleteOneRow = clone.splice(index, 1);
    console.log(deleteOneRow, clone)
    setSaveTransferTableArray(clone);
    setDeleteAssetArray([...deleteAssetArray, deleteOneRow[0]])
    console.log(index, clone[0], saveTransferTableArray)
  };

  const [errorInput, setErrorInput] = useState(false)
  const [errorTable, setErrorTable] = useState(false)

  const handleForm = () => {
    let errInput, errTable
    console.log(input, saveTransferTableArray)
    Object.values(input).map((value, index) => {
      if (errInput) return
      if (!value) errInput = true
      if (Object.keys(input).length == index + 1) errInput = false
    })
    if (!saveTransferTableArray.length) {
      setSaveTransferTableArray([{
        assetNumber: "",
        productName: "",
        serialNumber: "",
        hostSector: "",
      }])
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
    if (!(errInput || errTable)) setShowModalConfirm(true)
  }

  const handleSubmit = async () => {
    const body = {
      input: {
        ...input,
        name_recorder: user.thaiFirstName + " " + user.thaiLastName,
        name_courier: "test",
      },
      saveTransferTableArray,
      deleteAssetArray
    }
    console.log(body)
    try {
      await updateTransfer(body, transferId)
      setShowModalConfirm(false)
      // setShowModalSuccess(true)
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
          <div className="text-2xl text-text-green ">แก้ไขรายการโอน-ย้ายครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">แก้ไขรายการโอน-ย้ายครุภัณฑ์</div>
          </div>
        </div>

        {isLoading
          ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
          : <>
            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-5">
              <div className="text-xl">การโอน-ย้ายครุภัณฑ์</div>
              <div className="grid md:grid-cols-5 pt-4 gap-2 md:gap-20">
                <div className="flex flex-col gap-y-2 col-span-2">
                  <label className=" text-text-gray flex">
                    เลขที่เอกสารการโอนย้าย
                    <h1 className="text-red-500 ml-2 font-bold">*</h1>
                  </label>
                  <input
                    type="text"
                    placeholder="Example"
                    disabled
                    className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                    value={input.transferDocumentNumber}
                  />
                </div>
                <div className="flex flex-col gap-y-2 col-span-2">
                  <div>
                    <div className="text-text-gray mb-1">หน่วยงานผู้โอน</div>
                    <div className="flex h-[38px] flex-col">
                      <SearchSelector
                        id={"หน่วยงานผู้โอน"}
                        options={sectorList}
                        onChange={handleSelect}
                        name="transferSector"
                        error={errorInput && !input.transferSector}
                        value={sectorList?.find(list => list.value == input.transferSector)}
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
                        value={subSectorList?.find(list => list.value == input.subSector)}
                        noClearButton
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 col-span-2">
                  <div>
                    <div className="text-text-gray mb-1">ผู้ดำเนินการ</div>
                    <div className="flex h-[38px] flex-col">
                      <input
                        id={"ผู้ดำเนินการ"}
                        type="text"
                        disabled
                        className=" bg-table-data border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                        value={input?.handler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-3">
              <div className="text-xl">รายการครุภัณฑ์ที่เลือก</div>
              <div className="overflow-x-auto scrollbar pt-4">
                <div className="w-[1000px] lg:w-full p-2 ">
                  <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                    <div className="grid grid-cols-13 gap-2 text-center">
                      <div className="ml-2 col-span-1 ">ลำดับ</div>
                      <div className="col-span-3">เลขครุภัณฑ์</div>
                      <div className="col-span-3">ชื่อครุภัณฑ์</div>
                      <div className="col-span-2">Serial Number</div>
                      <div className="col-span-3">เจ้าของครุภัณฑ์</div>
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
                        modeEdit={true}
                        error={errorTable}
                        assetList={assetList}
                        productList={productList}
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
                    value={sectorList?.find(list => list.value == input.transfereeSector)}
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
                    value={input?.building && buildingList?.find(list => list.value == input.building)}
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
        }
      </div>

      <div className="bottom-0 bg-white  flex justify-between items-center gap-10 p-3 text-sm mr-3 ">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
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
          mode={"edit"}
        />
        {showModalError && <ModalError message={showModalError} didClose={() => setShowModalError(false)} />}
        {showModalSuccess && <ModalSuccess urlPath='/transferIndex' />}
      </div>
    </>
  );
};

export default EditTransferAsset;
