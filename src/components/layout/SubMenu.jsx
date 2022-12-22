import React, { useState } from 'react'
import * as RiIcons from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export const SubMenu = ({ item, isOpen }) => {
  return (
    <div className="">
      {item.menu.map((child, index) => (
        <SubMenu key={index} item={child} />
      ))}
      {/* <div className={isOpen ? 'w-full p-4' : 'hidden'}>
        {item.submenu.map((val, idx) => (
          <NavLink
            to={val.path}
            key={idx}
            className={({ isActive }) =>
              [
                'flex items-center gap-2 py-3 rounded-lg hover:bg-yellow-100',
                isActive ? 'bg-sidebar-green' : null,
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <div className="text-xl">{val.icon}</div>
            <div className="">{val.name}</div>
          </NavLink>
        ))}
      </div> */}
    </div>
  )
}
