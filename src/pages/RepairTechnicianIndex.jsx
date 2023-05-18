import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Selector from '../components/selector/Selector'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillPencilFill, BsFillEyeFill } from 'react-icons/bs'
import DateInput from '../components/date/DateInput'

const RepairTechnicianIndex = () => {
  // useState
  const [perPage, setPerPage] = useState(10)
  const [totalRow, setTotalRow] = useState(25)

  //Main Date
  const [withdrawDate, setWithdrawDate] = useState(new Date())
 //* แก้ ใช้ state คนละตัว *
 
  // data
  let tableData = [
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'waitApprove',
      technicianStatus: 'waitTechnicianConfirm',
      emerygencyStatus: 'normal',
      repairCostList: [
        {
          list: 'รางไฟ',
          quannity: '1',
          unit: '-',
          pricePerUnit: '3000',
          totalPrice: '3000',
        },
        {
          list: 'สายไฟ 220v outside wire 2.5sqm',
          quannity: '10',
          unit: 'เมตร',
          pricePerUnit: '200',
          totalPrice: '2000',
        },
        {
          list: 'switch relay 220v to 12v for sn.7103671688',
          quannity: '1',
          unit: 'ตัว',
          pricePerUnit: '6300',
          totalPrice: '6300',
        },
      ],
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'waitTechnicianConfirm',
      technicianStatus: 'waitTechnicianConfirm',
      emerygencyStatus: 'normal',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'waitTechnicianConfirm',
      technicianStatus: 'waitRecord',
      emerygencyStatus: 'emergency',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'waitTechnicianConfirm',
      technicianStatus: 'waitRecord',
      emerygencyStatus: 'emergency',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'waitTechnicianConfirm',
      technicianStatus: 'waitRecord',
      emerygencyStatus: 'emergency',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'inProgress',
      emerygencyStatus: 'rushing',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'waitApprove',
      emerygencyStatus: 'rushing',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'waitRecord',
      emerygencyStatus: 'rushing',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'done',
      emerygencyStatus: 'normal',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'done',
      emerygencyStatus: 'normal',
    },
    {
      informRepairDate: '12/09/2565 14:36 น.',
      informRepairIdDoc: '20212334512',
      assetIdCode: '7440-0036-032/1512',
      repairDetail: 'จอมอนิเตอร์ดับ เปิดไม่ติด',
      agencySendRepair: 'หน่วยงานที่ส่งซ่อม',
      repairSender: 'ศรีตรัง',
      repairStatus: 'inProgress',
      technicianStatus: 'cancel',
      emerygencyStatus: 'normal',
    },
  ]

  return (
    <div className="bg-background-page px-5 pt-5 pb-36 ">
      {/* Header */}
      <div className="text-2xl text-text-green ">
        รายการรอลงรายละเอียดแจ้งซ่อม
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex text-xs">
          <Link
            to="/"
            className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
          >
            Home
          </Link>
          <div className="text-text-gray">/</div>
          <div className="text-text-gray ml-2">
            รายการรอลงรายละเอียดแจ้งซ่อม
          </div>
        </div>
      </div>
      {/* search bar */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center mt-8 mb-3 md:pl-5">
        <div className="text-xs font-semibold">ค้นหาโดย</div>
        <div className="md:col-span-2">
          <Selector placeholder={'เลขที่ใบแจ้งซ่อม'} />
        </div>

        <div className="md:col-span-4  h-[38px] relative">
          <AiOutlineSearch className="text-xl text-gray-500 absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 " />
          <input
            type="text"
            // name="requestedId"
            // id="requestedId"
            // onChange={(e) => setRequestedId(e.target.value)}
            // value={requestedId}
            placeholder="ค้นหาโดยเลขที่ใบเบิก"
            className="pl-8 w-full h-[38px] border-[1px] text-xs sm:text-sm border-gray-300 rounded-md focus:border-2 focus:outline-none  focus:border-focus-blue"
          />
        </div>

        <div className="md:col-span-3">
          <Selector placeholder={'สถานะ'} />
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date from"
            />
          </div>
        </div>

        <div className="md:col-span-3 h-full ">
          <div className="flex h-full">
            <DateInput
              state={withdrawDate}
              setState={setWithdrawDate}
              lable="date to"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <Selector placeholder={'ฝ่าย/กลุ่มงาน'} />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex justify-center w-[38px] h-[38px] items-center py-1 px-6  border border-transparent shadow-sm text-sm font-medium rounded-md bg-text-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
            // onClick={handleSearch}
          >
            <div className="text-xl text-white">
              <AiOutlineSearch />
            </div>
          </button>
        </div>
      </div>
      {/* table */}
      <div className="bg-white rounded-lg p-4 my-3 overflow-x-auto scrollbar">
        <div className="w-[1200px] lg:w-full lg:h-full h-[500px]">
          <div className="text-sm">ผลการค้นหา {totalRow} รายการ</div>
          <div className="text-text-black-table text-xs font-semibold bg-table-gray rounded-t-lg border-b-[1px] border-border-gray-table mt-5">
            {/* top bar */}
            <div className="grid grid-cols-12 gap-2 h-12 items-center text-center">
              <div className="col-span-1">วันที่แจ้ง</div>
              <div className="col-span-2">เลขที่ใบแจ้งซ่อม</div>
              <div className="col-span-1">รหัสครุภัณฑ์</div>
              <div className="col-span-3">รายละเอียด</div>
              <div className="col-span-1">หน่วยงานที่ส่งซ่อม</div>
              <div className="col-span-1">สถานะความเร่งด่วน</div>
              <div className="col-span-1">สถานะ</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>
          <TableRepairTechnicianIndex data={tableData} />

          <div className="flex justify-end gap-2 h-12 pr-12 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
            <div className="flex mr-10 items-center">
              <div>Rows per page:</div>
              <select
                id="perPage"
                className="w-20 h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10" defaultValue="selected">
                  10
                </option>
              </select>
            </div>

            <div>1-{perPage} of 13</div>

            <button className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
              <HiChevronLeft className="text-lg" />
            </button>
            <button className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-8 h-8 px-1 py-1">
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableRepairTechnicianIndex = (props) => {
  const [isClick, setIsClick] = useState(false)

  let navigate = useNavigate()

  const handleClick = (status) => {
    setIsClick(!isClick)

    if (status === 'waitToReturn') {
      navigate('/repairIndex')
    }
  }
  //   waitTechnicianConfirm , inProgress , draftRepair, waitApprove, done , cancel
  // emerygencyStatus , normal , emergency, rushing
  return (
    <>
      {props.data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`grid grid-cols-12 gap-2 h-12 pt-2 p-2 text-xs text-center items-center border-b-[1px] border-border-gray-table bg-white`}
          >
            <div className="col-span-1">{item.informRepairDate}</div>
            <div className="col-span-2">{item.informRepairIdDoc}</div>
            <div className="col-span-1 ">{item.assetIdCode}</div>
            <div className="col-span-3">{item.repairDetail}</div>
            <div className="col-span-1">{item.agencySendRepair}</div>
            <div className="col-span-1 flex justify-center">
              <div
                //   type="button"
                // to={`/borrowSaving/${ID}`}
                onClick={() => handleClick(item.emerygencyStatus)}
                className={`${
                  item.emerygencyStatus === 'normal'
                    ? 'bg-blue-600 text-white rounded-full '
                    : item.emerygencyStatus === 'rushing'
                    ? 'bg-[#F2994A] text-white  rounded-full'
                    : item.emerygencyStatus === 'emergency'
                    ? 'bg-red-700 text-white  rounded-full'
                    : 'bg-red-200 text-red-600 rounded-full '
                } border border-spacing-5 p-2 w-[80px]`}
              >
                {item.emerygencyStatus === 'normal'
                  ? 'ปกติ'
                  : item.emerygencyStatus === 'rushing'
                  ? 'เร่งด่วน'
                  : item.emerygencyStatus === 'emergency'
                  ? 'ฉุกเฉิน'
                  : 'ยกเลิก'}
              </div>
            </div>
            <div className="col-span-1 flex justify-center">
              <div
                //   type="button"
                // to={`/borrowSaving/${ID}`}
                onClick={() => handleClick(item.technicianStatus)}
                className={`${
                  item.technicianStatus === 'waitTechnicianConfirm'
                    ? 'bg-[#245BD826] text-blue-600 rounded-full '
                    : item.technicianStatus === 'inProgress'
                    ? 'bg-purple-600  text-white rounded-full'
                    : item.technicianStatus === 'waitApprove'
                    ? ' bg-[#F2C94C]  rounded-full'
                    : item.technicianStatus === 'waitRecord'
                    ? ' bg-[#F2994A26] text-[#F2994A] rounded-full'
                    : item.technicianStatus === 'done'
                    ? 'bg-sidebar-green text-text-green  rounded-full  '
                    : 'bg-red-200 text-red-600 rounded-full '
                }  border p-2 w-[100px]`}
              >
                {item.technicianStatus === 'waitTechnicianConfirm'
                  ? 'รอช่างรับงาน'
                  : item.technicianStatus === 'inProgress'
                  ? 'ดำเนินการ'
                  : item.technicianStatus === 'waitApprove'
                  ? 'รออนุมัติ'
                  : item.technicianStatus === 'waitRecord'
                  ? 'รอลงบันทึก'
                  : item.technicianStatus === 'done'
                  ? 'เสร็จสิ้น'
                  : 'ยกเลิก'}
              </div>
            </div>
            {item.technicianStatus === 'waitTechnicianConfirm' ? (
              <ActionWaitTechnicalConfirm />
            ) : item.technicianStatus === 'waitRecord' ? (
              <ActionWaitRecord />
            ) : item.technicianStatus === 'inProgress' ? (
              <ActionInProgress />
            ) : item.technicianStatus === 'waitApprove' ? (
              <ActionWaitApprove />
            ) : item.technicianStatus === 'done' ? (
              <ActionDone />
            ) : (
              <ActionCancel />
            )}
          </div>
        )
      })}
    </>
  )
}

const ModalCancel = () => {
  const [showModal, setShowModal] = useState(false)

  const callback = (payload) => {
    setAllReject(payload)
  }
  return (
    <>
      <button
        className=" gap-2 border-[1px] border-button-red  focus:border-transparent shadow-sm text-sm font-medium  text-button-red hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  h-[31px] w-[80px] flex justify-center items-center rounded-md"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.10002 8.3998L2.20002 13.2998C2.01669 13.4831 1.78336 13.5748 1.50002 13.5748C1.21669 13.5748 0.983357 13.4831 0.800024 13.2998C0.616691 13.1165 0.525024 12.8831 0.525024 12.5998C0.525024 12.3165 0.616691 12.0831 0.800024 11.8998L5.70002 6.9998L0.800024 2.0998C0.616691 1.91647 0.525024 1.68314 0.525024 1.3998C0.525024 1.11647 0.616691 0.883138 0.800024 0.699804C0.983357 0.516471 1.21669 0.424805 1.50002 0.424805C1.78336 0.424805 2.01669 0.516471 2.20002 0.699804L7.10002 5.5998L12 0.699804C12.1834 0.516471 12.4167 0.424805 12.7 0.424805C12.9834 0.424805 13.2167 0.516471 13.4 0.699804C13.5834 0.883138 13.675 1.11647 13.675 1.3998C13.675 1.68314 13.5834 1.91647 13.4 2.0998L8.50002 6.9998L13.4 11.8998C13.5834 12.0831 13.675 12.3165 13.675 12.5998C13.675 12.8831 13.5834 13.1165 13.4 13.2998C13.2167 13.4831 12.9834 13.5748 12.7 13.5748C12.4167 13.5748 12.1834 13.4831 12 13.2998L7.10002 8.3998Z"
            fill="#CE4646"
          />
        </svg>
        <h1>ยกเลิก</h1>
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 -left-10 bg-black opacity-50" />
          <div className="flex justify-center items-center overflow-y-auto fixed top-0 pt-[15vh] md:pt-0 bottom-0 left-0 z-40 md:inset-0 md:w-screen">
            <div className="w-10/12 md:w-7/12 max-w-[1040px] border border-white shadow-md rounded-xl ">
              <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
                {/* ยกเลิกการแจ้งซ่อม */}
                <div>
                  {/* header*/}
                  <div className="flex justify-center items-center gap-5 p-5 ">
                    <svg
                      width="84"
                      height="84"
                      viewBox="0 0 84 84"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.0001 0.333984C39.9167 0.333984 37.8334 1.12565 36.1251 2.79232L2.79175 36.1256C-0.499919 39.3756 -0.499919 44.6256 2.79175 47.8756L36.1251 81.209C39.3751 84.5006 44.6251 84.5006 47.8751 81.209L81.2084 47.8756C84.5001 44.6256 84.5001 39.3756 81.2084 36.1256L47.8751 2.79232C46.1667 1.12565 44.0834 0.333984 42.0001 0.333984ZM37.8334 21.1673H46.1667V46.1673H37.8334V21.1673ZM37.8334 54.5006H46.1667V62.834H37.8334V54.5006Z"
                        fill="#EB5757"
                      />
                    </svg>
                    <h1 className="text-2xl text-red-700">ยกเลิกการแจ้งซ่อม</h1>
                  </div>
                  {/* ข้อมูลผู้เกี่ยวข้อง */}
                  <div className="p-6 text-base">
                    {/* row 1 เลขที่ใบแจ้งซ่อม */}
                    <div className="grid grid-cols-2  md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center ">
                        เลขที่ใบแจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {'mnt-0308/65-002'}
                      </div>
                      <div className="text-text-gray flex items-center ">
                        เวลาที่แจ้งซ่อม
                      </div>
                      <div className="flex items-center ">
                        {'18/03/2566 , 09.42 น.'}
                      </div>
                    </div>
                    {/* row 2 ผู้ประสานงาน */}
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        ผู้ประสานงาน
                      </div>
                      <div className="flex items-center">
                        {'เมตตา ดวงรุ่งเรืองโรจน์'}
                      </div>
                      <div className="text-text-gray flex items-center">
                        หน่วยงาน
                      </div>
                      <div className="flex items-center">
                        {'กองงานบัญชีกลาง'}
                      </div>
                    </div>
                    {/* สาเหตุที่ยกเลิก */}
                    <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                      <div className="text-text-gray flex items-center">
                        สาเหตุที่ยกเลิก
                      </div>
                      <textarea className="col-span-3 border-[1px] p-2 h-[38px] w-10/12 text-xs sm:text-sm border-gray-300 rounded-md focus:border-1 focus:outline-none  focus:border-focus-blue"></textarea>
                    </div>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center gap-5 justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="px-10 py-3 border-[1px] shadow-sm rounded-md "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ย้อนกลับ
                  </button>
                  <Link
                    to="/borrowList"
                    className="text-white bg-red-600 px-10 py-3 border rounded-md "
                    // type="button"
                    onClick={() => setShowModal(false)}
                  >
                    ยืนยันยกเลิก
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

const ActionWaitTechnicalConfirm = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <Link
          to="repairTechnicianDetail"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-[100px]"
        >
          รับงาน
        </Link>
        <div className=" border-[1px] border-text-green hover:bg-green-800 flex items-center p-2 rounded-lg">
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 9.1569C8.83787 9.1569 9.54915 8.86471 10.1335 8.28034C10.7179 7.69596 11.0101 6.98468 11.0101 6.14648C11.0101 5.30829 10.7179 4.59701 10.1335 4.01263C9.54915 3.42826 8.83787 3.13607 7.99967 3.13607C7.16148 3.13607 6.4502 3.42826 5.86582 4.01263C5.28145 4.59701 4.98926 5.30829 4.98926 6.14648C4.98926 6.98468 5.28145 7.69596 5.86582 8.28034C6.4502 8.86471 7.16148 9.1569 7.99967 9.1569ZM7.99967 8.12982C7.44481 8.12982 6.97554 7.93798 6.59186 7.5543C6.20818 7.17062 6.01634 6.70135 6.01634 6.14648C6.01634 5.59162 6.20818 5.12235 6.59186 4.73867C6.97554 4.35499 7.44481 4.16315 7.99967 4.16315C8.55453 4.16315 9.02381 4.35499 9.40749 4.73867C9.79117 5.12235 9.98301 5.59162 9.98301 6.14648C9.98301 6.70135 9.79117 7.17062 9.40749 7.5543C9.02381 7.93798 8.55453 8.12982 7.99967 8.12982ZM7.99967 11.459C6.27606 11.459 4.71773 10.9691 3.32467 9.98919C1.93162 9.00933 0.89273 7.72843 0.208008 6.14648C0.89273 4.56454 1.93162 3.28364 3.32467 2.30378C4.71773 1.32391 6.27606 0.833984 7.99967 0.833984C9.72329 0.833984 11.2816 1.32391 12.6747 2.30378C14.0677 3.28364 15.1066 4.56454 15.7913 6.14648C15.1066 7.72843 14.0677 9.00933 12.6747 9.98919C11.2816 10.9691 9.72329 11.459 7.99967 11.459Z"
              fill="#38821D"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

const ActionWaitRecord = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <button
          type="button"
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg w-[100px]"
        >
          ลงบันทึก
        </button>
        <button
          type="button"
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg w-[100px]"
        >
          จ้างซ่อมภายนอก
        </button>
      </div>
    </>
  )
}

const ActionInProgress = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <button
          type="button"
          className="border hover:bg-[#245BD826]  border-[#2F80ED] text-[#2F80ED] p-2 rounded-lg w-[120px]"
        >
          ปิดงาน
        </button>
      </div>
    </>
  )
}

const ActionWaitApprove = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <Link
          to="repairTechnicianRecord"
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg w-[100px]"
        >
          ลงบันทึก
        </Link>
        <button
          type="button"
          className="bg-text-green border-text-green hover:bg-green-800 text-white p-2 rounded-lg w-[100px]"
        >
          จ้างซ่อมภายนอก
        </button>
      </div>
    </>
  )
}

const ActionDone = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <button
          type="button"
          className="flex gap-2 items-center hover:bg-green-100 border border-text-green text-text-green p-2 rounded-lg w-[120px]"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 9.1569C8.83787 9.1569 9.54915 8.86471 10.1335 8.28034C10.7179 7.69596 11.0101 6.98468 11.0101 6.14648C11.0101 5.30829 10.7179 4.59701 10.1335 4.01263C9.54915 3.42826 8.83787 3.13607 7.99967 3.13607C7.16148 3.13607 6.4502 3.42826 5.86582 4.01263C5.28145 4.59701 4.98926 5.30829 4.98926 6.14648C4.98926 6.98468 5.28145 7.69596 5.86582 8.28034C6.4502 8.86471 7.16148 9.1569 7.99967 9.1569ZM7.99967 8.12982C7.44481 8.12982 6.97554 7.93798 6.59186 7.5543C6.20818 7.17062 6.01634 6.70135 6.01634 6.14648C6.01634 5.59162 6.20818 5.12235 6.59186 4.73867C6.97554 4.35499 7.44481 4.16315 7.99967 4.16315C8.55453 4.16315 9.02381 4.35499 9.40749 4.73867C9.79117 5.12235 9.98301 5.59162 9.98301 6.14648C9.98301 6.70135 9.79117 7.17062 9.40749 7.5543C9.02381 7.93798 8.55453 8.12982 7.99967 8.12982ZM7.99967 11.459C6.27606 11.459 4.71773 10.9691 3.32467 9.98919C1.93162 9.00933 0.89273 7.72843 0.208008 6.14648C0.89273 4.56454 1.93162 3.28364 3.32467 2.30378C4.71773 1.32391 6.27606 0.833984 7.99967 0.833984C9.72329 0.833984 11.2816 1.32391 12.6747 2.30378C14.0677 3.28364 15.1066 4.56454 15.7913 6.14648C15.1066 7.72843 14.0677 9.00933 12.6747 9.98919C11.2816 10.9691 9.72329 11.459 7.99967 11.459Z"
              fill="#38821D"
            />
          </svg>
          ดูรายละเอียด
        </button>
      </div>
    </>
  )
}

const ActionCancel = () => {
  return (
    <>
      <div className="col-span-2 flex justify-center gap-2">
        <button
          type="button"
          className="flex gap-2 items-center hover:bg-green-100 border border-text-green text-text-green p-2 rounded-lg w-[120px]"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 9.1569C8.83787 9.1569 9.54915 8.86471 10.1335 8.28034C10.7179 7.69596 11.0101 6.98468 11.0101 6.14648C11.0101 5.30829 10.7179 4.59701 10.1335 4.01263C9.54915 3.42826 8.83787 3.13607 7.99967 3.13607C7.16148 3.13607 6.4502 3.42826 5.86582 4.01263C5.28145 4.59701 4.98926 5.30829 4.98926 6.14648C4.98926 6.98468 5.28145 7.69596 5.86582 8.28034C6.4502 8.86471 7.16148 9.1569 7.99967 9.1569ZM7.99967 8.12982C7.44481 8.12982 6.97554 7.93798 6.59186 7.5543C6.20818 7.17062 6.01634 6.70135 6.01634 6.14648C6.01634 5.59162 6.20818 5.12235 6.59186 4.73867C6.97554 4.35499 7.44481 4.16315 7.99967 4.16315C8.55453 4.16315 9.02381 4.35499 9.40749 4.73867C9.79117 5.12235 9.98301 5.59162 9.98301 6.14648C9.98301 6.70135 9.79117 7.17062 9.40749 7.5543C9.02381 7.93798 8.55453 8.12982 7.99967 8.12982ZM7.99967 11.459C6.27606 11.459 4.71773 10.9691 3.32467 9.98919C1.93162 9.00933 0.89273 7.72843 0.208008 6.14648C0.89273 4.56454 1.93162 3.28364 3.32467 2.30378C4.71773 1.32391 6.27606 0.833984 7.99967 0.833984C9.72329 0.833984 11.2816 1.32391 12.6747 2.30378C14.0677 3.28364 15.1066 4.56454 15.7913 6.14648C15.1066 7.72843 14.0677 9.00933 12.6747 9.98919C11.2816 10.9691 9.72329 11.459 7.99967 11.459Z"
              fill="#38821D"
            />
          </svg>
          ดูรายละเอียด
        </button>
      </div>
    </>
  )
}
export default RepairTechnicianIndex
