import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import ChangeDateToBuddhist from '../components/date/ChangeDateToBuddhist'
import boxIcon from "../public/pics/boxIcon.png";
import { IoIosClose } from "react-icons/io";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import ModalSuccess from "../components/modal/ModalSuccess";
import { BsArrowLeft } from "react-icons/bs";
import docIcon from "../public/pics/docIcon.png";
import { useRef } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createMerchant } from '../api/merchant';
import RowOfTableAddressMerchant from '../components/table/RowOfTableAddressMerchant';

export const EditRole = () => {
  const todayThaiDate = ChangeDateToBuddhist(new Date().toLocaleString('th-TH'))

  // useState

  const [input, setInput] = useState({
    realMerchantId: '',
    taxNumber: '',
    companyPrefix: '',
    companyName: '',
    prefix: '',
    name: '',
    phoneNumber: '',
    email: '',
  })

  const [inputBottom, setInputBottom] = useState({
    paymentTerm: "",
    contactName: "",
    bankAccountNumber: "",
    bankAccountDetail: "",
    bankCode: "",
    bankNo: "",
    bankBranchCode: "",
    taxpayerNumber: "",
    idCardNumber: "",
    creditorCategory: "",
  })

  const handleChange = (e) => {
    console.log(e.target.name)
    setInput(prevInput => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value
      }
    })
  };

  // ที่อยู่
  const objAddress = {
    houseNo: "",
    villageNo: "",
    village: "",
    lane: "",
    road: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  }
  const [arrayAddress, setArrayAddress] = useState([objAddress])
  const addAddress = () => {
    const arr = (arrayAddress.concat({ ...objAddress }))
    setArrayAddress(arr)
    console.log(arr)
  }



  //อัพโหลดไฟล์
  const inputDoc = useRef();
  const [arrayDocument, setArrayDocument] = useState([])

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    const cloneFile = [...arrayDocument];
    for (let i = 0; i < fileList.length; i++) {
      console.log(fileList[i]);
      // return
      if (fileTypes.includes(fileList[i].type)) {
        cloneFile.push({ document: fileList[i].name });
      } else {
        console.log('Er')
        if (!fileTypes.includes(fileList[i].type)) {
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
        }
        // toast.warn(
        //   `${fileList[i].name} is wrong file type or size is more than 2mb.!`,
        //   {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   }
        // );
      }
    }
    setArrayDocument(cloneFile);
  };

  const deleteDoc = (idx) => {
    let clone = [...arrayDocument];
    clone.splice(idx, 1);
    setArrayDocument(clone);
  };

  // ความสัมพันธ์
  const [status, setStatus] = useState("active")

  const objRelation = { companyCategory: "", note: "" }
  const [arrayRelation, setArrayRelation] = useState([objRelation])
  const addRelation = () => {
    const arr = arrayRelation.concat(objRelation)
    setArrayRelation(arr)
  }

  const inputClassname = "w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"

  const schema = yup.object().shape({
    companyName: yup
      .number("Must be number")
      .required("Is required")
    // .positive()
    // .integer()
    // .min(0, "Min is 0")
    // .max(22, "max is 20")
    ,
    age: yup
      .number("Must be number")
      .required("Is required")
  });

  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: schema
  });

  const onSubmit = data => {
    console.log(data, errors, control)
  };

  const [errorInput, setErrorInput] = useState()
  const [errorAddress, setErrorAddress] = useState()
  const [errorInpuBottomt, setErrorInputBottom] = useState()

  const handleForm = async () => {
    console.log(JSON.stringify({ input }), inputBottom)
    const data = JSON.stringify({ input, inputBottom })
    const formData = new FormData();
    console.log(data);
    formData.append("data", data);

    const response = createMerchant(formData)
    return
    let errInput, errInputBottom, errAddress
    Object.values(input).map((value) => {
      if (errInput) return
      if (!value) errInput = true
    })
    if (!arrayAddress.length) {
      const locate = (document.getElementById("address").offsetTop)
      window.scrollTo({ top: locate - 10, behavior: 'smooth' })
      setArrayAddress([objAddress])
      errAddress = true
    } else {
      arrayAddress.forEach(arr => {
        Object.entries(arr).forEach(([key, value]) => {
          if (errAddress) return
          if (!value) errAddress = true
        })
      })
    }
    Object.values(inputBottom).map((value) => {
      if (errInputBottom) return
      if (!value) errInputBottom = true
    })
    setErrorInput(errInput)
    setErrorInputBottom(errInputBottom)
    setErrorAddress(errAddress)
    //   if (!(errInput || errAddress || errInputBottom)) setShowModalConfirm(true)
  }

  return (
    <>
      <div className="bg-background-page px-5 pt-10 pb-5">
        {/* Header */}
        <div className="flex items-center">
          <Link
            to="/setRoleIndex"
            className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
          >
            <BsArrowLeft className="text-lg" />
          </Link>
          <div className="text-xl text-text-green ">กำหนด Role การทำงาน</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex text-xs">
            <Link
              to="/"
              className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
            >
              Home
            </Link>

            <div className="text-text-gray">/</div>
            <div className="text-text-gray ml-2">ข้อมูลผู้ใช้งาน</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
          <p className='text-text-green mb-5'>ข้อมูล Role</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role ภาษาไทย</div>
              <input
                type="text"
                name="merchantNo"
                onChange={handleChange}
                value={input.role}
                className={` w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role ภาษาอังกฤษ</div>
              <input
                type="text"
                name="merchantNo"
                onChange={handleChange}
                value={input.engRole}
                className={` w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
          <p className='text-text-green mb-5'>กำหนด Screen</p>
          <div className="mb-2 text-sm text-text-green">Screen</div>
          
        </div>


        <div className="hidden grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[60vh]">
          <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
            <p className='text-text-green mb-5'>ข้อมูล Role</p>

            <div className="mb-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role ภาษาไทย</div>
            <input
              type="text"
              name="merchantNo"
              onChange={handleChange}
              value={input.role}
              className={` w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
            />
            <div className="my-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role ภาษาอังกฤษ</div>

            <input
              type="text"
              name="merchantNo"
              onChange={handleChange}
              value={input.engRole}
              className={` w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
            <p className='text-text-green mb-5'>กำหนด Screen</p>
            <div className="mb-2 text-sm text-text-green">Screen</div>
            <input
              type="text"
              name="merchantNo"
              onChange={handleChange}
              value={input.merchantNo}
              className={` w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
            />

            <input
              disabled
              name="merchantNo"
              onChange={handleChange}
              value={input.merchantNo}
              className={`mt-2 w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
            />

          </div>
        </div>

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
            id="form"
            type="submit"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleForm}
          >
            บันทึกข้อมูล
          </button>

          {/* <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={submit}
          />

          {showModalSuccess && <ModalSuccess urlPath='/merchant' />} */}
        </div>
      </div>
    </>
  )
}

export default EditRole


// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { IoIosClose } from "react-icons/io";
// import ModalConfirmSave from "../components/modal/ModalConfirmSave";
// import ModalSuccess from "../components/modal/ModalSuccess";
// import { BsArrowLeft } from "react-icons/bs";
// import { useRef } from "react";
// import { useEffect } from 'react';
// import { Spinner } from 'flowbite-react';
// import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'

// export const SetRole = () => {
//   const [isLoading, setIsLoading] = useState(true)
//   const [screenData, setScreenData] = useState([])

//   useEffect(() => {
//     const fetchDataList = async () => {
//       setScreenData([
//         {
//           "name": "dashboard",
//           // "main": true,
//           "url": "/dashboard"
//         },
//         {
//           "name": "asset",
//           submenu: [
//             {
//               "name": "assetInformationIndex",
//               "main": true,
//               "url": "/assetInformationIndex",
//             },
//             {
//               "name": "assetInformation",
//               "main": "/assetInformationIndex",
//               "url": "/assetInformation"
//             },
//             {
//               "name": "viewAssetInformation",
//               "main": "/assetInformationIndex",
//               "url": "/assetInformation"
//             },
//             {
//               "name": "editAssetInformation",
//               "main": "/assetInformationIndex",
//               "url": "/assetInformation"
//             },
//           ]
//         },
//         {
//           "name": "package",
//           submenu: [
//             {
//               "name": "packageAssetInformationIndex",
//               "main": true,
//               "url": "/packageAssetInformationIndex"
//             },
//             {
//               "name": "packageAssetInformation",
//               "main": "/packageAssetInformationIndex",
//               "url": "/packageAssetInformation"
//             },
//             {
//               "name": "viewPackageAssetInformation",
//               "main": "/packageAssetInformationIndex",
//               "url": "/viewPackageAssetInformation"
//             },
//             {
//               "name": "editPackageAssetInformation",
//               "main": "/packageAssetInformationIndex",
//               "url": "/editPackageAssetInformation"
//             }
//           ]
//         },
//         {
//           "name": "assetWithdraw",
//           submenu: [
//             {
//               "name": "assetWithdraw",
//               "main": true,
//               "url": "/assetWithdraw"
//             },
//             {
//               "name": "saveAssetWithdraw",
//               "main": "assetWithdraw",
//               "url": "/saveAssetWithdraw"
//             },
//           ]
//         },
//         {
//           "name": "borrow",
//           submenu: [
//             {
//               "name": "borrowList",
//               "main": true,
//               "url": "/borrowList"
//             },
//             {
//               "name": "borrowEdit",
//               "main": "/borrowList",
//               "url": "/borrowEdit"
//             },
//             {
//               "name": "borrowDetail",
//               "main": "/borrowList",
//               "url": "/borrowDetail"
//             },
//             {
//               "name": "borrowCheckSaving",
//               "main": "/borrowList",
//               "url": "/borrowCheckSaving"
//             },
//             {
//               "name": "borrowCheckApprove",
//               "main": "/borrowList",
//               "url": "/borrowCheckApprove"
//             },
//             {
//               "name": "viewBorrowCheckDetail",
//               "main": "/borrowList",
//               "url": "/viewBorrowCheckDetail"
//             },
//             {
//               "name": "borrowRecord",
//               "main": "/borrowList",
//               "url": "/borrowRecord"
//             },
//             {
//               "name": "borrowApprove",
//               "main": "/borrowList",
//               "url": "/borrowApprove"
//             },
//             {
//               "name": "borrowApproveDetail",
//               "main": "/borrowList",
//               "url": "/borrowApproveDetail"
//             },
//             {
//               "name": "viewBorrowApproveDetail",
//               "main": "/borrowList",
//               "url": "/viewBorrowApproveDetail"
//             },
//             {
//               "name": "borrowHistoryDetail",
//               "main": "/borrowList",
//               "url": "/borrowHistoryDetail"
//             },
//           ]
//         },
//         {
//           "name": "transfer",
//           submenu: [
//             {
//               "name": "transferIndex",
//               "main": true,
//               "url": "/transferIndex"
//             },
//             {
//               "name": "transferAsset",
//               "main": true,
//               "url": "/transferAsset"
//             },
//             {
//               "name": "saveTransferAsset",
//               "main": "/transferIndex",
//               "url": "/saveTransferAsset"
//             },
//             {
//               "name": "approvalTransferAsset",
//               "main": "/transferIndex",
//               "url": "/approvalTransferAsset"
//             },
//             {
//               "name": "approvalTransferAssetDetail",
//               "main": "/transferIndex",
//               "url": "/approvalTransferAssetDetail"
//             },
//             {
//               "name": "viewApprovalTransferAssetDetail",
//               "main": "/transferIndex",
//               "url": "/viewApprovalTransferAssetDetail"
//             },
//             {
//               "name": "viewWaitingTransferAsset",
//               "main": "/transferIndex",
//               "url": "/viewWaitingTransferAsset"
//             },
//             {
//               "name": "viewApprovalTransferAssetDetail",
//               "main": "/transferIndex",
//               "url": "/viewApprovalTransferAssetDetail"
//             },
//             {
//               "name": "editTransferAsset",
//               "main": "/transferIndex",
//               "url": "/editTransferAsset"
//             },
//           ]
//         },
//         {
//           "name": "merchant",
//           submenu: [
//             {
//               "name": "merchantIndex",
//               "main": true,
//               "url": "/merchantIndex"
//             },
//             {
//               "name": "merchant",
//               "main": "/merchantIndex",
//               "url": "/merchant"
//             },
//             {
//               "name": "saveMerchant",
//               "main": "/merchantIndex",
//               "url": "/saveMerchant"
//             },
//             {
//               "name": "editMerchant",
//               "main": "/merchantIndex",
//               "url": "/editMerchant"
//             },
//             {
//               "name": "viewMerchant",
//               "main": "/merchantIndex",
//               "url": "/viewMerchant"
//             },
//             {
//               "name": "reportMerchantInfo",
//               "main": "/merchantIndex",
//               "url": "/reportMerchantInfo"
//             },
//             {
//               "name": "viewReportMerchantInfo",
//               "main": "/merchantIndex",
//               "url": "/viewReportMerchantInfo"
//             },
//           ]
//         },
//         {
//           "name": "repair",
//           submenu: [
//             {
//               "name": "repairIndex",
//               "main": true,
//               "url": "/repairIndex"
//             },
//             {
//               "name": "repairIndex/repairDetail",
//               "main": "/repairIndex",
//               "url": "/repairIndex/repairDetail"
//             },
//             {
//               "name": "repairIndex/repairEdit",
//               "main": "/repairIndex",
//               "url": "/repairIndex/repairEdit"
//             },
//             {
//               "name": "repairRecord",
//               "main": "/repairIndex",
//               "url": "/repairRecord"
//             },
//             {
//               "name": "repairTechnicianIndex",
//               "main": true,
//               "url": "/repairTechnicianIndex"
//             },
//             {
//               "name": "repairTechnicianRecord",
//               "main": "/repairTechnicianIndex",
//               "url": "/repairTechnicianIndex/repairTechnicianRecor"
//             },
//             {
//               "name": "repairTechnicianDetail",
//               "main": "/repairTechnicianIndex",
//               "url": "/repairTechnicianIndex/repairTechnicianDetail"
//             },
//           ]
//         },
//         {
//           "name": "master",
//           submenu: [
//             {
//               "name": "defaultData",
//               "main": true,
//               "url": "/defaultData"
//             },
//             {
//               "name": "setRoleIndex",
//               "main": true,
//               "url": "/setRoleIndex"
//             },
//             {
//               "name": "setRole",
//               "main": "/setRoleIndex",
//               "url": "/setRole"
//             },
//             {
//               "name": "editRole",
//               "main": "/setRoleIndex",
//               "url": "/editRole"
//             }
//           ]
//         }
//       ]
//       )
//       setIsLoading(false)
//     }
//     fetchDataList()
//   }, [])

//   const [permission, setPermission] = useState([])
//   const onChange = (check, element, subelem) => {
//     const value = element.name
//     const isMainPath = element.main == element.url
//     console.log(subelem)
//     if (check) {
//       const all = value.concat(subelem)
//       const res = []
//       permission.map(elem => {
//         if (!(subelem.find(ele => ele.name == elem) || value == elem)) {
//           res.push(elem)
//         }
//       })
//       setPermission(res)
//     } else {
//       const array = permission.concat(value)
//       subelem.map(subel => {
//         if (!permission.find(val => val == subel.name)) {
//           array.push(subel.name)
//         }
//       })
//       setPermission(array)
//     }
//   }
//   const onChangeSubmenu = (value, main, subelement) => {
//     const checkVal = permission.find(ele => ele == value)
//     if (checkVal) {
//       const res = []
//       permission.map(elem => {
//         if (!(value == elem || main == elem)) {
//           res.push(elem)
//         }
//       })
//       setPermission(res)
//     } else {
//       let findNum = 0
//       let values = permission.concat(value)

//       subelement.map(subel => {
//         if (values.find(ele => ele == subel.name)) findNum += 1
//       })

//       if (findNum == subelement.length) {
//         setPermission(values.concat(main))
//       } else {
//         setPermission(values)
//       }
//     }
//     console.log('PERMI', permission)
//   }

//   function onChangeAll(e) {
//     if (e.target.checked) {
//       const all = []
//       screenData.map(ele => all.push(ele.name))
//       setPermission(all)
//     } else {
//       setPermission([])
//     }
//   }

//   const [collapseAll, setCollapseAll] = useState(false)
//   // useState
//   const [input, setInput] = useState({
//     engRole: '',
//     role: '',
//   })

//   const handleChange = (e) => {
//     console.log(e.target.name)
//     setInput(prevInput => {
//       return {
//         ...prevInput,
//         [e.target.name]: e.target.value
//       }
//     })
//   };

//   const [error, setError] = useState()
//   const [showModalConfirm, setShowModalConfirm] = useState(false);
//   const [showModalSuccess, setShowModalSuccess] = useState(false);

//   const handleForm = async () => {
//     let errInput
//     Object.values(input).map((value) => {
//       if (errInput) return
//       if (!value) errInput = true
//     })
//     setError(errInput)
//     if (!(errInput)) setShowModalConfirm(true)
//   }

//   return (
//     <>
//       <div className="bg-background-page px-5 pt-10 pb-5">
//         {/* Header */}
//         <div className="flex items-center">
//           <Link
//             to="/setRoleIndex"
//             className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 px-2 py-2 mr-2"
//           >
//             <BsArrowLeft className="text-lg" />
//           </Link>
//           <div className="text-xl text-text-green ">กำหนด Role การทำงาน</div>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="flex text-xs">
//             <Link
//               to="/"
//               className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
//             >
//               Home
//             </Link>

//             <div className="text-text-gray">/</div>
//             <div className="text-text-gray ml-2">ข้อมูลผู้ใช้งาน</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[60vh]">
//           <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
//             <p className='text-text-green mb-5'>ข้อมูล Role</p>

//             <div className="mb-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role</div>
//             <input
//               type="text"
//               name="role"
//               onChange={handleChange}
//               value={input.role}
//               className={`${error && !input.role && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
//             />

//           </div>

//           <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
//             <p className='text-text-green mb-5'>กำหนด Screen</p>
//             <div className="mb-2 text-sm text-text-green">Screen</div>
//             {isLoading
//               ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
//               : <div className=''>
//                 <div className='flex justify-between mt-1'>
//                   <div className='text-text-gray pr-2 rounded text-sm py-1 my-auto'>
//                     <input type="checkbox" checked={screenData.length == permission.length} value={""} className='mx-2 rounded text-lg'
//                       onChange={onChangeAll}
//                     />
//                     เลือกทั้งหมด ({permission.length}/{screenData.length})
//                   </div>
//                   <div className='cursor-pointer hover:text-text-green rounded-full w-6 h-6 group flex justify-center items-center bg-gray-200' onClick={() => setCollapseAll(!collapseAll)}>
//                     {
//                       collapseAll
//                         ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//                         : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//                     }
//                   </div>
//                 </div>

//                 {screenData.map(ele => (
//                   <ScreenAll ele={ele} permission={permission} screenData={screenData}
//                     onChange={onChange}
//                     onChangeSubmenu={onChangeSubmenu}
//                     collapseAll={collapseAll}
//                   />
//                 ))}
//               </div>
//             }
//           </div>
//         </div>

//       </div>

//       {/* footer */}
//       <div className="flex justify-between items-center gap-10 p-5 text-sm mr-12">
//         <button
//           type="button"
//           className=" hover:bg-gray-100 text-text-gray text-sm rounded-md py-2 px-4"
//         >
//           ยกเลิก
//         </button>
//         <div className="flex justify-end gap-4">
//           <button
//             id="form"
//             type="submit"
//             className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
//             onClick={handleForm}
//           >
//             บันทึกข้อมูล
//           </button>

//           <ModalConfirmSave
//             isVisible={showModalConfirm}
//             onClose={() => setShowModalConfirm(false)}
//           // onSave={submit}
//           />
//           {showModalSuccess && <ModalSuccess urlPath='/merchant' />}
//         </div>
//       </div>
//     </>
//   )
// }

// function ScreenAll(props) {
//   const { ele, permission, screenData, onChange, onChangeSubmenu, collapseAll } = props
//   const checkMain = permission.find(el => el === ele.name)
//   const subelement = screenData.filter(el => el.main !== true && el.main === ele.url)
//   const [collapse, setCollapse] = useState(false)

//   useEffect(() => {
//     setCollapse(collapseAll)
//   }, [collapseAll])

//   return (
//     <div className='text-text-gray'>
//       <div className='flex justify-between mt-1'>
//         <div className={`${checkMain && 'text-black'} hover:cursor-pointer hover:text-black`}
//           onClick={() => onChange(checkMain, ele, subelement)}>
//           <input type="checkbox" checked={checkMain} value={ele.name} className='mx-2 rounded text-lg'
//             onChange={() => onChange(checkMain, ele, subelement)} />
//           {ele.name}
//         </div>
//         <div className={`${!subelement.length && "hidden"} group cursor-pointer hover:text-text-green rounded-full w-6 h-6 flex justify-center items-center hover:bg-gray-200`} onClick={() => setCollapse(!collapse)}>
//           {
//             collapse
//               ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//               : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//           }
//         </div>
//       </div>
//       <div className={`ml-5 duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}>
//         {ele.submenu?.map(submenu => {
//           const check = permission.find(el => el === submenu.name)
//           return (
//             <div className={`ml-5 my-1 ${checkMain && 'text-black'} hover:cursor-pointer hover:text-black`}
//               onClick={() => onChangeSubmenu(submenu.name, ele.name, subelement)} >
//               <input type="checkbox" checked={check} value={submenu.name} className='mx-2 rounded'
//                 onChange={() => onChangeSubmenu(submenu.name, ele.name, subelement)} />
//               {submenu.name}
//             </div>
//           )
//         })}
//       </div>

//       {/* {ele.main === true &&
//         <div className='flex justify-between mt-1'>
//           <div className={`${checkMain && 'text-black'} hover:cursor-pointer hover:text-black`}
//             onClick={() => onChange(checkMain, ele, subelement)}>
//             <input type="checkbox" checked={checkMain} value={ele.name} className='mx-2 rounded text-lg'
//               onChange={() => onChange(checkMain, ele, subelement)} />
//             {ele.name}
//           </div>
//           <div className={`${!subelement.length && "hidden"} group cursor-pointer hover:text-text-green rounded-full w-6 h-6 flex justify-center items-center hover:bg-gray-200`} onClick={() => setCollapse(!collapse)}>
//             {
//               collapse
//                 ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//                 : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
//             }
//           </div>
//         </div>
//       }
//       <div className={`ml-5 duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}>
//         {subelement.map(submenu => {
//           const check = permission.find(el => el === submenu.name)
//           return (
//             <div className={`ml-5 my-1 ${checkMain && 'text-black'} hover:cursor-pointer hover:text-black`}
//               onClick={() => onChangeSubmenu(submenu.name, ele.name, subelement)} >
//               <input type="checkbox" checked={check} value={submenu.name} className='mx-2 rounded'
//                 onChange={() => onChangeSubmenu(submenu.name, ele.name, subelement)} />
//               {submenu.name}
//             </div>
//           )
//         })}
//       </div> */}
//     </div>
//   )
// }

// export default SetRole
