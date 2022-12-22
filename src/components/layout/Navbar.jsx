import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import { Link, NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { menuItem } from './SidebarData'
import { DropdownProfile } from './DropdownProfile'
import { SubMenu } from './SubMenu'

export const Navbars = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [showSubMenu, setShowSubMenu] = useState(true)

  const showSidebar = () => {
    setIsOpen(!isOpen)
  }

  const receiveDataFromChild = (dataFromChild) => {
    setShowSubMenu(dataFromChild)
  }
  return (
    <IconContext.Provider value={{ color: 'undefined' }}>
      <div className="flex items-center bg-text-green h-[56px] justify-between">
        <Link to="#" className="ml-8 text-2xl bg-transparent">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <DropdownProfile />
      </div>
      <nav
        className={
          isOpen
            ? 'flex justify-center fixed left-0 top-0 duration-500 bg-white w-[250px] h-screen overflow-auto'
            : '-left-full duration-700'
        }
      >
        <ul
          className={isOpen ? 'block w-full' : 'hidden '}
          // onClick={showSidebar}
        >
          <li
            className="bg-white w-full h-[56px] flex justify-start items-center"
            onClick={showSidebar}
          >
            <Link to="#" className="ml-8 text-2xl">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                [
                  'flex p-[15px] items-center gap-2 rounded-lg ',
                  isActive ? 'bg-sidebar-green ' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <div className="w-full">
                <div className="flex items-center gap-x-3 hover:bg-sidebar-green">
                  <div className="text-2xl">{item.icon}</div>
                  <div
                    className=""
                    onClick={() => setShowSubMenu(!showSubMenu)}
                  >
                    {item.name}
                  </div>
                  {/* {item.submenu ? (
                    <RiIcons.RiArrowDropDownFill
                      className={
                        showSubMenu
                          ? 'rotate-180 text-2xl'
                          : ' rotate-0 text-2xl'
                      }
                      onClick={() => setShowSubMenu(!showSubMenu)}
                    />
                  ) : (
                    ''
                  )} */}
                </div>
                {item.submenu ? (
                  <SubMenu
                    key={index}
                    item={item}
                    show={showSubMenu}
                    callback={receiveDataFromChild}
                  />
                ) : (
                  ''
                )}
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
