import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons/lib'
import SubMenu from './SubMenu'

export const LeftBar = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true)

  const handleShowMenu = () => setShowMenu(!showMenu)

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        {/* menu */}
        <div className="flex">
          <div
            className={`${
              showMenu ? 'left-0 ' : '-left-full '
            } w-[250px] bg-white h-screen duration-300 `}
          >
            <div>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />
              })}
            </div>
          </div>
          <main className="">{children}</main>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default LeftBar
