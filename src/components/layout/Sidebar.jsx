import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { MdSpaceDashboard, MdHomeRepairService } from 'react-icons/md'
import { FiChevronsRight } from 'react-icons/fi'
import { GoFileDirectory, GoFileSubmodule } from 'react-icons/go'
import { TfiPackage, TfiExchangeVertical } from 'react-icons/tfi'
import { TbTransferIn } from 'react-icons/tb'

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const menuItem = [
    {
      path: '/',
      name: 'แดชบอร์ด',
      icon: <MdSpaceDashboard />,
    },
    {
      path: '/assetInformation',
      name: 'ข้อมูลครุภัณฑ์',
      icon: <GoFileDirectory />,
    },
    {
      path: '/assetGroup',
      name: 'ข้อมูลครุภัณฑ์เป็นชุด',
      icon: <GoFileSubmodule />,
    },
    {
      path: '/assetWithdraw',
      name: 'เบิกครุภัณฑ์',
      icon: <TfiPackage />,
    },
    {
      path: '/borrowList',
      name: 'ยืม-คืน ครุภัณฑ์',
      icon: <TfiExchangeVertical />,
    },
    {
      path: '/transferAsset',
      name: 'โอน-ย้าย ครุภัณฑ์',
      icon: <TbTransferIn />,
    },
    {
      path: '/repairDashboard',
      name: 'งานซ่อม',
      icon: <MdHomeRepairService />,
    },
  ]
  return (
    // container
    <div className="flex">
      {/* sidebar */}
      <div
        className={`${
          isOpen
            ? ` w-2/12 sm:min-w-max h-screen `
            : `w-min h-[70px] sm:h-screen`
        } bg-slate-200 transition-all ease-in-out duration-500`}
      >
        {/* top section */}
        <div className="flex justify-center p-[30px]">
          <h1
            className={`${
              isOpen ? `hidden sm:block` : `hidden`
            } font-bold text-xl`}
          >
            Logo
          </h1>
          <div className={`${isOpen ? `block` : `-ml-5`} text-2xl ml-auto`}>
            <FaBars
              onClick={toggle}
              className={`${
                isOpen ? `block` : `hidden`
              } transition-all ease-in-out duration-500 hover:bg-slate-500`}
            />
            <FiChevronsRight
              onClick={toggle}
              className={`${
                isOpen ? `hidden` : `block`
              } transition-all ease-in-out duration-500 hover:bg-slate-500`}
            />
          </div>
        </div>
        {/* menu */}
        <div className={`${isOpen ? `block` : `hidden sm:block`} `}>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                [
                  'flex p-[15px] items-center gap-2 rounded-lg transition-all ease-in-out duration-500 hover:bg-sidebar-green',
                  isActive ? 'bg-sidebar-green' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <div className="text-3xl">{item.icon}</div>
              <div className={`${isOpen ? `hidden sm:block` : `hidden`}`}>
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className="">{children}</main>
    </div>
  )
}

export default Sidebar
