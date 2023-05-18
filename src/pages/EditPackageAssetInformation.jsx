import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { BsArrowLeft } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import BarcodeScanner from "../components/scanner/BarcodeScanner";
import QRscanner from "../components/scanner/QRscanner";
import { useEffect } from "react";
import RowOfTableViewSubcomponentPackageAssetInformation from "../components/table/RowOfTableViewSubcomponentPackageAssetInformation";
import { getPackageAssetById, updatePackageAsset } from "../api/packageAssetApi";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { IoIosClose } from "react-icons/io";

const EditPackageAssetInformation = () => {
  const { packageAssetId } = useParams();
  const inputImg = useRef();
  const inputDoc = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  // useState
  const [isLoading, setIsLoading] = useState(true)

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
    // serialNumberMachine: "", //
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    pricePerUnit: 0,
    guaranteedMonth: "",
    purposeOfUse: "",
    sector: "",
    // allSector: "", //
    assetGroupNumber: "",
    type4: "",
    type8: "",
    type13: "",
    status: "not approve",
  });

  // subcomponent
  const [bottomSubComponentData, setBottomSubComponentData] = useState([]);

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

  const [indexGenData, setIndexGenData] = useState(0);
  const [barcode, setBarcode] = useState(input?.serialNumber);
  const [qr, setQr] = useState(input?.serialNumber);

  // สัญญาจัดซื้อ
  const [inputContract, setInputContract] = useState({
    acquisitionMethod: "",
    moneyType: "",
    deliveryDocument: "",
    contractNumber: "",
    receivedDate: "",
    seller: "",
    price: "",
    billNumber: "",
    purchaseYear: "",
    purchaseDate: "",
    documentDate: "",
  })

  // การจำหน่าย
  const [inputSale, setInputSale] = useState({
    salesDocument: "",
    distributeDocumentDate: "",
    distributeApprovalReleaseDate: "",
    distributeStatus: "",
    distributionNote: ""
  })

  //Show Modal
  const [showViewImageModal, setShowViewImageModal] = useState(false);
  const [showDepreciationModal, setDepreciationShowModal] = useState(false);
  const [showAccumulateDepreciationModal, setAccumulateDepreciationShowModal] =
    useState(false);
  const [scanBarcodeModal, setScanBarcodeModal] = useState(false);
  const [scanQRCodeModal, setScanQRCodeModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

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
  const [insuranceStartDate, setInsuranceStartDate] = useState(new Date());
  const [insuranceExpiredDate, setInsuranceExpiredDate] =
    useState(new Date());

  const [invalidName, setInvalidName] = useState(false)
  // handle
  function checkInvalidEngName() {
    return (/[ก-ฮ]/.test(input.engProductName))
  }
  function checkInvalidName() {
    return (/[A-Za-z]/.test(input.productName))
  }
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
      // [name]: name !== "price" ? value : (+value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })
  };
  const handleChangeSelectContract = (name, value) => {
    setInputContract({
      ...inputContract,
      [name]: value
    })
  };
  const handleChangeRealAssetId = (e) => {
    const clone = { ...input };
    clone.realAssetId = e.target.value;
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
  const handleChangePricePerUnit = (e) => {
    const clone = { ...input };
    // clone.pricePerUnit = (+e.target.value).toLocaleString();
    clone.pricePerUnit = e.target.value;
    setInput(clone);
  };
  const handleChangeSource = (e) => {
    const clone = { ...input };
    clone.source = e.target.value;
    setInput(clone);
  };
  const handleChangeGuaranteedMonth = (e) => {
    const clone = { ...input };
    clone.guaranteedMonth = e.target.value;
    setInput(clone);
  };
  const handleChangeAssetGroupNumber = (e) => {
    const clone = { ...input };
    clone.assetGroupNumber = e.target.value;
    setInput(clone);
  };

  const [img, setImg] = useState();

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

  const handleGenData = (e) => { };
  // const [errorTable, setErrorTable] = useState(false)
  const handleForm = async () => {
    let errInput, errContract, errSale, errTable
    console.log(input)
    Object.values(input).map((value, index) => {
      if (errInput) return
      if (!value) errInput = true
    })
    bottomSubComponentData.map(ele => {
      Object.values(ele).map((value, index) => {
        const key = (Object.keys(ele)[index])
        if (errTable) return
        if(key === "serialNumber" || key == "pricePerUnit" || key == "asset01") {
          if (!value) errTable = true
        }
      })
    })
    Object.values(inputContract).map((value, index) => {
      if (errContract) return
      if (!value) errContract = true
    })
    Object.entries(inputSale).forEach(([key, value], index) => {
      if (errSale || key === "distributionNote") return
      if (!value) errSale = true
    })
    console.log(errInput, errContract, errSale, errTable);
    if (errInput) window.scrollTo({ top: 170, behavior: "smooth", });
    // if (errTable) setErrorTable(true)
    if (!(errInput || errContract || errSale || errTable)) setShowModalConfirm(true)
  }

  const handleSubmit = async (e) => {
    const inputJSON = JSON.stringify(input);
    // const genDataJSON = JSON.stringify(genData);
    const formData = new FormData();
    formData.append("input", inputJSON);
    formData.append("insuranceStartDate", insuranceStartDate);
    formData.append("insuranceExpiredDate", insuranceExpiredDate);

    // image file
    const existArrayImage = [];
    arrayImage.forEach((el) => {
      if (el.image._id) {
        existArrayImage.push(el.image);
      } else {
        formData.append("arrayImage", el.image);
      }
    });
    console.log("existArrayImage", existArrayImage)
    formData.append("existArrayImage", JSON.stringify(existArrayImage));

    // document file
    const existArrayDocument = [];
    arrayDocument.forEach((el) => {
      if (el.document._id) {
        existArrayDocument.push(el.document);
      } else {
        formData.append("arrayDocument", el.document);
      }
    });
    formData.append("existArrayDocument", JSON.stringify(existArrayDocument));

    // formData.append("genDataJSON", genDataJSON);
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


    //สัญญาจัดซื้อ
    formData.append("acquisitionMethod", inputContract.acquisitionMethod);
    formData.append("moneyType", inputContract.moneyType);
    formData.append("deliveryDocument", inputContract.deliveryDocument);
    formData.append("contractNumber", inputContract.contractNumber);
    formData.append("receivedDate", inputContract.receivedDate);
    formData.append("seller", inputContract.seller);
    formData.append("price", inputContract.price);
    formData.append("billNumber", inputContract.billNumber);
    formData.append("purchaseYear", inputContract.purchaseYear);
    formData.append("purchaseDate", inputContract.purchaseDate);
    formData.append("documentDate", inputContract.documentDate);

    //การจำหน่าย
    formData.append("salesDocument", inputSale.salesDocument);
    formData.append("distributeDocumentDate", inputSale.distributeDocumentDate);
    formData.append("distributeApprovalReleaseDate", inputSale.distributeApprovalReleaseDate);
    formData.append("distributeStatus", inputSale.distributeStatus);
    formData.append("distributionNote", inputSale.distributionNote);

    //for subComponent
    const bottomSubComponentDataJSON = JSON.stringify(bottomSubComponentData);
    formData.append("bottomSubComponentDataJSON", bottomSubComponentDataJSON);

    const response = await updatePackageAsset(formData, packageAssetId);
    if (response.data.message.includes("updated success")) {
      setShowModalConfirm(false)
      setShowModalSuccess(true)
    }
  };

  useEffect(() => {
    const fetchPackageAssetById = async () => {
      try {
        const res = await getPackageAssetById(packageAssetId);
        console.log(res.data.packageAsset[0]);
        const packageAsset = res.data.packageAsset[0];
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
          // allSector: packageAsset.allSector || 'ast', //
          assetNumber: packageAsset.assetNumber,
          sector: packageAsset.sector,
          // asset01: packageAsset.asset01 || 'as01', //
          // serialNumber: packageAsset.serialNumber || 'srn', //
          replacedAssetNumber: packageAsset.replacedAssetNumber,
          assetGroupNumber: packageAsset.assetGroupNumber,
          type4: packageAsset.type4,
          type8: packageAsset.type8,
          type13: packageAsset.type13,
        });
        setInsuranceStartDate(new Date(packageAsset.insuranceStartDate));
        setInsuranceExpiredDate(new Date(packageAsset.insuranceExpiredDate));

        setBottomSubComponentData(packageAsset.asset)

        const fetchImages = packageAsset.imageArray;
        const clone = [...arrayImage];
        for (let el of fetchImages) {
          clone.push({ image: { name: el.image, _id: el._id } });
        }
        setArrayImage(clone);

        // console.log(packageAsset.documentArray)
        const fetchDocuments = packageAsset.documentArray;
        const cloneDoc = [...arrayDocument];
        for (let el of fetchDocuments) {
          cloneDoc.push({ document: { name: el.document, _id: el._id } });
        }
        // console.log(cloneDoc);

        setArrayDocument(cloneDoc);

        //Modal ค่าเสื่อมราคา
        setDepreciationStartDate(new Date(packageAsset.depreciationStartDate));
        setDepreciationRegisterDate(
          new Date(packageAsset.depreciationRegisterDate)
        );
        setDepreciationReceivedDate(
          new Date(packageAsset.depreciationReceivedDate)
        );
        setDepreciationPrice(packageAsset.depreciationPrice);
        setDepreciationYearUsed(packageAsset.depreciationYearUsed);
        setDepreciationCarcassPrice(packageAsset.depreciationCarcassPrice);
        setDepreciationProcess(packageAsset.depreciationProcess);
        setDepreciationPresentMonth(packageAsset.depreciationPresentMonth);
        setDepreciationCumulativePrice(
          packageAsset.depreciationCumulativePrice
        );
        setDepreciationYearPrice(packageAsset.depreciationYearPrice);
        setDepreciationRemainPrice(packageAsset.depreciationRemainPrice);
        setDepreciationBookValue(packageAsset.depreciationBookValue);

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
        setAccumulateDepreciationPrice(
          packageAsset.accumulateDepreciationPrice
        );
        setAccumulateDepreciationYearUsed(
          packageAsset.accumulateDepreciationYearUsed
        );
        setAccumulateDepreciationCarcassPrice(
          packageAsset.accumulateDepreciationCarcassPrice
        );
        setAccumulateDepreciationProcess(
          packageAsset.accumulateDepreciationProcess
        );
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
        setInputContract({
          acquisitionMethod: packageAsset.purchaseContract.acquisitionMethod,
          moneyType: packageAsset.purchaseContract.moneyType,
          deliveryDocument: packageAsset.purchaseContract.deliveryDocument,
          contractNumber: packageAsset.purchaseContract.contractNumber,
          receivedDate: new Date(packageAsset.purchaseContract.receivedDate),
          seller: packageAsset.purchaseContract.seller,
          price: packageAsset.purchaseContract.price,
          billNumber: packageAsset.purchaseContract.billNumber,
          purchaseYear: new Date(packageAsset.purchaseContract.purchaseYear),
          purchaseDate: new Date(packageAsset.purchaseContract.purchaseDate),
          documentDate: new Date(packageAsset.purchaseContract.documentDate),
        })

        // การจำหน่าย
        setInputSale({
          salesDocument: packageAsset.distribution.salesDocument,
          distributeDocumentDate: new Date(packageAsset.distribution.distributeDocumentDate),
          distributeApprovalReleaseDate: new Date(packageAsset.distribution.distributeApprovalReleaseDate),
          distributeStatus: packageAsset.distribution.distributeStatus,
          distributionNote: packageAsset.distribution.distributionNote
        })

        if (packageAsset) setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchPackageAssetById();
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
        <div className="flex items-center">
          <Link
            to="/packageAssetInformationIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">
            แก้ไขข้อมูลครุภัณฑ์เป็นชุด
          </div>
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
              ข้อมูลครุภัณฑ์
            </Link>
            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">
              แก้ไขข้อมูลครุภัณฑ์เป็นชุด
            </div>
          </div>
        </div>

        {isLoading
          ? '...'
          : <>
            {/* block white top */}
            <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
              <div>บันทึกใบเบิกจ่ายครุภัณฑ์</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
                {/* ชื่อครุภัณฑ์ภาษาไทย */}
                <div>
                  <div className="mb-1">ชื่อครุภัณฑ์ภาษาไทย</div>
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    onChange={handleChangeProductName}
                    value={input.productName}
                    className={`${!input.productName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                  {/* <div className="text-red-500 pt-1">{invalidName === "productName" ? `*โปรดระบุให้ถูกต้อง` : !input.productName && `*โปรดระบุ`}</div> */}
                  <div className="text-red-500 pt-1">{checkInvalidName() && `*โปรดระบุให้ถูกต้อง`}</div>
                </div>
                {/* ชื่อครุภัณฑ์ภาษาอังกฤษ */}
                <div>
                  <div className="mb-1">ชื่อครุภัณฑ์ภาษาอังกฤษ</div>
                  <input
                    type="text"
                    name="engProductName"
                    id="engProductName"
                    onChange={handleChangeEngProductName}
                    value={input.engProductName}
                    className={`${!input.engProductName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                  {/* <div className="text-red-500 pt-1">{invalidName === "engProductName" ? `*โปรดระบุให้ถูกต้อง` : !input.engProductName && `*โปรดระบุ`}</div> */}
                  <div className="text-red-500 pt-1">{checkInvalidEngName() && `*โปรดระบุให้ถูกต้อง`}</div>
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
                    className={`${!input.type && 'border-red-500'}  w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!input.kind && 'border-red-500'}  w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* ลำดับครุภัณฑ์ (ID) */}
                <div>
                  <div className="mb-1">ลำดับครุภัณฑ์ (ID)</div>
                  <input
                    type="text"
                    name="realAssetId"
                    id="realAssetId"
                    onChange={handleChangeRealAssetId}
                    value={input.realAssetId}
                    className={`${!input.realAssetId && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                      isValid={!input.unit}
                    />
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
                      isValid={!input.brand}
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
                    isValid={!input.model}
                    className={`${!input.model && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
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
                    isValid={!input.size}
                    className={`${!input.size && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* หมวดหมู่ครุภัณฑ์ */}
                <div>
                  <div className="mb-1">หมวดหมู่ครุภัณฑ์</div>
                  <div className="flex h-[38px] ">
                    <input
                      type="text"
                      name="kind"
                      id="kind"
                      onChange={handleChangeKind}
                      value={input.category}
                      className={`${!input.category && 'border-red-500'}  w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    />
                    {/* <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"หมวดหมู่ครุภัณฑ์"}
                  isValid={!input.category}
                /> */}
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
                      isValid={!input.group}
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
                      isValid={!input.acquiredType}
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
                      isValid={!input.source}
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
                      isValid={!input.purposeOfUse}
                    />
                  </div>
                </div>
                {/* ราคาต่อหน่วย (บาท) */}
                <div>
                  <div className="mb-1">ราคาต่อหน่วย (บาท)</div>
                  <input
                    type="number"
                    name="pricePerUnit"
                    id="pricePerUnit"
                    onChange={handleChangePricePerUnit}
                    value={(input.pricePerUnit)}
                    className={`${!input.pricePerUnit && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
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
                    className={`${!input.guaranteedMonth && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* วันที่เริ่มรับประกัน */}
                <div>
                  <div className="mb-1">วันที่เริ่มรับประกัน</div>
                  <div className="flex h-[38px]">
                    <DateInput
                      state={insuranceStartDate}
                      setState={setInsuranceStartDate}
                      error={!insuranceStartDate}
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
                      error={!insuranceExpiredDate}
                    />
                  </div>
                </div>

                {/* หน่วยงานเจ้าของครุภัณฑ์ */}
                {/* <div>
              <div className="mb-1">หน่วยงานเจ้าของครุภัณฑ์</div>
              <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"หน่วยงานเจ้าของครุภัณฑ์"}
                />
              </div>
            </div> */}

                {/* ประเภทครุภัณฑ์ 4 หลัก */}
                <div>
                  <div className="mb-1">ประเภทครุภัณฑ์ 4 หลัก</div>
                  <div className="flex h-[38px] ">
                    <Selector
                      placeholder={"Select"}
                      state={input}
                      setState={setInput}
                      id={"ประเภทครุภัณฑ์ 4 หลัก"}
                      // isValid={!input.type4}
                      disabled={"true"}
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
                      disabled
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
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1">หน่วยงาน</div>
                  <div className="flex h-[38px] ">
                    <Selector
                      placeholder={"Select"}
                      state={input}
                      setState={setInput}
                      id={"หน่วยงาน"}
                      isValid={!input.sector}
                      index={0}
                    />
                  </div>
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
                      isValid={!input.replacedAssetNumber}
                    />
                  </div>
                </div>

                {/* เลขครุภัณฑ์ */}
                {/* <div>
              <div className="mb-1">เลขครุภัณฑ์</div>
              <input
                type="text"
                name="assetNumber"
                id="assetNumber"
                disabled
                value={input.assetNumber}
                className="w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
              />
            </div> */}
                {/* รหัสกลุ่มครุภัณฑ์ */}
                <div>
                  <div className="mb-1">รหัสกลุ่มครุภัณฑ์</div>
                  <input
                    type="text"
                    name="assetGroupNumber"
                    id="assetGroupNumber"
                    disabled
                    onChange={handleChangeAssetGroupNumber}
                    value={input.assetGroupNumber}
                    className={`${!input.assetGroupNumber && 'border-red-500'}  w-full h-[38px] bg-gray-200 border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* <button
              type="button"
              // className="sm:col-start-2 sm:mt-5 text-white w-full h-[38px] px-4 py-2  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              className="sm:col-start-2 text-white w-full h-[38px] px-4 py-2  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={handleGenData}
            >
              สร้างเลขครุภัณฑ์
            </button> */}
              </div>

              {/* block white bottom */}
              {/* bottom */}
              <div className=" my-3 p-3">
                <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
                  <div className="w-[1000px] xl:w-full h-[300px] ">
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
                          isValid={true}
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
                <div className="sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80">
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
                </div>
                {/* file upload image*/}
                <div className="col-span-2 sm:mt-5">
                  <div className="h-64 overflow-y-auto scrollbar">
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
                          <IoIosClose className="text-2xl" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {!!arrayImage.length &&
                    <button
                      className="mt-2 flex mx-auto items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                      onClick={() => setShowViewImageModal(true)}
                    >
                      <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mr-2" />
                      ดูรูปภาพ
                    </button>
                  }
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
                          <IoIosClose className="text-2xl" />
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
                      setState={value => handleChangeSelectContract("acquisitionMethod", value)}
                      state={inputContract.acquisitionMethod}
                      isValid={!inputContract.acquisitionMethod}
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
                      isValid={!inputContract.moneyType}
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
                    className={`${!inputContract.deliveryDocument && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!inputContract.contractNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* ผู้ขาย */}
                <div>
                  <div className="mb-1">ผู้ขาย</div>
                  <div className="flex h-[38px] ">
                    <Selector
                      placeholder={"Select"}
                      state={inputContract.seller}
                      setState={value => handleChangeSelectContract("seller", value)}
                      isValid={!inputContract.seller}
                      id={"ผู้ขาย"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {/* วันที่ซื้อ */}
                  <div>
                    <div className="mb-1">วันที่ซื้อ</div>
                    <div className="flex h-[38px]">
                      <DateInput state={inputContract.purchaseDate}
                        setState={value => handleChangeSelectContract("purchaseDate", value)}
                        error={!inputContract.purchaseDate}
                      />
                    </div>
                  </div>
                  {/* วันที่รับมอบ */}
                  <div>
                    <div className="mb-1">วันที่รับมอบ</div>
                    <div className="flex h-[38px]">
                      <DateInput state={inputContract.receivedDate}
                        setState={value => handleChangeSelectContract("receivedDate", value)}
                        error={!inputContract.receivedDate}
                      />
                    </div>
                  </div>
                </div>
                {/* ราคาซื้อ (บาท) */}
                <div>
                  <div className="mb-1">ราคาซื้อ (บาท)</div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    onChange={handleChangeContract}
                    value={inputContract.price}
                    className={`${!inputContract.price && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!inputContract.billNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* ปีที่ซื้อ */}
                <div>
                  <div className="mb-1">ปีงบประมาณที่ซื้อ</div>
                  <div className="flex h-[38px]">
                    <DateInput onlyYear state={inputContract.purchaseYear}
                      setState={value => handleChangeSelectContract("purchaseYear", value)}
                      error={!inputContract.purchaseYear}
                    />
                  </div>
                </div>

                {/* วันที่ลงเอกสาร */}
                <div>
                  <div className="mb-1">วันที่ลงเอกสาร</div>
                  <div className="flex h-[38px]">
                    <DateInput state={inputContract.documentDate} setState={value => handleChangeSelectContract("documentDate", value)}
                      error={!inputContract.documentDate}
                    />
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
                    className={`${!inputSale.salesDocument && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* เอกสารลงวันที่ */}
                <div>
                  <div className="mb-1">เอกสารลงวันที่</div>
                  <div className="flex h-[38px]">
                    <DateInput
                      setState={(value) => handleChangeSelectSale("distributeDocumentDate", value)}
                      state={inputSale.distributeDocumentDate}
                      error={!inputSale.distributeDocumentDate}
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
                      error={!inputSale.distributeApprovalReleaseDate}
                    />
                  </div>
                </div>
                {/* สถานะ */}
                <div>
                  <div className="mb-1">สถานะ</div>
                  <div className="flex h-[38px] ">
                    <Selector
                      placeholder={"Select"}
                      state={inputSale.distributeStatus}
                      setState={(value) => handleChangeSelectSale("distributeStatus", value)}
                      id={"สถานะ"}
                      isValid={!inputSale.distributeStatus}
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
          </>
        }

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
              <img key={idx} crossorigin="true" src={el} className="w-[640px] mb-5" />
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
              onClick={handleForm}
              disabled={isLoading}
            >
              บันทึกข้อมูล
            </button>

            <ModalConfirmSave
              mode="edit"
              isVisible={showModalConfirm}
              onClose={() => setShowModalConfirm(false)}
              onSave={handleSubmit}
            />
            {showModalSuccess && <ModalSuccess urlPath='/packageAssetInformationIndex' />}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPackageAssetInformation;
