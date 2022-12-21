import React, { useState } from 'react'
import * as RiIcons from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export const SubMenu = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)

  const showSubMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-red-100">
      <RiIcons.RiArrowDropDownFill onClick={showSubMenu} className={``} />
      <div className={isOpen ? 'w-full' : 'hidden '}>
        {item.submenu.map((val, idx) => (
          <NavLink
            to={val.path}
            key={idx}
            className={({ isActive }) =>
              [
                'flex items-center gap-2 rounded-lg hover:bg-sidebar-green',
                isActive ? 'bg-sidebar-green' : null,
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <div className="text-3xl">{val.icon}</div>
            <div className="">{val.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
