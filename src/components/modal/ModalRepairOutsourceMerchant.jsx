import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import SearchSelector from "../selector/SearchSelector";
import { getCompanyPrefix, getThaiPrefix } from "../../api/masterApi";
import { getMerchantBySearch } from "../../api/merchant";

const ModalRepairOutsourceMerchant = ({ item, setShowModalMerchant, confirmChange }) => {
  const [items, setItems] = useState(item)
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false)
  async function confirmDelete(id) {
    try {
      await deleteBorrow(id)
      fetchLists()
      setShowModal(false)
    } catch (error) {

    }
  }

  function handleChange(e) {
    setItems({
      ...items,
      [e.target.name]: e.target.value
    })
  }

  const [merchantList, setMerchantList] = useState([])
  const handleSelect = (value, label) => {
    console.log(value,label)
    if(label == "realMerchantId" || label == "companyName") {
      const list = merchantList.find(ele => (ele[label] == value))
      setItems({
        ...items,
        realMerchantId: list?.realMerchantId,
        contractorName: list?.companyName,
        responsiblePhone: list?.phoneNumber,
        email: list?.email,
        contactName: list?.contactName,
        companyPrefix: list?.companyPrefix,
        prefix: list?.prefix,
        // address
      })
    }
    // const clone = [...genData];
    // clone[index] = { ...genData[index], [label]: value }
    // if (value) setGenData(clone)
  }
console.log(items)
  const [companyPrefixList, setCompanyPrefixList] = useState([])
  const [thaiPrefixList, setThaiPrefixList] = useState([])
  const [merchantIdList, setMerchantIdList] = useState([])
  const [merchantNameList, setMerchantNameList] = useState([])
  useEffect(() => {
    getMaster()
  }, [])

  const getMaster = async () => {
    const merchant = await getMerchantBySearch({})
    setMerchantList(merchant.data.merchant)
    const arrayId = [], array = []
    merchant.data.merchant?.map(ele => {
      arrayId.push({ label: ele.realMerchantId, value: ele.realMerchantId, ele: ele })
      array.push({ label: ele.name, value: ele.name, ele: ele })
    })
    setMerchantIdList(arrayId)
    setMerchantNameList(array)
    const companyPrefix = await getCompanyPrefix()
    const arrCompanyPrefix = formArrayOption(companyPrefix.data.companyPrefix)
    setCompanyPrefixList(arrCompanyPrefix)
    const thaiPrefix = await getThaiPrefix()
    const arrThaiPrefix = formArrayOption(thaiPrefix.data.thaiPrefix)
    setThaiPrefixList(arrThaiPrefix)
  }
  function formArrayOption(data) {
    const array = []
    data?.map(ele => {
      array.push({ label: ele.name, value: ele.name, ele: ele })
    })
    return array
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
        <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
          <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">

            <div className="flex items-center justify-between p-5 relative">
              <p className="text-2xl text-text-green">
                เลือกผู้รับจ้าง
              </p>
              <div className="flex justify-end ">
                <button
                  className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                  onClick={() => setShowModalMerchant(false)}
                >
                  <IoIosClose className="text-2xl" />
                </button>
              </div>
            </div>
            <div>
            </div>
            <div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                รหัสผู้ค้า
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="text-text-gray flex items-center md:col-span-3">
                <SearchSelector
                  options={merchantIdList}
                  name="realMerchantId"
                  onChange={handleSelect}
                  // error={error && !genData[index]?.sector}
                  noClearButton
                // value={genData[index]?.sector && { label: genData[index]?.sector, value: genData[index]?.sector }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                คำนำหน้าบริษัท
              </div>
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                ชื่อบริษัท
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className=" flex items-center md:col-span-3">
                <input disabled
                  type="text"
                  name="companyPrefix"
                  onChange={handleChange}
                  value={items.companyPrefix}
                  className={`disabled:bg-gray-200 w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
                {/* <SearchSelector isDisabled
                options={companyPrefixList}
                name="companyPrefix"
                onChange={handleSelect}
                noClearButton
                error={error && !items.companyPrefix}
                value={{ label: item.companyPrefix, value: item.companyPrefix }}
              /> */}
              </div>
              <div className=" flex items-center md:col-span-3">
                <SearchSelector
                  options={merchantNameList}
                  name="companyName"
                  onChange={handleSelect}
                  noClearButton
                  error={error && !items.contractorName}
                  value={{ label: items.contractorName, value: items.contractorName }} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                คำนำหน้าบุคคล
              </div>
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                ชื่อบุคคล
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="flex items-center md:col-span-3">
                <SearchSelector
                  options={thaiPrefixList}
                  name="prefix"
                  onChange={handleSelect}
                  noClearButton
                  error={error && !items.prefix}
                  value={{ label: items.prefix, value: items.prefix }}
                />
              </div>
              <div className="flex items-center md:col-span-3">
                <input
                  type="text"
                  name="contactName"
                  onChange={handleChange}
                  value={items.contactName}
                  className={`${error && !items.contactName && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                เบอร์โทรศัพท์
              </div>
              <div className="text-text-gray flex items-center py-2 md:col-span-3">
                อีเมล์
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4">
              <div className="flex items-center md:col-span-3">
                <input
                  type="text"
                  name="responsiblePhone"
                  onChange={handleChange}
                  value={items.responsiblePhone}
                  className={`${error && !items.responsiblePhone && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
              <div className="flex items-center md:col-span-3">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={items.email}
                  className={`${error && !items.email && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 px-5 gap-4 text-text-gray pb-2 pt-3">
              ที่อยู่
            </div>
            <div className="px-5">
              <input
                type="text"
                name="responsibleAddress"
                onChange={handleChange}
                value={items.responsibleAddress}
                className={`${error && !items.responsibleAddress && 'border-red-500'} w-full h-[38px] border-[1px] pl-2 text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue`}
              />
            </div>

            <div className="flex items-center gap-5 justify-end p-6 rounded-b ">
              <button
                className="px-10 py-3 border-[1px] shadow-sm rounded-md hover:bg-gray-400 hover:text-white"
                type="button"
                onClick={() => setShowModalMerchant(false)}
              >
                ย้อนกลับ
              </button>
              <button
                className="text-white bg-text-green hover:bg-green-600 px-10 py-3 border rounded-md "
                onClick={() => {
                  confirmChange(items)
                  setShowModalMerchant(false)
                }}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalRepairOutsourceMerchant