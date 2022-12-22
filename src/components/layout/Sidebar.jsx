import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

export const Sidebar = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        <div className="h-[56px] flex bg-text-green items-center">
          <Link to="#" className="ml-8 text-2xl">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          className={`${
            sidebar ? 'left-0 ' : '-left-full '
          } w-[250px] z-10 bg-white h-screen flex justify-center fixed top-0 duration-300`}
        >
          <ul>
            <li className="w-full h-[56px] bg-white">
              <Link to="#" className="text-2xl ml-8">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />
              })}
            </li>
          </ul>
        </nav>
        <main className="">{children}</main>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
