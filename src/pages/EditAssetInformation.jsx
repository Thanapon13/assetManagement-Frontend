import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import YearInput from "../components/date/YearInput";
import RowOfTableAssetInformation from "../components/table/RowOfTableAssetInformation";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import {
  createAsset,
  getAssetById,
  getImageById,
  updateAsset,
} from "../api/assetApi";
import BarcodeScanner from "../components/scanner/BarcodeScanner";
import QRscanner from "../components/scanner/QRscanner";
import { useEffect } from "react";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import ReactToPrint from "react-to-print";
import { useBarcode } from "@createnextapp/react-barcode";
import QRcode from "qrcode.react";
import { IoIosClose } from "react-icons/io";
import { Spinner } from "flowbite-react";
import { getAcquiredType, getAcquisitionMethod, getBrandData, getCategory, getGroupData, getMoneyType, getPurposeOfUse, getSector, getSourceData } from "../api/masterApi";
import SearchSelector from "../components/selector/SearchSelector";

const EditAssetInformation = () => {
  const { assetId } = useParams();

  const inputImg = useRef();
  const inputDoc = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const todayThaiDate = new Date()

  // useState
  const [isLoading, setIsLoading] = useState(true)
  // const [typeList, setTypeList] = useState([])
  // const [kindList, setKindList] = useState([])
  // หน่วยนับ
  const [brandList, setBrandList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [acquiredTypeList, setAcquiredTypeList] = useState([])
  const [sourceList, setSourceList] = useState([])
  const [purposeOfUseList, setPurposeOfUseList] = useState([])
  const [acquisitionMethodList, setAcquisitionMethodList] = useState([])
  const [moneyTypeList, setMoneyTypeList] = useState([])
  const [sectorList, setSectorList] = useState([])

  useEffect(() => {
    getMasterData()
  }, []);

  const getMasterData = async () => {
    // const type = await getTypeData()
    // const arrType = formArrayOption(type.data.type)
    // setTypeList(arrType)
    // const kind = await getKindAll()
    // const arrKind = formArrayOption(kind.data.kind)
    // setKindList(arrKind)
    const brand = await getBrandData()
    const arrBrand = formArrayOption(brand.data.brand)
    setBrandList(arrBrand)
    const category = await getCategory()
    const arrCategory = formArrayOption(category.data.category)
    setCategoryList(arrCategory)
    const group = await getGroupData()
    const arrGroup = formArrayOption(group.data.group)
    setGroupList(arrGroup)
    const acquiredType = await getAcquiredType()
    const arrAcquiredType = formArrayOption(acquiredType.data.acquiredType)
    setAcquiredTypeList(arrAcquiredType)
    const source = await getSourceData()
    const arrSource = formArrayOption(source.data.source)
    setSourceList(arrSource)
    const purposeOfUse = await getPurposeOfUse()
    const arrPurposeOfUse = formArrayOption(purposeOfUse.data.purposeOfUse)
    setPurposeOfUseList(arrPurposeOfUse)
    const acquisitionMethod = await getAcquisitionMethod()
    const arrAcquisitionMethod = formArrayOption(acquisitionMethod.data.acquisitionMethod)
    setAcquisitionMethodList(arrAcquisitionMethod)
    const moneyType = await getMoneyType()
    const arrMoneyType = formArrayOption(moneyType.data.moneyType)
    setMoneyTypeList(arrMoneyType)
    const sector = await getSector()
    const arrSector = formArrayOption(sector.data.sector)
    setSectorList(arrSector)
    // merchant
    // status
  }

  function formArrayOption(data) {
    const array = []
    data.map(ele => {
      array.push({ label: ele.name, value: ele.name })
    })
    return array
  }

  const handleSelect = (value, label) => {
    setInput({ ...input, [label]: value })
  }

  const [input, setInput] = useState({
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
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    pricePerUnit: 0,
    guaranteedMonth: "",
    purposeOfUse: "",
    // allSector: "",
    // assetNumber: "", //
    sector: "",
    asset01: "",
    serialNumber: "",
    replacedAssetNumber: "",
  });
  const [errorInput, setErrorInput] = useState(false)

  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

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
  const [errorContract, setErrorContract] = useState(false)

  // การจำหน่าย
  const [inputSale, setInputSale] = useState({
    salesDocument: "",
    distributeDocumentDate: "",
    distributeApprovalReleaseDate: "",
    distributeStatus: "",
    distributionNote: ""
  })
  const [errorSale, setErrorSale] = useState(false)

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
  const [insuranceExpiredDate, setInsuranceExpiredDate] = useState();

  // handle
  const handleChangeSales = (e) => {
    const { name, value } = e.target
    if (!value) setErrorSale(true)
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
      // [name]: value
      [name]: name !== "price" ? value : (+value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
    clone.guaranteedMonth = e.target.value.toString();
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
    // setBarcode(e.target.value) //*
  };

  const [img, setImg] = useState();

  //upload image
  // validate size 2mb = 2,000,000 byte
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    // console.log(fileList);
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
        console.log(cloneFile);
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
    // console.log(fileList);
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
    // console.log(cloneFile)
    setArrayDocument(cloneFile);
  };

  const deleteDoc = (idx) => {
    let clone = [...arrayDocument];
    clone.splice(idx, 1);
    setArrayDocument(clone);
  };

  const handleSubmit = async (e) => {
    let errInput, errContact, errSale
    // checkError
    console.log(inputSale);
    Object.values(input).map((value, index) => {
      if (errInput) return
      if (!value) errInput = true
      if (Object.keys(input).length == index + 1) errInput = false
    })
    Object.values(inputContract).map((value, index) => {
      if (errContact) return
      if (!value) errContact = true
      if (Object.keys(inputContract).length == index + 1) errContact = false
    })
    Object.values(inputSale).map((value, index) => {
      if (errSale) return
      if (!value) errSale = true
      if (Object.keys(inputSale).length == index + 1) errSale = false
    })
    if (errInput) {
      window.scrollTo({ top: 180, behavior: "smooth", });
      setErrorInput(true)
    }
    if (errContact) setErrorContract(true)
    if (errSale) setErrorSale(true)
    if (!(errInput || errContact || errSale)) setShowModalConfirm(true)
  }

  const submit = async (e) => {
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
    const response = await updateAsset(formData, assetId);
    if (response.data.message.includes("updated success")) {
      setShowModalConfirm(false)
      setShowModalSuccess(true)
    }
  };

  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        const res = await getAssetById(assetId);
        console.log(res.data.asset);
        const asset = res.data.asset;
        console.log(asset.allSector)

        setImg(asset.imageArray[0].image);

        await setInput({
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
          // allSector: asset.allSector,
          assetNumber: asset.assetNumber,
          sector: asset.sector,
          asset01: asset.asset01,
          serialNumber: asset.serialNumber,
          replacedAssetNumber: asset.replacedAssetNumber,
        });
        setInsuranceStartDate(new Date(asset.insuranceStartDate))
        setInsuranceExpiredDate(new Date(asset.insuranceExpiredDate))

        const fetchImages = asset.imageArray;
        const clone = [...arrayImage];
        for (let el of fetchImages) {
          clone.push({ image: { name: el.image, _id: el._id } });
        }
        setArrayImage(clone);

        // console.log(asset.documentArray)
        const fetchDocuments = asset.documentArray;
        const cloneDoc = [...arrayDocument];
        for (let el of fetchDocuments) {
          cloneDoc.push({ document: { name: el.document, _id: el._id } });
        }
        // console.log(cloneDoc);

        setArrayDocument(cloneDoc);

        //Modal ค่าเสื่อมราคา
        setDepreciationStartDate(new Date(asset.depreciationStartDate));
        setDepreciationRegisterDate(new Date(asset.depreciationRegisterDate));
        setDepreciationReceivedDate(new Date(asset.depreciationReceivedDate));
        setDepreciationPrice(asset.depreciationPrice);
        setDepreciationYearUsed(asset.depreciationYearUsed);
        setDepreciationCarcassPrice(asset.depreciationCarcassPrice);
        setDepreciationProcess(asset.depreciationProcess);
        setDepreciationPresentMonth(asset.depreciationPresentMonth);
        setDepreciationCumulativePrice(asset.depreciationCumulativePrice);
        setDepreciationYearPrice(asset.depreciationYearPrice);
        setDepreciationRemainPrice(asset.depreciationRemainPrice);
        setDepreciationBookValue(asset.depreciationBookValue);

        //Modal ค่าเสื่อมราคา(ผลรวมจำนวนปี)
        setAccumulateDepreciationStartDate(
          new Date(asset.accumulateDepreciationStartDate)
        );
        setAccumulateDepreciationRegisterDate(
          new Date(asset.accumulateDepreciationRegisterDate)
        );
        setAccumulateDepreciationReceivedDate(
          new Date(asset.accumulateDepreciationReceivedDate)
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
        setInputContract({
          acquisitionMethod: asset.purchaseContract.acquisitionMethod,
          moneyType: asset.purchaseContract.moneyType,
          deliveryDocument: asset.purchaseContract.deliveryDocument,
          contractNumber: asset.purchaseContract.contractNumber,
          receivedDate: new Date(asset.purchaseContract.receivedDate),
          seller: asset.purchaseContract.seller,
          price: (+asset.purchaseContract.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          // price: asset.purchaseContract.price,
          billNumber: asset.purchaseContract.billNumber,
          purchaseYear: new Date(asset.purchaseContract.purchaseYear),
          purchaseDate: new Date(asset.purchaseContract.purchaseDate),
          documentDate: new Date(asset.purchaseContract.documentDate),
        })
        // setAcquisitionMethod(asset.purchaseContract.acquisitionMethod);
        // setMoneyType(asset.purchaseContract.moneyType);
        // setDeliveryDocument(asset.purchaseContract.deliveryDocument);
        // setContractNumber(asset.purchaseContract.contractNumber);
        // setReceivedDate(new Date(asset.purchaseContract.receivedDate));
        // setSeller(asset.purchaseContract.seller);
        // setPrice(asset.purchaseContract.price);
        // setBillNumber(asset.purchaseContract.billNumber);
        // setPurchaseYear(new Date(asset.purchaseContract.purchaseYear));
        // setPurchaseDate(new Date(asset.purchaseContract.purchaseDate));
        // setDocumentDate(new Date(asset.purchaseContract.documentDate));
        // การจำหน่าย
        setInputSale({
          salesDocument: asset.distribution.salesDocument,
          distributeDocumentDate: new Date(asset.distribution.distributeDocumentDate),
          distributeApprovalReleaseDate: new Date(asset.distribution.distributeApprovalReleaseDate),
          distributeStatus: asset.distribution.distributeStatus,
          distributionNote: asset.distribution.distributionNote
        })
        // setSalesDocument(asset.distribution.salesDocument);
        // setDistributeStatus(asset.distribution.distributeStatus);
        // setDistributionNote(asset.distribution.distributionNote);
        // setSalesDocument(asset.distribution.salesDocument);
        // setDistributeDocumentDate(
        //   new Date(asset.distribution.distributeDocumentDate)
        // );
        // setDistributeApprovalReleaseDate(
        //   new Date(asset.distribution.distributeApprovalReleaseDate)
        // );
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAssetById();
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
        {/* {img && (
          <img
            crossorigin="true"
            src={`http://localhost:4000/images/${img}`}
            className="w-[640px]"
          />
        )} */}
        {/* Header */}
        <div className="flex items-center mx-10">
          <Link
            to="/assetInformationIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">แก้ไขข้อมูลครุภัณฑ์</div>
        </div>
        <div className="flex justify-between items-center mx-10">
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
          <ButtonPrint serialNumber={input?.serialNumber} />
        </div>


        {isLoading
          ? <div className="mt-5 min-h-[70vh] w-full text-center"><Spinner size="xl" /></div>
          :
          <>
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
                    className={`${!input.engProductName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!input.productName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!input.type && 'border-red-500'} w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    disabled
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
                    className={`${!input.kind && 'border-red-500'} w-full h-[38px] bg-gray-200  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    disabled
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
                      isValid={!input.unit}
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
                    className={`${!input.size && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* ยี่ห้อ */}
                <div>
                  <div className="mb-1">ยี่ห้อ</div>
                  {/* <div className="flex h-[38px] ">
                    <Selector
                      placeholder={"Select"}
                      state={input}
                      setState={setInput}
                      id={"ยี่ห้อ"}
                      isValid={!input.brand}
                    />
                  </div> */}
                  <SearchSelector
                    options={brandList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.brand}
                    value={{ label: input.brand, value: input.brand }}
                  />
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
                    className={`${!input.model && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* หมวดหมู่ครุภัณฑ์ */}
                <div>
                  <div className="mb-1">หมวดหมู่ครุภัณฑ์</div>
                  <SearchSelector
                    options={categoryList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.category}
                    value={{ label: input.category, value: input.category }}
                  />
                </div>
                {/* กลุ่ม */}
                <div>
                  <div className="mb-1">กลุ่ม</div>
                  <SearchSelector
                    options={groupList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.group}
                    value={{ label: input.group, value: input.group }}
                  />
                </div>
                {/* ประเภทที่ได้มา */}
                <div>
                  <div className="mb-1">ประเภทที่ได้มา</div>
                  <SearchSelector
                    options={acquiredTypeList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.acquiredType}
                    value={{ label: input.acquiredType, value: input.acquiredType }}
                  />
                </div>
                {/* แหล่งที่ได้มา */}
                <div>
                  <div className="mb-1">แหล่งที่ได้มา</div>
                  <SearchSelector
                    options={sourceList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.source}
                    value={{ label: input.source, value: input.source }}
                  />
                </div>
                {/* วัตถุประสงค์ในการใช้งาน */}
                <div>
                  <div className="mb-1">วัตถุประสงค์ในการใช้งาน</div>
                  <SearchSelector
                    options={purposeOfUseList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.purposeOfUse}
                    value={{ label: input.purposeOfUse, value: input.purposeOfUse }}
                  />
                </div>
                {/* จำนวนเดือนที่รับประกัน (เดือน) */}
                <div>
                  <div className="mb-1">จำนวนเดือนที่รับประกัน (เดือน)</div>
                  <input
                    type="number"
                    name="guaranteedMonth"
                    id="guaranteedMonth"
                    onChange={handleChangeGuaranteedMonth}
                    // lang="en"
                    value={input.guaranteedMonth}
                    // value={(+input.guaranteedMonth).toLocaleString()}
                    className={`${!input.guaranteedMonth && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* วันที่เริ่มรับประกัน */}
                <div>
                  <div className="mb-1">วันที่เริ่มรับประกัน</div>
                  <div className="flex h-[38px]">
                    <DateInput
                      error={!insuranceStartDate}
                      state={(insuranceStartDate)}
                      setState={setInsuranceStartDate}
                    />
                  </div>
                </div>
                {/* วันที่สิ้นสุดรับประกัน */}
                <div>
                  <div className="mb-1">วันที่สิ้นสุดรับประกัน</div>
                  <div className="flex h-[38px]">
                    <DateInput
                      error={!insuranceExpiredDate}
                      state={insuranceExpiredDate}
                      setState={setInsuranceExpiredDate}
                    />
                  </div>
                </div>

                {/* หน่วยงาน */}
                <div>
                  <div className="mb-1">หน่วยงาน</div>
                  <SearchSelector
                    options={sectorList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.sector}
                    value={{ label: input.sector, value: input.sector }}
                  />
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
                    className={`${!input.asset01 && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!input.serialNumber && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>

                {/* แทนครุภัณฑ์ที่ถูกแทงจำหน่าย */}
                <div>
                  <div className="mb-1">แทนครุภัณฑ์ที่ถูกแทงจำหน่าย</div>
                  <SearchSelector
                    options={sectorList}
                    name="type"
                    onChange={handleSelect}
                    noClearButton
                    error={!input.replacedAssetNumber}
                    value={{ label: input.replacedAssetNumber, value: input.replacedAssetNumber }}
                  />
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
                <div className="col-span-2 sm:mt-3">
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
                    <SearchSelector
                      options={acquisitionMethodList}
                      name="type"
                      onChange={handleSelect}
                      noClearButton
                      error={!inputContract.acquisitionMethod}
                      value={{ label: inputContract.acquisitionMethod, value: inputContract.acquisitionMethod }}
                    />
                </div>
                {/* ประเภทเงิน */}
                <div>
                  <div className="mb-1">ประเภทเงิน</div>
                  <SearchSelector
                      options={moneyTypeList}
                      name="type"
                      onChange={handleSelect}
                      noClearButton
                      error={!inputContract.moneyType}
                      value={{ label: inputContract.moneyType, value: inputContract.moneyType }}
                    />
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
                    className={`${!inputContract.deliveryDocument && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!inputContract.contractNumber && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* วันที่รับมอบ */}
                <div>
                  <div className="mb-1">วันที่รับมอบ</div>
                  <div className="flex h-[38px]">
                    <DateInput error={!inputContract.receivedDate} state={inputContract.receivedDate} setState={value => handleChangeSelectContract("receivedDate", value)}
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
                      isValid={!inputContract.seller}
                      id={"ผู้ขาย"}
                    />
                  </div>
                </div>
                {/* ราคาซื้อ (บาท) */}
                <div>
                  <div className="mb-1">ราคาซื้อ (บาท)</div>
                  <input
                    // min="0"
                    type="text"
                    name="price"
                    id="price"
                    onChange={handleChangeContract}
                    value={inputContract.price}
                    className={`${!inputContract.price && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
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
                    className={`${!inputContract.billNumber && 'border-red-500'}  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* ปีที่ซื้อ */}
                <div>
                  <div className="mb-1">ปีที่ซื้อ</div>
                  <div className="flex h-[38px]">
                    <YearInput state={inputContract.purchaseYear} setState={value => handleChangeSelectContract("purchaseYear", value)}
                      error={!inputContract.purchaseYear} />
                  </div>
                </div>

                {/* วันที่ซื้อ */}
                <div>
                  <div className="mb-1">วันที่ซื้อ</div>
                  <div className="flex h-[38px]">
                    <DateInput error={!inputContract.purchaseDate} state={inputContract.purchaseDate} setState={value => handleChangeSelectContract("purchaseDate", value)}
                    />
                  </div>
                </div>
                {/* วันที่ลงเอกสาร */}
                <div>
                  <div className="mb-1">วันที่ลงเอกสาร</div>
                  <div className="flex h-[38px]">
                    <DateInput error={!inputContract.purchaseDate} state={inputContract.documentDate} setState={value => handleChangeSelectContract("documentDate", value)}
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
                    // onChange={(e) => setSalesDocument(e.target.value)}
                    onChange={handleChangeSales}
                    value={inputSale.salesDocument}
                    className={`${!inputSale.salesDocument && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                  />
                </div>
                {/* เอกสารลงวันที่ */}
                <div>
                  <div className="mb-1">เอกสารลงวันที่</div>
                  <div className="flex h-[38px]">
                    <DateInput error={!inputSale.distributeDocumentDate}
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
                      // state={distributeStatus}
                      // setState={setDistributeStatus}
                      isValid={!inputSale.distributeStatus}
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
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={depreciationStartDate}
                          setState={setDepreciationStartDate}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={depreciationRegisterDate}
                          setState={setDepreciationRegisterDate}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={depreciationReceivedDate}
                          setState={setDepreciationReceivedDate}
                        />
                      </div>
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
                      <div className="flex h-[38px]">
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
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={accumulateDepreciationStartDate}
                          setState={setAccumulateDepreciationStartDate}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่ลงทะเบียน</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={accumulateDepreciationRegisterDate}
                          setState={setAccumulateDepreciationRegisterDate}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs">วันที่รับของ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="flex h-[38px]">
                        <OnlyDateInput
                          state={accumulateDepreciationReceivedDate}
                          setState={setAccumulateDepreciationReceivedDate}
                        />
                      </div>
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
                      <div className="flex h-[38px]">
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
              // console.log(el)

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
              onClick={handleSubmit}
              disabled={isLoading}
            >
              บันทึกข้อมูล
            </button>

            <ModalConfirmSave
              isVisible={showModalConfirm}
              onClose={() => setShowModalConfirm(false)}
              onSave={submit}
            />
            {showModalSuccess && <ModalSuccess urlPath='/assetInformationIndex' />}
          </div>
        </div>
      </div>
    </>
  );
};

function ButtonPrint(props) {
  const printRef = useRef();
  const noPrintRef = useRef();

  const { inputRef } = useBarcode({
    value: props?.serialNumber || null,
    options: { background: "#ffffff" },
  });

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <button
              type="button"
              className=" flex justify-center items-center text-white bg-blue-500 hover:bg-focus-blue rounded-lg focus:border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focus-blue focus:border-focus-blue  px-8 py-2 "
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
          )
        }}
        content={() => props?.serialNumber ? printRef.current : noPrintRef.current}
      />

      <div hidden>
        <div ref={printRef} className="absolute -z-10">
          <canvas id="mybarcode" ref={inputRef} className="w-full" />
          <QRcode id="myqr" value={props?.serialNumber} size={320} includeMargin={true} />
        </div>
        <div ref={noPrintRef} className="absolute -z-10">
          <div>
            <p>No barcode preview</p>
            <p>No QR code preview</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditAssetInformation;
