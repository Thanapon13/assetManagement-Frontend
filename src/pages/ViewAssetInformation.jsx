import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { BsArrowLeft } from "react-icons/bs";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import { createAsset, getAssetById } from "../api/assetApi";
import { useBarcode } from "@createnextapp/react-barcode";
import ReactToPrint from "react-to-print";
import QRcode from "qrcode.react";
import RowOfTableBorrowHistory from "../components/table/RowOfTableBorrowHistory";
import RowOfTableBuildingHistory from "../components/table/RowOfTableBuildingHistory";
import OnlyDateInput from "../components/date/onlyDateInput";
import { getViewBorrowHistoryByAssetId } from "../api/borrowApi";

const ViewAssetInformation = () => {
  const { assetId } = useParams();
  const inputImg = useRef();
  const inputDoc = useRef();
  const printRef = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  let options = { day: "2-digit", month: "2-digit", year: "numeric" };

  // useState
  const [perPage, setPerPage] = useState(10);

  const [input, setInput] = useState({
    // ID: "",
    // serialNumber: "",
    engProductName: "คอมพิวเตอร์ตั้งโต๊ะ Hp AIO 24",
    productName: "HP DESKTOP AIO 24-cb1005d",
    type: "อุปกรณ์อิเล็กทรอนิกส์",
    kind: "คอมพิวเตอร์",
    realAssetId: "179",
    unit: "",
    brand: "HP",
    model: "AIO 24-cb1005d",
    size: "",
    quantity: 0,
    serialNumberMachine: "",
    source: "เสนอราคาจากจัดซื้อ",
    category: "คอมพิวเตอร์",
    acquiredType: "จัดซื้อ",
    group: "",
    pricePerUnit: 0,
    guaranteedMonth: "12",
    purposeOfUse: "เครื่องคอมสำนักงาน",
    allSector: "",
    assetNumber: "7440-001-0001 2013(1)-65",
    asset01: "01.6503/071",
    selfSector: "สำนักบริหารงานเภสัช",
    serialNumber: "MRV1632HJBC1669",
    sector: "",
    replacedAssetNumber: "",
    price: "22000",

    status: "not approve",
  });

  // ประวัติการยืม
  const [borrowHistoryList, setBorrowHistoryList] = useState([])

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);
  const [img, setImg] = useState();

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);


  // ประวัติสถานที่ตั้ง
  const [buildingData, setBuildingData] = useState([
    {
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับรองพิเศษ",
      moveInDate: "19/04/2564",
      moveOutDate: "8/09/2564",
    },
    {
      building: "อาคารภูมิรัตน์ 100 ปีเฉลิมพระเกียรติ",
      floor: "12",
      room: "ห้องรับรองพิเศษ",
      moveInDate: "19/04/2564",
      moveOutDate: "8/09/2564",
    },
  ]);

  const [indexGenData, setIndexGenData] = useState(0);
  const [barcode, setBarcode] = useState(input?.serialNumber);
  const [qr, setQr] = useState(input?.serialNumber);

  // console.log(barcode,"barcode")

  // สัญญาจัดซื้อ
  const [acquisitionMethod, setAcquisitionMethod] = useState("");
  const [moneyType, setMoneyType] = useState("");
  const [deliveryDocument, setDeliveryDocument] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [receivedDate, setReceivedDate] = useState();
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [purchaseYear, setPurchaseYear] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [documentDate, setDocumentDate] = useState();

  // การจำหน่าย
  const [salesDocument, setSalesDocument] = useState("");
  const [distributeDocumentDate, setDistributeDocumentDate] =
    useState();
  const [distributeApprovalReleaseDate, setDistributeApprovalReleaseDate] =
    useState();
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
  const [depreciationProcess, setDepreciationProcess] = useState(new Date());
  const [depreciationPresentMonth, setDepreciationPresentMonth] = useState();
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
    useState(new Date());
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
  const [insuranceStartDate, setInsuranceStartDate] = useState();
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState();

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      background: "#ffffff",
    },
  });

  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        const res = await getAssetById(assetId);
        console.log(res.data.asset);
        const asset = res.data.asset;

        setImg(asset.imageArray[0].image);

        setInput({
          ...input,
          engProductName: asset.engProductName,
          productName: asset.productName,
          type: asset.type,
          kind: asset.kind,
          realAssetId: asset.realAssetId,
          unit: asset.unit,
          brand: asset.brand,
          model: asset.model,
          size: asset.size,
          quantity: asset.quantity,
          source: asset.source,
          category: asset.category,
          acquiredType: asset.acquiredType,
          group: asset.group,
          pricePerUnit: asset.pricePerUnit,
          guaranteedMonth: asset.guaranteedMonth,
          purposeOfUse: asset.purposeOfUse,
          allSector: asset.allSector,
          assetNumber: asset.assetNumber,
          sector: asset.sector,
          asset01: asset.asset01,
          serialNumber: asset.serialNumber,
          replacedAssetNumber: asset.replacedAssetNumber,
        });
        setInsuranceStartDate((asset.insuranceStartDate));
        setInsuranceExpiredDate(asset.insuranceExpiredDate);

        setQr(asset.serialNumber);
        setBarcode(asset.serialNumber);

        const fetchImages = asset.imageArray;
        const clone = [...arrayImage];
        for (let el of fetchImages) {
          clone.push({ image: { name: el.image, _id: el._id } });
        }
        setArrayImage(clone);

        console.log(asset.documentArray);
        const fetchDocuments = asset.documentArray;
        const cloneDoc = [...arrayDocument];
        for (let el of fetchDocuments) {
          cloneDoc.push({ document: { name: el.document, _id: el._id } });
        }
        // console.log(cloneDoc);

        setArrayDocument(cloneDoc);

        //Modal ค่าเสื่อมราคา
        setDepreciationStartDate(asset.depreciationStartDate);
        setDepreciationRegisterDate(asset.depreciationRegisterDate);
        setDepreciationReceivedDate(asset.depreciationReceivedDate);
        setDepreciationPrice(asset.depreciationPrice);
        setDepreciationYearUsed(asset.depreciationYearUsed);
        setDepreciationCarcassPrice(asset.depreciationCarcassPrice);
        setDepreciationProcess(asset.depreciationProcess);
        setDepreciationPresentMonth(asset.depreciationPresentMonth);
        setDepreciationCumulativePrice(asset.depreciationCumulativePrice);
        setDepreciationYearPrice(asset.depreciationYearPrice);
        setDepreciationRemainPrice(asset.depreciationRemainPrice);
        setDepreciationBookValue(asset.depreciationBookValue);

        // console.log(new Date(asset.depreciationStartDate));
        //Modal ค่าเสื่อมราคา(ผลรวมจำนวนปี)
        setAccumulateDepreciationStartDate(
          asset.accumulateDepreciationStartDate
        );
        setAccumulateDepreciationRegisterDate(
          asset.accumulateDepreciationRegisterDate
        );
        setAccumulateDepreciationReceivedDate(
          asset.accumulateDepreciationReceivedDate
        );
        setAccumulateDepreciationPrice(asset.accumulateDepreciationPrice);
        setAccumulateDepreciationYearUsed(asset.accumulateDepreciationYearUsed);
        setAccumulateDepreciationCarcassPrice(
          asset.accumulateDepreciationCarcassPrice
        );
        setAccumulateDepreciationProcess(asset.accumulateDepreciationProcess);
        setAccumulateDepreciationPresentMonth(
          asset.accumulateDepreciationPresentMonth
        );
        setAccumulateDepreciationCumulativePrice(
          asset.accumulateDepreciationCumulativePrice
        );
        setAccumulateDepreciationYearPrice(
          asset.accumulateDepreciationYearPrice
        );
        setAccumulateDepreciationRemainPrice(
          asset.accumulateDepreciationRemainPrice
        );
        setAccumulateDepreciationBookValue(
          asset.accumulateDepreciationBookValue
        );

        // สัญญาจัดซื้อ
        setAcquisitionMethod(asset.purchaseContract.acquisitionMethod);
        setMoneyType(asset.purchaseContract.moneyType);
        setDeliveryDocument(asset.purchaseContract.deliveryDocument);
        setContractNumber(asset.purchaseContract.contractNumber);
        setReceivedDate(asset.purchaseContract.receivedDate);
        setSeller(asset.purchaseContract.seller);
        setPrice(asset.purchaseContract.price);
        setBillNumber(asset.purchaseContract.billNumber);
        setPurchaseYear(asset.purchaseContract.purchaseYear);
        setPurchaseDate(asset.purchaseContract.purchaseDate);
        setDocumentDate(asset.purchaseContract.documentDate);
        // การจำหน่าย
        setSalesDocument(asset.distribution.salesDocument);
        setDistributeStatus(asset.distribution.distributeStatus);
        setDistributionNote(asset.distribution.distributionNote);
        setSalesDocument(asset.distribution.salesDocument);
        setDistributeDocumentDate(
          asset.distribution.distributeDocumentDate
        );
        setDistributeApprovalReleaseDate(
          asset.distribution.distributeApprovalReleaseDate
        );
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBorrowHistoryByAssetId = async () => {
      const res = await getViewBorrowHistoryByAssetId(assetId);
      const borrowHistoryArray = res.data.borrows
      setBorrowHistoryList(borrowHistoryArray)
      console.log("borrowHistoryArray", borrowHistoryArray);
    };
    fetchAssetById();
    fetchBorrowHistoryByAssetId();
  }, []);

  useEffect(() => {
    // console.log(2);
    if (arrayImage.length < 1) return;
    const newImageUrls = [];
    arrayImage.forEach((img) => {
      if (img.image._id) {
        newImageUrls.push(`http://localhost:4000/images/${img.image.name}`);
      } else {
        newImageUrls.push(URL.createObjectURL(img.image));
      }
    });
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  // data
  return (
    <>
      <div className="bg-background-page px-5 pt-10 pb-10">
        {/* Header */}
        <div className="flex items-center mr-10">
          <Link
            to="/assetInformationIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">รายละเอียดครุภัณฑ์</div>
        </div>
        <div className="flex justify-between items-center mr-10">
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
            <div className="text-text-gray ml-2">รายละเอียดครุภัณฑ์</div>
          </div>

          <div
            className="flex justify-center relative"
            onClick={() => {
              setIndexGenData(index);
            }}
          >
            <ReactToPrint
              trigger={() => {
                return (
                  <button
                    type="button"
                    className="-ml-2 flex justify-center items-center text-white bg-blue-500 hover:bg-focus-blue rounded-lg focus:border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-blue focus:border-focus-blue  px-3 py-2 "
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4 4H3.6V1C3.6 0.716667 3.6861 0.479 3.8583 0.287C4.0311 0.0956666 4.245 0 4.5 0H13.5C13.755 0 13.9686 0.0956666 14.1408 0.287C14.3136 0.479 14.4 0.716667 14.4 1V4ZM14.4 9.5C14.655 9.5 14.8686 9.404 15.0408 9.212C15.2136 9.02067 15.3 8.78333 15.3 8.5C15.3 8.21667 15.2136 7.979 15.0408 7.787C14.8686 7.59567 14.655 7.5 14.4 7.5C14.145 7.5 13.9314 7.59567 13.7592 7.787C13.5864 7.979 13.5 8.21667 13.5 8.5C13.5 8.78333 13.5864 9.02067 13.7592 9.212C13.9314 9.404 14.145 9.5 14.4 9.5ZM5.4 16H12.6V12H5.4V16ZM5.4 18C4.905 18 4.4814 17.8043 4.1292 17.413C3.7764 17.021 3.6 16.55 3.6 16V14H0.9C0.645 14 0.4314 13.904 0.2592 13.712C0.0864001 13.5207 0 13.2833 0 13V8C0 7.15 0.2625 6.43767 0.7875 5.863C1.3125 5.28767 1.95 5 2.7 5H15.3C16.065 5 16.7064 5.28767 17.2242 5.863C17.7414 6.43767 18 7.15 18 8V13C18 13.2833 17.9136 13.5207 17.7408 13.712C17.5686 13.904 17.355 14 17.1 14H14.4V16C14.4 16.55 14.2239 17.021 13.8717 17.413C13.5189 17.8043 13.095 18 12.6 18H5.4Z"
                          fill="white"
                        />
                      </svg>
                      <div className="ml-2 text-sm">พิมพ์สติกเกอร์</div>
                    </div>
                  </button>
                );
              }}
              content={() => printRef.current}
              // documentTitle="kiminoto doc"
              // pageStyle="print"
              onAfterPrint={() => console.log("print")}
            />
          </div>

          <div ref={printRef} className="absolute -z-10">
            {barcode !== "" ? (
              <canvas id="mybarcode" ref={inputRef} className="w-full" />
            ) : (
              <p>No barcode preview</p>
            )}
            <div>
              {qr ? (
                <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
              ) : (
                <p>No QR code preview</p>
              )}
            </div>
          </div>
        </div>

        {/* block white top */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-4">
          <div>ข้อมูลครุภัณฑ์</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* ชื่อครุภัณฑ์ภาษาอังกฤษ */}
            <div className="text-gray-500">ชื่อครุภัณฑ์ภาษาอังกฤษ</div>
            <div>
              {input?.engProductName !== "" ? input?.engProductName : "-"}
            </div>
            {/* ชื่อครุภัณฑ์ภาษาไทย */}
            <div className="text-gray-500">ชื่อครุภัณฑ์ภาษาไทย</div>
            <div>{input?.productName !== "" ? input?.productName : "-"}</div>
            {/* ประเภทครุภัณฑ์ */}
            <div className="text-gray-500">ประเภทครุภัณฑ์</div>
            <div>{input?.type !== "" ? input?.type : "-"}</div>
            {/* ชนิดครุภัณฑ์ */}
            <div className="text-gray-500">ชนิดครุภัณฑ์</div>
            <div>{input?.kind !== "" ? input?.kind : "-"}</div>
            {/* กลุ่ม */}
            <div className="text-gray-500">กลุ่ม</div>
            <div>{input?.group !== "" ? input?.group : "-"}</div>
            {/* หมวด */}
            <div className="text-gray-500">หมวด</div>
            <div>{input?.category !== "" ? input?.category : "-"}</div>
            {/* ราคาต่อหน่วย (บาท) */}
            <div className="text-gray-500">ราคาต่อหน่วย (บาท)</div>
            <div>{input?.price !== "" ? input?.price : "-"}</div>
            {/* ลำดับครุภัณฑ์ */}
            <div className="text-gray-500">ลำดับครุภัณฑ์</div>
            <div>{input?.realAssetId !== "" ? input?.realAssetId : "-"}</div>
            {/* ยี่ห้อ */}
            <div className="text-gray-500">ยี่ห้อ</div>
            <div>{input?.brand !== "" ? input?.brand : "-"}</div>
            {/* รุ่น */}
            <div className="text-gray-500">รุ่น</div>
            <div>{input?.model !== "" ? input?.model : "-"}</div>
            {/* เลขครุภัณฑ์ */}
            <div className="text-gray-500">เลขครุภัณฑ์</div>
            <div>{input?.assetNumber !== "" ? input?.assetNumber : "-"}</div>
            {/* Serial Number */}
            <div className="text-gray-500">Serial Number</div>
            <div>{input?.serialNumber !== "" ? input?.serialNumber : "-"}</div>
            {/* ขนาด */}
            <div className="text-gray-500">ขนาด</div>
            <div>{input?.size !== "" ? input?.size : "-"}</div>
            {/* หน่วยงานเจ้าของครุภัณฑ์ */}
            <div className="text-gray-500">หน่วยงานเจ้าของครุภัณฑ์</div>
            <div>{input?.selfSector !== "" ? input?.selfSector : "-"}</div>
            {/* ประเภทที่ได้มา */}
            <div className="text-gray-500">ประเภทที่ได้มา</div>
            <div>{input?.acquiredType !== "" ? input?.acquiredType : "-"}</div>
            {/* แหล่งที่ได้มา */}
            <div className="text-gray-500">แหล่งที่ได้มา</div>
            <div>{input?.source !== "" ? input?.source : "-"}</div>
            {/* วันที่เริ่มรับประกัน */}
            <div className="text-gray-500">วันที่เริ่มรับประกัน</div>
            <div>
              {ChangeDateToBuddhist(insuranceStartDate)}
              {/* {insuranceStartDate !== ""
                ? insuranceStartDate?.toLocaleDateString("en-GB", options)
                : "-"} */}
            </div>
            {/* วันที่สิ้นสุดการรับประกัน */}
            <div className="text-gray-500">วันที่สิ้นสุดการรับประกัน</div>
            <div>
              {ChangeDateToBuddhist(insuranceExpiredDate)}
              {/* {insuranceExpiredDate !== ""
                ? insuranceExpiredDate?.toLocaleDateString("en-GB", options)
                : "-"} */}
            </div>
            {/* ระยะเวลารับประกัน(เดือน) */}
            <div className="text-gray-500">ระยะเวลารับประกัน(เดือน)</div>
            <div>
              {input?.guaranteedMonth !== "" ? input?.guaranteedMonth : "-"}
            </div>
            {/* วัตถุประสงค์การใช้งาน */}
            <div className="text-gray-500">วัตถุประสงค์การใช้งาน</div>
            <div>{input?.purposeOfUse !== "" ? input?.purposeOfUse : "-"}</div>
            {/* สท.01 */}
            <div className="text-gray-500">สท.01</div>
            <div>{input?.asset01 !== "" ? input?.asset01 : "-"}</div>
            {/* แทนครุภัณฑ์ */}
            <div className="text-gray-500">แทนครุภัณฑ์</div>
            <div>
              {input?.replacedAssetNumber !== ""
                ? input?.replacedAssetNumber
                : "-"}
            </div>
          </div>
        </div>

        {/* ภาพครุภัณฑ์และเอกสารประกอบ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-4">
          {/* Header ภาพครุภัณฑ์และเอกสารประกอบ */}
          <div className="font-semibold mb-3">ภาพครุภัณฑ์และเอกสารประกอบ</div>
          <div className="lg:grid lg:grid-cols-6 gap-6">
            {/* left image */}
            <div className="lg:col-span-3 border-2 border-gray-300  px-30 rounded-lg flex flex-col justify-center items-center gap-4  ">
              <div className="overflow-y-auto scrollbar ">
                <div className="h-[550px]">
                  <div className=" px-5 pt-5  pb-10">
                    {arrayImageURL?.map((el, idx) => (
                      <img
                        key={idx}
                        crossOrigin="true"
                        src={el}
                        className="w-[640px] mb-5"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="lg:col-span-3 mt-5 lg:mt-0">
              {/* คู่มือและเอกสารแนบ */}
              <div className="  bg-background-page p-5 h-72 rounded-lg mb-5  gap-4 ">
                <div className=" font-semibold text-center mb-3">
                  คู่มือและเอกสารแนบ
                </div>
                {arrayDocument?.map((el, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center mb-2 text-gray-400"
                  >
                    <div className="flex items-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_977_14129)">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            fill-opacity="0.01"
                          />
                          <g clip-path="url(#clip1_977_14129)">
                            <path
                              d="M12.2495 3.93671V12.2492C12.2495 12.7133 12.0651 13.1585 11.7369 13.4866C11.4088 13.8148 10.9636 13.9992 10.4995 13.9992H3.49951C3.03538 13.9992 2.59026 13.8148 2.26207 13.4866C1.93389 13.1585 1.74951 12.7133 1.74951 12.2492V1.74921C1.74951 1.28508 1.93389 0.839958 2.26207 0.51177C2.59026 0.183581 3.03538 -0.000793457 3.49951 -0.000793457H8.31201L12.2495 3.93671ZM9.62451 3.93671C9.27641 3.93671 8.94258 3.79843 8.69643 3.55228C8.45029 3.30614 8.31201 2.9723 8.31201 2.62421V0.874207H3.49951C3.26745 0.874207 3.04489 0.966394 2.88079 1.13049C2.7167 1.29458 2.62451 1.51714 2.62451 1.74921V12.2492C2.62451 12.4813 2.7167 12.7038 2.88079 12.8679C3.04489 13.032 3.26745 13.1242 3.49951 13.1242H10.4995C10.7316 13.1242 10.9541 13.032 11.1182 12.8679C11.2823 12.7038 11.3745 12.4813 11.3745 12.2492V3.93671H9.62451Z"
                              fill="#999999"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_977_14129">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                          <clipPath id="clip1_977_14129">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="ml-2 text-sm">{el.document.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* ค่าเสื่อมราคา  :  คำนวนค่าเสื่อมราคา(ปกติ) */}
              <div className=" bg-background-page py-10 px-30 h-40 rounded-lg flex flex-col justify-center items-center gap-4">
                <div className=" font-semibold">
                  ค่าเสื่อมราคา : คำนวนค่าเสื่อมราคา(ปกติ)
                </div>
                <DeprecationDropdown
                  setDepreciationShowModal={setDepreciationShowModal}
                  setAccumulateDepreciationShowModal={
                    setAccumulateDepreciationShowModal
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* สัญญาจัดซื้อ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-4">
          <div className="font-semibold">สัญญาจัดซื้อ</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* วิธีการได้มา */}
            <div className="text-gray-500">วิธีการได้มา</div>
            <div>{acquisitionMethod !== "" ? acquisitionMethod : "-"}</div>
            {/* ประเภทเงิน */}
            <div className="text-gray-500">ประเภทเงิน</div>
            <div>{moneyType !== "" ? moneyType : "-"}</div>
            {/* เลขที่สัญญา */}
            <div className="text-gray-500">เลขที่สัญญา</div>
            <div>{contractNumber !== "" ? contractNumber : "-"}</div>
            {/* เอกสารใบส่งของ */}
            <div className="text-gray-500">เอกสารใบส่งของ</div>
            <div>{deliveryDocument !== "" ? deliveryDocument : "-"}</div>
            {/* ผู้ขาย */}
            <div className="text-gray-500">ผู้ขาย</div>
            <div>{seller !== "" ? seller : "-"}</div>
            {/* เลขที่ใบเบิก */}
            <div className="text-gray-500">เลขที่ใบเบิก</div>
            <div>{billNumber !== "" ? billNumber : "-"}</div>
            {/* วันที่ซื้อ */}
            <div className="text-gray-500">วันที่ซื้อ</div>
            <div>
            {ChangeDateToBuddhist(purchaseDate)}
              {/* {purchaseDate !== ""
                ? purchaseDate?.toLocaleDateString("en-GB", options)
                : "-"} */}
            </div>
            {/* วันที่รับมอบ */}
            <div className="text-gray-500">วันที่รับมอบ</div>
            <div>
            {ChangeDateToBuddhist(receivedDate)}
              {/* {receivedDate !== ""
                ? receivedDate?.toLocaleDateString("en-GB", options)
                : "-"} */}
            </div>
            {/* ราคาซื้อ (บาท) */}
            <div className="text-gray-500">ราคาซื้อ (บาท)</div>
            <div>{price !== "" ? price : "-"}</div>
            {/* ปีงบประมาณที่ซื้อ */}
            <div className="text-gray-500">ปีงบประมาณที่ซื้อ</div>
            <div>
            {/* {ChangeDateToBuddhist(purchaseYear)} */}
              {/* {purchaseYear !== ""
                ? purchaseYear?.toLocaleDateString("en-GB", options)
                : "-"} */}
            </div>
            {/* วันที่ลงเอกสาร */}
            <div className="text-gray-500">วันที่ลงเอกสาร</div>
            <div>
            {ChangeDateToBuddhist(documentDate)}
            </div>
          </div>
        </div>

        {/* การจำหน่าย */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-4">
          <div className="font-semibold">การจำหน่าย</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* เอกสารจำหน่าย */}
            <div className="text-gray-500">เอกสารจำหน่าย</div>
            <div>{salesDocument !== "" ? salesDocument : "-"}</div>
            {/* เอกสารลงวันที่ */}
            <div className="text-gray-500">เอกสารลงวันที่</div>
            <div>
            {ChangeDateToBuddhist(distributeDocumentDate)}
            </div>
            {/* วันอนุมัติจำหน่าย */}
            <div className="text-gray-500">วันอนุมัติจำหน่าย</div>
            <div>
            {ChangeDateToBuddhist(distributeApprovalReleaseDate)}
            </div>
            {/* สถานะ */}
            <div className="text-gray-500">สถานะ</div>
            <div>{distributeStatus !== "" ? distributeStatus : "-"}</div>
            {/* หมายเหตุ */}
            <div className="text-gray-500">หมายเหตุ</div>
            <div>{distributionNote !== "" ? distributionNote : "-"}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold mb-3">ประวัติการยืม</div>
          {!borrowHistoryList.length ? <div className="text-center pb-5">-</div> :
            <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
              <div className="w-[1000px] lg:w-full max-h-[400px] ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                  <div className="grid grid-cols-15 gap-2 text-center">
                    <div className="ml-2">ลำดับ</div>
                    <div className="col-span-2">เลขที่เอกสารยืม</div>
                    <div className="col-span-2">ผู้ดำเนินการ</div>
                    <div className="col-span-2">หน่วยงานที่ยืม</div>
                    <div className="col-span-2">วันที่ยืม</div>
                    <div className="col-span-2">กำหนดคืน</div>
                    <div className="col-span-2">วันที่คืน</div>
                    <div className="col-span-2">สถานะ</div>
                  </div>
                </div>
                {borrowHistoryList?.map((el, idx) => {
                  return (
                    <RowOfTableBorrowHistory
                      key={idx}
                      index={idx}
                      borrowIdDoc={el?.borrowIdDoc}
                      sector={el?.sector}
                      borrowDate={el?.borrowDate}
                      borrowSetReturnDate={el?.borrowSetReturnDate}
                      borrowReturnDate={el?.borrowReturnDate}
                      handler={
                        el?.handler
                      }
                      status={el?.status}
                    />
                  );
                })}
              </div>
            </div>
          }
        </div>

        <div className="bg-white rounded-lg mx-10 my-3 p-4">
          <div className="font-semibold mb-3">ประวัติสถานที่ตั้ง</div>
          <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
            <div className="w-[1000px] lg:w-full max-h-[400px] ">
              <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                <div className="grid grid-cols-12 gap-2 text-center">
                  <div className="ml-2">ลำดับ</div>
                  <div className="col-span-4">อาคาร</div>
                  <div className="">ชั้น</div>
                  <div className="col-span-2">ห้อง</div>
                  <div className="col-span-2">วันที่ย้ายเข้า</div>
                  <div className="col-span-2">วันที่ย้ายออก</div>
                </div>
              </div>
              {buildingData?.map((el, idx) => {
                return (
                  <RowOfTableBuildingHistory
                    key={idx}
                    index={idx}
                    building={buildingData[idx]?.building}
                    floor={buildingData[idx]?.floor}
                    room={buildingData[idx]?.room}
                    moveInDate={buildingData[idx]?.moveInDate}
                    moveOutDate={buildingData[idx]?.moveOutDate}
                  />
                );
              })}
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
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={depreciationStartDate}
                          setState={setDepreciationStartDate}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={depreciationRegisterDate}
                        setState={setDepreciationRegisterDate}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={depreciationReceivedDate}
                        setState={setDepreciationReceivedDate}
                        disabled={true}
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
                      <OnlyDateInput
                        disabled={true}
                        state={depreciationProcess}
                        setState={setDepreciationProcess}
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
                      <OnlyDateInput
                        state={accumulateDepreciationStartDate}
                        setState={setAccumulateDepreciationStartDate}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={accumulateDepreciationRegisterDate}
                        setState={setAccumulateDepreciationRegisterDate}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={accumulateDepreciationReceivedDate}
                        setState={setAccumulateDepreciationReceivedDate}
                        disabled={true}
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
                      <OnlyDateInput
                        disabled={true}
                        state={accumulateDepreciationProcess}
                        setState={setAccumulateDepreciationProcess}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

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
              <img crossorigin="true" src={el} className="w-[640px] mb-5" />
            ))}
          </div>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
};

export default ViewAssetInformation;
