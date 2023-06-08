import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { createAcquiredType, createAcquisitionMethod, createBrand, createCategory, createCountingUnit, createGroup, createKindData, createMoneyType, createPurposeOfUse, createSector, createSourceData, createType13, createType4, createType8, createTypeData, deleteAcquiredType, deleteAcquisitionMethod, deleteBrand, deleteCategory, deleteCountingUnit, deleteGroup, deleteKindData, deleteMoneyType, deletePurposeOfUse, deleteSourceData, deleteType13, deleteType4, deleteType8, deleteTypeData, getAcquiredType, getAcquisitionMethod, getBrandData, getCategory, getCountingUnit, getGroupData, getKindAll, getMoneyType, getPurposeOfUse, getSector, getSourceData, getType13, getType4, getType8, getTypeData, updateAcquiredType, updateAcquisitionMethod, updateBrand, updateCategory, updateCountingUnit, updateGroup, updateKindData, updateMoneyType, updatePurposeOfUse, updateSector, updateSourceData, updateType13, updateType4, updateType8, updateTypeData } from "../../api/masterApi";
import ModalConfirmSave from "../modal/ModalConfirmSave";
import ModalSuccess from "../modal/ModalSuccess";
import RowOfTableDefaultDataBox from "../table/RowOfTableDefaultDataBox";
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import ModalError from "../modal/ModalError";
import ModalWarning from "../modal/ModalWarning";
import ModalConfirmDelete from "../modal/ModalConfirmDelete";

function DefaultAssetBox({ header, fieldValue }) {
  const [isLoading, setIsLoading] = useState(true)
  const [rowData, setRowData] = useState([]);
  const [rowArray, setRowArray] = useState([]);
  const [collapse, setCollapse] = useState(true)
  const [isUpdate, setIsUpdate] = useState(false)

  const fetchList = async () => {
    switch (header) {
      case "ประเภทครุภัณฑ์":
        const responseType = await getTypeData()
        setRowData(responseType.data.type)
        break;
      case "ชนิดครุภัณฑ์":
        const responseKind = await getKindAll()
        setRowData(responseKind.data.kind)
        break;
      case "หมวดหมู่ครุภัณฑ์":
        const responseCate = await getCategory()
        setRowData(responseCate.data.category)
        break;
      case "ประเภทครุภัณฑ์ 4 หลัก":
        const response4 = await getType4()
        setRowData(response4.data.type4)
        break;
      case "ประเภทครุภัณฑ์ 8 หลัก":
        const response8 = await getType8()
        setRowData(response8.data.type8)
        break;
      case "ประเภทครุภัณฑ์ 13 หลัก":
        const response13 = await getType13()
        setRowData(response13.data.type13)
        break;
      case "ยี่ห้อ":
        const brand = await getBrandData()
        setRowData(brand.data.brand)
        break;
      case "กลุ่ม":
        const group = await getGroupData()
        setRowData(group.data.group)
        break;
      case "ประเภทที่ได้มา":
        const acquiredType = await getAcquiredType()
        setRowData(acquiredType.data.acquiredType)
        break;
      case "แหล่งที่ได้มา":
        const source = await getSourceData()
        setRowData(source.data.source)
        break;
      case "วัตถุประสงค์ในการใช้งาน":
        const purposeOfUse = await getPurposeOfUse()
        setRowData(purposeOfUse.data.purposeOfUse)
        break;
      case "วิธีการได้มา":
        const acquisitionMethod = await getAcquisitionMethod()
        // console.log(acquisitionMethod);
        setRowData(acquisitionMethod.data.acquisitionMethod)
        break;
      case "ประเภทเงิน":
        const moneyType = await getMoneyType()
        setRowData(moneyType.data.moneyType)
        break;
      case "หน่วยนับ":
        const countingUnit = await getCountingUnit()
        setRowData(countingUnit.data.countingUnit)
        break;
      // case "สิ้นสภาพการเป็นครุภัณฑ์":
      //   console.log(rowArray)
      //   break;
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
    let clone = [...rowArray]
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
      case "ประเภทครุภัณฑ์":
        try {
          await deleteTypeData(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ชนิดครุภัณฑ์":
        try {
          await deleteKindData(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "หมวดหมู่ครุภัณฑ์":
        try {
          await deleteCategory(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทครุภัณฑ์ 4 หลัก":
        try {
          await deleteType4(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทครุภัณฑ์ 8 หลัก":
        try {
          await deleteType8(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทครุภัณฑ์ 13 หลัก":
        try {
          await deleteType13(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ยี่ห้อ":
        try {
          await deleteBrand(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "กลุ่ม":
        try {
          await deleteGroup(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทที่ได้มา":
        try {
          await deleteAcquiredType(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "แหล่งที่ได้มา":
        try {
          await deleteSourceData(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "วัตถุประสงค์ในการใช้งาน":
        try {
          await deletePurposeOfUse(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "วิธีการได้มา":
        try {
          await deleteAcquisitionMethod(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "ประเภทเงิน":
        try {
          await deleteMoneyType(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      case "หน่วยนับ":
        try {
          await deleteCountingUnit(id)
          refreshList()
        } catch (err) {
          setIsLoading(false)
        }
        break;
      // case "สิ้นสภาพการเป็นครุภัณฑ์":
      //   console.log(rowArray)
      //   break;
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
    console.log(err)
    if (!err && !isDup) setShowModalConfirm(true)
  }

  function onError(msg) {
    setIsLoading(false)
    setShowModalError(msg || 'ไม่สามารถทำรายการได้ในขณะนี้')
    setShowModalConfirm(false)
  }

  const submit = async () => {
    setIsLoading(true)
    const arrayJSON = JSON.stringify(rowArray);
    const dataJSON = JSON.stringify(rowData);

    switch (header) {
      case "ประเภทครุภัณฑ์":
        try {
          if (rowArray.length) {
            await createTypeData({ typeArray: arrayJSON })
          }
          if (isUpdate) await updateTypeData({ typeArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ชนิดครุภัณฑ์":
        try {
          if (isUpdate) await updateKindData({ kindArray: dataJSON })
          if (rowArray.length) await createKindData({ kindArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "หมวดหมู่ครุภัณฑ์":
        try {
          if (rowArray.length) {
            await createCategory({ categoryArray: arrayJSON })
          }
          if (isUpdate) await updateCategory({ categoryArray: dataJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทครุภัณฑ์ 4 หลัก":
        try {
          if (isUpdate) await updateType4({ type4Array: dataJSON })
          if (rowArray.length) {
            await createType4({ type4Array: arrayJSON })
          }
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทครุภัณฑ์ 8 หลัก":
        try {
          if (isUpdate) await updateType8({ type8Array: dataJSON })
          if (rowArray.length) await createType8({ type8Array: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทครุภัณฑ์ 13 หลัก":
        try {
          if (isUpdate) await updateType13({ type13Array: dataJSON })
          if (rowArray.length) await createType13({ type13Array: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ยี่ห้อ":
        try {
          if (isUpdate) await updateBrand({ brandArray: dataJSON })
          if (rowArray.length) await createBrand({ brandArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "กลุ่ม":
        try {
          if (isUpdate) await updateGroup({ groupArray: dataJSON })
          if (rowArray.length) await createGroup({ groupArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "วิธีการได้มา":
        try {
          if (isUpdate) await updateAcquisitionMethod({ acquisitionMethodArray: dataJSON })
          if (rowArray.length) await createAcquisitionMethod({ acquisitionMethodArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทที่ได้มา":
        try {
          if (isUpdate) await updateAcquiredType({ acquiredTypeArray: dataJSON })
          if (rowArray.length) await createAcquiredType({ acquiredTypeArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "สิ้นสภาพการเป็นครุภัณฑ์":
        console.log(rowArray)
        break;
      case "แหล่งที่ได้มา":
        try {
          if (isUpdate) await updateSourceData({ sourceArray: dataJSON })
          if (rowArray.length) await createSourceData({ sourceArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "วัตถุประสงค์ในการใช้งาน":
        try {
          if (isUpdate) await updatePurposeOfUse({ purposeOfUseArray: dataJSON })
          if (rowArray.length) await createPurposeOfUse({ purposeOfUseArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "ประเภทเงิน":
        try {
          if (isUpdate) await updateMoneyType({ moneyTypeArray: dataJSON })
          if (rowArray.length) await createMoneyType({ moneyTypeArray: arrayJSON })
          refreshList()
        } catch (err) {
          onError(err.response.data.message)
        }
        break;
      case "หน่วยนับ":
        try {
          if (isUpdate) await updateCountingUnit({ countingUnitArray: dataJSON })
          if (rowArray.length) await createCountingUnit({ countingUnitArray: arrayJSON })
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
      <div className="overflow-y-auto scrollbar ">
        <div className="px-2 py-4 mx-auto">
          <div className={`flex justify-between items-center ${!isUpdate && !rowArray.length && "cursor-pointer"} group`}
            onClick={() => !isUpdate && !rowArray.length && setCollapse(!collapse)}>
            <div className="font-semibold ml-3 ">{header}</div>
            <button
              className="text-white px-5 mr-5 py-1 rounded bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
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
            {isDuplicate && <ModalWarning message={`ไม่สามารถบันทึกข้อมูล "ชื่อ" หรือ "ค่า" ซ้ำกันได้`} didClose={() => setIsDuplicate(false)} />}

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

export default DefaultAssetBox;
