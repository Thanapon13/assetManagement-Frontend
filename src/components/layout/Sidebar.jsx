import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        <div className="h-[56px] flex  items-center">
          <Link to="#" className="flex  items-center text-black">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div
          className={`${
            sidebar ? 'left-0' : '-left-full '
          } w-[250px] text-gray-500 bg-green-100 h-screen flex justify-center fixed top-0 duration-300 z-10`}
        >
          <div className="w-full">
            <Link to="#" className="h-[56px]">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
