import { useEffect } from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs"
import { BsFillPencilFill } from "react-icons/bs"
import { IoIosClose, IoMdTrash } from "react-icons/io"
import { Link } from "react-router-dom";
import { deleteMerchant } from "../../api/merchant";

function RowOfMerchantTableArray({
  index,
  ele,
  page,
  mode,
  fetchData
}) {
  const [showModalDelete, setShowModalDelete] = useState(false)

  function onConfirmDelete(id) {
    deleteMerchant(id)
    setShowModalDelete(false)
    fetchData()
  }

  return (
    <div
      className={`grid grid-cols-13 gap-2 h-12 pt-2 text-xs items-center border-b-[1px] border-border-gray-table bg-white`}
    >
      {/* <div className="ml-2 text-center">{index + 1}</div> */}
      <div className="text-center">{ele.realMerchantId}</div>
      <div className="col-span-2">{ele.companyPrefix}</div>
      <div className="col-span-3">{ele.companyName}</div>
      <div className="col-span-2">{ele.creditorCategory}</div>
      <div className="col-span-2">{ele.contactName}</div>
      <div className="col-span-1 text-center">
        <div className={`rounded-full py-2 px-4  w-fit mx-auto 
        ${ele.status === "saveDraft"
            ? "bg-gray-300"
            : ele.status === "active"
              ? "bg-text-blue text-white"
              : "border-text-blue border text-text-blue"
          } `}>
          {ele.status === "saveDraft" ? "แบบร่าง" : ele.status === "inactive" ? "Inactive" : ele.status}
        </div>
      </div>
      <div className="col-span-2 flex justify-center gap-2 mr-2">
        <Link
          to={`/${mode !== "reportInfo" ? "viewMerchant" : "viewReportMerchantInfo"}/${ele._id}`}
          // to={`/${ele.status !== "active" ? "viewMerchant" : "viewReportMerchantInfo"}/${ele._id}`}
          className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
          <BsFillEyeFill className="w-[16px] h-[16px] text-text-green" />
        </Link>
        {/* {ele.status == "active" */}
        {mode === "reportInfo"
          ?
          <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
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
                  fill="green"
                />
              </svg>
            </div>
          </button>
          :
          <>
            <Link
              to={`/editMerchant/${ele._id}`}
              className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md">
              <BsFillPencilFill className="w-[16px] h-[16px] text-text-green" />
            </Link>
            <button className="border-[1px] border-text-green  focus:border-transparent shadow-sm text-sm font-medium  text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[31px] flex justify-center items-center rounded-md"
              onClick={() => setShowModalDelete(ele)}>
              <IoMdTrash className="w-[20px] h-[20px] text-text-green" />
            </button>
          </>}
      </div>

      {showModalDelete &&
        <ModalDelete element={showModalDelete} onClose={() => setShowModalDelete(false)}
          onConfirmDelete={onConfirmDelete} />
      }
    </div >
  );
}

function ModalDelete({ element, onClose, onConfirmDelete }) {
  const [remark, setRemark] = useState("")
  const [error, setError] = useState(false)

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose()
      setDefault()
    }
  }

  useEffect(() => {
    if (element) {
      document.body.style.height = "100vh"
      document.body.style.overflowY = "hidden"
    }
  }, [element])

  function setDefault() {
    document.body.style.height = "auto"
    document.body.style.overflowY = "auto"
  }

  return (
    <>
      <div
        id="wrapper"
        className="modal fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center "
        onClick={handleClose}
      >
        {/* <div className="fixed inset-0 -left-10 bg-black opacity-50" /> */}
        <div className="flex justify-center items-center w-full lg:w-[80%]" id="content">
          <div className="w-10/12 md:w-8/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
            <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
              <div>
                <div className="flex items-center justify-center p-5 relative">
                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 0.333344C39.9167 0.333344 37.8334 1.12501 36.125 2.79168L2.79169 36.125C-0.49998 39.375 -0.49998 44.625 2.79169 47.875L36.125 81.2083C39.375 84.5 44.625 84.5 47.875 81.2083L81.2084 47.875C84.5 44.625 84.5 39.375 81.2084 36.125L47.875 2.79168C46.1667 1.12501 44.0834 0.333344 42 0.333344ZM37.8334 21.1667H46.1667V46.1667H37.8334V21.1667ZM37.8334 54.5H46.1667V62.8333H37.8334V54.5Z" fill="#EB5757" />
                  </svg>
                  <p className="text-2xl text-red-600 ml-4">
                    ลบข้อมูลหลักผู้ค้า
                  </p>
                  <div className="absolute w-full flex justify-end pr-5 mb-8">
                    <button
                      className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                      onClick={() => onClose()}
                    >
                      <IoIosClose className="text-2xl" />
                    </button>
                  </div>
                </div>

                <div className="px-5 py-4 text-base">
                  <div className="grid grid-cols-2  md:grid-cols-6 p-2">
                    <div className="text-text-gray flex items-center ">
                      รหัสผู้ค้า
                    </div>
                    <div className="flex items-center md:col-span-2">
                      {element.realMerchantId}
                    </div>
                    <div className="text-text-gray flex items-center ">
                      ชื่อบริษัทผู้ค้า
                    </div>
                    <div className="flex items-center md:col-span-2">
                      {element.companyName}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                    <div className="text-text-gray flex items-center">
                      กลุ่มประเภท
                    </div>
                    <div className="flex items-center md:col-span-2">
                      {element.creditorCategory}
                    </div>
                    {/* <div className="text-text-gray flex items-center">
                    ราคา
                  </div>
                  <div className="flex items-center md:col-span-2">
                    {element.pricePerUnit}
                  </div> */}
                  </div>
                  {element.status != "saveDraft" &&
                    <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                      <div className="text-text-gray flex items-center">
                        สาเหตุที่ยกเลิก
                      </div>
                      <textarea className={`${error && !remark && "border-red-500"} col-span-5 border-[1px] p-2 h-[38px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                        onChange={e => setRemark(e.target.value)}
                      />
                    </div>
                  }
                </div>
              </div>

              <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                <button
                  // className="px-10 py-2 border-[1px] shadow-sm rounded-md "
                  className="px-10 py-3 text-white bg-gray-400/[.8] hover:bg-gray-400 bg-[#999999] shadow-sm rounded-md "
                  type="button"
                  onClick={() => onClose()}
                >
                  ย้อนกลับ
                </button>
                <button
                  className="text-white hover:bg-red-600 bg-[#EB5757] px-10 py-3 border rounded-md "
                  // type="button"
                  onClick={() => {
                    element.status == "saveDraft"
                      ? onConfirmDelete(element._id)
                      : remark ? onConfirmDelete(element._id, remark) : setError(true)
                  }}
                >
                  ยืนยันลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RowOfMerchantTableArray;
