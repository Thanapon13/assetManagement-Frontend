import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { BsArrowLeft } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { GrDocument } from "react-icons/gr";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import RowOfTableAssetInformation from "../components/table/RowOfTableAssetInformation";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import { createAsset } from "../api/assetApi";
import BarcodeScanner from "../components/scanner/BarcodeScanner";
import QRscanner from "../components/scanner/QRscanner";
import { useEffect } from "react";

const EditAssetInformation = () => {
  const inputImg = useRef();
  const inputDoc = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const todayThaiDate = ChangeDateToBuddhist(
    new Date().toLocaleString("th-TH")
  );

  // useState
  const [perPage, setPerPage] = useState(10);

  const [input, setInput] = useState({
    // ID: "",
    // serialNumber: "",
    engProductName: "",
    productName: "",
    type: "",
    kind: "",
    realAssetId: "",
    unit: "",
    brand: "",
    model: "",
    size: "",
    quantity: 0,
    serialNumberMachine: "",
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    pricePerUnit: 0,
    guaranteedMonth: "",
    purposeOfUse: "",
    allSector: "",
    assetNumber: "แมม",
    sector: "",
    asset01: "",
    serialNumber: "",
    replacedAssetNumber: "",

    status: "not approve",
  });

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

  const [indexGenData, setIndexGenData] = useState(0);
  const [barcode, setBarcode] = useState(input?.serialNumber);
  const [qr, setQr] = useState(input?.serialNumber);

  // สัญญาจัดซื้อ
  const [acquisitionMethod, setAcquisitionMethod] = useState("");
  const [moneyType, setMoneyType] = useState("");
  const [deliveryDocument, setDeliveryDocument] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [receivedDate, setReceivedDate] = useState(todayThaiDate);
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [purchaseYear, setPurchaseYear] = useState(todayThaiDate);
  const [purchaseDate, setPurchaseDate] = useState(todayThaiDate);
  const [documentDate, setDocumentDate] = useState(todayThaiDate);

  // การจำหน่าย
  const [salesDocument, setSalesDocument] = useState("");
  const [distributeDocumentDate, setDistributeDocumentDate] =
    useState(todayThaiDate);
  const [distributeApprovalReleaseDate, setDistributeApprovalReleaseDate] =
    useState(todayThaiDate);
  const [distributeStatus, setDistributeStatus] = useState("");
  const [distributionNote, setDistributionNote] = useState("");

  //Show Modal
  const [showViewImageModal, setShowViewImageModal] = useState(false);
  const [showDepreciationModal, setDepreciationShowModal] = useState(false);
  const [showAccumulateDepreciationModal, setAccumulateDepreciationShowModal] =
    useState(false);
  const [scanBarcodeModal, setScanBarcodeModal] = useState(false);
  const [scanQRCodeModal, setScanQRCodeModal] = useState(false);

  //Modal ค่าเสื่อมราคา
  const [depreciationStartDate, setDepreciationStartDate] = useState(
    new Date()
  );
  const [depreciationRegisterDate, setDepreciationRegisterDate] = useState(
    new Date()
  );
  const [depreciationReceivedDate, setDepreciationReceivedDate] = useState(
    new Date()
  );
  const [depreciationPrice, setDepreciationPrice] = useState(0);
  const [depreciationYearUsed, setDepreciationYearUsed] = useState(0);
  const [depreciationCarcassPrice, setDepreciationCarcassPrice] = useState(0);
  const [depreciationProcess, setDepreciationProcess] = useState(0);
  const [depreciationPresentMonth, setDepreciationPresentMonth] = useState(0);
  const [depreciationCumulativePrice, setDepreciationCumulativePrice] =
    useState(0);
  const [depreciationYearPrice, setDepreciationYearPrice] = useState(0);
  const [depreciationRemainPrice, setDepreciationRemainPrice] = useState(0);
  const [depreciationBookValue, setDepreciationBookValue] = useState(0);

  //Modal ค่าเสื่อมราคา(ผลรวมจำนวนปี)
  const [accumulateDepreciationStartDate, setAccumulateDepreciationStartDate] =
    useState(new Date());
  const [
    accumulateDepreciationRegisterDate,
    setAccumulateDepreciationRegisterDate,
  ] = useState(new Date());
  const [
    accumulateDepreciationReceivedDate,
    setAccumulateDepreciationReceivedDate,
  ] = useState(new Date());
  const [accumulateDepreciationPrice, setAccumulateDepreciationPrice] =
    useState(0);
  const [accumulateDepreciationYearUsed, setAccumulateDepreciationYearUsed] =
    useState(0);
  const [
    accumulateDepreciationCarcassPrice,
    setAccumulateDepreciationCarcassPrice,
  ] = useState(0);
  const [accumulateDepreciationProcess, setAccumulateDepreciationProcess] =
    useState(0);
  const [
    accumulateDepreciationPresentMonth,
    setAccumulateDepreciationPresentMonth,
  ] = useState(0);
  const [
    accumulateDepreciationCumulativePrice,
    setAccumulateDepreciationCumulativePrice,
  ] = useState(0);
  const [accumulateDepreciationYearPrice, setAccumulateDepreciationYearPrice] =
    useState(0);
  const [
    accumulateDepreciationRemainPrice,
    setAccumulateDepreciationRemainPrice,
  ] = useState(0);
  const [accumulateDepreciationBookValue, setAccumulateDepreciationBookValue] =
    useState(0);

  //Main Date
  const [insuranceStartDate, setInsuranceStartDate] = useState(todayThaiDate);
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState(todayThaiDate);

  // handle
  const handleChangeRealAssetId = (e) => {
    const clone = { ...input };
    clone.realAssetId = e.target.value;
    setInput(clone);
  };
  const handleChangeAssetNumber = (e) => {
    const clone = { ...input };
    clone.assetNumber = e.target.value;
    setInput(clone);
  };
  const handleChangeEngProductName = (e) => {
    const clone = { ...input };
    clone.engProductName = e.target.value;
    setInput(clone);
  };
  const handleChangeProductName = (e) => {
    const clone = { ...input };
    clone.productName = e.target.value;
    setInput(clone);
  };
  const handleChangeType = (e) => {
    const clone = { ...input };
    clone.type = e.target.value;
    setInput(clone);
  };
  const handleChangeKind = (e) => {
    const clone = { ...input };
    clone.kind = e.target.value;
    setInput(clone);
  };
  const handleChangeModel = (e) => {
    const clone = { ...input };
    clone.model = e.target.value;
    setInput(clone);
  };
  const handleChangeSize = (e) => {
    const clone = { ...input };
    clone.size = e.target.value;
    setInput(clone);
  };
  const handleChangeQuantity = (e) => {
    const clone = { ...input };
    clone.quantity = e.target.value;
    setInput(clone);
  };
  const handleChangePricePerUnit = (e) => {
    const clone = { ...input };
    clone.pricePerUnit = e.target.value;
    setInput(clone);
  };
  const handleChangeSource = (e) => {
    const clone = { ...input };
    clone.source = e.target.value;
    setInput(clone);
  };
  const handleChangeAllSector = (e) => {
    const clone = { ...input };
    clone.allSector = e.target.value;
    setInput(clone);
  };
  const handleChangeGuaranteedMonth = (e) => {
    const clone = { ...input };
    clone.guaranteedMonth = e.target.value;
    setInput(clone);
  };
  const handleChangeAsset01 = (e) => {
    const clone = { ...input };
    clone.asset01 = e.target.value;
    setInput(clone);
  };
  const handleChangeSerialNumber = (e) => {
    const clone = { ...input };
    clone.serialNumber = e.target.value;
    setInput(clone);
  };

  //upload image
  // validate size 2mb = 2,000,000 byte
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const cloneFile = [...arrayImage];
    for (let i = 0; i < fileList.length; i++) {
      if (!imageTypes.includes(fileList[i].type)) {
        toast.warn(`${fileList[i].name} is wrong file type!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (fileList[i].size > 2000000) {
        toast.warn(`${fileList[i].name} has more than 2mb!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (cloneFile.length >= 8) {
        toast.warn(`Your images are more than 8!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        cloneFile.push({ image: fileList[i] });
      }
    }

    setArrayImage(cloneFile);
  };

  const deleteImg = (idx) => {
    let clone = [...arrayImage];
    clone.splice(idx, 1);
    setArrayImage(clone);
  };

  //คู่มือและเอกสารแนบ
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const cloneFile = [...arrayDocument];
    for (let i = 0; i < fileList.length; i++) {
      if (fileTypes.includes(fileList[i].type)) {
        cloneFile.push({ document: fileList[i] });
      } else {
        toast.warn(
          `${fileList[i].name} is wrong file type or size is more than 2mb.!`,
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
      }
    }
    setArrayDocument(cloneFile);
  };

  const deleteDoc = (idx) => {
    let clone = [...arrayDocument];
    clone.splice(idx, 1);
    setArrayDocument(clone);
  };

  const handleGenData = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputJSON = JSON.stringify(input);
    const genDataJSON = JSON.stringify(genData);
    const formData = new FormData();
    formData.append("input", inputJSON);
    formData.append("insuranceStartDate", insuranceStartDate);
    formData.append("insuranceExpiredDate", insuranceExpiredDate);
    arrayImage.forEach((file) => {
      formData.append("arrayImage", file.image);
    });
    arrayDocument.forEach((file) => {
      formData.append("arrayDocument", file.document);
    });
    formData.append("genDataJSON", genDataJSON);
    formData.append("depreciationStartDate", depreciationStartDate);
    formData.append("depreciationRegisterDate", depreciationRegisterDate);
    formData.append("depreciationReceivedDate", depreciationReceivedDate);
    formData.append("depreciationPrice", depreciationPrice);
    formData.append("depreciationYearUsed", depreciationYearUsed);
    formData.append("depreciationCarcassPrice", depreciationCarcassPrice);
    formData.append("depreciationProcess", depreciationProcess);
    formData.append("depreciationPresentMonth", depreciationPresentMonth);
    formData.append("depreciationCumulativePrice", depreciationCumulativePrice);
    formData.append("depreciationYearPrice", depreciationYearPrice);
    formData.append("depreciationRemainPrice", depreciationRemainPrice);
    formData.append("depreciationBookValue", depreciationBookValue);

    //Modal ค่าเสื่อมราคา(ผลรวมจำนวนปี)
    formData.append(
      "accumulateDepreciationStartDate",
      accumulateDepreciationStartDate
    );
    formData.append(
      "accumulateDepreciationRegisterDate",
      accumulateDepreciationRegisterDate
    );
    formData.append(
      "accumulateDepreciationReceivedDate",
      accumulateDepreciationReceivedDate
    );
    formData.append("accumulateDepreciationPrice", accumulateDepreciationPrice);
    formData.append(
      "accumulateDepreciationYearUsed",
      accumulateDepreciationYearUsed
    );
    formData.append(
      "accumulateDepreciationCarcassPrice",
      accumulateDepreciationCarcassPrice
    );
    formData.append(
      "accumulateDepreciationProcess",
      accumulateDepreciationProcess
    );
    formData.append(
      "accumulateDepreciationPresentMonth",
      accumulateDepreciationPresentMonth
    );
    formData.append(
      "accumulateDepreciationCumulativePrice",
      accumulateDepreciationCumulativePrice
    );
    formData.append(
      "accumulateDepreciationYearPrice",
      accumulateDepreciationYearPrice
    );
    formData.append(
      "accumulateDepreciationRemainPrice",
      accumulateDepreciationRemainPrice
    );
    formData.append(
      "accumulateDepreciationBookValue",
      accumulateDepreciationBookValue
    );

    //ข้อมูลผู้รับผิดชอบ
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("responsibleSector", responsibleSector);
    formData.append("building", building);
    formData.append("floor", floor);
    formData.append("room", room);

    //สัญญาจัดซื้อ
    formData.append("acquisitionMethod", acquisitionMethod);
    formData.append("moneyType", moneyType);
    formData.append("deliveryDocument", deliveryDocument);
    formData.append("contractNumber", contractNumber);
    formData.append("receivedDate", receivedDate);
    formData.append("seller", seller);
    formData.append("price", price);
    formData.append("billNumber", billNumber);
    formData.append("purchaseYear", purchaseYear);
    formData.append("purchaseDate", purchaseDate);
    formData.append("documentDate", documentDate);

    //การจำหน่าย
    formData.append("salesDocument", salesDocument);
    formData.append("distributeDocumentDate", distributeDocumentDate);
    formData.append(
      "distributeApprovalReleaseDate",
      distributeApprovalReleaseDate
    );
    formData.append("distributeStatus", distributeStatus);
    formData.append("distributionNote", distributionNote);

    await createAsset(formData);
  };

  useEffect(() => {
    if (arrayImage.length < 1) return;
    const newImageUrls = [];
    // console.log(arrayImage);
    arrayImage.forEach(
      (img) => newImageUrls.push(URL.createObjectURL(img.image))
      // console.log(img)
    );
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  // data
  return (
    <>
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}
        <div className="flex items-center">
          <Link
            to="/assetInformationIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">แก้ไขข้อมูลครุภัณฑ์</div>
        </div>
        <div className="flex justify-between items-center">
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
              to="/assetInformationIndex"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline ml-2"
            >
              ข้อมูลครุภัณฑ์
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">แก้ไขข้อมูลครุภัณฑ์</div>
          </div>
        </div>

        {/* block white top */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>บันทึกใบเบิกจ่ายครุภัณฑ์</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* ชื่อครุภัณฑ์ภาษาอังกฤษ */}
            <div>
              <div className="mb-1">ชื่อครุภัณฑ์ภาษาอังกฤษ</div>
              <input
                type="text"
                name="engProductName"
                id="engProductName"
                onChange={handleChangeEngProductName}
                value={input.engProductName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ชื่อครุภัณฑ์ภาษาไทย */}
            <div>
              <div className="mb-1">ชื่อครุภัณฑ์ภาษาไทย</div>
              <input
                type="text"
                name="productName"
                id="productName"
                onChange={handleChangeProductName}
                value={input.productName}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ประเภทครุภัณฑ์ */}
            <div>
              <div className="mb-1">ประเภทครุภัณฑ์</div>
              <input
                type="text"
                name="type"
                id="type"
                onChange={handleChangeType}
                value={input.type}
                className="w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ชนิดครุภัณฑ์ */}
            <div>
              <div className="mb-1">ชนิดครุภัณฑ์</div>
              <input
                type="text"
                name="kind"
                id="kind"
                onChange={handleChangeKind}
                value={input.kind}
                className="w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* ลำดับครุภัณฑ์ (ID) */}
            {/* <div>
              <div className="mb-1">ลำดับครุภัณฑ์ (ID)</div>
              <input
                type="text"
                name="realAssetId"
                id="realAssetId"
                onChange={handleChangeRealAssetId}
                value={input.realAssetId}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div> */}

            {/* หน่วยนับ */}
            <div>
              <div className="mb-1">หน่วยนับ</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"หน่วยนับ"}
                />
              </div>
            </div>

            {/* ขนาด */}
            <div>
              <div className="mb-1">ขนาด</div>
              <input
                type="text"
                name="size"
                id="size"
                onChange={handleChangeSize}
                value={input.size}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* ยี่ห้อ */}
            <div>
              <div className="mb-1">ยี่ห้อ</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ยี่ห้อ"}
                />
              </div>
            </div>
            {/* รุ่น */}
            <div>
              <div className="mb-1">รุ่น</div>
              <input
                type="text"
                name="model"
                id="model"
                onChange={handleChangeModel}
                value={input.model}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* หมวดหมู่ครุภัณฑ์ */}
            <div>
              <div className="mb-1">หมวดหมู่ครุภัณฑ์</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"หมวดหมู่ครุภัณฑ์"}
                />
              </div>
            </div>
            {/* กลุ่ม */}
            <div>
              <div className="mb-1">กลุ่ม</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"กลุ่ม"}
                />
              </div>
            </div>
            {/* ประเภทที่ได้มา */}
            <div>
              <div className="mb-1">ประเภทที่ได้มา</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทที่ได้มา"}
                />
              </div>
            </div>
            {/* แหล่งที่ได้มา */}
            <div>
              <div className="mb-1">แหล่งที่ได้มา</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"แหล่งที่ได้มา"}
                />
              </div>
            </div>
            {/* วัตถุประสงค์ในการใช้งาน */}
            <div>
              <div className="mb-1">วัตถุประสงค์ในการใช้งาน</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"วัตถุประสงค์ในการใช้งาน"}
                />
              </div>
            </div>
            {/* จำนวนเดือนที่รับประกัน (เดือน) */}
            <div>
              <div className="mb-1">จำนวนเดือนที่รับประกัน (เดือน)</div>
              <input
                type="text"
                name="guaranteedMonth"
                id="guaranteedMonth"
                onChange={handleChangeGuaranteedMonth}
                value={input.guaranteedMonth}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* วันที่เริ่มรับประกัน */}
            <div>
              <div className="mb-1">วันที่เริ่มรับประกัน</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={insuranceStartDate}
                  setState={setInsuranceStartDate}
                />
              </div>
            </div>
            {/* วันที่สิ้นสุดรับประกัน */}
            <div>
              <div className="mb-1">วันที่สิ้นสุดรับประกัน</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={insuranceExpiredDate}
                  setState={setInsuranceExpiredDate}
                />
              </div>
            </div>

            {/* หน่วยงานเจ้าของครุภัณฑ์ */}
            <div>
              <div className="mb-1">หน่วยงานเจ้าของครุภัณฑ์</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"หน่วยงานเจ้าของครุภัณฑ์"}
                />
              </div>
            </div>

            {/* สท.01 */}
            <div>
              <div className="mb-1">สท.01</div>
              <input
                type="text"
                name="asset01"
                id="asset01"
                onChange={handleChangeAsset01}
                value={input.asset01}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* Serial Number */}
            <div>
              <div className="mb-1">Serial Number</div>
              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                onChange={handleChangeSerialNumber}
                value={input.serialNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>

            {/* แทนครุภัณฑ์ที่ถูกแทงจำหน่าย */}
            <div>
              <div className="mb-1">แทนครุภัณฑ์ที่ถูกแทงจำหน่าย</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"แทนครุภัณฑ์ที่ถูกแทงจำหน่าย"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ภาพครุภัณฑ์และเอกสารประกอบ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          {/* Header ภาพครุภัณฑ์และเอกสารประกอบ */}
          <div className="font-semibold">ภาพครุภัณฑ์และเอกสารประกอบ</div>
          <div className="flex text-xs mb-6">
            <div className=" text-text-gray mr-1">รูปภาพครุภัณฑ์</div>
            <div className=" text-button-red mr-1">*</div>
            <div className="font-semibold">({arrayImage.length}/8 รูป) </div>
          </div>
          {/* image */}
          <div className="sm:grid sm:grid-cols-6 gap-6">
            <div className="sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-96">
              <img src={boxIcon} className="w-[50px]" />
              <div className="text-text-green font-semibold">
                วางรูปภาพครุภัณฑ์ หรือ
              </div>
              <button
                className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                onClick={() => inputImg.current.click()}
              >
                Upload
              </button>
              <input
                type="file"
                multiple
                className="hidden"
                ref={inputImg}
                onChange={handleImageChange}
              />
              <div className="flex flex-col justify-center items-center">
                <div className="text-text-gray text-sm">
                  สามารถอัพโหลดได้หลายไฟล์
                </div>
                <div className="text-text-gray text-sm">
                  จำกัด 8 ไฟล์ ไฟล์ละไม่เกิน 2MB.
                </div>
                <div className="text-text-gray text-sm">(JPEG , PNG , SVG)</div>
              </div>
              <button
                className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                onClick={() => setShowViewImageModal(true)}
              >
                <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mr-2" />
                ดูรูปภาพ
              </button>
            </div>
            {/* file upload image*/}
            <div className="col-span-2 sm:mt-5">
              {arrayImage.map((el, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b-[1px] mt-2 pb-2"
                >
                  <div className="flex items-center text-text-green">
                    <img src={docIcon} className="w-4 h-4 " />
                    <div className="ml-2 text-sm">{el.image.name}</div>
                  </div>
                  <button
                    className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                    onClick={() => deleteImg(idx)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-6 gap-6 mt-5">
            {/* คู่มือและเอกสารแนบ */}
            <div className="sm:col-span-4">
              <div className="  bg-background-page py-10 px-30 h-40 rounded-lg flex flex-col justify-center items-center gap-4 ">
                <div className=" font-semibold">คู่มือและเอกสารแนบ</div>
                <button
                  className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                  onClick={() => inputDoc.current.click()}
                >
                  เพิ่มคู่มือและเอกสารแนบ
                </button>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={inputDoc}
                  onChange={handleFileChange}
                />
                <div className="text-text-gray text-sm">
                  (DOCX , PDF , XLSX){" "}
                </div>
              </div>
              {/* file upload คู่มือและเอกสารแนบ*/}
              <div className="col-span-4 sm:mt-5">
                {arrayDocument.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b-[1px] mt-2 pb-2"
                  >
                    <div className="flex items-center text-text-green">
                      <img src={docIcon} className="w-4 h-4 " />
                      <div className="ml-2 text-sm">{el.document.name}</div>
                    </div>
                    <button
                      className="text-gray-500  font-semibold w-6 h-6 rounded-full hover:bg-gray-300 hover:text-black flex justify-center items-center text-sm"
                      onClick={() => deleteDoc(idx)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ค่าเสื่อมราคา */}
            <div className="sm:col-span-2 bg-background-page py-10 px-30 h-40 rounded-lg flex flex-col justify-center items-center gap-4">
              <div className=" font-semibold">ค่าเสื่อมราคา</div>
              <DeprecationDropdown
                setDepreciationShowModal={setDepreciationShowModal}
                setAccumulateDepreciationShowModal={
                  setAccumulateDepreciationShowModal
                }
              />
            </div>
          </div>
        </div>

        {/* สัญญาจัดซื้อ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>สัญญาจัดซื้อ</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* วิธีการได้มา */}
            <div>
              <div className="mb-1">วิธีการได้มา</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={acquisitionMethod}
                  setState={setAcquisitionMethod}
                  id={"วิธีการได้มา"}
                />
              </div>
            </div>
            {/* ประเภทเงิน */}
            <div>
              <div className="mb-1">ประเภทเงิน</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={moneyType}
                  setState={setMoneyType}
                  id={"ประเภทเงิน"}
                />
              </div>
            </div>
            {/* เอกสารใบส่งของ */}
            <div>
              <div className="mb-1">เอกสารใบส่งของ</div>
              <input
                type="text"
                name="deliveryDocument"
                id="deliveryDocument"
                onChange={(e) => setDeliveryDocument(e.target.value)}
                value={deliveryDocument}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เลขที่สัญญา */}
            <div>
              <div className="mb-1">เลขที่สัญญา</div>
              <input
                type="text"
                name="contractNumber"
                id="contractNumber"
                onChange={(e) => setContractNumber(e.target.value)}
                value={contractNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* วันที่รับมอบ */}
            <div>
              <div className="mb-1">วันที่รับมอบ</div>
              <div className="flex h-[38px]">
                <DateInput state={receivedDate} setState={setReceivedDate} />
              </div>
            </div>
            {/* ผู้ขาย */}
            <div>
              <div className="mb-1">ผู้ขาย</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={seller}
                  setState={setSeller}
                  id={"ผู้ขาย"}
                />
              </div>
            </div>
            {/* ราคาซื้อ (บาท) */}
            <div>
              <div className="mb-1">ราคาซื้อ (บาท)</div>
              <input
                type="text"
                name="price"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เลขที่ใบเบิก */}
            <div>
              <div className="mb-1">เลขที่ใบเบิก</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                onChange={(e) => setBillNumber(e.target.value)}
                value={billNumber}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* ปีที่ซื้อ */}
            <div>
              <div className="mb-1">ปีที่ซื้อ</div>
              <div className="flex h-[38px]">
                <DateInput state={purchaseYear} setState={setPurchaseYear} />
              </div>
            </div>

            {/* วันที่ซื้อ */}
            <div>
              <div className="mb-1">วันที่ซื้อ</div>
              <div className="flex h-[38px]">
                <DateInput state={purchaseDate} setState={setPurchaseDate} />
              </div>
            </div>
            {/* วันที่ลงเอกสาร */}
            <div>
              <div className="mb-1">วันที่ลงเอกสาร</div>
              <div className="flex h-[38px]">
                <DateInput state={documentDate} setState={setDocumentDate} />
              </div>
            </div>
          </div>
        </div>

        {/* การจำหน่าย */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>การจำหน่าย</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* เอกสารจำหน่าย */}
            <div>
              <div className="mb-1">เอกสารจำหน่าย</div>
              <input
                type="text"
                name="salesDocument"
                id="salesDocument"
                onChange={(e) => setSalesDocument(e.target.value)}
                value={salesDocument}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
            {/* เอกสารลงวันที่ */}
            <div>
              <div className="mb-1">เอกสารลงวันที่</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={distributeDocumentDate}
                  setState={setDistributeDocumentDate}
                />
              </div>
            </div>
            {/* วันอนุมัติจำหน่าย */}
            <div>
              <div className="mb-1">วันอนุมัติจำหน่าย</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={distributeApprovalReleaseDate}
                  setState={setDistributeApprovalReleaseDate}
                />
              </div>
            </div>
            {/* สถานะ */}
            <div>
              <div className="mb-1">สถานะ</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={distributeStatus}
                  setState={setDistributeStatus}
                  id={"สถานะ"}
                />
              </div>
            </div>
            {/* หมายเหตุ */}
            <div>
              <div className="mb-1">หมายเหตุ</div>
              <input
                type="text"
                name="distributionNote"
                id="distributionNote"
                onChange={(e) => setDistributionNote(e.target.value)}
                value={distributionNote}
                className="w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal
          id="ค่าเสื่อมราคา"
          isVisible={showDepreciationModal}
          width={"[800px]"}
          onClose={() => setDepreciationShowModal(false)}
          header={"เพิ่มค่าเสื่อมราคา"}
          showDepreciationModal={showDepreciationModal}
          depreciationPrice={depreciationPrice}
          depreciationYearUsed={depreciationYearUsed}
          depreciationCarcassPrice={depreciationCarcassPrice}
          depreciationProcess={depreciationProcess}
          depreciationPresentMonth={depreciationPresentMonth}
          depreciationCumulativePrice={depreciationCumulativePrice}
          depreciationYearPrice={depreciationYearPrice}
          depreciationRemainPrice={depreciationRemainPrice}
          depreciationBookValue={depreciationBookValue}
        >
          <div className=" px-10 pt-2 pb-10">
            <div className="grid grid-cols-3 gap-x-5 gap-y-3 ">
              {/* ID เลขครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">ID ครุภัณฑ์</div>
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  disabled
                  value={input.serialNumber}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              {/* เลขครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">เลขครุภัณฑ์</div>
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  disabled
                  value={input.serialNumber}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              {/* ชื่อครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">ชื่อครุภัณฑ์</div>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  disabled
                  value={input.productName}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>

              {/* ข้อมูลวันที่ */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ข้อมูลวันที่</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">วันเริ่มคิดค่าเสื่อม</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="depreciationStartDate"
                        id="depreciationStartDate"
                        onChange={(e) =>
                          setDepreciationStartDate(e.target.value)
                        }
                        value={depreciationStartDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="depreciationRegisterDate"
                        id="depreciationRegisterDate"
                        onChange={(e) =>
                          setDepreciationRegisterDate(e.target.value)
                        }
                        value={depreciationRegisterDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="depreciationReceivedDate"
                        id="depreciationReceivedDate"
                        onChange={(e) => {
                          setDepreciationReceivedDate(e.target.value);
                          monthDiff(e.target.value);
                        }}
                        value={depreciationReceivedDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ข้อมูลราคา */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ข้อมูลราคา</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">ราคาซื้อ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="relative">
                        <input
                          type="text"
                          name="ราคาซื้อ"
                          id="ราคาซื้อ"
                          value={depreciationPrice}
                          onChange={(e) => setDepreciationPrice(e.target.value)}
                          className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                        />
                        <p className="text-xs absolute top-2 right-4">บาท</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">จำนวนปีที่ใช้งาน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="จำนวนปีที่ใช้งาน"
                        id="จำนวนปีที่ใช้งาน"
                        value={depreciationYearUsed}
                        onChange={(e) =>
                          setDepreciationYearUsed(e.target.value)
                        }
                        // autoComplete="given-name"
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">ปี</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">ราคาซาก</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="ราคาซาก"
                        id="ราคาซาก"
                        value={depreciationCarcassPrice}
                        onChange={(e) =>
                          setDepreciationCarcassPrice(e.target.value)
                        }
                        // autoComplete="given-name"
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-span-3 flex justify-end ">
              <button className="text-sm text-gray-700 border-[1px] border-gray-400 py-2 px-4 rounded-md hover:bg-gray-100">
                คำนวนค่าเสื่อม
              </button>
            </div> */}

              {/* ราคาค่าเสื่อม */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ราคาค่าเสื่อม</div>
                <div className="grid grid-cols-2 gap-x-28 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมเดือนปัจจุบัน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="ค่าเสื่อมเดือนปัจจุบัน"
                        id="ค่าเสื่อมเดือนปัจจุบัน"
                        disabled="true"
                        value={
                          depreciationPresentMonth == Infinity ||
                          depreciationPresentMonth == -Infinity ||
                          isNaN(depreciationPresentMonth)
                            ? 0
                            : depreciationPresentMonth.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมสะสม</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="ค่าเสื่อมสะสม"
                        id="ค่าเสื่อมสะสม"
                        disabled="true"
                        value={
                          depreciationCumulativePrice == Infinity ||
                          depreciationCumulativePrice == -Infinity ||
                          isNaN(depreciationCumulativePrice)
                            ? 0
                            : depreciationCumulativePrice.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมปีนี้</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="ค่าเสื่อมปีนี้"
                        id="ค่าเสื่อมปีนี้"
                        disabled="true"
                        value={
                          depreciationYearPrice == Infinity ||
                          depreciationYearPrice == -Infinity ||
                          isNaN(depreciationYearPrice)
                            ? 0
                            : depreciationYearPrice.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมคงเหลือ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="ค่าเสื่อมคงเหลือ"
                        id="ค่าเสื่อมคงเหลือ"
                        disabled="true"
                        value={
                          depreciationRemainPrice == Infinity ||
                          depreciationRemainPrice == -Infinity ||
                          isNaN(depreciationRemainPrice)
                            ? 0
                            : depreciationRemainPrice.toFixed(2)
                        }
                        onChange={(e) =>
                          setDepreciationRemainPrice(e.target.value)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">
                      มูลค่าปัจจุบัน (Block Value)
                    </div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="มูลค่าปัจจุบัน (Block Value)"
                        id="มูลค่าปัจจุบัน (Block Value)"
                        disabled="true"
                        value={
                          depreciationBookValue == Infinity ||
                          depreciationBookValue == -Infinity ||
                          isNaN(depreciationBookValue)
                            ? 0
                            : depreciationBookValue.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">
                      เดือน/ปี ที่ทำการประมวลผล
                    </div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="เดือน/ปี ที่ทำการประมวลผล"
                        id="เดือน/ปี ที่ทำการประมวลผล"
                        disabled="true"
                        onChange={(e) => setDepreciationProcess(e.target.value)}
                        value={depreciationProcess}
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          id="ค่าเสื่อมราคา(รายปี)"
          isVisible={showAccumulateDepreciationModal}
          width={"[800px]"}
          onClose={() => setAccumulateDepreciationShowModal(false)}
          header={"เพิ่มค่าเสื่อมราคา(รายปี)"}
          showAccumulateDepreciationModal={showAccumulateDepreciationModal}
          accumulateDepreciationStartDate={accumulateDepreciationStartDate}
          accumulateDepreciationRegisterDate={
            accumulateDepreciationRegisterDate
          }
          accumulateDepreciationReceivedDate={
            accumulateDepreciationReceivedDate
          }
          accumulateDepreciationPrice={accumulateDepreciationPrice}
          accumulateDepreciationYearUsed={accumulateDepreciationYearUsed}
          accumulateDepreciationCarcassPrice={
            accumulateDepreciationCarcassPrice
          }
          accumulateDepreciationProcess={accumulateDepreciationProcess}
          accumulateDepreciationPresentMonth={
            accumulateDepreciationPresentMonth
          }
          accumulateDepreciationCumulativePrice={
            accumulateDepreciationCumulativePrice
          }
          accumulateDepreciationYearPrice={accumulateDepreciationYearPrice}
          accumulateDepreciationRemainPrice={accumulateDepreciationRemainPrice}
          accumulateDepreciationBookValue={accumulateDepreciationBookValue}
        >
          <div className=" px-10 pt-2 pb-10">
            <div className="grid grid-cols-3 gap-x-5 gap-y-3 ">
              {/* ID เลขครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">ID ครุภัณฑ์</div>
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  disabled
                  value={input.serialNumber}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              {/* เลขครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">เลขครุภัณฑ์</div>
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  disabled
                  value={input.serialNumber}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>
              {/* ชื่อครุภัณฑ์ */}
              <div className="">
                <div className="mb-1 text-xs">ชื่อครุภัณฑ์</div>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  disabled
                  value={input.productName}
                  className=" w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
                />
              </div>

              {/* ข้อมูลวันที่ */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ข้อมูลวันที่</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">วันเริ่มคิดค่าเสื่อม</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="accumulateDepreciationStartDate"
                        id="accumulateDepreciationStartDate"
                        onChange={(e) =>
                          setAccumulateDepreciationStartDate(e.target.value)
                        }
                        value={accumulateDepreciationStartDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="accumulateDepreciationRegisterDate"
                        id="accumulateDepreciationRegisterDate"
                        onChange={(e) =>
                          setAccumulateDepreciationRegisterDate(e.target.value)
                        }
                        value={accumulateDepreciationRegisterDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="accumulateDepreciationReceivedDate"
                        id="accumulateDepreciationReceivedDate"
                        onChange={(e) => {
                          setAccumulateDepreciationReceivedDate(e.target.value);
                          accMonthDiff(e.target.value);
                        }}
                        value={accumulateDepreciationReceivedDate}
                        // autoComplete="given-name"
                        className=" block w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ข้อมูลราคา */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ข้อมูลราคา</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">ราคาซื้อ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="relative">
                        <input
                          type="text"
                          name="accumulateDepreciationPrice"
                          id="accumulateDepreciationPrice"
                          value={accumulateDepreciationPrice}
                          onChange={(e) =>
                            setAccumulateDepreciationPrice(e.target.value)
                          }
                          className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                        />
                        <p className="text-xs absolute top-2 right-4">บาท</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">จำนวนปีที่ใช้งาน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationYearUsed"
                        id="accumulateDepreciationYearUsed"
                        value={accumulateDepreciationYearUsed}
                        onChange={(e) =>
                          setAccumulateDepreciationYearUsed(e.target.value)
                        }
                        // autoComplete="given-name"
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">ปี</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">ราคาซาก</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationCarcassPrice"
                        id="accumulateDepreciationCarcassPrice"
                        value={accumulateDepreciationCarcassPrice}
                        onChange={(e) =>
                          setAccumulateDepreciationCarcassPrice(e.target.value)
                        }
                        // autoComplete="given-name"
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-span-3 flex justify-end ">
              <button className="text-sm text-gray-700 border-[1px] border-gray-400 py-2 px-4 rounded-md hover:bg-gray-100">
                คำนวนค่าเสื่อม
              </button>
            </div> */}

              {/* ราคาค่าเสื่อม */}
              <div className="col-span-3">
                <div className="text-lg font-bold">ราคาค่าเสื่อม</div>
                <div className="grid grid-cols-2 gap-x-28 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมเดือนปัจจุบัน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationPresentMonth"
                        id="accumulateDepreciationPresentMonth"
                        disabled="true"
                        value={
                          accumulateDepreciationPresentMonth == Infinity ||
                          accumulateDepreciationPresentMonth == -Infinity ||
                          isNaN(accumulateDepreciationPresentMonth)
                            ? 0
                            : accumulateDepreciationPresentMonth.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมสะสม</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationCumulativePrice"
                        id="accumulateDepreciationCumulativePrice"
                        disabled="true"
                        value={
                          accumulateDepreciationCumulativePrice == Infinity ||
                          accumulateDepreciationCumulativePrice == -Infinity ||
                          isNaN(accumulateDepreciationCumulativePrice)
                            ? 0
                            : accumulateDepreciationCumulativePrice.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมปีนี้</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationYearPrice"
                        id="accumulateDepreciationYearPrice"
                        disabled="true"
                        value={
                          accumulateDepreciationYearPrice == Infinity ||
                          accumulateDepreciationYearPrice == -Infinity ||
                          isNaN(accumulateDepreciationYearPrice)
                            ? 0
                            : accumulateDepreciationYearPrice.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">ค่าเสื่อมคงเหลือ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationRemainPrice"
                        id="accumulateDepreciationRemainPrice"
                        disabled="true"
                        value={
                          accumulateDepreciationRemainPrice == Infinity ||
                          accumulateDepreciationRemainPrice == -Infinity ||
                          isNaN(accumulateDepreciationRemainPrice)
                            ? 0
                            : accumulateDepreciationRemainPrice.toFixed(2)
                        }
                        // onChange={(e) =>
                        //   setDepreciationRemainPrice(e.target.value)
                        // }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">
                      มูลค่าปัจจุบัน (Block Value)
                    </div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="text"
                        name="accumulateDepreciationBookValue"
                        id="accumulateDepreciationBookValue"
                        disabled="true"
                        value={
                          accumulateDepreciationBookValue == Infinity ||
                          accumulateDepreciationBookValue == -Infinity ||
                          isNaN(accumulateDepreciationBookValue)
                            ? 0
                            : accumulateDepreciationBookValue.toFixed(2)
                        }
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                      <p className="text-xs absolute top-2 right-4">บาท</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-xs">
                      เดือน/ปี ที่ทำการประมวลผล
                    </div>
                    <div className="inline-block relative w-full h-[41px]">
                      <input
                        type="date"
                        name="เดือน/ปี ที่ทำการประมวลผล"
                        id="เดือน/ปี ที่ทำการประมวลผล"
                        disabled="true"
                        // onChange={(e) => setDepreciationProcess(e.target.value)}
                        value={accumulateDepreciationProcess}
                        className="w-full shadow-sm focus:ring-blue focus:border-blue  sm:text-xs border-gray-300 bg-gray-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* scan barcode */}
        {/* <Modal
          id="scanBarcodeModal"
          isVisible={scanBarcodeModal}
          width={"[800px]"}
          onClose={() => setScanBarcodeModal(false)}
          header={"Scan Barcode"}
          scanBarcodeModal={scanBarcodeModal}
        >
          <div className=" px-10 pt-2 pb-10">
            <BarcodeScanner
              state={genData}
              setState={setGenData}
              index={indexGenData}
              setIndex={setIndexGenData}
              barcode={barcode}
              setBarcode={setBarcode}
              qr={qr}
              setQr={setQr}
            />
          </div>
        </Modal> */}

        {/* scan qrcode */}
        {/* <Modal
          id="scanQRCodeModal"
          isVisible={scanQRCodeModal}
          width={"[800px]"}
          onClose={() => setScanQRCodeModal(false)}
          header={"Scan QRrcode"}
          scanQRCodeModal={scanQRCodeModal}
        >
          <div className=" px-10 pt-2 pb-10">
            <QRscanner
              state={genData}
              setState={setGenData}
              index={indexGenData}
              setIndex={setIndexGenData}
              barcode={barcode}
              setBarcode={setBarcode}
              qr={qr}
              setQr={setQr}
            />
          </div>
        </Modal> */}

        {/* view image */}
        <Modal
          id="showViewImageModal"
          isVisible={showViewImageModal}
          width={"[800px]"}
          onClose={() => setShowViewImageModal(false)}
          header={"รูปภาพครุภัณฑ์"}
          showViewImageModal={showViewImageModal}
        >
          <div className=" px-10 pt-2 pb-10">
            {arrayImageURL.map((el, idx) => (
              <img src={el} className="w-[640px] mb-5" />
            ))}
          </div>
        </Modal>

        <ToastContainer />
      </div>


      {/* footer */}
      <div className="bg-white">
        <div className=" flex justify-between items-center gap-10 p-5 text-sm mr-12">
          <button
            type="button"
            className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
          >
            ยกเลิก
          </button>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
              onClick={handleSubmit}
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAssetInformation;