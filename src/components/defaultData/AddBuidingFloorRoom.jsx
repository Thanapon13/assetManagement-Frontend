import ModalConfirmSave from "../modal/ModalConfirmSave"
import ModalError from "../modal/ModalError"
import ModalSuccess from "../modal/ModalSuccess"
import ModalWarning from "../modal/ModalWarning"
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react"
import ModalConfirmDelete from "../modal/ModalConfirmDelete"
import { createBuilding, createOrUpdateBuilding, deleteFloorData, deleteRoomData } from "../../api/masterApi"

function AddBuidingFloorRoom({ onClose, data, modeEdit, updateSuccess, allOfData }) {
    const [isLoading, setIsLoading] = useState(true)
    const [allData, setAllData] = useState(data)
    const [rowArray, setRowArray] = useState([]);
    const [collapse, setCollapse] = useState(true)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = async () => {

        setIsLoading(false)
    }

    console.log(data)

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
        // const floor = allData[index].floors
        const data = allData
        console.log(allData[index])
        const newFloor = e ? [...data[index].floors, { name: "" }] : [{ name: "" }]
        data[index].floors = newFloor
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

    const handleSubmit = () => {
        let err
        allData.map((ele, ind) => {
            if (err) return
            if (!ele.name) err = true
            if (!ele.floors.length) {
                err = true
                const object = { name: ele.name, floors: [{ name: "", rooms: [{ name: "" }] }] }
                handleChangeData(object, ind)
            } else {
                ele.floors.map((floor, i) => {
                    // if (err) return
                    if (!floor.name) err = true
                    if (!floor.rooms.length) {
                        err = true
                        const object = { name: floor.name, rooms: [{ name: "" }] }
                        const clone = allData[ind];
                        clone.floors[i] = object;
                        handleChangeData(clone, ind)
                    } else {
                        floor.rooms.map(room => {
                            if (err) return
                            if (!room.name) err = true
                        })
                    }
                })
            }
        })
        let isDup
        const nameBD = allData[0].name
        // state change name  เพิ่ม
        if (!modeEdit) {
            allOfData.forEach(ele => {
                if (nameBD == ele.name) {
                    isDup = true
                    return
                }
            })
        }
        setError(err)
        setIsDuplicate(isDup)
        if (!err && !isDup) setShowModalConfirm(true)
    }


    function onError(msg) {
        setIsLoading(false)
        setShowModalError(msg || 'ไม่สามารถทำรายการได้ในขณะนี้')
        setShowModalConfirm(false)
    }

    const submit = async () => {
        // setIsLoading(true)
        console.log(allData)
        const arrayJSON = JSON.stringify(allData);
        // const response = await createBuilding({ buildingArray: allData })
        try {
            await createOrUpdateBuilding({ buildingObj: allData[0] })
            setShowModalConfirm(false)
            updateSuccess()
        } catch (err) {
            onError(err.response.data.message)
        }
    }

    const classIncreaseButton = "h-[38px] justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none"

    const handleChangeData = (data, index) => {
        console.log(data, index)
        const clone = [...allData]
        clone[index] = data
        console.log(clone)
        setAllData(clone)
    }

    return (
        // <div className=" bg-white p-1 rounded-lg text-sm ">
        <div className="overflow-y-auto scrollbar ">
            <div className="pl-10 pr-5 pb-4 mx-auto">
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

                {/* <div className={`duration-500 transition-all overflow-hidden ${collapse ? 'max-h-0 ease-out' : 'max-h-screen ease-in'}`}> */}
                <div className="min-h-[50vh]">
                    {allData.map((data, index) => (
                        <>
                            <RowBuilding key={index} data={data} index={index} error={error}
                                handleChangeData={handleChangeData} modeEdit={modeEdit} />
                        </>
                    ))}
                </div>

                <div className="flex justify-center items-center border-t-2 border-grey-300 p-4">
                    <button
                        className="inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm  font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        onClick={onClose}
                    >
                        ยกเลิก
                    </button>
                    <button
                        className="ml-5 inline-flex justify-center items-center h-full py-2 px-8 border border-transparent shadow-sm  font-medium rounded-md text-white bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                        onClick={handleSubmit}
                    >
                        บันทึก
                    </button>

                    {showModalError && <ModalError message={showModalError} didClose={() => setShowModalError(false)} />}
                    {isDuplicate && <ModalWarning message={`ไม่สามารถบันทึกชื่อ "อาคาร" ซ้ำกันได้`} didClose={() => setIsDuplicate(false)} />}

                </div>
            </div>
        </div>
        // {/* </div> */}
    )
}

function RowBuilding({ data, index, error, handleChangeData, modeEdit }) {
    const [disabled, setDisabled] = useState(modeEdit ? true : false)
    const [isUpdate, setIsUpdate] = useState(false)
    // const [building, setBuilding] = useState(data)

    const handleChange = (e) => {
        // if (!isUpdate) {
        //     setIsUpdate(true)
        //     if (setUpdate) setUpdate()
        // }
        // const name = e.target.name
        const clone = data;
        clone.name = e.target.value;
        console.log(clone)
        handleChangeData(clone, index);
    };

    useEffect(() => {
        if (error && !data?.name) setDisabled(false)
    }, [error])

    const onChangeFloor = (value, ind) => {
        const clone = data;
        clone.floors[ind] = value;
        handleChangeData(clone, index)
    }

    function handleClickIncrease() {
        const clone = data
        clone.floors = [...data.floors, { name: "", rooms: [{ name: "" }] }]
        console.log(clone)
        handleChangeData(clone, index)
    }

    function handleDelete(value, ind) {
        const clone = data;
        clone.floors[ind] = value;
        handleChangeData(clone, index)
    }

    const deleteFloor = (ind) => {
        let clone = data
        clone.floors.splice(ind, 1);
        handleChangeData(clone, index)
    };

    return (
        <>
            <div
                className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs bg-white 
        ml-3 my-2`}
            >
                <input
                    className={`col-span-7 h-[41px] ${error && !data?.name && 'border-red-500'} ${disabled ? "bg-gray-200" : "bg-white"} border-[1px] px-2 border-gray-300 flex justify-center items-center py-2 rounded focus:border-2 focus:outline-none  focus:border-focus-blue text-sm`}
                    disabled={disabled}
                    name="name"
                    placeholder="อาคาร"
                    onChange={handleChange}
                    value={data?.name}
                />

                {/* <div class="flex col-span-7 col-start-2">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                        อาคาร
                    </span>
                    <input type="text" class="rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-200"
                        disabled={disabled}
                    />
                </div> */}

                <div className={`col-span-2 inline-flex ml-3 ${!modeEdit && "hidden"}`}>
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
                </div>
            </div>

            {/* <div className="bg-background-gray-table rounded-lg py-3 mt-2 col-span-8">
                    <div className="grid grid-cols-10">
                        <div className={`col-span-2 text-center`}>ชั้น</div>
                        <div className={`col-span-6 text-center`}>ห้อง</div>
                        <div className="col-span-2 text-center"></div>
                    </div>
                </div> */}
            {/* </div> */}
            {data.floors?.map((floor, idx) => (
                <div className="">
                    <RowFloor name="ชั้น" key={idx} data={floor} index={idx} error={error} handleChange={onChangeFloor} handleDelete={handleDelete} deleteFloor={deleteFloor} modeEdit={modeEdit} />
                </div>
            ))}
            <div className="grid grid-cols-10 gap-4 ml-2">
                {/* <div className="px-20 pb-4"> */}
                {/* <hr className="my-3" /> */}
                <button
                    type="button"
                    className={`h-[38px] justify-self-start items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none w-fit my-4 flex lg:col-span-2 col-span-6 ml-5 col-start-2 lg:col-start-2`}
                    onClick={handleClickIncrease}
                    name="floor"
                >
                    + เพิ่มชั้น
                </button>
            </div>

            {/* <hr hidden={data.floors.length <= 1} className="m-4" /> */}

        </>
    )
}

function RowFloor({ data, index, error, handleChange, handleDelete, deleteFloor, modeEdit }) {
    const [disabled, setDisabled] = useState(modeEdit ? true : false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [collapseAll, setCollapseAll] = useState(false)
    const [showDelFloor, setShowDelFloor] = useState(false)

    useEffect(() => {
        if (error && !data[index]?.name) setDisabled(false)
        if (error) {
            data.rooms?.map(ele => {
                console.log(collapseAll)
                if (!collapseAll) return
                if (!ele.name) {
                    setCollapseAll(false)
                }
            })
        }
    }, [error])

    function onChange(e) {
        const clone = data
        clone.name = e.target.value
        handleChange(clone, index)
    }

    function onChangeRoom(value, ind) {
        const clone = data
        clone.rooms[ind].name = value
        handleChange(clone, index)
    }

    function handleClickIncrease() {
        const clone = data
        clone.rooms = [...data.rooms, { name: "" }]
        handleChange(clone, index)
    }

    const deleteRoom = (ind) => {
        let clone = data
        clone.rooms.splice(ind, 1);
        handleDelete(clone, index)
    };

    const delFloorDB = async () => {
        try {
            console.log(showDelFloor._id)
            await deleteFloorData(showDelFloor._id)
            deleteFloor(index)
            setShowDelFloor(false)
        }
        catch {

        }
    }

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
                        <span class={`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border border-r-0 border-gray-300  ${!data.name && error && 'border-red-500'} rounded-l-md`}>
                            ชั้น
                        </span>
                        <input type="text" class={`rounded-none rounded-r-lg border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 disabled:bg-gray-200  ${!data.name && error && 'border-red-500'}`}
                            disabled={disabled}
                            onChange={onChange}
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

                    <div className="col-span-2 ml-3 inline-flex ">
                        <button
                            className={`flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-8 h-8 py-2 ${!modeEdit && "hidden"}`}
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
                            className={`${modeEdit && "ml-2"} flex justify-center items-center text-white  bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 py-2`}
                            onClick={() => {
                                !data._id ? deleteFloor(index) : setShowDelFloor(data)
                            }}
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
                        {showDelFloor &&
                            <ModalConfirmDelete
                                item="ชั้น"
                                header="ยืนยันลบข้อมูล"
                                text={`คุณต้องการลบ "ชั้น ${showDelFloor.name}" หรือไม่?`}
                                onClose={() => setShowDelFloor(false)}
                                onDelete={delFloorDB} />
                        }
                    </div>
                </>
            </div>

            <div className={collapseAll && "hidden"}>
                {data.rooms?.map((room, idx) => (
                    <RowRoom name="ห้อง" key={idx} data={room} index={idx} error={error} onChangeRoom={onChangeRoom} deleteRoom={deleteRoom} modeEdit={modeEdit} />
                ))}

                <div className="grid grid-cols-10 gap-4 ml-3">
                    <button
                        type="button"
                        // className={`${classIncreaseButton} w-[70%]`}
                        className={`col-span-8 h-[38px] justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-md text-text-green  hover:bg-sidebar-green focus:outline-none col-span-6 col-start-3 w-fit mt-2`}
                        onClick={handleClickIncrease}
                        name="floor"
                    >
                        + เพิ่มห้อง
                    </button>
                    <hr className="ml-3 col-start-2 col-span-7" />
                </div>
            </div>
        </>
    )
}

function RowRoom({ data, index, error, onChangeRoom, deleteRoom, modeEdit }) {
    const [disabled, setDisabled] = useState(modeEdit ? true : false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [showDelRoom, setShowDelRoom] = useState(false)
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

    function onChange(e) {
        onChangeRoom(e.target.value, index)
    }

    const delRoomDB = async () => {
        try {
            console.log(data)
            await deleteRoomData(showDelRoom._id)
            deleteRoom(index)
            setShowDelRoom(false)
        }
        catch {

        }
    }

    return (
        <div
            className={`grid grid-cols-10 justify-center items-center gap-4 h-16 py-1 text-xs bg-white 
            ml-3`}
        >
            <>
                <div className={`text-center flex col-start-2 justify-end mr-1 items-center`}>
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
                    className={`col-span-6 h-[41px] ${error && !data.name && 'border-red-500'} ${disabled ? "bg-gray-200" : "bg-white"} border-[1px] px-2 border-gray-300 flex justify-center items-center py-2 rounded focus:border-2 focus:outline-none  focus:border-focus-blue text-sm`}
                    disabled={disabled}
                    name="name"
                    placeholder="ห้อง"
                    onChange={onChange}
                    value={data?.name}
                />

                <div className="col-span-2 ml-3 inline-flex">
                    <button
                        className={`flex justify-center items-center text-white bg-button-orange hover:bg-orange-400 rounded-lg focus:border-2 focus:outline-none  focus:bg-orange-400 w-8 h-8 py-2 ${!modeEdit && "hidden"}`}
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
                        className={`${modeEdit && "ml-2"} flex justify-center items-center text-white bg-button-red hover:bg-red-600 rounded-lg focus:border-2 focus:outline-none  focus:border-red-700 w-8 h-8 py-2`}
                        onClick={() => data._id ? setShowDelRoom(data) : deleteRoom(index)}
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

                    {showDelRoom &&
                        <ModalConfirmDelete
                            item="ห้อง"
                            text={`คุณต้องการลบ "${showDelRoom.name}" หรือไม่?`}
                            onClose={() => setShowDelRoom(false)}
                            onDelete={delRoomDB} />
                    }
                </div>
            </>
        </div>
    )
}

export default AddBuidingFloorRoom