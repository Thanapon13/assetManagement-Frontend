import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import RowOfTableArray from "../components/table/RowOfTableArray";
import { BsArrowLeft } from "react-icons/bs";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import RowOfTableBorrowHistory from "../components/table/RowOfTableBorrowHistory";
import RowOfTableBuildingHistory from "../components/table/RowOfTableBuildingHistory";
import RowOfTableViewSubcomponentPackageAssetInformation from "../components/table/RowOfTableViewSubcomponentPackageAssetInformation";
import OnlyDateInput from "../components/date/onlyDateInput";
import { getPackageAssetById } from "../api/packageAssetApi";
import { getViewBorrowHistoryByPackageAssetId } from "../api/borrowApi";

const ViewPackageAssetInformation = () => {

  const { packageAssetId } = useParams();
  const printRef = useRef();

  let options = { day: "2-digit", month: "2-digit", year: "numeric" };

  // useState
  const [perPage, setPerPage] = useState(10);

  const [input, setInput] = useState({})

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);
  const [img, setImg] = useState();

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

  // subcomponent
  const [bottomSubComponentData, setBottomSubComponentData] = useState([]);

  // ประวัติการยืม
  const [borrowHistoryList, setBorrowHistoryList] = useState([])


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
  const [acquisitionMethod, setAcquisitionMethod] = useState(
    "เสนอราคาฝ่ายจัดซื้อ"
  );
  const [moneyType, setMoneyType] = useState("เงินสด");
  const [deliveryDocument, setDeliveryDocument] =
    useState("65-390113(2)/10824");
  const [contractNumber, setContractNumber] = useState("เอกสาร");
  const [receivedDate, setReceivedDate] = useState("27/12/2565");
  const [seller, setSeller] = useState("Banana It");
  const [price, setPrice] = useState("22,000.00");
  const [billNumber, setBillNumber] = useState("จ.ค 651213082");
  const [purchaseYear, setPurchaseYear] = useState("27/12/2565");
  const [purchaseDate, setPurchaseDate] = useState("27/12/2565");
  const [documentDate, setDocumentDate] = useState("27/12/2565");

  // การจำหน่าย
  const [salesDocument, setSalesDocument] = useState("");
  const [distributeDocumentDate, setDistributeDocumentDate] =
    useState("27/12/2565");
  const [distributeApprovalReleaseDate, setDistributeApprovalReleaseDate] =
    useState("27/12/2565");
  const [distributeStatus, setDistributeStatus] = useState("ใช้งานได้");
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
  const [insuranceStartDate, setInsuranceStartDate] = useState("27/12/2565");
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState("27/12/2565");


  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      background: "#ffffff",
    },
  });

  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        const res = await getPackageAssetById(packageAssetId);
        console.log(res?.data?.packageAsset[0]);
        const packageAsset = res.data.packageAsset[0];


        setImg(packageAsset.imageArray[0].image);

        setInput({
          ...input,
          engProductName: packageAsset.engProductName,
          productName: packageAsset.productName,
          type: packageAsset.type,
          kind: packageAsset.kind,
          realAssetId: packageAsset.realAssetId,
          unit: packageAsset.unit,
          brand: packageAsset.brand,
          model: packageAsset.model,
          size: packageAsset.size,
          quantity: packageAsset.quantity,
          source: packageAsset.source,
          category: packageAsset.category,
          acquiredType: packageAsset.acquiredType,
          group: packageAsset.group,
          pricePerUnit: packageAsset.pricePerUnit,
          guaranteedMonth: packageAsset.guaranteedMonth,
          purposeOfUse: packageAsset.purposeOfUse,
          allSector: packageAsset.allSector,
          assetNumber: packageAsset.assetNumber,
          sector: packageAsset.sector,
          asset01: packageAsset.asset01,
          serialNumber: packageAsset.serialNumber,
          replacedAssetNumber: packageAsset.replacedAssetNumber,
          type4: packageAsset.type4,
          type8: packageAsset.type8,
          type13: packageAsset.type13,
          assetGroupNumber: packageAsset.assetGroupNumber
        });

        setInsuranceStartDate(new Date(packageAsset.insuranceStartDate).toLocaleDateString("th", options));
        setInsuranceExpiredDate(new Date(packageAsset.insuranceExpiredDate).toLocaleDateString("th", options));

        setQr(packageAsset.serialNumber);
        setBarcode(packageAsset.serialNumber);

        setBottomSubComponentData(packageAsset.asset)

        const fetchImages = packageAsset.imageArray;
        const clone = [...arrayImage];
        for (let el of fetchImages) {
          clone.push({ image: { name: el.image, _id: el._id } });
        }
        setArrayImage(clone);

        console.log(packageAsset.documentArray);
        const fetchDocuments = packageAsset.documentArray;
        const cloneDoc = [...arrayDocument];
        for (let el of fetchDocuments) {
          cloneDoc.push({ document: { name: el.document, _id: el._id } });
        }
        console.log(cloneDoc);

        setArrayDocument(cloneDoc);

        //Modal ค่าเสื่อมราคา
        setDepreciationStartDate(new Date(packageAsset.depreciationStartDate));
        setDepreciationRegisterDate(new Date(packageAsset.depreciationRegisterDate));
        setDepreciationReceivedDate(new Date(packageAsset.depreciationReceivedDate));
        setDepreciationPrice(packageAsset.depreciationPrice);
        setDepreciationYearUsed(packageAsset.depreciationYearUsed);
        setDepreciationCarcassPrice(packageAsset.depreciationCarcassPrice);
        setDepreciationProcess(packageAsset.depreciationProcess);
        setDepreciationPresentMonth(packageAsset.depreciationPresentMonth);
        setDepreciationCumulativePrice(packageAsset.depreciationCumulativePrice);
        setDepreciationYearPrice(packageAsset.depreciationYearPrice);
        setDepreciationRemainPrice(packageAsset.depreciationRemainPrice);
        setDepreciationBookValue(packageAsset.depreciationBookValue);

        // console.log(new Date(packageAsset.depreciationStartDate));
        //Modal ค่าเสื่อมราคา(ผลรวมจำนวนปี)
        setAccumulateDepreciationStartDate(
          new Date(packageAsset.accumulateDepreciationStartDate)
        );
        setAccumulateDepreciationRegisterDate(
          new Date(packageAsset.accumulateDepreciationRegisterDate)
        );
        setAccumulateDepreciationReceivedDate(
          new Date(packageAsset.accumulateDepreciationReceivedDate)
        );
        setAccumulateDepreciationPrice(packageAsset.accumulateDepreciationPrice);
        setAccumulateDepreciationYearUsed(packageAsset.accumulateDepreciationYearUsed);
        setAccumulateDepreciationCarcassPrice(
          packageAsset.accumulateDepreciationCarcassPrice
        );
        setAccumulateDepreciationProcess(packageAsset.accumulateDepreciationProcess);
        setAccumulateDepreciationPresentMonth(
          packageAsset.accumulateDepreciationPresentMonth
        );
        setAccumulateDepreciationCumulativePrice(
          packageAsset.accumulateDepreciationCumulativePrice
        );
        setAccumulateDepreciationYearPrice(
          packageAsset.accumulateDepreciationYearPrice
        );
        setAccumulateDepreciationRemainPrice(
          packageAsset.accumulateDepreciationRemainPrice
        );
        setAccumulateDepreciationBookValue(
          packageAsset.accumulateDepreciationBookValue
        );

        // สัญญาจัดซื้อ
        setAcquisitionMethod(packageAsset.purchaseContract.acquisitionMethod);
        setMoneyType(packageAsset.purchaseContract.moneyType);
        setDeliveryDocument(packageAsset.purchaseContract.deliveryDocument);
        setContractNumber(packageAsset.purchaseContract.contractNumber);
        setReceivedDate(new Date(packageAsset.purchaseContract.receivedDate).toLocaleDateString("th", options));
        setSeller(packageAsset.purchaseContract.seller);
        setPrice(packageAsset.purchaseContract.price);
        setBillNumber(packageAsset.purchaseContract.billNumber);
        setPurchaseYear(new Date(packageAsset.purchaseContract.purchaseYear).toLocaleDateString("th", options));
        setPurchaseDate(new Date(packageAsset.purchaseContract.purchaseDate).toLocaleDateString("th", options));
        setDocumentDate(new Date(packageAsset.purchaseContract.documentDate).toLocaleDateString("th", options));
        // การจำหน่าย
        setSalesDocument(packageAsset.distribution.salesDocument);
        setDistributeStatus(packageAsset.distribution.distributeStatus);
        setDistributionNote(packageAsset.distribution.distributionNote);
        setSalesDocument(packageAsset.distribution.salesDocument);
        setDistributeDocumentDate(
          new Date(packageAsset.distribution.distributeDocumentDate).toLocaleDateString("th", options)
        );
        setDistributeApprovalReleaseDate(
          new Date(packageAsset.distribution.distributeApprovalReleaseDate).toLocaleDateString("th", options)
        );
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBorrowHistoryByPackageAssetId = async () => {
      const res = await getViewBorrowHistoryByPackageAssetId(packageAssetId);
      const borrowHistoryArray = res.data.borrows
      setBorrowHistoryList(borrowHistoryArray)
      console.log("borrowHistoryArray", borrowHistoryArray);
    };

    fetchAssetById();
    fetchBorrowHistoryByPackageAssetId();
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
          <div className="text-xl text-text-green ">
            รายละเอียดครุภัณฑ์เป็นชุด
          </div>
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
            <div className="text-text-gray ml-2">รายละเอียดครุภัณฑ์เป็นชุด</div>
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

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          {/* block white top */}
          <div>ข้อมูลครุภัณฑ์</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* ชื่อครุภัณฑ์ภาษาไทย */}
            <div className="text-gray-500">ชื่อครุภัณฑ์ภาษาไทย</div>
            <div>{input?.productName !== "" ? input?.productName : "-"}</div>
            {/* ชื่อครุภัณฑ์ภาษาอังกฤษ */}
            <div className="text-gray-500">ชื่อครุภัณฑ์ภาษาอังกฤษ</div>
            <div>
              {input?.engProductName !== "" ? input?.engProductName : "-"}
            </div>
            {/* ประเภทครุภัณฑ์ */}
            <div className="text-gray-500">ประเภทครุภัณฑ์</div>
            <div>{input?.type !== "" ? input?.type : "-"}</div>
            {/* ชนิดครุภัณฑ์ */}
            <div className="text-gray-500">ชนิดครุภัณฑ์</div>
            <div>{input?.kind !== "" ? input?.kind : "-"}</div>
            {/* ยี่ห้อ */}
            <div className="text-gray-500">ยี่ห้อ</div>
            <div>{input?.brand !== "" ? input?.brand : "-"}</div>
            {/* รุ่น */}
            <div className="text-gray-500">รุ่น</div>
            <div>{input?.model !== "" ? input?.model : "-"}</div>
            {/* ขนาด */}
            <div className="text-gray-500">ขนาด</div>
            <div>{input?.size !== "" ? input?.size : "-"}</div>
            {/* หน่วยนับ */}
            <div className="text-gray-500">หน่วยนับ</div>
            <div>{input?.unit !== "" ? input?.unit : "-"}</div>
            {/* กลุ่ม */}
            <div className="text-gray-500">กลุ่ม</div>
            <div>{input?.group !== "" ? input?.group : "-"}</div>
            {/* หมวด */}
            <div className="text-gray-500">หมวด</div>
            <div>{input?.category !== "" ? input?.category : "-"}</div>
            {/* หน่วยงาน */}
            <div className="text-gray-500">หน่วยงาน</div>
            <div>{input?.sector !== "" ? input?.sector : "-"}</div>
            {/* ประเภทที่ได้มา */}
            <div className="text-gray-500">ประเภทที่ได้มา</div>
            <div>{input?.acquiredType !== "" ? input?.acquiredType : "-"}</div>
            {/* แหล่งที่ได้มา */}
            <div className="text-gray-500">แหล่งที่ได้มา</div>
            <div>{input?.source !== "" ? input?.source : "-"}</div>
            {/* วัตถุประสงค์การใช้งาน */}
            <div className="text-gray-500">วัตถุประสงค์การใช้งาน</div>
            <div>{input?.purposeOfUse !== "" ? input?.purposeOfUse : "-"}</div>
            {/* วันที่เริ่มรับประกัน */}
            <div className="text-gray-500">วันที่เริ่มรับประกัน</div>
            <div>
              {insuranceStartDate
                ? insuranceStartDate
                : "-"}
            </div>
            {/* วันที่สิ้นสุดการรับประกัน */}
            <div className="text-gray-500">วันที่สิ้นสุดการรับประกัน</div>
            <div>
              {insuranceExpiredDate
                ? insuranceExpiredDate
                : "-"}
            </div>

            {/* ระยะเวลารับประกัน(เดือน) */}
            <div className="text-gray-500">ระยะเวลารับประกัน(เดือน)</div>
            <div>
              {input?.guaranteedMonth !== "" ? input?.guaranteedMonth : "-"}
            </div>
            {/* ประเภทครุภัณฑ์ 4 หลัก */}
            <div className="text-gray-500">ประเภทครุภัณฑ์ 4 หลัก</div>
            <div>{input?.type4 !== "" ? input?.type4 : "-"}</div>
            {/* ประเภทครุภัณฑ์ 8 หลัก */}
            <div className="text-gray-500">ประเภทครุภัณฑ์ 8 หลัก</div>
            <div>{input?.type8 !== "" ? input?.type8 : "-"}</div>
            {/* ประเภทครุภัณฑ์ 13 หลัก */}
            <div className="text-gray-500">ประเภทครุภัณฑ์ 13 หลัก</div>
            <div>{input?.type13 !== "" ? input?.type13 : "-"}</div>
            {/* แทนครุภัณฑ์ที่ถูกแทงจำหน่าย */}
            <div className="text-gray-500">แทนครุภัณฑ์ที่ถูกแทงจำหน่าย</div>
            <div>
              {input?.replacedAssetNumber !== ""
                ? input?.replacedAssetNumber
                : "-"}
            </div>
            {/* รหัสกลุ่มครุภัณฑ์ */}
            <div className="text-gray-500">รหัสกลุ่มครุภัณฑ์</div>
            <div>
              {input?.assetGroupNumber !== "" ? input?.assetGroupNumber : "-"}
            </div>
          </div>

          {/* block white bottom */}
          {/* bottom */}
          <div className=" my-3 p-3">
            <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
              <div className="w-[800px] xl:w-full max-h-[300px] ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-md">
                  <div className="grid grid-cols-19 gap-2 text-center">
                    <div className="ml-2">ลำดับ</div>
                    <div className="col-span-4">เลขครุภัณฑ์</div>
                    <div className="col-span-4">ชื่อครุภัณฑ์</div>
                    <div className="col-span-4">Serial Number</div>
                    <div className="col-span-2">ราคา</div>
                    <div className="col-span-2">สท.01</div>
                    <div className="col-span-2">สติกเกอร์</div>
                  </div>
                </div>
                {!bottomSubComponentData.length && <div className="text-center pt-5">-</div>}
                {bottomSubComponentData?.map((el, idx) => {
                  return (
                    <RowOfTableViewSubcomponentPackageAssetInformation
                      key={idx}
                      index={idx}
                      bottomSubComponentData={bottomSubComponentData}
                      setBottomSubComponentData={setBottomSubComponentData}
                      scanBarcodeModal={scanBarcodeModal}
                      scanQRCodeModal={scanQRCodeModal}
                      setScanBarcodeModal={setScanBarcodeModal}
                      setScanQRCodeModal={setScanQRCodeModal}
                      setIndexGenData={setIndexGenData}
                      indexGenData={indexGenData}
                      barcode={barcode}
                      setBarcode={setBarcode}
                      qr={qr}
                      setQr={setQr}
                      // disabled={true}
                      packageAssetId={packageAssetId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ภาพครุภัณฑ์และเอกสารประกอบ */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          {/* Header ภาพครุภัณฑ์และเอกสารประกอบ */}
          <div className="font-semibold mb-3">ภาพครุภัณฑ์และเอกสารประกอบ</div>
          <div className="lg:grid lg:grid-cols-6 gap-6">
            {/* left image */}
            <div className="lg:col-span-3 border-2 border-gray-300  px-30 rounded-lg flex flex-col justify-center items-center gap-4  ">
              <div className="overflow-y-auto scrollbar ">
                <div className="h-[550px]">
                  <div className=" px-5 pt-5  pb-10">
                    {arrayImageURL.map((el, idx) => (
                      <img key={idx} crossOrigin="true" src={el} className="w-[640px] mb-5" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="lg:col-span-3 mt-5 lg:mt-0">
              <div className="  bg-background-page p-5 h-72 rounded-lg  mb-5 gap-4 ">
                <div className=" font-semibold text-center mb-3">
                  คู่มือและเอกสารแนบ
                </div>
                <div className="h-56 overflow-y-auto scrollbar">
                  {arrayDocument?.map((el, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center mb-2 text-gray-400 "
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
              </div>
              {/* ค่าเสื่อมราคา  :  คำนวนค่าเสื่อมราคา(ปกติ) */}
              <div className=" bg-background-page py-10 px-30 h-40  rounded-lg flex flex-col justify-center items-center gap-4">
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
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
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
              {purchaseDate !== ""
                ? purchaseDate
                : "-"}
            </div>
            {/* วันที่รับมอบ */}
            <div className="text-gray-500">วันที่รับมอบ</div>
            <div>
              {receivedDate !== ""
                ? receivedDate
                : "-"}
            </div>
            {/* ราคาซื้อ (บาท) */}
            <div className="text-gray-500">ราคาซื้อ (บาท)</div>
            <div>{price !== "" ? price : "-"}</div>
            {/* ปีงบประมาณที่ซื้อ */}
            <div className="text-gray-500">ปีงบประมาณที่ซื้อ</div>
            <div>
              {new Date((purchaseYear)).getFullYear()}
            </div>
            {/* วันที่ลงเอกสาร */}
            <div className="text-gray-500">วันที่ลงเอกสาร</div>
            <div>
              {documentDate !== ""
                ? documentDate
                : "-"}
            </div>
          </div>
        </div>

        {/* การจำหน่าย */}
        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">การจำหน่าย</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3 mt-3 text-xs">
            {/* เอกสารจำหน่าย */}
            <div className="text-gray-500">เอกสารจำหน่าย</div>
            <div>{salesDocument !== "" ? salesDocument : "-"}</div>
            {/* เอกสารลงวันที่ */}
            <div className="text-gray-500">เอกสารลงวันที่</div>
            <div>
              {distributeDocumentDate !== ""
                ? distributeDocumentDate
                : "-"}
            </div>
            {/* วันอนุมัติจำหน่าย */}
            <div className="text-gray-500">วันอนุมัติจำหน่าย</div>
            <div>
              {distributeApprovalReleaseDate !== ""
                ? distributeApprovalReleaseDate
                : "-"}
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
                      <OnlyDateInput
                        state={depreciationStartDate}
                        setState={setDepreciationStartDate}
                        disabled={true}
                      />
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
    </>
  );
};

export default ViewPackageAssetInformation;
