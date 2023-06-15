import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { Spinner } from 'flowbite-react';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { editRole, getRoleById } from '../api/userApi';

export const EditRole = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [input, setInput] = useState()
  const [accessScreen, setAccessScreen] = useState([])
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const allScreenLength = () => {
    let num = 0
    screenData?.map(ele => {
      if (!ele.submenu) {
        num += 1
      } else {
        num += ele.submenu.length
      }
    })
    return num
  }
  useEffect(() => {
    initData()
  }, [])

  const { id } = useParams()
  async function initData() {
    const res = await getRoleById(id)
    setInput(res.data.role)
    setAccessScreen(res.data.role.accessScreen)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    console.log(e.target.name)
    setInput(prevInput => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleForm = async () => {
    if (input.roleName && accessScreen.length) setShowModalConfirm(true)
  }

  async function submit() {
    const res = await editRole({
      name: input.roleName,
      screen: accessScreen
    }, id)
    setShowModalSuccess(true)
  }

  const onChange = (checkAll, element) => {
    const array = accessScreen
    if (element.submenu) {
      if (!checkAll) {
        element.submenu?.map(sub => {
          if (!accessScreen.find(val => val == sub.name)) {
            array.push({ name: sub.name, order: element.order })
          }
        })
        console.log(array)
        setAccessScreen(array)
      } else {
        const arr = []
        accessScreen.map(ele => {
          if (!element.submenu.find(sub => (ele == sub.name))) arr.push(ele)
        })
        setAccessScreen(arr)
      }
    } else {
      onChangeSubmenu(checkAll, element.name)
    }
  }
  const onChangeSubmenu = (check, value) => {
    console.log(check, value)
    if (check) {
      const arr = accessScreen.filter(ele => (ele.name != value.name))
      setAccessScreen(arr)
    } else {
      const array = accessScreen.concat(value)
      setAccessScreen(array)
    }
  }

  function onChangeAll(e) {
    console.log(e)
    if (e.target.checked) {
      const all = []
      // screenData.map(ele => all.push(ele.name))
      screenData.map(ele => {
        if (!ele.submenu) {
          all.push({ name: ele.name, order: ele.order })
        } else {
          ele.submenu.forEach(sub => all.push({ name: sub.name, order: ele.order }))
        }
      })
      console.log(all)
      setAccessScreen(all)
    } else {
      setAccessScreen([])
    }
  }

  const [collapseAll, setCollapseAll] = useState(false)

  const screenData = [
    {
      "name": "dashboard",
      "url": "/dashboard",
      order: 0
    },
    {
      "name": "asset",
      order: 1,
      submenu: [
        {
          "name": "assetInformationIndex",
          "main": true,
          "url": "/assetInformationIndex",
        },
        {
          "name": "assetInformation",
          "main": "/assetInformationIndex",
          "url": "/assetInformation"
        },
        {
          "name": "viewAssetInformation",
          "main": "/assetInformationIndex",
          "url": "/assetInformation"
        },
        {
          "name": "editAssetInformation",
          "main": "/assetInformationIndex",
          "url": "/assetInformation"
        },
      ]
    },
    {
      "name": "package",
      order: 2,
      submenu: [
        {
          "name": "packageAssetInformationIndex",
          "main": true,
          "url": "/packageAssetInformationIndex"
        },
        {
          "name": "packageAssetInformation",
          "main": "/packageAssetInformationIndex",
          "url": "/packageAssetInformation"
        },
        {
          "name": "viewPackageAssetInformation",
          "main": "/packageAssetInformationIndex",
          "url": "/viewPackageAssetInformation"
        },
        {
          "name": "editPackageAssetInformation",
          "main": "/packageAssetInformationIndex",
          "url": "/editPackageAssetInformation"
        }
      ]
    },
    {
      "name": "assetWithdraw",
      order: 5,
      submenu: [
        {
          "name": "assetWithdraw",
          "main": true,
          "url": "/assetWithdraw"
        },
        {
          "name": "saveAssetWithdraw",
          "main": "assetWithdraw",
          "url": "/saveAssetWithdraw"
        },
      ]
    },

    {
      "name": "borrow",
      order: 6,
      submenu: [
        {
          "name": "borrowList",
          "main": true,
          "url": "/borrowList"
        },
        {
          "name": "borrowEdit",
          "main": "/borrowList",
          "url": "/borrowEdit"
        },
        {
          "name": "borrowDetail",
          "main": "/borrowList",
          "url": "/borrowDetail"
        },
        {
          "name": "borrowCheckSaving",
          "main": "/borrowList",
          "url": "/borrowCheckSaving"
        },
        {
          "name": "borrowCheckApprove",
          "main": "/borrowList",
          "url": "/borrowCheckApprove"
        },
        {
          "name": "viewBorrowCheckDetail",
          "main": "/borrowList",
          "url": "/viewBorrowCheckDetail"
        },
        {
          "name": "borrowRecord",
          "main": "/borrowList",
          "url": "/borrowRecord"
        },
        {
          "name": "borrowApprove",
          "main": "/borrowList",
          "url": "/borrowApprove"
        },
        {
          "name": "borrowApproveDetail",
          "main": "/borrowList",
          "url": "/borrowApproveDetail"
        },
        {
          "name": "viewBorrowApproveDetail",
          "main": "/borrowList",
          "url": "/viewBorrowApproveDetail"
        },
        {
          "name": "borrowHistoryDetail",
          "main": "/borrowList",
          "url": "/borrowHistoryDetail"
        },
      ]
    },
    {
      "name": "transfer",
      order: 7,
      submenu: [
        {
          "name": "transferIndex",
          "main": true,
          "url": "/transferIndex"
        },
        {
          "name": "transferAsset",
          "main": true,
          "url": "/transferAsset"
        },
        {
          "name": "saveTransferAsset",
          "main": "/transferIndex",
          "url": "/saveTransferAsset"
        },
        {
          "name": "approvalTransferAsset",
          "main": "/transferIndex",
          "url": "/approvalTransferAsset"
        },
        {
          "name": "approvalTransferAssetDetail",
          "main": "/transferIndex",
          "url": "/approvalTransferAssetDetail"
        },
        {
          "name": "viewApprovalTransferAssetDetail",
          "main": "/transferIndex",
          "url": "/viewApprovalTransferAssetDetail"
        },
        {
          "name": "viewWaitingTransferAsset",
          "main": "/transferIndex",
          "url": "/viewWaitingTransferAsset"
        },
        {
          "name": "viewApprovalTransferAssetDetail",
          "main": "/transferIndex",
          "url": "/viewApprovalTransferAssetDetail"
        },
        {
          "name": "editTransferAsset",
          "main": "/transferIndex",
          "url": "/editTransferAsset"
        },
      ]
    },
    {
      "name": "merchant",
      order: 8,
      submenu: [
        {
          "name": "merchantIndex",
          "main": true,
          "url": "/merchantIndex"
        },
        {
          "name": "merchant",
          "main": "/merchantIndex",
          "url": "/merchantIndex"
        },
        {
          "name": "saveMerchant",
          "main": "/merchantIndex",
          "url": "/saveMerchant"
        },
        {
          "name": "editMerchant",
          "main": "/merchantIndex",
          "url": "/editMerchant"
        },
        {
          "name": "viewMerchant",
          "main": "/merchantIndex",
          "url": "/viewMerchant"
        },
        {
          "name": "reportMerchantInfo",
          "main": "/merchantIndex",
          "url": "/reportMerchantInfo"
        },
        {
          "name": "viewReportMerchantInfo",
          "main": "/merchantIndex",
          "url": "/viewReportMerchantInfo"
        },
      ]
    },
    {
      "name": "repair",
      order: 9,
      submenu: [
        {
          "name": "repairIndex",
          "main": true,
          "url": "/repairIndex"
        },
        {
          "name": "repairIndex/repairDetail",
          "main": "/repairIndex",
          "url": "/repairIndex/repairDetail"
        },
        {
          "name": "repairIndex/repairEdit",
          "main": "/repairIndex",
          "url": "/repairIndex/repairEdit"
        },
        {
          "name": "repairRecord",
          "main": "/repairIndex",
          "url": "/repairRecord"
        },
        {
          "name": "repairTechnicianIndex",
          "main": true,
          "url": "/repairTechnicianIndex"
        },
        {
          "name": "repairTechnicianRecord",
          "main": "/repairTechnicianIndex",
          "url": "/repairTechnicianIndex/repairTechnicianRecor"
        },
        {
          "name": "repairTechnicianDetail",
          "main": "/repairTechnicianIndex",
          "url": "/repairTechnicianIndex/repairTechnicianDetail"
        },
      ]
    },
    {
      "name": "master",
      order: 10,
      submenu: [
        {
          "name": "defaultData",
          "main": true,
          "url": "/defaultData"
        },
        {
          "name": "setRoleIndex",
          "main": true,
          "url": "/setRoleIndex"
        },
        {
          "name": "setRole",
          "main": "/setRoleIndex",
          "url": "/setRole"
        },
        {
          "name": "editRole",
          "main": "/setRoleIndex",
          "url": "/editRole"
        }
      ]
    }
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[60vh]">
          <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
            <p className='text-text-green mb-5'>ข้อมูล Role</p>

            <div className="mb-2 text-sm text-text-green"><div className="inline-flex text-button-red mr-1">*</div>ชื่อ Role</div>
            <input
              type="text"
              name="roleName"
              onChange={handleChange}
              value={input?.roleName}
              className={`${!input?.roleName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
            />

          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mt-5 ">
            <p className='text-text-green mb-5'>กำหนด Screen</p>
            <div className="mb-2 text-sm text-text-green">Screen</div>
            {isLoading
              ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
              : <div className=''>
                <div className='flex justify-between mt-1'>
                  <div className='text-text-gray pr-2 rounded text-sm py-1 my-auto'>
                    <input type="checkbox" checked={allScreenLength() == accessScreen.length ? true : false} value={""} className='mx-2 rounded text-lg'
                      onChange={onChangeAll}
                    />
                    เลือกทั้งหมด ({accessScreen.length}/{allScreenLength()})
                  </div>
                  <div className='cursor-pointer hover:text-text-green rounded-full w-6 h-6 group flex justify-center items-center bg-gray-200' onClick={() => setCollapseAll(!collapseAll)}>
                    {
                      collapseAll
                        ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                        : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                    }
                  </div>
                </div>

                {screenData?.map((ele, ind) => (
                  <div key={ind} index={ind}>
                    <ScreenAll ele={ele} permission={accessScreen} screenData={screenData}
                      onChange={onChange}
                      onChangeSubmenu={onChangeSubmenu}
                      collapseAll={collapseAll}
                      allScreenLength={allScreenLength()}
                    />
                  </div>
                ))}
              </div>
            }
          </div>
        </div>

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
            id="form"
            type="submit"
            className="bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-white text-sm rounded-md py-2 px-4"
            onClick={handleForm}
          >
            บันทึกข้อมูล
          </button>

          <ModalConfirmSave
            isVisible={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            onSave={submit}
          />

          {showModalSuccess && <ModalSuccess urlPath='/setRoleIndex' />}
        </div>
      </div>
    </>
  )
}

function ScreenAll(props) {
  const { ele, permission, screenData, onChange, onChangeSubmenu, collapseAll, allScreenLength } = props
  const checkMain = permission?.find(el => el === ele.name)
  const subelement = screenData.filter(el => el.main !== true && el.main === ele.url)
  const [collapse, setCollapse] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  useEffect(() => {
    if (!ele.submenu) {
      if (permission?.find(el => el.name == ele.name)) setCheckAll(true)
    } else {
      findCheckAll()
    }
  }, [])

  useEffect(() => {
    setCollapse(collapseAll)
  }, [collapseAll])

  const onChangeAll = () => {
    onChange(checkAll, ele)
    setCheckAll(!checkAll)
  }

  function findCheckAll(arr) {
    let num = 0
    const array = arr || permission
    ele.submenu?.map(sub => {
      if (array?.find(el => el.name == sub.name)) num += 1
    })
    console.log(num, ele.submenu)
    setCheckAll(num === ele.submenu.length)
  }

  const onChangeSub = (check, name, order) => {
    onChangeSubmenu(check, { name: name, order: order })
    if (!checkAll) {
      findCheckAll(permission.concat(name))
    } else {
      setCheckAll(false)
    }
  }

  useEffect(() => {
    if (allScreenLength == permission?.length) {
      setCheckAll(true)
    }
  }, [permission?.length])

  return (
    <div className='text-text-gray'>
      <div className='flex justify-between mt-1'>
        <div className={`${checkAll && 'text-black'} hover:cursor-pointer hover:text-black`}
          onClick={() => onChangeAll()}>
          <input type="checkbox" value={ele.name} className='mx-2 rounded text-lg'
            onChange={onChangeAll} // 
            checked={checkAll}
          />
          {ele.name}
        </div>
        <div className={`${!subelement.length && "hidden"} group cursor-pointer hover:text-text-green rounded-full w-6 h-6 flex justify-center items-center hover:bg-gray-200`} onClick={() => setCollapse(!collapse)}>
          {
            collapse
              ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
              : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
          }
        </div>
      </div>
      <div className={`ml-5 duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}>
        {ele.submenu?.map((submenu, index) => {
          const check = permission.find(el => el.name === submenu.name)
          return (
            <div key={index} className={`ml-5 my-1 ${checkMain && 'text-black'} hover:cursor-pointer hover:text-black`}
              onClick={() => onChangeSub(check, submenu.name, ele.order)} >
              <input type="checkbox" checked={check} value={submenu.name} className='mx-2 rounded'
                onChange={() => onChangeSub(check, submenu.name, ele.order)} />
              {submenu.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditRole