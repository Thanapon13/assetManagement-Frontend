import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons/lib'
import SubMenu from './SubMenu'

const Sidebar = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        {/* navbar */}
        <Link to="#" className="ml-8 text-2xl">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        {/* menu */}
        <nav
          className={`${
            sidebar ? 'left-0 ' : '-left-full '
          } w-[250px] z-10 bg-white h-screen fixed top-0 duration-300 overflow-auto`}
        >
          <ul>
            <li className="w-full h-[56px] bg-white flex items-center ml-8">
              <Link to="#" className="text-2xl">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />
            })}
          </ul>
        </nav>
        {/* <main className="">{children}</main> */}
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
