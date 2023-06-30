import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import Selector from "../components/selector/Selector";
import SearchSelector from "../components/selector/SearchSelector";
import { getBuildingData, getSector } from "../api/masterApi";
import { getUserRepairDropdown } from "../api/userApi";
import { getAllAssetForRepairDropdown } from "../api/assetApi";
import { createRepair } from "../api/repairApi";
import ModalSuccess from "../components/modal/ModalSuccess";

const RepairRecord = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [formData, setFormData] = useState({
    informRepairIdDoc: "11",
    urgentStatus: "",
    informRepairDate: new Date(),
    assetNumber: "",
    isInsurance: "",
    assetGroupNumber: "",
    hostSector: "",
    productName: "",
    insuranceStartDate: "",
    insuranceEndDate: "",
    costCenterCode: "",
    asset01: "",
    // ข้อมูลสถานที่ซ่อม
    building: "",
    floor: "",
    room: "",
    // ข้อมูลผู้เกี่ยวข้อง
    name_recorder: "",
    phoneNumber: "",
    name_courier: "",
    courierSector: "",
    // รายละเอียดการซ่อม
    repairSector: "",
    typeOfRepair: "",
    problemDetail: "",
    status: "",
  });
  const [assetList, setAssetList] = useState();
  const [buildingList, setBuildingList] = useState();
  const [floorList, setFloorList] = useState();
  const [roomList, setRoomList] = useState();
  const [nameRecorderList, setNameRecorderList] = useState();
  const [nameCourierList, setNameCourierList] = useState();
  const [sectorList, setSectorList] = useState();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(name);
  };

  const handleSubmitForValidate = (e) => {
    e.preventDefault();
    console.log(formData);
    // validate
    let isError;
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "asset01" || key === "costCenterCode" || key === "status") {
      } else {
        if (value === "") {
          isError = true;
          console.log(`Key: ${key}, Value: ${value}`);
          setError(true);
        }
      }
    });

    if (!isError) {
      setShowModalConfirm(true);
    }
  };

  const handleSubmit = async (valStatus) => {
    console.log("valStatus", valStatus);

    let submitFormData = { ...formData, status: valStatus || "waiting" };
    console.log("submitFormData", submitFormData);

    const response = await createRepair({
      input: submitFormData,
    });
    console.log(response);

    if (response.data.message.includes("create repair successfully")) {
      setShowModalConfirm(false);
      setShowModalSuccess(true);
    }
  };

  function formArrayOption(data) {
    const array = [];
    data.map((ele) => {
      array.push({ label: ele.name, value: ele.name, ele: ele });
    });
    return array;
  }

  function formAssetArrayOption(data) {
    const array = [];
    data.map((ele) => {
      array.push({ label: ele.assetNumber, value: ele.assetNumber, ele: ele });
    });
    return array;
  }

  function formNameRecorderArrayOption(data) {
    const array = [];
    data.map((ele) => {
      array.push({
        label: ele.thaiFirstName + " " + ele.thaiLastName,
        value: ele.thaiFirstName + " " + ele.thaiLastName,
        ele: ele,
      });
    });
    return array;
  }

  const getMasterData = async () => {
    const building = await getBuildingData();
    const assets = await getAllAssetForRepairDropdown();
    const sectors = await getSector();

    const arrBuilding = formArrayOption(building.data);
    // console.log("arrBuilding", arrBuilding);
    setBuildingList(arrBuilding);

    const arrAsset = formAssetArrayOption(assets.data.assets);
    // console.log("arrAsset", arrAsset);
    setAssetList(arrAsset);

    const arrSector = formArrayOption(sectors.data.sector);
    // console.log("arrSector",arrSector);
    setSectorList(arrSector);

    const user = await getUserRepairDropdown();
    const userArray = formNameRecorderArrayOption(user.data.user);
    // console.log("userArray", userArray);
    setNameRecorderList(userArray);
    setNameCourierList(userArray);
  };

  const handleSelect = (value, label, ele) => {
    setFormData({ ...formData, [label]: value });
  };

  

  useEffect(() => {
    getMasterData();
  }, []);

  useEffect(() => {
    if (formData.assetNumber) {
      assetList?.map((list) => {
        if (list.value == formData.assetNumber) {
          console.log("list.ele", list.ele);
          setFormData({
            ...formData,
            isInsurance: list.ele.isInsurance,
            assetGroupNumber: list.ele.assetGroupNumber,
            hostSector: list.ele.sector,
            productName: list.ele.productName,
            insuranceStartDate: list.ele.insuranceStartDate,
            insuranceEndDate: list.ele.insuranceExpiredDate,
            asset01: list.ele.asset01,
          });
        }
      });
    } else {
      setFormData({
        ...formData,
        isInsurance: "",
        assetGroupNumber: "",
        hostSector: "",
        productName: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        asset01: "",
      });
    }
  }, [formData.assetNumber]);

  useEffect(() => {
    buildingList?.map((list) => {
      if (list.value == formData.building) {
        const floors = [];
        list.ele.floors.forEach((floor) => {
          // console.log("floor", floor);
          floors.push({ label: floor.name, value: floor.name, ele: floor });
        });
        setFloorList(floors);
      }
    });
    handleSelect("", "floor");
    handleSelect("", "room");
  }, [formData.building]);

  useEffect(() => {
    floorList?.map((list) => {
      if (list.value == formData.floor) {
        const rooms = [];
        list.ele.rooms.forEach((room) => {
          rooms.push({ label: room.name, value: room.name });
        });
        setRoomList(rooms);
      }
    });
    handleSelect("", "room");
  }, [formData.floor]);

  useEffect(() => {
    if (formData.name_recorder) {
      nameRecorderList?.map((list) => {
        if (list.value == formData.name_recorder) {
          // console.log("list.ele", list.ele);
          // console.log("list.ele.phoneNumber", list.ele.phoneNumber);
          setFormData({ ...formData, phoneNumber: list.ele.phoneNumber });
        }
      });
    } else {
      setFormData({ ...formData, phoneNumber: "" });
    }
  }, [formData.name_recorder]);

  useEffect(() => {
    if (formData.name_recorder) {
      nameRecorderList?.map((list) => {
        if (list.value == formData.name_recorder) {
          setFormData({ ...formData, phoneNumber: list.ele.phoneNumber });
        }
      });
    } else {
      setFormData({ ...formData, phoneNumber: "" });
    }
  }, [formData.name_recorder]);

  useEffect(() => {
    if (formData.name_courier) {
      nameCourierList?.map((list) => {
        if (list.value == formData.name_courier) {
          setFormData({ ...formData, courierSector: list.ele.sector });
        }
      });
    } else {
      setFormData({ ...formData, courierSector: "" });
    }
  }, [formData.name_courier]);

  useEffect(() => {
    if (formData.repairSector) {
      sectorList?.map((list) => {
        if (list.value == formData.repairSector) {
          // console.log("list.ele", list.ele);
          // console.log("list.ele.name", list.ele.name);
          setFormData({ ...formData, repairSector: list.ele.name });
          // console.log({ ...formData, repairSector: list.ele.name });
        }
      });
    } else {
      setFormData({ ...formData, repairSector: "" });
      // console.log({ ...formData, repairSector: "" });
    }
  }, [formData.repairSector]);

  return (
    <>
      <form name="form" onSubmit={handleSubmitForValidate}>
        <div className="bg-background-page pt-5 p-3">
          {/* Header */}
          <div>
            {/* เพิ่มการซ่อมบำรุง */}
            <div className="text-2xl text-text-green flex items-center space-x-5 ">
              <h1>เพิ่มการซ่อมบำรุง</h1>
            </div>
            {/* navigate link */}
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
                <div className="text-text-gray ml-2">เพิ่มการซ่อมบำรุง</div>
              </div>
            </div>
            {/* status */}
            <div className="flex justify-end gap-5"></div>
          </div>
          {/* Body 1 */}
          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
            {/* ข้อมูลครุภัณฑ์ */}
            <div>
              <div className="text-xl">ข้อมูลครุภัณฑ์</div>
              {/* row 1 เลขที่ใบแจ้งซ่อม */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center ">
                  เลขที่ใบแจ้งซ่อม
                </div>
                <div className="flex items-center ">
                  {formData.informRepairIdDoc}
                </div>
                <div className="text-text-gray flex items-center ">
                  สถานะความเร่งด่วน
                </div>
                <div className="sm:col-span-2 grid grid-cols-3  gap-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="border border-text-green p-2"
                      name="urgentStatus"
                      value="ปกติ"
                      onChange={handleChange}
                    />
                    <label>ปกติ</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="border border-text-green p-2"
                      name="urgentStatus"
                      value="เร่งด่วน"
                      onChange={handleChange}
                    />
                    <label>เร่งด่วน</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="border border-text-green p-2"
                      name="urgentStatus"
                      value="ฉุกเฉิน"
                      onChange={handleChange}
                    />
                    <label>ฉุกเฉิน</label>
                  </div>
                  <div className="text-red-500">
                    {error && !formData.urgentStatus && `*โปรดระบุ`}
                  </div>
                </div>
              </div>
              {/* row 2 เวลาที่แจ้งซ่อม*/}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  เวลาที่แจ้งซ่อม
                </div>
                <div className="flex items-center">
                  {new Date(formData.informRepairDate).toLocaleString("th", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="text-text-gray flex items-center">
                  เลขครุภัณฑ์
                </div>
                <div className="flex items-center gap-5">
                  <SearchSelector
                    options={assetList}
                    name={"assetNumber"}
                    error={error && !formData.assetNumber}
                    onChange={(value, label) =>
                      setFormData({ ...formData, [label]: value })
                    }
                  />
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66667 3.66667H9.16667V9.16667H3.66667V3.66667ZM18.3333 3.66667V9.16667H12.8333V3.66667H18.3333ZM12.8333 13.75H14.6667V11.9167H12.8333V10.0833H14.6667V11.9167H16.5V10.0833H18.3333V11.9167H16.5V13.75H18.3333V16.5H16.5V18.3333H14.6667V16.5H11.9167V18.3333H10.0833V14.6667H12.8333V13.75ZM14.6667 13.75V16.5H16.5V13.75H14.6667ZM3.66667 18.3333V12.8333H9.16667V18.3333H3.66667ZM5.5 5.5V7.33333H7.33333V5.5H5.5ZM14.6667 5.5V7.33333H16.5V5.5H14.6667ZM5.5 14.6667V16.5H7.33333V14.6667H5.5ZM3.66667 10.0833H5.5V11.9167H3.66667V10.0833ZM8.25 10.0833H11.9167V13.75H10.0833V11.9167H8.25V10.0833ZM10.0833 5.5H11.9167V9.16667H10.0833V5.5ZM1.83333 1.83333V5.5H0V1.83333C0 1.3471 0.193154 0.880788 0.536971 0.536971C0.880788 0.193154 1.3471 0 1.83333 0L5.5 0V1.83333H1.83333ZM20.1667 0C20.6529 0 21.1192 0.193154 21.463 0.536971C21.8068 0.880788 22 1.3471 22 1.83333V5.5H20.1667V1.83333H16.5V0H20.1667ZM1.83333 16.5V20.1667H5.5V22H1.83333C1.3471 22 0.880788 21.8068 0.536971 21.463C0.193154 21.1192 0 20.6529 0 20.1667V16.5H1.83333ZM20.1667 20.1667V16.5H22V20.1667C22 20.6529 21.8068 21.1192 21.463 21.463C21.1192 21.8068 20.6529 22 20.1667 22H16.5V20.1667H20.1667Z"
                      fill="#38821D"
                    />
                  </svg>
                </div>
              </div>
              {/* row 3 อยู่ในประกัน*/}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  อยู่ในประกัน
                </div>
                <div
                  className={`flex items-center ${
                    formData.isInsurance ? "text-text-green" : "text-red-600"
                  }`}
                >
                  {formData.isInsurance ? "อยู่ในประกัน" : "ไม่อยู่ในประกัน"}
                </div>
                <div className="text-text-gray flex items-center">
                  รหัสกลุ่มครุภัณฑ์
                </div>
                <div className="flex items-center">
                  {formData.assetGroupNumber ? formData.assetGroupNumber : "-"}
                </div>
              </div>
              {/* row 4 เจ้าของครุภัณฑ์*/}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  เจ้าของครุภัณฑ์
                </div>
                <div className="flex items-center">
                  {formData.hostSector ? formData.hostSector : "-"}
                </div>
                <div className="text-text-gray flex items-center">
                  ชื่อครุภัณฑ์
                </div>
                <div className="flex items-center">
                  {formData.productName ? formData.productName : "-"}
                </div>
              </div>
              {/* row 5 วันที่เริ่มรับประกัน*/}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  วันที่เริ่มรับประกัน
                </div>
                <div className="flex items-center">
                  {formData.insuranceStartDate
                    ? new Date(formData.insuranceStartDate).toLocaleString(
                        "th",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )
                    : "-"}
                </div>
                <div className="text-text-gray flex items-center">
                  วันที่สิ้นสุดการรับประกัน
                </div>
                <div className="flex items-center">
                  {formData.insuranceEndDate
                    ? new Date(formData.insuranceEndDate).toLocaleString("th", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "-"}
                </div>
              </div>
              {/* row 6 รหัส cost center*/}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
                <div className="text-text-gray flex items-center">
                  รหัส cost center
                </div>
                <div className="flex items-center">
                  {" "}
                  {formData.costCenterCode ? formData.costCenterCode : "-"}
                </div>
                <div className="text-text-gray flex items-center">สท.01</div>
                <div className="flex items-center">
                  {formData.asset01 ? formData.asset01 : "-"}
                </div>
              </div>
            </div>
            {/* ข้อมูลสถานที่ซ่อม */}
            <div className="pt-5">
              <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>
              {/* row 1 ที่ตั้ง/อาคาร */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
                <div className="text-text-gray flex items-center ">
                  ที่ตั้ง/อาคาร
                </div>
                <div className="flex items-center  h-[38px]">
                  <SearchSelector
                    options={buildingList}
                    name="building"
                    onChange={handleSelect}
                    noClearButton
                    error={error && !formData.building}
                  />
                </div>
                <div className="text-text-gray flex items-center ">ชั้น</div>
                <div className="flex items-center ">
                  <SearchSelector
                    isDisabled={!formData.building}
                    options={floorList}
                    onChange={handleSelect}
                    name="floor"
                    noClearButton
                    error={error && !formData.floor}
                    value={
                      formData.floor &&
                      floorList?.find((list) => list.value == formData.floor)
                    }
                  />
                </div>
              </div>
              {/* row 2 ห้อง */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
                <div className="text-text-gray flex items-center">ห้อง</div>
                <div className="flex items-center ">
                  <SearchSelector
                    noClearButton
                    name="room"
                    options={roomList}
                    onChange={handleSelect}
                    isDisabled={!formData.floor}
                    error={error && !formData.room}
                    value={
                      formData?.room &&
                      roomList?.find((list) => list.value == formData.room)
                    }
                  />
                </div>
              </div>
            </div>
            {/* ข้อมูลผู้เกี่ยวข้อง */}
            <div className="pt-5">
              <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>
              {/* row 1 ผู้ส่งซ่อม */}
              <div className="grid grid-cols-2  md:grid-cols-5 gap-2 p-2">
                <div className="text-text-gray flex items-center ">
                  ผู้ส่งซ่อม
                </div>
                <div className="flex items-center ">
                  <SearchSelector
                    options={nameRecorderList}
                    placeholder={"ผู้ส่งซ่อม"}
                    name={"name_recorder"}
                    error={error && !formData.name_recorder}
                    onChange={(value, label) =>
                      setFormData({ ...formData, [label]: value })
                    }
                  />
                </div>
                <div className="text-text-gray flex items-center ">
                  เบอร์โทรศัพท์
                </div>
                <div className="flex items-center p-2 bg-table-data border-[2px] rounded-md h-[38px]">
                  {formData?.phoneNumber}
                </div>
              </div>
              {/* row 2 ผู้ประสานงาน */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
                <div className="text-text-gray flex items-center">
                  ผู้ประสานงาน
                </div>
                <div className="flex items-center ">
                  <SearchSelector
                    options={nameCourierList}
                    placeholder={"ผู้ประสานงาน"}
                    name={"name_courier"}
                    error={error && !formData.name_courier}
                    onChange={(value, label) =>
                      setFormData({ ...formData, [label]: value })
                    }
                  />
                </div>
                <div className="text-text-gray flex items-center">หน่วยงาน</div>

                <div className="flex items-center p-2 bg-table-data border-[2px] rounded-md h-[38px]">
                  {formData?.courierSector}
                </div>
              </div>
            </div>
          </div>
          {/* Body 2 */}
          <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
            <h1 className="text-xl">รายละเอียดการซ่อม</h1>
            {/* row 1 ประเทภการซ่อม */}
            <div className="grid grid-cols-5 pt-5">
              <div className="col-span-1 flex items-center">ประเภทการซ่อม</div>
              <div className=" col-span-3 flex items-center gap-5">
                <input
                  type="radio"
                  className="border border-text-green p-2"
                  name="typeOfRepair"
                  value="โครงการ"
                  onChange={handleChange}
                />
                <label>โครงการ</label>
                <input
                  type="radio"
                  className="border border-text-green p-2"
                  name="typeOfRepair"
                  value="คอมพิวเตอร์"
                  onChange={handleChange}
                />
                <label>คอมพิวเตอร์</label>
                <input
                  type="radio"
                  className="border border-text-green p-2"
                  name="typeOfRepair"
                  value="เครื่องมือแพทย์"
                  onChange={handleChange}
                />
                <label>เครื่องมือแพทย์</label>
              </div>
              <div className="col-start-2 text-red-500">
                {error && !formData.typeOfRepair && `*โปรดระบุ`}
              </div>
            </div>
            {/* row 2 หน่วยงาน */}
            <div className="grid grid-cols-5 pt-5">
              <div className="col-span-1 flex items-center">หน่วยงานซ่อม</div>
              <div className=" col-span-3 flex items-center">
                <SearchSelector
                  options={sectorList}
                  name={"repairSector"}
                  error={error && !formData.repairSector}
                  onChange={(value, label) =>
                    setFormData({ ...formData, [label]: value })
                  }
                />
              </div>
            </div>
            {/* row 3 ส่วนที่ชำรุดหรือเหตุขัดข้อง */}
            <div className="grid grid-cols-5 pt-5">
              <div className="col-span-1 flex items-center">
                ส่วนที่ชำรุดหรือเหตุขัดข้อง
              </div>
              <div className=" col-span-3 flex items-center">
                <textarea
                  className={`border-[1px] w-full rounded-lg" ${
                    error.problemDetail ? "border-red-500" : "border-gray-300"
                  }`}
                  name="problemDetail"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="border-t-[1px] p-6 flex justify-between">
          <button className="text-text-gray px-4 py-2 border-[1px] rounded-md hover:text-black">
            ยกเลิก
          </button>
          <div className="flex gap-10">
            <button
              className="px-4 py-2 border-[1px] border-text-green text-text-green rounded-md hover:bg-green-100"
              onClick={() => handleSubmit("saveDraft")}
            >
              บันทึกแบบร่าง
            </button>
            <button
              className="px-4 py-2 border-[1px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800"
              type="submit"
            >
              บันทึกแจ้งซ่อม
            </button>
            <ModalConfirmSave
              isVisible={showModalConfirm}
              onClose={() => setShowModalConfirm(false)}
              onSave={handleSubmit}
            />

            {showModalSuccess && <ModalSuccess urlPath="/repairRecord" />}
          </div>
        </div>
      </form>
    </>
  );
};

export default RepairRecord;
