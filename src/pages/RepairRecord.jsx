import React from 'react'
import { Link } from 'react-router-dom'
import Selector from '../components/selector/Selector'

const RepairRecord = () => {
  return (
    <>
      <div className="bg-background-page pt-5 p-3">
        {/* Header */}
        <div>
          {/* เพิ่มการซ่อมบำรุง */}
          <div className="text-2xl text-text-green flex items-center space-x-5 ">
            <h1>เพิ่มการซ่อมบำรุง</h1>
          </div>
          {/* navigate link */}
          <div className="flex pt-3">
            {/* left home */}
            <div className="flex text-xs">
              <Link
                to="/"
                className=" text-text-green underline text-xs focus:text-sky-700 focus:underline mr-2"
              >
                Home
              </Link>
              <div className="text-text-gray">/</div>
              <div className="text-text-gray ml-2">เพิ่มการซ่อมบำรุง</div>
            </div>
          </div>
          {/* status */}
          <div className="flex justify-end gap-5"></div>
        </div>
        {/* Body 1 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          {/* ข้อมูลครุภัณฑ์ */}
          <div>
            <div className="text-xl">ข้อมูลครุภัณฑ์</div>
            {/* row 1 เลขที่ใบแจ้งซ่อม */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                เลขที่ใบแจ้งซ่อม
              </div>
              <div className="flex items-center ">{'mnt-0308/65-002'}</div>
              <div className="text-text-gray flex items-center ">
                สถานะความเร่งด่วน
              </div>
              <div className="flex items-center gap-5">
                <input type="radio" className="border border-text-green p-2" />
                <label>ปกติ</label>
                <input type="radio" className="border border-text-green p-2" />
                <label>เร่งด่วน</label>
                <input type="radio" className="border border-text-green p-2" />
                <label>ฉุกเฉิน</label>
              </div>
            </div>
            {/* row 2 เวลาที่แจ้งซ่อม*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เวลาที่แจ้งซ่อม
              </div>
              <div className="flex items-center">{'09/09/2565 , 12:30'}</div>
              <div className="text-text-gray flex items-center">
                เลขครุภัณฑ์
              </div>
              <div className="flex items-center gap-5">
                <Selector placeholder={'เลขครุภัณฑ์'} />
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.66667 3.66667H9.16667V9.16667H3.66667V3.66667ZM18.3333 3.66667V9.16667H12.8333V3.66667H18.3333ZM12.8333 13.75H14.6667V11.9167H12.8333V10.0833H14.6667V11.9167H16.5V10.0833H18.3333V11.9167H16.5V13.75H18.3333V16.5H16.5V18.3333H14.6667V16.5H11.9167V18.3333H10.0833V14.6667H12.8333V13.75ZM14.6667 13.75V16.5H16.5V13.75H14.6667ZM3.66667 18.3333V12.8333H9.16667V18.3333H3.66667ZM5.5 5.5V7.33333H7.33333V5.5H5.5ZM14.6667 5.5V7.33333H16.5V5.5H14.6667ZM5.5 14.6667V16.5H7.33333V14.6667H5.5ZM3.66667 10.0833H5.5V11.9167H3.66667V10.0833ZM8.25 10.0833H11.9167V13.75H10.0833V11.9167H8.25V10.0833ZM10.0833 5.5H11.9167V9.16667H10.0833V5.5ZM1.83333 1.83333V5.5H0V1.83333C0 1.3471 0.193154 0.880788 0.536971 0.536971C0.880788 0.193154 1.3471 0 1.83333 0L5.5 0V1.83333H1.83333ZM20.1667 0C20.6529 0 21.1192 0.193154 21.463 0.536971C21.8068 0.880788 22 1.3471 22 1.83333V5.5H20.1667V1.83333H16.5V0H20.1667ZM1.83333 16.5V20.1667H5.5V22H1.83333C1.3471 22 0.880788 21.8068 0.536971 21.463C0.193154 21.1192 0 20.6529 0 20.1667V16.5H1.83333ZM20.1667 20.1667V16.5H22V20.1667C22 20.6529 21.8068 21.1192 21.463 21.463C21.1192 21.8068 20.6529 22 20.1667 22H16.5V20.1667H20.1667Z"
                    fill="#38821D"
                  />
                </svg>
              </div>
            </div>
            {/* row 3 อยู่ในประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                อยู่ในประกัน
              </div>
              <div className="flex items-center text-text-green">
                {'อยู่ในประกัน'}
              </div>
              <div className="text-text-gray flex items-center">
                รหัสกลุ่มครุภัณฑ์
              </div>
              <div className="flex items-center">{'1326766-331'}</div>
            </div>
            {/* row 4 เจ้าของครุภัณฑ์*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                เจ้าของครุภัณฑ์
              </div>
              <div className="flex items-center">{'กองคลังหลัก'}</div>
              <div className="text-text-gray flex items-center">
                ชื่อครุภัณฑ์
              </div>
              <div className="flex items-center">
                {'พัดลม hatari แบบหมุนโคจรติดเพดาน'}
              </div>
            </div>
            {/* row 5 วันที่เริ่มรับประกัน*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                วันที่เริ่มรับประกัน
              </div>
              <div className="flex items-center">{'10/08/2565'}</div>
              <div className="text-text-gray flex items-center">
                วันที่สิ้นสุดการรับประกัน
              </div>
              <div className="flex items-center">{'09/08/2566'}</div>
            </div>
            {/* row 6 รหัส cost center*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                รหัส cost center
              </div>
              <div className="flex items-center">{'000123'}</div>
              <div className="text-text-gray flex items-center">สท.01</div>
              <div className="flex items-center">{'-'}</div>
            </div>
          </div>
          {/* ข้อมูลสถานที่ซ่อม */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลสถานที่ซ่อม</div>
            {/* row 1 ที่ตั้ง/อาคาร */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ที่ตั้ง/อาคาร
              </div>
              <div className="flex items-center w-[200px] h-[38px]">
                <Selector placeholder={'Selector'} />
              </div>
              <div className="text-text-gray flex items-center ">ชั้น</div>
              <div className="flex items-center ">
                <input
                  type="text"
                  className=" border-[1px] w-full h-[38px] border-gray-300 rounded-md"
                  placeholder="Example"
                />
              </div>
            </div>
            {/* row 2 ห้อง */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">ห้อง</div>
              <div className="flex items-center">
                <input
                  type="text"
                  className=" border-[1px] w-[200px] h-[38px]  border-gray-300 rounded-md"
                  placeholder="Example"
                />
              </div>
            </div>
          </div>
          {/* ข้อมูลผู้เกี่ยวข้อง */}
          <div className="pt-5">
            <div className="text-xl">ข้อมูลผู้เกี่ยวข้อง</div>
            {/* row 1 ผู้ส่งซ่อม */}
            <div className="grid grid-cols-2  md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center ">
                ผู้ส่งซ่อม
              </div>
              <div className="flex items-center w-[200px]">
                <Selector placeholder={'ผู้ส่งซ่อม'} />
              </div>
              <div className="text-text-gray flex items-center ">
                เบอร์โทรศัพท์
              </div>
              <div className="flex items-center p-2 bg-table-data border-[2px] rounded-md ">
                {'098-7654321'}
              </div>
            </div>
            {/* row 2 ผู้ประสานงาน */}
            <div className="grid grid-cols-2 md:grid-cols-5 p-2">
              <div className="text-text-gray flex items-center">
                ผู้ประสานงาน
              </div>
              <div className="flex items-center w-[200px]">
                <Selector placeholder={'ผู้ประสานงาน'} />
              </div>
              <div className="text-text-gray flex items-center">หน่วยงาน</div>

              <div className="flex items-center p-2 bg-table-data border-[2px] rounded-md ">
                {'กองงานบัญชีกลาง'}
              </div>
            </div>
          </div>
        </div>
        {/* Body 2 */}
        <div className="bg-white border-[1px] p-4 rounded-lg shadow-sm text-sm mt-2">
          <h1 className="text-xl">รายละเอียดการซ่อม</h1>
          {/* row 1 ประเทภการซ่อม */}
          <div className="grid grid-cols-5 pt-5">
            <div className="col-span-1 flex items-center">ประเทภการซ่อม</div>
            <div className=" col-span-3 flex items-center gap-5">
              <input type="radio" className="border border-text-green p-2" />
              <label>โครงการ</label>
              <input type="radio" className="border border-text-green p-2" />
              <label>คอมพิวเตอร์</label>
              <input type="radio" className="border border-text-green p-2" />
              <label>เครื่องมือแพทย์</label>
            </div>
          </div>
          {/* row 2 หน่วยงาน */}
          <div className="grid grid-cols-5 pt-5">
            <div className="col-span-1 flex items-center">หน่วยงานซ่อม</div>
            <div className=" col-span-3 flex items-center">
              <Selector placeholder={'Select'} />
            </div>
          </div>
          {/* row 3 ส่วนที่ชำรุดหรือเหตุขัดข้อง */}
          <div className="grid grid-cols-5 pt-5">
            <div className="col-span-1 flex items-center">
              ส่วนที่ชำรุดหรือเหตุขัดข้อง
            </div>
            <div className=" col-span-3 flex items-center">
              <textarea className="border-[1px] border-gray-300 w-full rounded-md"></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="border-t-[1px] p-6 flex justify-between">
        <button className="text-text-gray px-4 py-2 border-[1px] rounded-md hover:text-black">
          ยกเลิก
        </button>
        <div className="flex gap-10">
          <button className="px-4 py-2 border-[1px] border-text-green text-text-green rounded-md hover:bg-green-100">
            บันทึกแบบร่าง
          </button>
          <button className="px-4 py-2 border-[1px] bg-text-green border-text-green text-white rounded-md hover:bg-green-800">
            บันทึกแจ้งซ่อม
          </button>
        </div>
      </div>
    </>
  )
}

export default RepairRecord
