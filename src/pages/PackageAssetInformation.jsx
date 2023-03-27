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
import { createPackageAsset } from "../api/packageAssetApi";
import BarcodeScanner from "../components/scanner/BarcodeScanner";
import QRscanner from "../components/scanner/QRscanner";
import { useEffect } from "react";
import RowOfTablePackageAssetInformation from "../components/table/RowOfTablePackageAssetInformation";
import RowOfTableTopSubcomponentPackageAssetInformation from "../components/table/RowOfTableTopSubcomponentPackageAssetInformation";
import RowOfTableBottomSubcomponentPackageAssetInformation from "../components/table/RowOfTableBottomSubcomponentPackageAssetInformation";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";

const PackageAssetInformation = () => {
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
    serialNumberMachine: "", //
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    pricePerUnit: 0,
    guaranteedMonth: "",
    purposeOfUse: "",
    assetGroupNumber: "แมม",
    type4: "",
    type8: "",
    type13: "",
    allSector: "", //
    status: "not approve",
  });
  const [errorInput, setErrorInput] = useState(false)

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

  // gen เลขครุภัณฑ์
  const [genData, setGenData] = useState([
    {
      assetNumber: "6300-0127-305/001",
      productName: "aaa",
      sector: "asd",
      replacedAssetNumber: "dfg",
    },
    {
      assetNumber: "6300-0127-305/002",
      productName: "aaa",
      sector: "qwe",
      replacedAssetNumber: "gjhkg",
    },
  ]);


  // สัญญาจัดซื้อ
  const [inputContract, setInputContract] = useState({
    acquisitionMethod: "",
    moneyType: "",
    deliveryDocument: "",
    contractNumber: "",
    receivedDate: todayThaiDate,
    seller: "",
    price: "",
    billNumber: "",
    purchaseYear: todayThaiDate,
    purchaseDate: todayThaiDate,
    documentDate: todayThaiDate,
  })
  const [errorContract, setErrorContract] = useState(false)

  // การจำหน่าย
  const [inputSale, setInputSale] = useState({
    salesDocument: "",
    distributeDocumentDate: todayThaiDate,
    distributeApprovalReleaseDate: todayThaiDate,
    distributeStatus: "",
    distributionNote: ""
  })
  const [errorSale, setErrorSale] = useState(false)

  //Show Modal
  const [showViewImageModal, setShowViewImageModal] = useState(false);
  const [showSubComponentModal, setShowSubComponentModal] = useState(false);
  const [showDepreciationModal, setDepreciationShowModal] = useState(false);
  const [showAccumulateDepreciationModal, setAccumulateDepreciationShowModal] =
    useState(false);
  const [scanBarcodeModal, setScanBarcodeModal] = useState(false);
  const [scanQRCodeModal, setScanQRCodeModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

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

  //Modal ส่วนประกอบย่อย
  // RowOfTableTopSubcomponentPackageAssetInformation
  // gen subcomponent
  const [topSubComponentData, setTopSubComponentData] = useState([
    { productName: "โต๊ะรับแขกอเนกประสงค์" },
    { productName: "เก้าอี้รับแขกสุขภาพประหยัด" },
    { productName: "" },
  ]);

  // RowOfTableTopSubcomponentPackageAssetInformation
  // gen subcomponent
  const [bottomSubComponentData, setBottomSubComponentData] = useState([
    {
      assetNumber: "",
      productName: "",
      serialNumber: "serialNumber",
      pricePerUnit: "",
      asset01: "",
    },
  ]);

  const [indexGenData, setIndexGenData] = useState(0);
  const [barcode, setBarcode] = useState(bottomSubComponentData[indexGenData]?.serialNumber);
  const [qr, setQr] = useState(bottomSubComponentData[indexGenData]?.serialNumber);

  const handleClickIncreaseSubcomponent = (e) => {
    e.preventDefault();

    let clone = [...topSubComponentData];
    const newCloneArray = {
      productName: "",
    };
    setTopSubComponentData([...clone, newCloneArray]);
  };

  const deleteRowSubcomponent = (index) => {
    let clone = [...topSubComponentData];
    clone.splice(index, 1);
    setTopSubComponentData(clone);
  };

  //Main Date
  const [insuranceStartDate, setInsuranceStartDate] = useState(todayThaiDate);
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState(todayThaiDate);

  // handle
  const handleChange = (e) => {
    const clone = { ...input };
    clone[e.target.name] = e.target.value;
    setInput(clone);
  };
  const handleChangeSales = (e) => {
    const { name, value } = e.target
    setInputSale({
      ...inputSale,
      [name]: value
    })
  };
  const handleChangeSelectSale = (name, value) => {
    setInputSale({
      ...inputSale,
      [name]: value
    })
  };
  const handleChangeContract = (e) => {
    const { name, value } = e.target
    setInputContract({
      ...inputContract,
      [name]: value
    })
  };
  const handleChangeSelectContract = (name, value) => {
    setInputContract({
      ...inputContract,
      [name]: value
    })
  };

  const handleGenSubComponentData = () => {
    const bottomArray = [];

    genData.forEach((el, idx) => {
      const assetNumber = el.assetNumber;
      topSubComponentData.forEach((el, idx) => {
        if (idx + 1 < topSubComponentData.length) {
          bottomArray.push({
            assetNumber: `${assetNumber}(${idx + 1})`,
            productName: el.productName,
            serialNumber: "-",
            price: "",
            asset01: "",
          });
        }
      });
    });
    console.log(bottomArray)

    setBottomSubComponentData(bottomArray)
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

  const handleGenData = (e) => {
    console.log(input, genData)
  }

  const handleForm = async () => {
    let errInput, errContract, errSale
    Object.values(input).map((value, index) => {
      if (errInput) return
      if (!value) errInput = true
      if (Object.keys(input).length == index + 1) errInput = false
    })
    Object.values(inputContract).map((value, index) => {
      if (errContract) return
      if (!value) errContract = true
      if (Object.keys(input).length == index + 1) errContract = false
    })
    // console.log(value, inputSale);
    Object.entries(inputSale).forEach(([key, value], index) => {
      if (errSale || key === "distributionNote") return
      if (!value) errSale = true
      if (Object.keys(input).length == index + 1) errSale = false
    })
    setErrorInput(errInput)
    setErrorContract(errContract)
    setErrorSale(errSale)
    console.log(errInput, errContract, errSale)
    if (!errInput || !errContract || !errSale) setShowModalConfirm(true)
  }

  const handleSubmit = async (e) => {
    const inputJSON = JSON.stringify({ input, ...inputSale, ...inputContract });
    const genDataJSON = JSON.stringify(genData);
    const bottomSubComponentDataJSON = JSON.stringify(bottomSubComponentData);
    const formData = new FormData();
    formData.append("input", inputJSON);
    formData.append("insuranceStartDate", insuranceStartDate);
    formData.append("insuranceExpiredDate", insuranceExpiredDate);
    // image
    const baseArrayImage = [];
    if (arrayImage?.length > 0) {
      arrayImage.forEach((file) => {
        // console.log(file.image.name);
        baseArrayImage.push({
          image: file.image.name
        });
      });
    }
    const baseArrayImageJSON = JSON.stringify(baseArrayImage);
    formData.append("baseArrayImage", baseArrayImageJSON);
    console.log(baseArrayImageJSON)

    // const duplicatedArrayImage = [];
    if (arrayImage?.length > 0) {
      // for duplicate image file if create asset as too many
      arrayImage.forEach((file) => {
        formData.append("arrayImage", file.image);
        for (let i = 2; i <= input.quantity; i++) {
          const duplicatedFile = new File(
            [file.image],
            `${file.image.name.split(".")[0]}_(${i - 1}).${file.image.name.split(".")[1]
            }`,
            { type: file.type }
          );
          formData.append("arrayImage", duplicatedFile);
          console.log(duplicatedFile)
          console.log(bottomSubComponentData.length)
          for (let j = 1; j <= bottomSubComponentData.length; j++) {
            const duplicatedSubFile = new File(
              [file.image],
              `${file.image.name.split(".")[0]}_(${i - 1})_(${j}).${file.image.name.split(".")[1]
              }`,
              { type: file.type }
            );
            formData.append("arrayImage", duplicatedSubFile);
            console.log(duplicatedSubFile)
          }
          // duplicatedArrayImage.push({
          //   ...file,
          //   image: duplicatedFile.name,
          // });
        }
      });
      // console.log("duplicatedArrayImage", duplicatedArrayImage);

      // console.log("allArrayImage",[...arrayImage,...duplicatedArrayImage])
    }

    // document
    const baseArrayDocument = [];
    if (arrayDocument?.length > 0) {
      arrayDocument.forEach((file) => {
        // console.log(file.image.name);
        baseArrayDocument.push({
          document: file.document.name
        });
      });
    }
    const baseArrayDocumentJSON = JSON.stringify(baseArrayDocument);
    formData.append("baseArrayDocument", baseArrayDocumentJSON);
    // for duplicate document file if create asset as too many
    // const duplicatedArrayDocument = [];
    if (arrayDocument?.length > 0) {
      arrayDocument.forEach((file) => {
        formData.append("arrayDocument", file.document);
        for (let i = 2; i <= input.quantity; i++) {
          const duplicatedFile = new File(
            [file.document],
            `${file.document.name.split(".")[0]}_(${i - 1}).${file.document.name.split(".")[1]
            }`,
            { type: file.type }
          );
          formData.append("arrayDocument", duplicatedFile);

          for (let j = 1; j <= bottomSubComponentData.length; j++) {
            const duplicatedSubFile = new File(
              [file.document],
              `${file.document.name.split(".")[0]}_(${i - 1})_(${j}).${file.document.name.split(".")[1]
              }`,
              { type: file.type }
            );
            formData.append("arrayDocument", duplicatedSubFile);
            console.log(duplicatedSubFile)
          }
          // duplicatedArrayDocument.push({
          //   ...file,
          //   document: duplicatedFile.name,
          // });
        }
      });
      // console.log("duplicatedArrayDocument", duplicatedArrayDocument);

      // console.log("allArrayDocument",[...arrayDocument,...duplicatedArrayDocument])
    }

    // arrayImage.forEach((file) => {
    //   formData.append("arrayImage", file.image);
    // });
    // arrayDocument.forEach((file) => {
    //   formData.append("arrayDocument", file.document);
    // });
    formData.append("genDataJSON", genDataJSON);
    formData.append("bottomSubComponentDataJSON", bottomSubComponentDataJSON);
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

    const response = await createPackageAsset(formData);
    if (response.status === 200) setShowModalConfirm(false)
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
            to="/assetInformation"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">เพิ่มครุภัณฑ์เป็นชุด</div>
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
              to="/packageAssetInformationIndex"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline ml-2"
            >
              ข้อมูลครุภัณฑ์เป็นชุด
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">เพิ่มครุภัณฑ์เป็นชุด</div>
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
                onChange={handleChange}
                value={input.engProductName}
                className={`${errorInput && !input.engProductName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* ชื่อครุภัณฑ์ภาษาไทย */}
            <div>
              <div className="mb-1">ชื่อครุภัณฑ์ภาษาไทย</div>
              <input
                type="text"
                name="productName"
                id="productName"
                onChange={handleChange}
                value={input.productName}
                className={`${errorInput && !input.productName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* ประเภทครุภัณฑ์ */}
            <div>
              <div className="mb-1">ประเภทครุภัณฑ์</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทครุภัณฑ์"}
                  isValid={errorInput && !input.type}
                />
              </div>
            </div>
            {/* ชนิดครุภัณฑ์ */}
            <div>
              <div className="mb-1">ชนิดครุภัณฑ์</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ชนิดครุภัณฑ์"}
                  isValid={errorInput && !input.kind}
                />
              </div>
            </div>

            {/* ลำดับครุภัณฑ์ (ID) */}
            <div>
              <div className="mb-1">ลำดับครุภัณฑ์ (ID)</div>
              <input
                type="text"
                name="realAssetId"
                id="realAssetId"
                onChange={handleChange}
                value={input.realAssetId}
                className={`${errorInput && !input.realAssetId && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            {/* จำนวน */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3  text-xs">
              <div>
                <div className="mb-1">จำนวน</div>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={handleChange}
                  value={input.quantity}
                  min="0"
                  className={`${errorInput && !input.quantity && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              {/* หน่วยนับ */}
              <div>
                <div className="mb-1">หน่วยนับ</div>
                <div className="flex h-[38px] ">
                  <Selector
                    placeholder={"Select"}
                    state={input}
                    setState={setInput}
                    id={"หน่วยนับ"}
                    isValid={errorInput && !input.unit}
                  />
                </div>
              </div>
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
                  isValid={errorInput && !input.brand}
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
                onChange={handleChange}
                value={input.model}
                className={`${errorInput && !input.model && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* ขนาด */}
            <div>
              <div className="mb-1">ขนาด</div>
              <input
                type="text"
                name="size"
                id="size"
                onChange={handleChange}
                value={input.size}
                className={`${errorInput && !input.size && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                  isValid={errorInput && !input.category}
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
                  isValid={errorInput && !input.group}
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
                  isValid={errorInput && !input.acquiredType}
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
                  isValid={errorInput && !input.source}
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
                  isValid={errorInput && !input.purposeOfUse}
                />
              </div>
            </div>
            {/* ราคาต่อหน่วย (บาท) */}
            <div>
              <div className="mb-1">ราคาต่อหน่วย (บาท)</div>
              <input
                min="0"
                type="number"
                name="pricePerUnit"
                id="pricePerUnit"
                onChange={handleChange}
                value={input.pricePerUnit}
                className={`${errorInput && !input.pricePerUnit && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* จำนวนเดือนที่รับประกัน (เดือน) */}
            <div>
              <div className="mb-1">จำนวนเดือนที่รับประกัน (เดือน)</div>
              <input
                min="0"
                type="number"
                name="guaranteedMonth"
                id="guaranteedMonth"
                onChange={handleChange}
                value={input.guaranteedMonth}
                className={`${errorInput && !input.guaranteedMonth && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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

            {/* ประเภทครุภัณฑ์ 4 หลัก */}
            <div>
              <div className="mb-1">ประเภทครุภัณฑ์ 4 หลัก</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทครุภัณฑ์ 4 หลัก"}
                  isValid={errorInput && !input.type4}
                />
              </div>
            </div>
            {/* ประเภทครุภัณฑ์ 8 หลัก */}
            <div>
              <div className="mb-1">ประเภทครุภัณฑ์ 8 หลัก</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทครุภัณฑ์ 8 หลัก"}
                  isValid={errorInput && !input.type8}
                />
              </div>
            </div>
            {/* ประเภทครุภัณฑ์ 13 หลัก */}
            <div>
              <div className="mb-1">ประเภทครุภัณฑ์ 13 หลัก</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทครุภัณฑ์ 13 หลัก"}
                  isValid={errorInput && !input.type13}
                />
              </div>
            </div>

            {/* การจ่ายครุภัณฑ์ให้หน่วยงาน */}
            <div>
              <div className="mb-1">การจ่ายครุภัณฑ์ให้หน่วยงาน</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"การจ่ายครุภัณฑ์ให้หน่วยงาน"}
                  isValid={errorInput && !input.distributeToSector}
                />
              </div>
            </div>

            {/* รหัสกลุ่มครุภัณฑ์ */}
            <div>
              <div className="mb-1">รหัสกลุ่มครุภัณฑ์</div>
              <input
                type="text"
                name="assetGroupNumber"
                id="assetGroupNumber"
                disabled
                onChange={handleChange}
                value={input.assetGroupNumber}
                className={`${errorInput && !input.assetGroupNumber && 'border-red-500'} w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <button
              type="button"
              className="sm:col-start-2 sm:mt-5 text-white w-full h-[38px] px-4 py-2  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={handleGenData}
            >
              สร้างเลขครุภัณฑ์
            </button>
          </div>

          {/* block white bottom */}
          <div className=" my-3 p-3">
            <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
              <div className="w-[800px] xl:w-full max-h-[500px] ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                  <div className="grid grid-cols-17 gap-2 text-center">
                    <div className="ml-2">ลำดับ</div>
                    <div className="col-span-4">ID เลขครุภัณฑ์</div>
                    <div className="col-span-4">ชื่อครุภัณฑ์</div>
                    <div className="col-span-4">หน่วยงาน</div>
                    <div className="col-span-4">
                      แทนครุภัณฑ์ ที่ถูกแทงจำหน่าย
                    </div>
                  </div>
                </div>
                {genData?.map((el, idx) => {
                  return (
                    <RowOfTablePackageAssetInformation
                      key={idx}
                      index={idx}
                      genData={genData}
                      setGenData={setGenData}
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
                className="inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:hover:bg-gray-100"
                onClick={() => setShowViewImageModal(true)}
                disabled={!arrayImage.length}
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

            <div className="sm:col-span-2 ">
              {/* ค่าเสื่อมราคา */}
              <div className="bg-background-page py-10 px-30 h-40 rounded-lg flex flex-col justify-center items-center gap-4">
                <div className=" font-semibold">ค่าเสื่อมราคา</div>
                <DeprecationDropdown
                  setDepreciationShowModal={setDepreciationShowModal}
                  setAccumulateDepreciationShowModal={
                    setAccumulateDepreciationShowModal
                  }
                />
              </div>

              {/* ส่วนประกอบย่อย */}
              <div className="bg-background-page py-10 px-30 h-40 rounded-lg flex flex-col justify-center items-center gap-4 mt-5">
                <div className=" font-semibold">ส่วนประกอบย่อย</div>
                <button
                  type="button"
                  className=" inline-flex justify-center items-center py-1 px-2 border-[1px] border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                  onClick={() => setShowSubComponentModal(true)}
                >
                  + ส่วนประกอบย่อย
                </button>
              </div>
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
                  setState={value => handleChangeSelectContract("acquisitionMethod", value)}
                  state={inputContract.acquisitionMethod}
                  isValid={errorContract && !inputContract.acquisitionMethod}
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
                  state={inputContract.moneyType}
                  setState={value => handleChangeSelectContract("moneyType", value)}
                  isValid={errorContract && !inputContract.moneyType}
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
                onChange={handleChangeContract}
                value={inputContract.deliveryDocument}
                className={`${errorContract && !inputContract.deliveryDocument && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* เลขที่สัญญา */}
            <div>
              <div className="mb-1">เลขที่สัญญา</div>
              <input
                type="text"
                name="contractNumber"
                id="contractNumber"
                onChange={handleChangeContract}
                value={inputContract.contractNumber}
                className={`${errorContract && !inputContract.contractNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* วันที่รับมอบ */}
            <div>
              <div className="mb-1">วันที่รับมอบ</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={inputContract.receivedDate}
                  setState={value => handleChangeSelectContract("receivedDate", value)}
                />
              </div>
            </div>
            {/* ผู้ขาย */}
            <div>
              <div className="mb-1">ผู้ขาย</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={inputContract.seller}
                  setState={value => handleChangeSelectContract("seller", value)}
                  isValid={errorContract && !inputContract.seller}
                  id={"ผู้ขาย"}
                />
              </div>
            </div>
            {/* ราคาซื้อ (บาท) */}
            <div>
              <div className="mb-1">ราคาซื้อ (บาท)</div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                onChange={handleChangeContract}
                value={inputContract.price}
                className={`${errorContract && !inputContract.price && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* เลขที่ใบเบิก */}
            <div>
              <div className="mb-1">เลขที่ใบเบิก</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                onChange={handleChangeContract}
                value={inputContract.billNumber}
                className={`${errorContract && !inputContract.billNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* ปีที่ซื้อ */}
            <div>
              <div className="mb-1">ปีที่ซื้อ</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={inputContract.purchaseYear}
                  setState={value => handleChangeSelectContract("purchaseYear", value)} />
              </div>
            </div>

            {/* วันที่ซื้อ */}
            <div>
              <div className="mb-1">วันที่ซื้อ</div>
              <div className="flex h-[38px]">
                <DateInput state={inputContract.purchaseDate} setState={value => handleChangeSelectContract("purchaseDate", value)} />
              </div>
            </div>
            {/* วันที่ลงเอกสาร */}
            <div>
              <div className="mb-1">วันที่ลงเอกสาร</div>
              <div className="flex h-[38px]">
                <DateInput state={inputContract.documentDate} setState={value => handleChangeSelectContract("documentDate", value)} />
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
                onChange={handleChangeSales}
                value={inputSale.salesDocument}
                className={`${errorSale && !inputSale.salesDocument && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            {/* เอกสารลงวันที่ */}
            <div>
              <div className="mb-1">เอกสารลงวันที่</div>
              <div className="flex h-[38px]">
                <DateInput
                  setState={(value) => handleChangeSelectSale("distributeDocumentDate", value)}
                  state={inputSale.distributeDocumentDate}
                />
              </div>
            </div>
            {/* วันอนุมัติจำหน่าย */}
            <div>
              <div className="mb-1">วันอนุมัติจำหน่าย</div>
              <div className="flex h-[38px]">
                <DateInput
                  setState={(value) => handleChangeSelectSale("distributeApprovalReleaseDate", value)}
                  state={inputSale.distributeApprovalReleaseDate}
                />
              </div>
            </div>
            {/* สถานะ */}
            <div>
              <div className="mb-1">สถานะ</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  isValid={errorSale && !inputSale.distributeStatus}
                  setState={(value) => handleChangeSelectSale("distributeStatus", value)}
                  state={inputSale.distributeStatus}
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
                onChange={handleChangeSales}
                value={inputSale.distributionNote}
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
                      <OnlyDateInput
                        state={depreciationStartDate}
                        setState={setDepreciationStartDate}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={depreciationRegisterDate}
                        setState={setDepreciationRegisterDate}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={depreciationReceivedDate}
                        setState={setDepreciationReceivedDate}
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
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={accumulateDepreciationRegisterDate}
                        setState={setAccumulateDepreciationRegisterDate}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <OnlyDateInput
                        state={accumulateDepreciationReceivedDate}
                        setState={setAccumulateDepreciationReceivedDate}
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

        {/* Modal ส่วนประกอบย่อย */}
        <Modal
          id="ส่วนประกอบย่อย"
          isVisible={showSubComponentModal}
          width={"[750px]"}
          onClose={() => setShowSubComponentModal(false)}
          header={"ส่วนประกอบย่อย"}
          handleClickIncreaseSubcomponent={handleClickIncreaseSubcomponent}
          deleteRowSubcomponent={deleteRowSubcomponent}
          // subComponentID={subComponentID}
          // subComponentSerialNumber={subComponentSerialNumber}
          // subComponentName={subComponentName}
          setShowSubComponentModal={setShowSubComponentModal}
        >
          <div>
            <div className="grid grid-cols-6">
              <div className="bg-white col-span-6 rounded-lg overflow-x-auto scrollbar">
                <div className="h-[800px] p-2 ">
                  {/* top */}
                  <div className=" my-3 p-3">
                    <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
                      <div className="w-[800px] xl:w-full h-[300px] ">
                        <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-full">
                          <div className="grid grid-cols-7 gap-2 text-center">
                            <div className="ml-2">ลำดับ</div>
                            <div className="col-span-5">ชื่อครุภัณฑ์</div>
                          </div>
                        </div>

                        {topSubComponentData?.map((el, idx) => {
                          return (
                            <RowOfTableTopSubcomponentPackageAssetInformation
                              key={idx}
                              index={idx}
                              topSubComponentData={topSubComponentData}
                              setTopSubComponentData={setTopSubComponentData}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        type="button"
                        className="sm:col-start-2 text-sm text-white  h-[38px] px-4 py-2  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                        onClick={handleGenSubComponentData}
                      >
                        สร้างส่วนประกอบย่อย
                      </button>
                    </div>
                  </div>

                  {/* bottom */}
                  <div className=" my-3 p-3">
                    <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
                      <div className="w-[800px] xl:w-full h-[300px] ">
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

                        {bottomSubComponentData?.map((el, idx) => {
                          return (
                            <RowOfTableBottomSubcomponentPackageAssetInformation
                              key={idx}
                              index={idx}
                              bottomSubComponentData={bottomSubComponentData}
                              setBottomSubComponentData={
                                setBottomSubComponentData
                              }
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
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* scan barcode */}
        <Modal
          id="scanBarcodeModal"
          isVisible={scanBarcodeModal}
          width={"[800px]"}
          onClose={() => setScanBarcodeModal(false)}
          header={"Scan Barcode"}
          scanBarcodeModal={scanBarcodeModal}
        >
          <div className=" px-10 pt-2 pb-10">
            <BarcodeScanner
              state={bottomSubComponentData}
              setState={setBottomSubComponentData}
              index={indexGenData}
              setIndex={setIndexGenData}
              barcode={barcode}
              setBarcode={setBarcode}
              qr={qr}
              setQr={setQr}
            />
          </div>
        </Modal>

        {/* scan qrcode */}
        <Modal
          id="scanQRCodeModal"
          isVisible={scanQRCodeModal}
          width={"[800px]"}
          onClose={() => setScanQRCodeModal(false)}
          header={"Scan QRrcode"}
          scanQRCodeModal={scanQRCodeModal}
        >
          <div className=" px-10 pt-2 pb-10">
            <QRscanner
              state={bottomSubComponentData}
              setState={setBottomSubComponentData}
              index={indexGenData}
              setIndex={setIndexGenData}
              barcode={barcode}
              setBarcode={setBarcode}
              qr={qr}
              setQr={setQr}
            />
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

      {/* footer */}
      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-12">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <div className="flex justify-end gap-4">
          <button
            className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
          // onClick={() => inputDoc.current.click()}
          >
            บันทึกแบบร่าง
          </button>
          <button
            type="button"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleForm}
          >
            บันทึกข้อมูล
          </button>

          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default PackageAssetInformation;
