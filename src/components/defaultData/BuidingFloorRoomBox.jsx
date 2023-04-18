import ModalConfirmSave from "../modal/ModalConfirmSave"
import ModalError from "../modal/ModalError"
import ModalSuccess from "../modal/ModalSuccess"
import ModalWarning from "../modal/ModalWarning"
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react"
import AddBuidingFloorRoom from "./AddBuidingFloorRoom"
import { IoIosClose } from "react-icons/io";

function BuidingFloorRoomBox() {
    const [isLoading, setIsLoading] = useState(true)
    const [allData, setAllData] = useState([])
    // const [allData, setAllData] = useState([{
    //     name: "test",
    //     floor: [{
    //         name: "0",
    //         room: [
    //             { name: "รูม" }
    //         ]
    //     }]
    // }]);
    const [rowArray, setRowArray] = useState([]);
    const [collapse, setCollapse] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const defaultData = [{
        name: "",
        floor: [
            {
                name: "",
                room: [
                    { name: "" }
                ]
            }
        ]
    }]

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = async () => {

        setIsLoading(false)
    }

    const handleClickIncrease = (e) => {
        e.preventDefault()
        const name = (e.target.name)
        if (name == "building") {
            let clone = [...allData] // || []
            setAllData([...clone, { name: "" }])
        }
        if (name == "floor") {
            let clone = [...allData]
            // setAllData([...clone, { name: "" }])
        }
        // const newCloneArray = fieldValue ? { name: "", value: "" } : { name: "" }
        // setRowArray([...clone, newCloneArray])
    }
    const handleClickIncreaseFloor = (e, index) => {
        // const floor = allData[index].floor
        const data = allData
        console.log(allData[index])
        const newFloor = e ? [...data[index].floor, { name: "" }] : [{ name: "" }]
        data[index].floor = newFloor
        console.log(data)
        setAllData(data)
    }

    const deleteRowArray = (index) => {
        let clone = [...rowArray];
        clone.splice(index, 1);
        setRowArray(clone);
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [showPopupAdds, setShowPopupAdds] = useState(false);

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
        if (!err, !isDup) setShowModalConfirm(true)
    }

    function onError(msg) {
        setIsLoading(false)
        setShowModalError(msg || 'ไม่สามารถทำรายการได้ในขณะนี้')
        setShowModalConfirm(false)
    }

    const submit = async () => {
        setIsLoading(true)
        // const arrayJSON = JSON.stringify(rowArray);
        // const dataJSON = JSON.stringify(rowData);

        //rowBuild
        //rowFloor
        //rowRoom
    }

    const classIncreaseButton = "h-[38px] justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none"

    return (
        <div className=" bg-white border-[1px] p-1 rounded-lg shadow-sm text-sm mb-4">
            <div className="overflow-y-auto scrollbar ">
                <div className="px-2 py-4 mx-auto">
                    <div className={`flex justify-between items-center ${!isUpdate && !rowArray.length && "cursor-pointer"} group`}
                        onClick={() => !isUpdate && !rowArray.length && setCollapse(!collapse)}>
                        <div className="font-semibold ml-3 ">อาคาร/ชั้น/ห้อง</div>
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
                            // text={`คุณต้องการบันทึก "${header}" หรือไม่`}
                            header="ยืนยันการแก้ไข"
                            onSave={submit}
                        />
                        {showModalSuccess && <ModalSuccess />}
                        {showModalError && <ModalError message={showModalError} />}
                        {isDuplicate && <ModalWarning message={`ไม่สามารถบันทึกข้อมูล "ชื่อ" หรือ "ค่า" ซ้ำกันได้`} />}

                    </div>

                    <div className={`duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}>        {isLoading
                        ? <div className="mt-5 py-10 w-full text-center"><Spinner size="xl" /></div>
                        : <>
                            {allData.map((data, index) => (
                                <>
                                    <RowBuilding key={index} data={data} index={index} />

                                    {data.floor?.map((floor, idx) => (
                                        <div className="hidden">
                                            <RowFloor name="ชั้น" key={idx} data={floor} index={idx} />

                                            {floor.room?.map((room, idx) => (
                                                <RowRoom name="ห้อง" key={idx} data={room} index={idx} />
                                            ))}
                                        </div>
                                    ))}
                                </>
                            ))}
                            <div className="px-5 pt-2">
                                <button
                                    type="button"
                                    className="w-full h-[38px] justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none"
                                    onClick={() => setShowPopupAdds(true)}
                                >
                                    + เพิ่มข้อมูล
                                </button>
                            </div>

                            {showPopupAdds && <PopupAdds header="เพิ่มอาคาร / ชั้น / ห้อง"
                                data={defaultData}
                                onClose={() => setShowPopupAdds(false)} />}
                        </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

function RowBuilding({ data, index, error }) {
    const [disabled, setDisabled] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [collapseAll, setCollapseAll] = useState(true)
    const [showPopup, setShowPopup] = useState(false);

    // const handleChange = (e) => {
    //     if (!isUpdate) {
    //         setIsUpdate(true)
    //         if (setUpdate) setUpdate()
    //     }
    //     const name = e.target.name
    //     const clone = [...rowArray];
    //     if (name == "name") clone[index].name = e.target.value;
    //     if (name == "value") clone[index].value = e.target.value;
    //     setRowArray(clone);
    // };

    useEffect(() => {
        if (error && !data[index]?.name) setDisabled(false)
    }, [error])
    console.log(data)
    return (
        <>
            <div
                className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs bg-white 
        ml-3 my-2`}
            >

                <div className={`text-center flex lg:ml-6 items-center`}>
                    {/* <div className=" flex justify-center items-center w-6 h-6 px-2 py-2">
                    อาคาร
                </div> */}

                    <div className='cursor-pointer hover:text-text-green rounded-full w-6 h-6 group flex justify-center items-center bg-gray-200' onClick={() => setCollapseAll(!collapseAll)}>
                        {
                            collapseAll
                                ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                                : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                        }
                    </div>
                </div>

                <input
                    className={`col-span-7 h-[41px] ${error && !rowArray[index]?.name && 'border-red-500'} ${disabled ? "bg-gray-200" : "bg-white"} border-[1px] px-2 border-gray-300 flex justify-center items-center py-2 rounded focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    disabled={disabled}
                    name="name"
                    placeholder="อาคาร"
                    // onChange={handleChange}
                    value={data && data.name}
                />

                {/* <div class="flex col-span-7 col-start-2">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                        อาคาร
                    </span>
                    <input type="text" class="rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-200"
                        disabled={disabled}
                    />
                </div> */}

                {showPopup &&
                    <PopupAdds
                        header="แก้ไขอาคาร / ชั้น / ห้อง"
                        mode="edit"
                        data={data}
                        onClose={() => setShowPopup(false)} />
                }

                <div className="col-span-2 inline-flex">
                    <button
                        className="flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-8 h-8 py-2"
                        onClick={() => {
                            // setDisabled(false)
                            setShowPopup(true)
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.8196 5.60337L10.3663 2.1907L11.5038 1.05315C11.8153 0.741674 12.198 0.585938 12.652 0.585938C13.1054 0.585938 13.4878 0.741674 13.7993 1.05315L14.9368 2.1907C15.2483 2.50218 15.4108 2.87811 15.4243 3.31851C15.4379 3.75836 15.2889 4.13403 14.9775 4.4455L13.8196 5.60337ZM12.6414 6.80186L4.02849 15.4148H0.575195V11.9615L9.18811 3.34857L12.6414 6.80186Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button
                        className="ml-2 flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 py-2"
                    // onClick={() => {
                    //     deleteRow(index);
                    // }}
                    >
                        <svg
                            width="13"
                            height="17"
                            viewBox="0 0 13 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.892857 14.2857C0.892857 15.2679 1.69643 16.0714 2.67857 16.0714H9.82143C10.8036 16.0714 11.6071 15.2679 11.6071 14.2857V5.35714C11.6071 4.375 10.8036 3.57143 9.82143 3.57143H2.67857C1.69643 3.57143 0.892857 4.375 0.892857 5.35714V14.2857ZM11.6071 0.892857H9.375L8.74107 0.258929C8.58036 0.0982142 8.34821 0 8.11607 0H4.38393C4.15179 0 3.91964 0.0982142 3.75893 0.258929L3.125 0.892857H0.892857C0.401786 0.892857 0 1.29464 0 1.78571C0 2.27679 0.401786 2.67857 0.892857 2.67857H11.6071C12.0982 2.67857 12.5 2.27679 12.5 1.78571C12.5 1.29464 12.0982 0.892857 11.6071 0.892857Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={collapseAll && "hidden"}>
                {/* <div className="bg-background-gray-table rounded-lg py-3 mt-2 col-span-8">
                    <div className="grid grid-cols-10">
                        <div className={`col-span-2 text-center`}>ชั้น</div>
                        <div className={`col-span-6 text-center`}>ห้อง</div>
                        <div className="col-span-2 text-center"></div>
                    </div>
                </div> */}
                {/* </div> */}
                {data.floor?.map((floor, idx) => (
                    <div className="">
                        <RowFloor name="ชั้น" key={idx} data={floor} index={idx} />
                    </div>
                ))}
                <hr hidden={data.floor.length <= 1} className="m-4" />
            </div>

        </>
    )
}

function RowFloor({ data, index, error, name }) {
    const [disabled, setDisabled] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [collapseAll, setCollapseAll] = useState(true)
    // const handleChange = (e) => {
    //     if (!isUpdate) {
    //         setIsUpdate(true)
    //         if (setUpdate) setUpdate()
    //     }
    //     const name = e.target.name
    //     const clone = [...rowArray];
    //     if (name == "name") clone[index].name = e.target.value;
    //     if (name == "value") clone[index].value = e.target.value;
    //     setRowArray(clone);
    // };

    useEffect(() => {
        if (error && !data[index]?.name) setDisabled(false)
    }, [error])

    return (
        <>
            <div
                className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs bg-white 
            ml-3`}
            >
                <>
                    <div className={`text-center flex justify-end items-center`}>
                        <div className='cursor-pointer hover:text-text-green rounded-full w-6 h-6 group flex justify-center items-center bg-gray-200' onClick={() => setCollapseAll(!collapseAll)}>
                            {
                                collapseAll
                                    ? <MdOutlineExpandLess size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                                    : <MdOutlineExpandMore size={20} className='inline inset-0 transform group-hover:rotate-180  transition duration-300' />
                            }
                        </div>
                    </div>
                    <div class="flex lg:col-span-2 col-span-3 ml-5 col-start-2">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                            ชั้น
                        </span>
                        <input type="text" class="rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-200"
                            disabled={disabled}
                            value={data?.name}
                        />
                    </div>
                    {/* <input
                            className={`ml-5 col-span-2 ${error && !data[index]?.name && 'border-red-500'} ${disabled ? "bg-gray-200" : "bg-white"} border-[1px] px-2 border-gray-300 flex justify-center items-center py-2 rounded focus:border-2 focus:outline-none focus:border-focus-blue`}
                            disabled={disabled}
                            name="name"
                            // onChange={handleChange}
                            value={data && data[index]?.name}
                        /> */}

                    <div className="hidden col-span-2 ml-3 inline-flex">
                        <button
                            className="flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-8 h-8 py-2"
                            onClick={() => {
                                setDisabled(false)
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.8196 5.60337L10.3663 2.1907L11.5038 1.05315C11.8153 0.741674 12.198 0.585938 12.652 0.585938C13.1054 0.585938 13.4878 0.741674 13.7993 1.05315L14.9368 2.1907C15.2483 2.50218 15.4108 2.87811 15.4243 3.31851C15.4379 3.75836 15.2889 4.13403 14.9775 4.4455L13.8196 5.60337ZM12.6414 6.80186L4.02849 15.4148H0.575195V11.9615L9.18811 3.34857L12.6414 6.80186Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        <button
                            className="ml-2 flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 py-2"
                        // onClick={() => {
                        //     deleteRow(index);
                        // }}
                        >
                            <svg
                                width="13"
                                height="17"
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.892857 14.2857C0.892857 15.2679 1.69643 16.0714 2.67857 16.0714H9.82143C10.8036 16.0714 11.6071 15.2679 11.6071 14.2857V5.35714C11.6071 4.375 10.8036 3.57143 9.82143 3.57143H2.67857C1.69643 3.57143 0.892857 4.375 0.892857 5.35714V14.2857ZM11.6071 0.892857H9.375L8.74107 0.258929C8.58036 0.0982142 8.34821 0 8.11607 0H4.38393C4.15179 0 3.91964 0.0982142 3.75893 0.258929L3.125 0.892857H0.892857C0.401786 0.892857 0 1.29464 0 1.78571C0 2.27679 0.401786 2.67857 0.892857 2.67857H11.6071C12.0982 2.67857 12.5 2.27679 12.5 1.78571C12.5 1.29464 12.0982 0.892857 11.6071 0.892857Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            </div>

            <div className={collapseAll && "hidden"}>
                {data.room?.map((room, idx) => (
                    <RowRoom name="ห้อง" key={idx} data={room} index={idx} />
                ))}
                <hr hidden={data.room.length <= 1} className="m-4" />
            </div>
        </>
    )
}

function RowRoom({ data, index, error, name }) {
    const [disabled, setDisabled] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)
    const [collapseAll, setCollapseAll] = useState(true)
    // const handleChange = (e) => {
    //     if (!isUpdate) {
    //         setIsUpdate(true)
    //         if (setUpdate) setUpdate()
    //     }
    //     const name = e.target.name
    //     const clone = [...rowArray];
    //     if (name == "name") clone[index].name = e.target.value;
    //     if (name == "value") clone[index].value = e.target.value;
    //     setRowArray(clone);
    // };

    useEffect(() => {
        if (error && !data[index]?.name) setDisabled(false)
    }, [error])

    return (
        <div
            className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs bg-white 
            ml-3`}
        >
            <>
                <div className={`text-center flex col-start-2 justify-center items-center`}>
                    <div className=" flex justify-center items-center bg-gray-100 rounded-full w-6 h-6 px-2 py-2">
                        {index + 1}
                    </div>
                </div>
                {/* <div class="flex col-span-6 col-start-3 -ml-4">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                                ห้อง
                            </span>
                            <input type="text" class="rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-200"
                                disabled={disabled}
                            />
                        </div> */}

                <input
                    className={`col-span-8 mr-5 max-w-[550px] h-[41px] ${error && !rowArray[index]?.name && 'border-red-500'} ${disabled ? "bg-gray-200" : "bg-white"} border-[1px] px-2 border-gray-300 flex justify-center items-center py-2 rounded focus:border-2 focus:outline-none  focus:border-focus-blue`}
                    disabled={disabled}
                    name="name"
                    placeholder="ห้อง"
                    // onChange={handleChange}
                    value={data?.name}
                />

                <div className="hidden col-span-2 ml-3 inline-flex">
                    <button
                        className="flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-8 h-8 py-2"
                        onClick={() => {
                            setDisabled(false)
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.8196 5.60337L10.3663 2.1907L11.5038 1.05315C11.8153 0.741674 12.198 0.585938 12.652 0.585938C13.1054 0.585938 13.4878 0.741674 13.7993 1.05315L14.9368 2.1907C15.2483 2.50218 15.4108 2.87811 15.4243 3.31851C15.4379 3.75836 15.2889 4.13403 14.9775 4.4455L13.8196 5.60337ZM12.6414 6.80186L4.02849 15.4148H0.575195V11.9615L9.18811 3.34857L12.6414 6.80186Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button
                        className="ml-2 flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 py-2"
                    // onClick={() => {
                    //     deleteRow(index);
                    // }}
                    >
                        <svg
                            width="13"
                            height="17"
                            viewBox="0 0 13 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.892857 14.2857C0.892857 15.2679 1.69643 16.0714 2.67857 16.0714H9.82143C10.8036 16.0714 11.6071 15.2679 11.6071 14.2857V5.35714C11.6071 4.375 10.8036 3.57143 9.82143 3.57143H2.67857C1.69643 3.57143 0.892857 4.375 0.892857 5.35714V14.2857ZM11.6071 0.892857H9.375L8.74107 0.258929C8.58036 0.0982142 8.34821 0 8.11607 0H4.38393C4.15179 0 3.91964 0.0982142 3.75893 0.258929L3.125 0.892857H0.892857C0.401786 0.892857 0 1.29464 0 1.78571C0 2.27679 0.401786 2.67857 0.892857 2.67857H11.6071C12.0982 2.67857 12.5 2.27679 12.5 1.78571C12.5 1.29464 12.0982 0.892857 11.6071 0.892857Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </>
        </div>
    )
}

function PopupAdds({ header, onClose, data }) {
    const handleClose = (e) => {
        if (e.target.id === "wrapper") {
            onClose()
            setDefault()
        }
    }

    useEffect(() => {
        document.body.style.height = "100vh"
        document.body.style.overflowY = "hidden"
    }, [data])

    function setDefault() {
        document.body.style.height = "auto"
        document.body.style.overflowY = "auto"
    }

    function close() {
        onClose()
        setDefault()
    }

    return (
        <>
            {data &&
                <div
                    id="wrapper"
                    className="modal fixed inset-0 bg-black bg-opacity-25 blackdrop-blur-sm flex justify-center items-center"
                    onClick={handleClose}
                >
                    <div className="overflow-y-auto scrollbar cursor-default max-h-[95%] w-[90%] max-w-[1000px] rounded">
                        <div className={`mx-auto`} >
                            <div className="bg-white min-w-[50%] rounded">
                                <div className="flex justify-between p-4">
                                    <div className="text-text-green text-xl font-bold self-end">{header}
                                    </div>

                                    <button
                                        className="text-gray-500 font-semibold h-8 w-8 rounded-full hover:bg-gray-200 hover:text-black flex justify-center items-center"
                                        onClick={close}
                                    >
                                        <IoIosClose className="text-2xl" />
                                    </button>
                                </div>

                                <AddBuidingFloorRoom onClose={close} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BuidingFloorRoomBox