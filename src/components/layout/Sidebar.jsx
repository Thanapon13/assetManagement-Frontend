import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from '../../router/SidebarData'
import { IconContext } from 'react-icons/lib'
import SubMenu from './SubMenu'

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  
  const [showSubMenu, setShowSubMenu] = useState(false)
  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        {/* navbar */}
        <Link to="#" className="ml-8 text-2xl">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        {/* menu */}
        <nav
          className={`absolute z-10 ${
            sidebar ? 'left-0 ' : '-left-full '
          } w-[250px]  bg-white h-screen fixed top-0 duration-300 overflow-auto scrollbar`}
        >
          <ul>
            <li className="mt-2.5 bg-white flex items-center ml-6 hover:bg-gray-200 rounded-full w-fit p-2">
              <Link to="#" className="text-xl">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} setSidebar={setSidebar} />
            })}
          </ul>
        </nav>
        <div className={`fixed top-0 right-0 bottom-0 left-0 bg-gray-400/[.2] ${sidebar ? "" : "hidden"}`}
          onClick={() => setSidebar(false)}
        />
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
