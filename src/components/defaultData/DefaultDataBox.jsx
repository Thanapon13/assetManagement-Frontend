import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { createBorrowPurpose, createCompanyPrefix, createDoctorType, createEngPrefix, createHospital, createMedicalField, createPersonnelTypeCode, createSector, createSubsector, createThaiPrefix, deleteBorrowPurpose, deleteCompanyPrefix, deleteDoctorType, deleteEngPrefix, deleteHospital, deleteMedicalField, deletePersonnelTypeCode, deleteSector, deleteSubsector, deleteThaiPrefix, getBorrowPurpose, getCompanyPrefix, getDoctorType, getEngPrefix, getHospital, getMedicalField, getPersonnelTypeCode, getSector, getSubsector, getThaiPrefix, updateBorrowPurpose, updateCompanyPrefix, updateDoctorType, updateEngPrefix, updateHospital, updateMedicalField, updatePersonnelTypeCode, updateSector, updateSubsector, updateThaiPrefix } from "../../api/masterApi";
import ModalConfirmSave from "../modal/ModalConfirmSave";
import ModalSuccess from "../modal/ModalSuccess";
import RowOfTableDefaultDataBox from "../table/RowOfTableDefaultDataBox";
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import ModalError from "../modal/ModalError";
import ModalWarning from "../modal/ModalWarning";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";

function DefaultDataBox({ header, fieldValue }) {
  const [isLoading, setIsLoading] = useState(true)
  const [rowData, setRowData] = useState([]);
  const [rowArray, setRowArray] = useState([]);
  const [collapse, setCollapse] = useState(true)
  const [isUpdate, setIsUpdate] = useState(false)

  const fetchList = async () => {
    //ทั่วไป
    switch (header) {
      case "หน่วยงาน":
        const sector = await getSector()
        setRowData(sector.data.sector)
        break;
      case "ภาควิชา":
        const subsector = await getSubsector()
        setRowData(subsector.data.subSector)
        break;
      case "วัตถุประสงค์การขอยืม":
        const borrowPurpose = await getBorrowPurpose()
        console.log(borrowPurpose)
        setRowData(borrowPurpose.data.borrowPurpose)
        break;
      case "คำนำหน้าบริษัท":
        const companyPrefix = await getCompanyPrefix()
        setRowData(companyPrefix.data.companyPrefix)
        break;
      case "คำนำหน้าชื่อ (ไทย)":
        const thaiPrefix = await getThaiPrefix()
        setRowData(thaiPrefix.data.thaiPrefix)
        break;
      case "คำนำหน้าชื่อ (อังกฤษ)":
        const engPrefix = await getEngPrefix()
        setRowData(engPrefix.data.engPrefix)
        break;
      case "รหัสประเภทบุคคลากร":
        const personnelTypeCode = await getPersonnelTypeCode()
        setRowData(personnelTypeCode.data.personnelTypeCode)
        break;
      case "โรงพยาบาล":
        const hospital = await getHospital()
        setRowData(hospital.data.hospital)
        break;
      case "ประเภทของแพทย์":
        const doctorType = await getDoctorType()
        setRowData(doctorType.data.docterType)
        break;
      case "สาขาแพทย์":
        const medicalField = await getMedicalField()
        setRowData(medicalField.data.medicalField)
        break;
      default:
        break;
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchList()
  }, [])

  const handleClickIncrease = (e) => {
    e.preventDefault()
    let clone = [...rowArray] || []
    const newCloneArray = fieldValue ? { name: "", value: "" } : { name: "" }
    console.log([...clone, newCloneArray])
    setRowArray([...clone, newCloneArray])
  }

  const deleteRowArray = (index) => {
    let clone = [...rowArray];
    clone.splice(index, 1);
    setRowArray(clone);
  };

  const deleteRowData = async () => {
    setIsLoading(true)
    setShowPopupDelete(false)
    // const body = { "_id": (showPopupDelete._id) }
    const id = showPopupDelete._id
    switch (header) {
      case "หน่วยงาน":
        try {
          await deleteSector(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ภาควิชา":
        try {
          await deleteSubsector(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "วัตถุประสงค์การขอยืม":
        try {
          await deleteBorrowPurpose(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "คำนำหน้าบริษัท":
        try {
          await deleteCompanyPrefix(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "คำนำหน้าชื่อ (ไทย)":
          try {
          await deleteThaiPrefix(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "คำนำหน้าชื่อ (อังกฤษ)":
          try {
          await deleteEngPrefix(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "รหัสประเภทบุคคลากร":
        try {
          await deletePersonnelTypeCode(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "โรงพยาบาล":
        try {
          await deleteHospital(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทของแพทย์":
        try {
          await deleteDoctorType(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "สาขาแพทย์":
        try {
          await deleteMedicalField(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      default:
        break;
    }
  };

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleSubmit = () => {
    let err
    console.log(rowArray[0], rowData)
    // check empty
    rowArray.map(ele => {
      if (err) return
      if (!ele.name || (fieldValue && !ele.value)) err = true
    })
    rowData.map(ele => {
      if (err) return
      if (!ele.name || (fieldValue && !ele.value)) err = true
    })
    setError(err)
    // check duplicate
    const alls = rowArray.concat(rowData)
    let isDup
    alls.forEach(row => {
      if (isDup) return
      const allN = alls.filter(ele => ele.name != row.name)
      if (allN.length < alls.length - 1) isDup = true
      if (fieldValue) {
        const allV = alls.filter(ele => ele.value != row.value)
        if (allV.length < alls.length - 1) isDup = true
      }
    })
    setIsDuplicate(isDup)
    if (!err && !isDup) setShowModalConfirm(true)
  }

  function onError(msg) {
    setIsLoading(false)
    setShowModalError(msg || 'ไม่สามารถทำรายการได้ในขณะนี้')
    setShowModalConfirm(false)
  }

  const submit = async () => {
    setIsLoading(true)
    // const data = rowData
    // data.map(ele => delete ele.value)
    const arrayJSON = JSON.stringify(rowArray);
    const dataJSON = JSON.stringify(rowData);
    const arrayJSONs = JSON.stringify([{
      "name": "x",
      // "value": "xx",
    }]);
    switch (header) {
      case "หน่วยงาน":
        try {
          console.log(dataJSON)
          if (rowArray.length) await createSector({ sectorArray: arrayJSON })
          if (isUpdate) await updateSector({ sectorArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ภาควิชา":
        try {
          if (rowArray.length) await createSubsector({ subSectorArray: arrayJSON })
          if (isUpdate) await updateSubsector({ subSectorArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
        case "วัตถุประสงค์การขอยืม":
          try {
            if (rowArray.length) await createBorrowPurpose({ borrowPurposeArray: arrayJSON })
            if (isUpdate) await updateBorrowPurpose({ borrowPurposeArray: dataJSON })
            refreshList()
          } catch (err) {
            onError(err.response.data.message)
          }
        break;
      case "คำนำหน้าบริษัท":
        try {
          if (rowArray.length) await createCompanyPrefix({ companyPrefixArray: arrayJSON })
          if (isUpdate) await updateCompanyPrefix({ companyPrefixArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "คำนำหน้าชื่อ (ไทย)":
        try {
          if (rowArray.length) await createThaiPrefix({ thaiPrefixArray: arrayJSON })
          if (isUpdate) await updateThaiPrefix({ thaiPrefixArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "คำนำหน้าชื่อ (อังกฤษ)":
        try {
          if (rowArray.length) await createEngPrefix({ engPrefixArray: arrayJSON })
          if (isUpdate) await updateEngPrefix({ engPrefixArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "รหัสประเภทบุคคลากร":
        try {
          if (rowArray.length) await createPersonnelTypeCode({ personnelTypeCodeArray: arrayJSON })
          if (isUpdate) await updatePersonnelTypeCode({ personnelTypeCodeArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "โรงพยาบาล":
        try {
          if (rowArray.length) await createHospital({ hospitalArray: arrayJSON })
          if (isUpdate) await updateHospital({ hospitalArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทของแพทย์":
        try {
          if (rowArray.length) await createDoctorType({ docterTypeArray: arrayJSON })
          if (isUpdate) await updateDoctorType({ docterTypeArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "สาขาแพทย์":
        try {
          if (rowArray.length) await createMedicalField({ medicalFieldArray: arrayJSON })
          if (isUpdate) await updateMedicalField({ medicalFieldArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      default:
        break;
    }
  }

  function refreshList(mode) {
    setRowArray([])
    fetchList()
    // if(mode == 'save') {
    //   setShowModalSuccess(true)
    //   setTimeout(() => {
    //     setShowModalSuccess(false)
    //   }, 2000);
    // }
    if (!isLoading) setShowModalConfirm(false)
  }

  const setUpdate = () => {
    if (!isUpdate) {
      setIsUpdate(true)
      // } else if (isUpdate == 'data') {
      //   setIsUpdate(true)
    }
    console.log(isUpdate)
  }

  return (
    <div className=" bg-white border-[1px] p-1 rounded-lg shadow-sm text-sm mb-4">
      {/* <div className="bg-white rounded-lg"> */}
      <div className="overflow-y-auto scrollbar ">
        <div className="px-2 py-4 mx-auto">
          <div className={`flex justify-between items-center ${!isUpdate && !rowArray.length && "cursor-pointer"} group`}
            onClick={() => !isUpdate && !rowArray.length && setCollapse(!collapse)}>
            <div className="font-semibold ml-3 ">{header}</div>
            <button
              className="text-white px-5 mr-5 py-1 rounded bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
              // className=" inline-flex justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
              onClick={() => (isUpdate || rowArray.length) && handleSubmit()}
              hidden={isLoading}
            >
              {isUpdate || rowArray.length ? "บันทึก" :
                collapse
                  ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                  : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
              }
            </button>

            <ModalConfirmSave
              isVisible={showModalConfirm}
              onClose={() => setShowModalConfirm(false)}
              text={`คุณต้องการบันทึก "${header}" หรือไม่`}
              header="ยืนยันการแก้ไข"
              onSave={submit}
            />
            {showModalSuccess && <ModalSuccess />}
            {showModalError && <ModalError message={showModalError} didClose={() => setShowModalError(false)} />}
            {isDuplicate && <ModalWarning message={`ไม่สามารถบันทึกข้อมูล "ชื่อ" ซ้ำกันได้`} didClose={() => setIsDuplicate(false)} />}

          </div>
          <div className={`duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}>
            <div className="bg-background-gray-table rounded-lg py-3 mt-2">
              <div className="grid grid-cols-10">
                <div className={`${fieldValue ? "col-span-1" : "col-span-2"} text-center`}>ลำดับ</div>
                <div className={`${fieldValue ? "col-span-4" : "col-span-6"} text-center`}>ชื่อ</div>
                {fieldValue && <div className="col-span-3 text-center">ค่า</div>}
                <div className="col-span-2 text-center"></div>
              </div>
            </div>
            {isLoading
              ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
              : <>
                {rowData?.map((el, idx) => (
                  <RowOfTableDefaultDataBox
                    key={idx}
                    index={idx}
                    rowArray={rowData}
                    setRowArray={setRowData}
                    deleteRow={() => setShowPopupDelete(el)}
                    error={error}
                    setUpdate={setUpdate}
                    fieldValue={fieldValue}
                  />
                ))}
                {showPopupDelete && <ModalConfirmDelete item={showPopupDelete.name}
                  onClose={() => setShowPopupDelete(false)}
                  onDelete={deleteRowData}
                />}
                {rowArray?.map((el, idx) => {
                  return (
                    <RowOfTableDefaultDataBox
                      key={idx}
                      dataLength={rowData.length}
                      index={idx}
                      rowArray={rowArray}
                      setRowArray={setRowArray}
                      deleteRow={deleteRowArray}
                      error={error}
                      fieldValue={fieldValue}
                    />
                  );
                })}
                <div className="px-5 pt-2">
                  <button
                    type="button"
                    className="w-full h-[38px] justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none"
                    onClick={handleClickIncrease}
                  >
                    + เพิ่มข้อมูล
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultDataBox;
