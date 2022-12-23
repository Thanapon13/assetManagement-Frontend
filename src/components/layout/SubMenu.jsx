import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false)

  const showSubnav = () => {
    setSubnav(!subnav)
  }

  return (
    <>
      {/* main menu */}
      <NavLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={({ isActive }) =>
          [
            'flex items-center p-4 h-[60px] rounded-lg hover:bg-sidebar-green',
            isActive ? 'bg-sidebar-green' : null,
          ]
            .filter(Boolean)
            .join(' ')
        }
      >
        <div className="flex w-full">
          <div>{item.icon}</div>
          <div className="ml-3">{item.title}</div>
        </div>
        <div className="">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
      {/* sub menu */}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 p-3 px-6 rounded-lg hover:bg-sidebar-green',
                  isActive ? 'bg-sidebar-green' : null,
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <div className="">{item.icon}</div>
              <div className=" ml-3">{item.title}</div>
            </NavLink>
          )
        })}
    </>
  )
}

export default SubMenu
