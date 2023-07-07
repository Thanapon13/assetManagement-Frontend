import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {
  const [tab, setTab] = useState(1)
  const [data, setData] = useState()

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
      .join("&");
    return params;
  }

  async function getDashboardAsset() {
    const res = await axios.get(`/dashboard/searchAsset`)
    console.log(res.data)
    setData(res.data)
  }
  async function getDashboardRepair() {
    const res = await axios.get(`/dashboard/searchRepair`)
    console.log(res.data)
    setData(res.data)
  }
  // axios.get(`/dashboard/searchAsset?${getQueryString()}`);
  useEffect(() => {
    if (tab == 1) getDashboardAsset()
    if (tab == 2) getDashboardRepair()
  }, [tab])

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  return (
    // <div className="flex justify-center items-center h-[90vh] bg-gray-100 text-black text-5xl">
    <div className="bg-background-page px-3 py-10 min-h-full">
      <div className="text-xl text-text-green ">ระบบบริหารงานทรัพย์สิน</div>
      <div className='bg-white rounded-md mt-5 px-5 shadow-md'>
        <button className={`p-5 ${tab == 1 && 'bg-text-green/[.15] border-b-[3px]'} border-text-green hover:border-b-[3px]`}
          value={1}
          onClick={e => setTab(e.target.value)}>
          งานบริหารทรัพย์สิน
        </button>
        <button className={`p-5 min-w-[7em] ${tab == 2 && 'bg-text-green/[.15] border-b-[3px]'} ml-2.5 border-text-green hover:border-b-[3px]`}
          onClick={e => setTab(e.target.value)}
          value={2}>
          งานซ่อม
        </button>
      </div>
      {tab == 1 &&
        <div className='grid grid-cols-3 gap-2 mt-3'>
          <div className='bg-white rounded-md p-5'>
            <p>จำนวนครุภัณฑ์ทั้งหมด</p>
            <p className="text-xl text-text-green  py-1.5">{data?.total || 0}</p>
            <p className='text-sm text-text-gray'>
              ข้อมูลวันที่ {new Date().toLocaleDateString('th')}
            </p>
          </div>

          <div className='bg-white rounded-md p-5 col-span-2'>
            จำนวนครุภัณฑ์ทั้งหมดแบ่งตามหมวด

            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center mt-8 mb-3 ">
              <div className="text-xs font-semibold text-center">ตัวกรอง</div>
              <div className="md:col-span-3 flex items-center">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}

                >
                  <option value="assetNumber">ID</option>
                </select>
              </div>

              <div className="md:col-span-4  h-[38px] relative">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}
                >
                  <option value="assetNumber">เลขครุภัณฑ์</option>
                </select>
              </div>
              <div></div>
              <div className="md:col-span-3 flex items-center">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}

                >
                  <option value="assetNumber">หน่วยงาน</option>
                </select>
              </div>

              <div className="md:col-span-2  h-[38px] relative">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}
                >
                  <option value="assetNumber">ช่วงราคา</option>
                </select>
              </div>
              <div className="md:col-span-2  h-[38px] relative">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}
                >
                  <option value="assetNumber">เลข PO</option>
                </select>
              </div>
            </div>

            <div className='overflow-x-auto scrollbar'>
              <table className='text-sm w-full table-fixed min-w-[600px]'>
                <thead className='bg-border-gray-table text-center border-b'>
                  <th className='py-3'>ลำดับครุภัณฑ์ (ID)</th>
                  <th>เลขครุภัณฑ์</th>
                  <th>หน่วยงาน</th>
                  <th>เลข PO</th>
                  <th>ราคา</th>
                </thead>
                <tbody>
                  {data?.asset?.map((ele, ind) => (
                    <tr key={ind} className='border-b'>
                      <td className='text-center py-2'>{ele.realAssetId}</td>
                      <td className='py-2 overflow-hidden text-ellipsis'>{ele.assetNumber}</td>
                      <td>{ele.sector}</td>
                      <td>{ele.sector}</td>
                      <td className='text-center'>{ele.pricePerUnit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      }
      {tab == 2 &&
        <div className='grid grid-cols-3 gap-2 mt-3'>
          <div>
            <div className='bg-white rounded-md p-5'>
              <p>จำนวนครุภัณฑ์ทั้งหมด</p>
              <p className="text-xl text-text-green py-1.5">{data?.total || 0}</p>
              <p className='text-sm text-text-gray'>
                ข้อมูลวันที่ {new Date().toLocaleDateString('th')}
              </p>
            </div>

            <div className='bg-white rounded-md p-5'>
              รายละเอียดงานซ่อม
              <div>
                <input
                  type="checkbox"
                  // checked={row.checked}
                  // onChange={() => handleCheckboxChange(data.subComponentTransfer,index)}
                  className="text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <label> ทั้งหมด</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  // checked={row.checked}
                  // onChange={() => handleCheckboxChange(data.subComponentTransfer,index)}
                  className="text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <label> โครงสร้าง</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  // checked={row.checked}
                  // onChange={() => handleCheckboxChange(data.subComponentTransfer,index)}
                  className="text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <label> ครุภัณฑ์</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  // checked={row.checked}
                  // onChange={() => handleCheckboxChange(data.subComponentTransfer,index)}
                  className="text-text-green rounded-md placeholder-text-green focus:ring-0"
                />
                <label> คอมพิวเตอร์</label>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-md p-5 col-span-2'>
            จำนวนครุภัณฑ์ทั้งหมดแบ่งตามหมวด

            <div className="grid grid-cols-1 md:grid-cols-9 gap-1.5 items-center mt-8 mb-3 ">
              <div className="text-xs font-semibold text-center">ตัวกรอง</div>
              <div className="md:col-span-2 flex items-center">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}

                >
                  <option value="assetNumber">เลขที่ใบแจ้งซ่อม</option>
                </select>
              </div>

              <div className="h-[38px] relative md:col-span-2">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}
                >
                  <option value="assetNumber">เลขครุภัณฑ์</option>
                </select>
              </div>
              <div className="flex items-center md:col-span-2">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}

                >
                  <option value="assetNumber">หน่วยงานที่ส่งซ่อม</option>
                </select>
              </div>

              <div className="md:col-span-2 h-[38px] relative">
                <select
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full"
                  name=""
                  onChange={handleChange}
                >
                  <option value="assetNumber">สถานะ</option>
                </select>
              </div>

            </div>

            <div className='overflow-x-auto scrollbar'>
              <table className='text-sm w-full table-fixed min-w-[600px]'>
                <thead className='bg-border-gray-table text-center border-b'>
                  <th>เลขที่ใบแจ้งซ่อม</th>
                  <th>เลขครุภัณฑ์</th>
                  <th className='py-3'>หน่วยงานที่ส่งซ่อม</th>
                  <th>รายละเอียด</th>
                  <th className='py-3'>สถานะความเร่งด่วน</th>
                </thead>
                <tbody>
                  {data?.repair?.map((ele, ind) => (
                    <tr key={ind} className='border-b'>
                      <td className='text-center py-2'>{ele.realAssetId}</td>
                      <td className='py-2 overflow-hidden text-ellipsis'>{ele.assetNumber}</td>
                      <td>{ele.repairSector}</td>
                      <td>{ele.problemDetail}</td>
                      <td className='text-center'>{ele.urgentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard
