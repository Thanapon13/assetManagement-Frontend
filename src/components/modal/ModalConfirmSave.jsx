import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const ModalConfirmSave = ({ isVisible, onClose, onSave, text, header, mode, confirmText }) => {

    const handleClose = (e) => {
        if (e.target.id === "wrapper") {
            onClose()
            setDefault()
        }
    }

    useEffect(() => {
        if (isVisible) {
            document.body.style.height = "100vh"
            document.body.style.overflowY = "hidden"
        }
    }, [isVisible])

    function setDefault() {
        document.body.style.height = "auto"
        document.body.style.overflowY = "auto"
    }

    return (
        <>
            {isVisible &&
                <div
                    id="wrapper"
                    className="modal fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center"
                    onClick={handleClose}
                >
                    <div className="overflow-y-auto scrollbar cursor-default">
                        <div className={`mx-auto min-w-[30em]`} >
                            <div className="bg-white rounded min-w-[50%]">
                                <div className="flex justify-between border-grey-300  p-4">
                                    <div className="text-text-green text-xl font-bold self-end">{header || (mode === "edit" ? "ยืนยันการแก้ไข" : "ยืนยันรายการบันทึก")}</div>

                                    <button
                                        className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                                        onClick={() => { onClose(); setDefault() }}
                                    >
                                        <IoIosClose className="text-2xl" />
                                    </button>
                                </div>

                                <div className="min-w-[50%] px-4 py-3">
                                    {text || 'คุณต้องการ "บันทึกข้อมูล" หรือไม่'}
                                </div>

                                <div className="flex justify-end items-center border-grey-300 p-4">
                                    <button
                                        className="inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm text-xs font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                                        onClick={() => { onClose(); setDefault() }}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="ml-4 inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-text-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                        onClick={() => { onSave(); setDefault() }}
                                    >
                                        {confirmText || "บันทึก"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalConfirmSave