import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { menuItem } from './SidebarData'
import { DropdownProfile } from './DropdownProfile'
import { SubMenu } from './SubMenu'

export const Navbars = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const showSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <IconContext.Provider value={{ color: 'undefined' }}>
      <div className="flex items-center bg-green h-[80px] justify-between">
        <Link to="#" className="ml-8 text-3xl bg-transparent">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <DropdownProfile />
      </div>
      <nav
        className={
          isOpen
            ? 'flex justify-center fixed left-0 top-0 duration-500 bg-white w-[250px] h-screen'
            : '-left-full duration-700'
        }
      >
        <ul
          className={isOpen ? 'block w-full' : 'hidden '}
          // onClick={showSidebar}
        >
          <li
            className="bg-white w-full h-[80px] flex justify-start items-center"
            onClick={showSidebar}
          >
            <Link to="#" className="ml-8 text-3xl">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                [
                  'flex p-[15px] items-center gap-2 rounded-lg hover:bg-sidebar-green',
                  isActive ? 'bg-sidebar-green' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-row">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="">{item.name}</div>
                </div>
                {item.submenu ? <SubMenu key={index} item={item} /> : ''}
              </div>
            </NavLink>
          ))}
        </ul>
      </nav>
      <main className="">{children}</main>
    </IconContext.Provider>
  )
}

export default Navbars
