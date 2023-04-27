import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const ModalReasonDelete = ({ isVisible, header, content, textSubmit, onSubmit, onClose }) => {

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

    const [reason, setReason] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = () => {
        if (!reason) {
            setError(true)
        } else {
            onSubmit(reason)
        }
    }

    return (
        <>
            {isVisible &&
                <div
                    id="wrapper"
                    className="modal fixed inset-0 bg-black bg-opacity-50 blackdrop-blur-sm flex justify-center items-center"
                    onClick={handleClose}
                >
                    {/* <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen"> */}
                        <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
                            <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                                <div>
                                    <div className="flex items-center justify-between p-5 ">
                                        <h3 className="text-xl self-end">
                                            ระบุสาเหตุที่ยกเลิก
                                        </h3>
                                        <button
                                            className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                                            onClick={() => { onClose(); setDefault() }}
                                        >
                                            <IoIosClose className="text-2xl" />
                                        </button>
                                    </div>

                                    <div className="px-5 py-4 text-base">
                                        <div className="grid grid-cols-2 md:grid-cols-6 p-2">
                                            <textarea className={`${error && !reason && "border-red-500"} col-span-5 border-[1px] p-2 h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue`}
                                                onChange={e => setReason(e.target.value)}
                                                value={reason}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                                    <button
                                        className="px-10 py-3 text-white bg-gray-400 shadow-sm rounded-md hover:bg-gray-500"
                                        type="button"
                                        onClick={() => { onClose(); setDefault() }}
                                    >
                                        ย้อนกลับ
                                    </button>
                                    <button
                                        className="text-white bg-red-600 px-10 py-3 border rounded-md "
                                        // type="button"
                                        onClick={handleSubmit}
                                    >
                                        {textSubmit}
                                    </button>
                                </div>
                            </div>
                        </div>
                  
                </div>
            }
        </>
    )
}

export default ModalReasonDelete