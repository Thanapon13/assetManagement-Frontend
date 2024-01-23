import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Selector from "../components/selector/Selector";
import { BsArrowLeft } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import ChangeDateToBuddhist from "../components/date/ChangeDateToBuddhist";
import DateInput from "../components/date/DateInput";
import RowOfTableAssetInformation from "../components/table/RowOfTableAssetInformation";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import Modal from "../components/modal/Modal";
import DeprecationDropdown from "../components/dropdown/DeprecationDropdown";
import { ToastContainer, toast } from "react-toastify";
import {
  createAsset,
  getAssetById,
  getByAssetNumberSelector,
  getByProductSelector,
  updateAsset
} from "../api/assetApi";
import BarcodeScanner from "../components/scanner/BarcodeScanner";
import QRscanner from "../components/scanner/QRscanner";
import { useEffect } from "react";
import OnlyDateInput from "../components/date/onlyDateInput";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { IoIosClose } from "react-icons/io";
import {
  getAcquiredType,
  getAcquisitionMethod,
  getBrandData,
  getCategory,
  getCountingUnit,
  getGroupData,
  getKindAll,
  getMoneyType,
  getPurposeOfUse,
  getSector,
  getSourceData,
  getSubsector,
  getTypeData
} from "../api/masterApi";
import SearchSelector from "../components/selector/SearchSelector";
import YearInput from "../components/date/YearInput";
import { getDropdownMerchant } from "../api/merchant";

const AssetInformation = () => {
  const inputImg = useRef();
  const inputDoc = useRef();

  const imageTypes = ["image/png", "image/jpeg", "image/svg+xml"];

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];

  const [typeList, setTypeList] = useState([]);
  const [kindList, setKindList] = useState([]);
  const [countingUnitList, setCountingUnitList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [acquiredTypeList, setAcquiredTypeList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [purposeOfUseList, setPurposeOfUseList] = useState([]);
  const [acquisitionMethodList, setAcquisitionMethodList] = useState([]);
  const [moneyTypeList, setMoneyTypeList] = useState([]);
  const [sectorList, setSectorList] = useState([]);
  const [merchantList, setMerchantList] = useState([]);
  // สถานะ?

  const [List, setList] = useState([]);
  const param = useParams();
  useEffect(() => {
    getMasterData();
    if (param.id) initData();
  }, []);

  async function initData() {
    const types = await getTypeData();
    const arrType = formArrayOption(types.data.type);
    setTypeList(arrType);
    const kinds = await getKindAll();
    const arrKind = formArrayOption(kinds.data.kind);
    setKindList(arrKind);
    const categorys = await getCategory();
    const arrCategory = formArrayOption(categorys.data.category);
    setCategoryList(arrCategory);
    const res = await getAssetById(param.id);
    const asset = res.data.asset[0];

    const type = arrType.find(ele => ele.value == asset.type);
    const kind = arrKind.find(ele => ele.value == asset.kind);
    const category = arrCategory.find(ele => ele.value == asset.category);
    setInput({
      engProductName: asset.engProductName,
      productName: asset.productName,
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
      assetGroupNumber: asset.assetGroupNumber,
      distributeToSector: asset.distributeToSector,
      // ...asset,
      type: { label: type.label, value: type.ele.value, name: asset.type } || {
        label: asset.type,
        name: asset.type
      },
      kind: { label: kind.label, value: kind.ele.value, name: asset.kind } || {
        label: asset.kind,
        name: asset.kind
      },
      category: {
        label: category.label,
        value: category.ele.value,
        name: asset.category
      } || { label: asset.category, name: asset.category }
    });

    setInputContract({
      ...asset?.purchaseContract,
      receivedDate: new Date(asset?.purchaseContract.receivedDate),
      purchaseYear: new Date(asset?.purchaseContract.purchaseYear),
      purchaseDate: new Date(asset?.purchaseContract.purchaseDate),
      documentDate: new Date(asset?.purchaseContract.documentDate)
    });
    setInputSale({
      ...asset?.distribution,
      distributeDocumentDate: new Date(
        asset?.distribution.distributeDocumentDate
      ),
      distributeApprovalReleaseDate: new Date(
        asset?.distribution.distributeApprovalReleaseDate
      )
    });
    setGenData(asset?.genDataArray || []);
    const docs = asset?.documentArray;
    docs.map(ele => {
      const name = ele.document;
      ele.document = { name: name };
    });
    setArrayDocument(docs);
    setArrayImage(asset?.imageArray);
  }

  const getMasterData = async () => {
    if (!param.id) {
      const type = await getTypeData();
      const arrType = formArrayOption(type.data.type);
      setTypeList(arrType);
      const kind = await getKindAll();
      const arrKind = formArrayOption(kind.data.kind);
      setKindList(arrKind);
      const category = await getCategory();
      const arrCategory = formArrayOption(category.data.category);
      setCategoryList(arrCategory);
    }
    const brand = await getBrandData();
    const arrBrand = formArrayOption(brand.data.brand);
    setBrandList(arrBrand);
    const group = await getGroupData();
    const arrGroup = formArrayOption(group.data.group);
    setGroupList(arrGroup);
    const acquiredType = await getAcquiredType();
    const arrAcquiredType = formArrayOption(acquiredType.data.acquiredType);
    setAcquiredTypeList(arrAcquiredType);
    const source = await getSourceData();
    const arrSource = formArrayOption(source.data.source);
    setSourceList(arrSource);
    const purposeOfUse = await getPurposeOfUse();
    const arrPurposeOfUse = formArrayOption(purposeOfUse.data.purposeOfUse);
    setPurposeOfUseList(arrPurposeOfUse);
    const acquisitionMethod = await getAcquisitionMethod();
    const arrAcquisitionMethod = formArrayOption(
      acquisitionMethod.data.acquisitionMethod
    );
    setAcquisitionMethodList(arrAcquisitionMethod);
    const moneyType = await getMoneyType();
    const arrMoneyType = formArrayOption(moneyType.data.moneyType);
    setMoneyTypeList(arrMoneyType);
    const sector = await getSector();
    const arrSector = formArrayOption(sector.data.sector);
    setSectorList(arrSector);
    const countingUnit = await getCountingUnit();
    const arrCountingUnit = formArrayOption(countingUnit.data.countingUnit);
    setCountingUnitList(arrCountingUnit);
    const merchantList = await getDropdownMerchant();
    const arrMerchantList = formArrayOption(merchantList.data.merchant);
    setMerchantList(arrMerchantList);
  };

  function formArrayOption(data) {
    const array = [];
    data.map(ele => {
      array.push({ label: ele.name, value: ele.name, ele: ele });
    });
    return array;
  }

  const handleSelect = (value, label, ele) => {
    console.log(ele, value);
    if (label == "kind" || label == "type" || label == "category") {
      setInput({ ...input, [label]: ele });
    } else {
      setInput({ ...input, [label]: value });
    }
  };

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
    quantity: "",
    // serialNumberMachine: "",
    source: "",
    category: "",
    acquiredType: "",
    group: "",
    pricePerUnit: "",
    guaranteedMonth: "",
    purposeOfUse: "",
    assetGroupNumber: "",
    distributeToSector: ""
  });

  const [errorInput, setErrorInput] = useState(false);
  const [errorGen, setErrorGen] = useState(false);
  const [errorAssestTable, setErrorAssestTable] = useState(false);
  // upload image
  const [arrayImage, setArrayImage] = useState([]);
  const [arrayImageURL, setArrayImageURL] = useState([]);
  const [sendArrayImage, setSendArrayImage] = useState([]);

  // คู่มือและเอกสารแนบ
  const [arrayDocument, setArrayDocument] = useState([]);

  // gen เลขครุภัณฑ์
  const [genData, setGenData] = useState([]);

  const [indexGenData, setIndexGenData] = useState(0);
  const [barcode, setBarcode] = useState(genData[indexGenData]?.serialNumber);
  const [qr, setQr] = useState(genData[indexGenData]?.serialNumber);

  // สัญญาจัดซื้อ
  const [inputContract, setInputContract] = useState({
    acquisitionMethod: "",
    moneyType: "",
    deliveryDocument: "",
    contractNumber: "",
    receivedDate: new Date(),
    seller: "",
    price: "",
    billNumber: "",
    purchaseYear: new Date(),
    purchaseDate: new Date(),
    documentDate: new Date()
  });
  const [errorContract, setErrorContract] = useState(false);

  // การจำหน่าย
  const [inputSale, setInputSale] = useState({
    salesDocument: "",
    distributeDocumentDate: new Date(),
    distributeApprovalReleaseDate: new Date(),
    distributeStatus: "",
    distributionNote: ""
  });
  const [errorSale, setErrorSale] = useState(false);

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
    setAccumulateDepreciationRegisterDate
  ] = useState(new Date());
  const [
    accumulateDepreciationReceivedDate,
    setAccumulateDepreciationReceivedDate
  ] = useState(new Date());
  const [accumulateDepreciationPrice, setAccumulateDepreciationPrice] =
    useState(0);
  const [accumulateDepreciationYearUsed, setAccumulateDepreciationYearUsed] =
    useState(0);
  const [
    accumulateDepreciationCarcassPrice,
    setAccumulateDepreciationCarcassPrice
  ] = useState(0);
  const [accumulateDepreciationProcess, setAccumulateDepreciationProcess] =
    useState(0);
  const [
    accumulateDepreciationPresentMonth,
    setAccumulateDepreciationPresentMonth
  ] = useState(0);
  const [
    accumulateDepreciationCumulativePrice,
    setAccumulateDepreciationCumulativePrice
  ] = useState(0);
  const [accumulateDepreciationYearPrice, setAccumulateDepreciationYearPrice] =
    useState(0);
  const [
    accumulateDepreciationRemainPrice,
    setAccumulateDepreciationRemainPrice
  ] = useState(0);
  const [accumulateDepreciationBookValue, setAccumulateDepreciationBookValue] =
    useState(0);

  //Main Date
  const [insuranceStartDate, setInsuranceStartDate] = useState(new Date());
  const [insuranceExpiredDate, setInsuranceExpiredDate] = useState(new Date());

  // handle
  const handleChange = e => {
    const clone = { ...input };
    clone[e.target.name] = e.target.value;
    setInput(clone);
  };
  const handleChangeSales = e => {
    const { name, value } = e.target;
    setInputSale({
      ...inputSale,
      [name]: value
    });
  };
  const handleChangeSelectSale = (name, value) => {
    setInputSale({
      ...inputSale,
      [name]: value
    });
  };
  const handleChangeContract = e => {
    const { name, value } = e.target;
    setInputContract({
      ...inputContract,
      [name]: value
    });
  };
  const handleChangeSelectContract = (name, value) => {
    setInputContract({
      ...inputContract,
      [name]: value
    });
  };
  const handleChangeRealAssetId = e => {
    const clone = { ...input };
    clone.realAssetId = e.target.value;
    setInput(clone);
  };
  const handleChangeAssetGroupNumber = e => {
    const clone = { ...input };
    clone.assetGroupNumber = e.target.value;
    setInput(clone);
  };
  const handleChangeEngProductName = e => {
    const clone = { ...input };
    clone.engProductName = e.target.value;
    setInput(clone);
  };
  function checkInvalidEngName() {
    return /[ก-ฮ]/.test(input.engProductName);
  }
  function checkInvalidName() {
    return /[A-Za-z]/.test(input.productName);
  }
  const handleChangeProductName = e => {
    const clone = { ...input };
    clone.productName = e.target.value;
    setInput(clone);
  };
  const handleChangeModel = e => {
    const clone = { ...input };
    clone.model = e.target.value;
    setInput(clone);
  };
  const handleChangeSize = e => {
    const clone = { ...input };
    clone.size = e.target.value;
    setInput(clone);
  };
  const handleChangeQuantity = e => {
    const clone = { ...input };
    // if (e.target.value) setErrorGen(false)
    clone.quantity = e.target.value;
    setInput(clone);
  };
  const handleChangePricePerUnit = e => {
    const clone = { ...input };
    clone.pricePerUnit = e.target.value;
    setInput(clone);
  };
  const handleChangeSource = e => {
    const clone = { ...input };
    clone.source = e.target.value;
    setInput(clone);
  };
  const handleChangeAllSector = e => {
    const clone = { ...input };
    clone.allSector = e.target.value;
    setInput(clone);
  };
  const handleChangeGuaranteedMonth = e => {
    const clone = { ...input };
    clone.guaranteedMonth = e.target.value;
    setInput(clone);
  };

  //upload image
  // validate size 2mb = 2,000,000 byte
  const handleImageChange = e => {
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
          theme: "light"
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
          theme: "light"
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
          theme: "light"
        });
      } else {
        cloneFile.push({ image: fileList[i] });
      }
    }

    setArrayImage(cloneFile);
  };

  const deleteImg = idx => {
    let clone = [...arrayImage];
    clone.splice(idx, 1);
    setArrayImage(clone);
  };

  //คู่มือและเอกสารแนบ
  const handleFileChange = e => {
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
            theme: "light"
          }
        );
      }
    }
    setArrayDocument(cloneFile);
  };

  const deleteDoc = idx => {
    let clone = [...arrayDocument];
    clone.splice(idx, 1);
    setArrayDocument(clone);
  };

  const handleGenData = () => {
    if (!input.quantity || !input.type || !input.category || !input.kind) {
      setErrorGen(true);
    } else {
      const arr = [];
      fetchAssetList();
      const assetGroupNumber =
        (+input.category?.value).toLocaleString(undefined, {
          useGrouping: false,
          minimumIntegerDigits: 2
        }) +
        (+input.type?.value).toLocaleString(undefined, {
          useGrouping: false,
          minimumIntegerDigits: 2
        }) +
        "-" +
        (+input.kind?.value).toLocaleString(undefined, {
          useGrouping: false,
          minimumIntegerDigits: 3
        });
      setInput({
        ...input,
        assetGroupNumber: assetGroupNumber
      });

      for (let i = 0; i < input.quantity; i++) {
        arr.push({
          assetNumber:
            assetGroupNumber +
            "/" +
            (i + 1).toLocaleString(undefined, {
              minimumIntegerDigits: 4,
              useGrouping: false
            }),
          serialNumber: "",
          sector: input.distributeToSector,
          asset01: "",
          replacedAssetNumber: ""
        });
      }
      setGenData(arr);
    }
  };

  const [assetList, setAssetList] = useState([]);
  const fetchAssetList = async () => {
    try {
      const res = await getByProductSelector({
        assetNumber: "",
        productName: ""
      });
      console.log(res.data.asset);
      setAssetList(res.data.asset);
      const resAssetNumber = await getByAssetNumberSelector({
        assetNumber: "",
        productName: ""
      });
      console.log(resAssetNumber.data.asset);
      // setDataAssetNumber(resAssetNumber.data.asset)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async e => {
    let errInput, errContact, errSale, errTable;
    // checkError
    console.log({ input, ...inputSale, ...inputContract });
    Object.values(input).map((value, index) => {
      if (errInput) return;
      if (!value) errInput = true;
      // if (Object.keys(input).length > index + 2) errInput = false
    });
    genData.map(ele => {
      if (!ele.sector || !ele.serialNumber) errTable = true;
      // Object.values(ele).map((value, index) => {
      //   if (errTable || Object.keys(ele).length == index + 1) return
      //   if (!value) errTable = true
      // })
      console.log(ele.serialNumber);
    });
    console.log(genData, input);

    Object.values(inputContract).map((value, index) => {
      if (errContact) return;
      if (!value) errContact = true;
      if (Object.keys(inputContract).length == index + 1) errContact = false;
    });
    Object.entries(inputSale).forEach(([key, value], index) => {
      if (errSale || key == "distributionNote") return;
      if (!value) errSale = true;
      if (Object.keys(inputSale).length == index + 1) errSale = false;
    });
    if (errInput) {
      setErrorGen(false);
      setErrorInput(true);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
    setErrorAssestTable(errTable);
    console.log(errInput, errContact, errSale, genData);
    if (errContact) setErrorContract(true);
    if (errSale) setErrorSale(true);
    if (!(errInput || errContact || errSale)) setShowModalConfirm(true);
  };

  const submit = async valStatus => {
    const existArrayDocument = arrayDocument
      .filter(ele => ele._id)
      .map(ele => {
        return { ...ele, document: ele.document.name };
      });
    const existArrayImage = arrayImage.filter(ele => ele._id);

    const inputJSON = JSON.stringify({
      ...input,
      category: input.category?.name,
      kind: input.kind?.name,
      type: input.type?.name,
      status: valStatus || "inStock"
      // existArrayDocument: [],
    });

    const genDataJSON = JSON.stringify(genData);
    const formData = new FormData();
    formData.append("input", inputJSON);
    formData.append("insuranceStartDate", insuranceStartDate);
    formData.append("insuranceExpiredDate", insuranceExpiredDate);

    formData.append("existArrayImage", JSON.stringify(existArrayImage));
    formData.append("existArrayDocument", JSON.stringify(existArrayDocument));

    const baseArrayImage = [];
    if (arrayImage?.length > 0) {
      arrayImage.forEach(file => {
        // console.log(file.image.name);
        baseArrayImage.push({
          image: file.image.name
        });
      });
    }

    const baseArrayImageJSON = JSON.stringify(baseArrayImage);
    formData.append("baseArrayImage", baseArrayImageJSON);
    console.log(baseArrayImageJSON);

    // const duplicatedArrayImage = [];
    if (arrayImage?.length > 0) {
      // for duplicate image file if create asset as too many
      arrayImage.forEach(file => {
        formData.append("arrayImage", file.image);
        if (valStatus) return;
        const name = file.image.name || file.image;
        for (let i = 2; i <= input.quantity; i++) {
          const duplicatedFile = new File(
            [file.image],
            `${name.split(".")[0]}_(${i - 1}).${name.split(".")[1]}`,
            { type: file.type }
          );
          formData.append("arrayImage", duplicatedFile);
          // console.log(duplicatedFile)
          // duplicatedArrayImage.push({
          //   ...file,
          //   image: duplicatedFile.name,
          // });
        }
      });
      // console.log("duplicatedArrayImage", duplicatedArrayImage);

      // console.log("allArrayImage",[...arrayImage,...duplicatedArrayImage])
    }

    // if (duplicatedArrayImage.length > 0) {
    //   const duplicatedArrayImageJSON = JSON.stringify(duplicatedArrayImage);
    //   formData.append("duplicatedArrayImage", duplicatedArrayImageJSON);
    // }

    // document
    const baseArrayDocument = [];
    if (arrayDocument?.length > 0) {
      arrayDocument.forEach(file => {
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
      arrayDocument
        .filter(ele => !ele._id)
        .forEach(file => {
          formData.append("arrayDocument", file.document);
          const name = file.document.name || file.document;
          if (valStatus) return;
          for (let i = 2; i <= input.quantity; i++) {
            const duplicatedFile = new File(
              [file.document],
              `${name.split(".")[0]}_(${i - 1}).${name.split(".")[1]}`,
              { type: file.type }
            );
            formData.append("arrayDocument", duplicatedFile);
            // duplicatedArrayDocument.push({
            //   ...file,
            //   document: duplicatedFile.name,
            // });
          }
        });
      // console.log("duplicatedArrayDocument", duplicatedArrayDocument);

      // console.log("allArrayDocument",[...arrayDocument,...duplicatedArrayDocument])
    }
    console.log(
      "exist",
      existArrayDocument,
      "arr",
      arrayDocument,
      "base",
      baseArrayDocument
    );
    // return

    // if (duplicatedArrayDocument.length > 0) {
    //   const duplicatedArrayDocumentJSON = JSON.stringify(duplicatedArrayDocument);
    //   formData.append("duplicatedArrayDocument", duplicatedArrayDocumentJSON);
    // }

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
    formData.append(
      "distributeApprovalReleaseDate",
      inputSale.distributeApprovalReleaseDate
    );
    formData.append("distributeStatus", inputSale.distributeStatus);
    formData.append("distributionNote", inputSale.distributionNote);

    let response;
    if (!param.id) {
      response = await createAsset(formData);
    } else {
      response = await updateAsset(formData, param.id);
    }
    // if (response.data.message.includes("created success")) {
    setShowModalConfirm(false);
    setShowModalSuccess(true);
    // }
  };

  useEffect(() => {
    if (arrayImage.length < 1) return;
    const newImageUrls = [];
    // console.log(arrayImage);
    arrayImage.forEach(img => {
      if (img._id) {
        newImageUrls.push(`http://localhost:4000/images/${img.image}`);
      } else {
        newImageUrls.push(URL.createObjectURL(img.image));
      }
    });
    console.log(newImageUrls);
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  // useEffect(() => {
  //   const newGenData = [...genData];
  //   newGenData.forEach((el, idx) => (el.sector = input.allSector));
  //   setGenData(newGenData);
  // }, [input.allSector]);

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
          <div className="text-xl text-text-green ">เพิ่มครุภัณฑ์</div>
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
            <div className="text-text-gray ml-2">เพิ่มครุภัณฑ์</div>
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
                className={`${
                  errorInput && !input.engProductName && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
              <div className="text-red-500 pt-1">
                {checkInvalidEngName() && `*โปรดระบุให้ถูกต้อง`}
              </div>
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
                className={`${
                  errorInput && !input.productName && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
              <div className="text-red-500 pt-1">
                {checkInvalidName() && `*โปรดระบุให้ถูกต้อง`}
              </div>
            </div>

            <div>
              <div className="mb-1">ประเภทครุภัณฑ์</div>
              {/* <div className="flex h-[38px]"> */}
              {/* <Selector
                  placeholder={"Select"}
                  state={input}
                  setState={setInput}
                  id={"ประเภทครุภัณฑ์"}
                  isValid={errorInput && !input.type}
                /> */}
              <SearchSelector
                options={typeList}
                name="type"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.type}
                value={
                  input.type && {
                    label: input.type.name,
                    value: input.type.name
                  }
                }
              />
              {/* </div> */}
              <div className="text-red-500 pt-1">
                {errorGen && !input.type && `*โปรดระบุ`}
              </div>
            </div>

            <div>
              <div className="mb-1">ชนิดครุภัณฑ์</div>
              <SearchSelector
                options={kindList}
                name="kind"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.kind}
                value={
                  input.kind && {
                    label: input.kind.name,
                    value: input.kind.name
                  }
                }
              />
              <div className="text-red-500 pt-1">
                {errorGen && !input.kind && `*โปรดระบุ`}
              </div>
            </div>

            <div>
              <div className="mb-1">ลำดับครุภัณฑ์ (ID)</div>
              <input
                type="text"
                name="realAssetId"
                id="realAssetId"
                onChange={handleChangeRealAssetId}
                value={input.realAssetId}
                className={`${
                  errorInput && !input.realAssetId && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3  text-xs">
              <div>
                <div className="mb-1">จำนวน</div>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  id="quantity"
                  onChange={handleChangeQuantity}
                  value={input.quantity}
                  className={`${
                    errorInput && !input.quantity && "border-red-500"
                  } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
                <div className="text-red-500 pt-1">
                  {errorGen && !input.quantity && `*โปรดระบุ`}
                </div>
              </div>

              <div>
                <div className="mb-1">หน่วยนับ</div>
                <SearchSelector
                  options={countingUnitList}
                  name="unit"
                  onChange={handleSelect}
                  noClearButton
                  error={errorInput && !input.unit}
                  value={
                    input.unit && {
                      label: input.unit.name || input.unit,
                      value: input.unit.name || input.unit
                    }
                  }
                />
              </div>
            </div>

            <div>
              <div className="mb-1">ยี่ห้อ</div>
              <SearchSelector
                options={brandList}
                name="brand"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.brand}
                value={
                  input.brand && { label: input.brand, value: input.brand }
                }
              />
            </div>
            <div>
              <div className="mb-1">รุ่น</div>
              <input
                type="text"
                name="model"
                id="model"
                onChange={handleChangeModel}
                value={input.model}
                className={`${
                  errorInput && !input.model && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">ขนาด</div>
              <input
                type="text"
                name="size"
                id="size"
                onChange={handleChangeSize}
                value={input.size}
                className={`${
                  errorInput && !input.size && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div>
              <div className="mb-1">หมวดหมู่ครุภัณฑ์</div>
              <SearchSelector
                options={categoryList}
                name="category"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.category}
                value={
                  input.category && {
                    label: input.category.name,
                    value: input.category.name
                  }
                }
              />
              <div className="text-red-500 pt-1">
                {errorGen && !input.category && `*โปรดระบุ`}
              </div>
            </div>

            <div>
              <div className="mb-1">กลุ่ม</div>
              <SearchSelector
                options={groupList}
                name="group"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.group}
                value={
                  input.group && { label: input.group, value: input.group }
                }
              />
            </div>

            <div>
              <div className="mb-1">ประเภทที่ได้มา</div>
              <SearchSelector
                options={acquiredTypeList}
                name="acquiredType"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.acquiredType}
                value={
                  input.acquiredType && {
                    label: input.acquiredType,
                    value: input.acquiredType
                  }
                }
              />
            </div>
            <div>
              <div className="mb-1">แหล่งที่ได้มา</div>
              <SearchSelector
                options={sourceList}
                name="source"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.source}
                value={
                  input.source && { label: input.source, value: input.source }
                }
              />
            </div>

            <div>
              <div className="mb-1">วัตถุประสงค์ในการใช้งาน</div>
              <SearchSelector
                options={purposeOfUseList}
                name="purposeOfUse"
                onChange={handleSelect}
                noClearButton
                error={errorInput && !input.purposeOfUse}
                value={
                  input.purposeOfUse && {
                    label: input.purposeOfUse,
                    value: input.purposeOfUse
                  }
                }
              />
            </div>
            <div>
              <div className="mb-1">ราคาต่อหน่วย (บาท)</div>
              <input
                min="0"
                type="text"
                inputMode="numeric"
                name="pricePerUnit"
                id="pricePerUnit"
                onChange={handleChangePricePerUnit}
                // value={(+input.pricePerUnit).toLocaleString()}
                value={input.pricePerUnit}
                className={`${
                  errorInput && !input.pricePerUnit && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">จำนวนเดือนที่รับประกัน (เดือน)</div>
              <input
                min="0"
                type="number"
                name="guaranteedMonth"
                id="guaranteedMonth"
                onChange={handleChangeGuaranteedMonth}
                value={input.guaranteedMonth}
                className={`${
                  errorInput && !input.guaranteedMonth && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">วันที่เริ่มรับประกัน</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={insuranceStartDate}
                  setState={setInsuranceStartDate}
                />
              </div>
            </div>
            <div>
              <div className="mb-1">วันที่สิ้นสุดรับประกัน</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={insuranceExpiredDate}
                  setState={setInsuranceExpiredDate}
                  minDate={insuranceStartDate}
                />
              </div>
            </div>

            <div>
              <div className="mb-1">การจ่ายครุภัณฑ์ให้หน่วยงาน</div>
              <SearchSelector
                options={sectorList}
                name="distributeToSector"
                onChange={handleSelect}
                // error={errorInput && !input.distributeToSector}
                value={
                  input.distributeToSector && {
                    label: input.distributeToSector,
                    value: input.distributeToSector
                  }
                }
              />
            </div>

            <div>
              <div className="mb-1">รหัสกลุ่มครุภัณฑ์</div>
              <input
                type="text"
                name="assetGroupNumber"
                id="assetGroupNumber"
                disabled
                onChange={handleChangeAssetGroupNumber}
                value={input.assetGroupNumber}
                className={`bg-gray-200 w-full h-[38px]  border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <button
              type="button"
              className="sm:col-start-2 text-white w-full h-[38px] px-4 py-2  rounded tracking-wider bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              onClick={handleGenData}
            >
              สร้างเลขครุภัณฑ์
            </button>
          </div>

          <div className=" my-3 p-3 grid">
            <div className="overflow-x-auto overflow-y-auto scrollbar pb-3">
              <div className="w-[1000px] xl:w-full min-h-[350px] max-h-[500px] ">
                <div className="bg-background-gray-table text-xs py-5 items-center justify-center rounded-lg">
                  <div className="grid grid-cols-12 gap-2 text-center">
                    <div className="ml-2">ลำดับ</div>
                    <div className="col-span-2">เลขครุภัณฑ์</div>
                    <div className="col-span-2">Serial Number</div>
                    <div className="col-span-2">หน่วยงาน</div>
                    <div className="col-span-2">สท.01</div>
                    <div className="col-span-2">
                      แทนครุภัณฑ์ที่ ถูกแทงจำหน่าย
                    </div>
                    <div className="">สติกเกอร์</div>
                  </div>
                </div>
                {genData?.map((el, idx) => {
                  return (
                    <div key={idx}>
                      <RowOfTableAssetInformation
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
                        assetList={assetList}
                        sectorList={sectorList}
                        error={errorAssestTable}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div className="font-semibold">ภาพครุภัณฑ์และเอกสารประกอบ</div>
          <div className="flex text-xs mb-6">
            <div className=" text-text-gray mr-1">รูปภาพครุภัณฑ์</div>
            <div className=" text-button-red mr-1">*</div>
            <div className="font-semibold">({arrayImage.length}/8 รูป) </div>
          </div>

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
                      <div className="ml-2 text-sm">
                        {el.image.name || el.image}
                      </div>
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
              {!!arrayImage.length && (
                <button
                  className="mt-2 flex mx-auto items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
                  onClick={() => setShowViewImageModal(true)}
                >
                  <BsFillEyeFill className="w-[16px] h-[16px] text-text-green mr-2" />
                  ดูรูปภาพ
                </button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-6 gap-6 mt-5">
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
                      <div className="ml-2 text-sm">
                        {el.document.name || el.document}
                      </div>
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

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>สัญญาจัดซื้อ</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">วิธีการได้มา</div>
              <SearchSelector
                options={acquisitionMethodList}
                name="acquisitionMethod"
                onChange={value =>
                  handleChangeSelectContract("acquisitionMethod", value)
                }
                noClearButton
                error={errorContract && !inputContract.acquisitionMethod}
                value={
                  inputContract.acquisitionMethod && {
                    label: inputContract.acquisitionMethod,
                    value: inputContract.acquisitionMethod
                  }
                }
              />
              {/* <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  // state={acquisitionMethod}
                  // setState={setAcquisitionMethod}
                  setState={value => handleChangeSelectContract("acquisitionMethod", value)}
                  state={inputContract.acquisitionMethod}
                  isValid={errorContract && !inputContract.acquisitionMethod}
                  id={"วิธีการได้มา"}
                />
              </div> */}
            </div>
            <div>
              <div className="mb-1">ประเภทเงิน</div>
              <SearchSelector
                options={moneyTypeList}
                name="moneyType"
                onChange={value =>
                  handleChangeSelectContract("moneyType", value)
                }
                noClearButton
                error={errorContract && !inputContract.moneyType}
                value={
                  inputContract.moneyType && {
                    label: inputContract.moneyType,
                    value: inputContract.moneyType
                  }
                }
              />
            </div>

            <div>
              <div className="mb-1">เอกสารใบส่งของ</div>
              <input
                type="text"
                name="deliveryDocument"
                id="deliveryDocument"
                onChange={handleChangeContract}
                value={inputContract.deliveryDocument}
                className={`${
                  errorContract &&
                  !inputContract.deliveryDocument &&
                  "border-red-500"
                }  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div>
              <div className="mb-1">เลขที่สัญญา</div>
              <input
                type="text"
                name="contractNumber"
                id="contractNumber"
                onChange={handleChangeContract}
                value={inputContract.contractNumber}
                className={`${
                  errorContract &&
                  !inputContract.contractNumber &&
                  "border-red-500"
                }  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">วันที่รับมอบ</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={inputContract.receivedDate}
                  setState={value =>
                    handleChangeSelectContract("receivedDate", value)
                  }
                />
              </div>
            </div>
            <div>
              <div className="mb-1">ผู้ขาย</div>
              <SearchSelector
                options={merchantList}
                name="seller"
                // onChange={handleSelect}
                onChange={value => handleChangeSelectContract("seller", value)}
                noClearButton
                error={errorContract && !inputContract.seller}
                value={
                  inputContract.seller && {
                    label: inputContract.seller,
                    value: inputContract.seller
                  }
                }
              />
            </div>

            <div>
              <div className="mb-1">ราคาซื้อ (บาท)</div>
              <input
                min="0"
                type="number"
                // inputMode="numeric"
                name="price"
                id="price"
                onChange={handleChangeContract}
                // value={(+inputContract.price).toLocaleString()}
                value={inputContract.price}
                className={`${
                  errorContract && !inputContract.price && "border-red-500"
                }  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">เลขที่ใบเบิก</div>
              <input
                type="text"
                name="billNumber"
                id="billNumber"
                onChange={handleChangeContract}
                value={inputContract.billNumber}
                className={`${
                  errorContract && !inputContract.billNumber && "border-red-500"
                }  w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">ปีที่ซื้อ</div>
              <div className="flex h-[38px]">
                <YearInput
                  state={inputContract.purchaseYear}
                  setState={value =>
                    handleChangeSelectContract("purchaseYear", value)
                  }
                />
              </div>
            </div>

            <div>
              <div className="mb-1">วันที่ซื้อ</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={inputContract.purchaseDate}
                  setState={value =>
                    handleChangeSelectContract("purchaseDate", value)
                  }
                />
              </div>
            </div>

            <div>
              <div className="mb-1">วันที่ลงเอกสาร</div>
              <div className="flex h-[38px]">
                <DateInput
                  state={inputContract.documentDate}
                  setState={value =>
                    handleChangeSelectContract("documentDate", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mx-10 mt-3 mb-10 p-3">
          <div>การจำหน่าย</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mt-3 text-xs">
            <div>
              <div className="mb-1">เอกสารจำหน่าย</div>
              <input
                type="text"
                name="salesDocument"
                id="salesDocument"
                // onChange={(e) => setSalesDocument(e.target.value)}
                onChange={handleChangeSales}
                value={inputSale.salesDocument}
                className={`${
                  errorSale && !inputSale.salesDocument && "border-red-500"
                } w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm  border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div>
              <div className="mb-1">เอกสารลงวันที่</div>
              <div className="flex h-[38px]">
                <DateInput
                  // state={distributeDocumentDate}
                  // setState={setDistributeDocumentDate}
                  setState={value =>
                    handleChangeSelectSale("distributeDocumentDate", value)
                  }
                  state={inputSale.distributeDocumentDate}
                />
              </div>
            </div>

            <div>
              <div className="mb-1">วันอนุมัติจำหน่าย</div>
              <div className="flex h-[38px]">
                <DateInput
                  setState={value =>
                    handleChangeSelectSale(
                      "distributeApprovalReleaseDate",
                      value
                    )
                  }
                  state={inputSale.distributeApprovalReleaseDate}
                />
              </div>
            </div>

            <div>
              <div className="mb-1">สถานะ</div>
              {/* <div className="flex h-[38px] ">
                <Selector
                  placeholder={"Select"}
                  // state={distributeStatus}
                  // setState={setDistributeStatus}
                  isValid={errorSale && !inputSale.distributeStatus}
                  setState={(value) => handleChangeSelectSale("distributeStatus", value)}
                  state={inputSale.distributeStatus}
                  id={"สถานะ"}
                />
              </div> */}
              <SearchSelector
                // options={distributeStatusList}
                options={[{ label: "(ทดสอบ)", value: "(ทดสอบ)" }]}
                name="distributeStatus"
                // onChange={handleSelect}
                onChange={value =>
                  handleChangeSelectSale("distributeStatus", value)
                }
                noClearButton
                error={errorSale && !inputSale.distributeStatus}
                value={
                  inputSale.distributeStatus && {
                    label: inputSale.distributeStatus,
                    value: inputSale.distributeStatus
                  }
                }
              />
            </div>
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

              <div className="col-span-3">
                <div className="text-lg font-bold">ข้อมูลราคา</div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 border-[1px] border-gray-300 p-5 rounded-lg">
                  <div>
                    <div className="mb-1 text-xs">ราคาซื้อ</div>
                    <div className="inline-block relative w-full h-[41px]">
                      <div className="relative">
                        <input
                          min="0"
                          type="text"
                          inputmode="numeric"
                          name="ราคาซื้อ"
                          id="ราคาซื้อ"
                          value={depreciationPrice}
                          onChange={e => setDepreciationPrice(e.target.value)}
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
                        min="0"
                        type="text"
                        inputmode="numeric"
                        name="จำนวนปีที่ใช้งาน"
                        id="จำนวนปีที่ใช้งาน"
                        value={depreciationYearUsed}
                        onChange={e => setDepreciationYearUsed(e.target.value)}
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
                        min="0"
                        type="text"
                        inputmode="numeric"
                        name="ราคาซาก"
                        id="ราคาซาก"
                        value={depreciationCarcassPrice}
                        onChange={e =>
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
                            : depreciationPresentMonth.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
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
                            : depreciationCumulativePrice.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
                            : depreciationYearPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
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
                            : depreciationRemainPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
                        }
                        onChange={e =>
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
                            : depreciationBookValue.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
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
                          onChange={e =>
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
                        onChange={e =>
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
                        onChange={e =>
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
                            : accumulateDepreciationPresentMonth.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
                            : accumulateDepreciationCumulativePrice.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
                            : accumulateDepreciationYearPrice.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
                            : accumulateDepreciationRemainPrice.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
                            : accumulateDepreciationBookValue.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )
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
        </Modal>

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
              <img
                src={el}
                crossorigin="true"
                key={idx}
                className="w-[640px] mb-5"
              />
            ))}
          </div>
        </Modal>

        <ToastContainer />
      </div>

      <div className="flex justify-between items-center gap-10 p-5 text-sm mr-12">
        <button
          type="button"
          className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
        >
          ยกเลิก
        </button>
        <div className="flex justify-end gap-4">
          <button
            className="disabled:text-gray-400  disabled:border-gray-300 inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  not-disabled:hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
            onClick={() => submit("saveDraft")}
          >
            บันทึกแบบร่าง
          </button>
          <button
            id="form"
            type="submit"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleSubmit}
          >
            บันทึกข้อมูล
          </button>

          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={submit}
          />

          {showModalSuccess && (
            <ModalSuccess urlPath="/assetInformationIndex" />
          )}
        </div>
      </div>
    </>
  );
};

export default AssetInformation;
