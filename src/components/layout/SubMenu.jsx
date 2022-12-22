import React, { useState } from 'react'
import * as RiIcons from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export const SubMenu = ({ item, show }, props) => {
  const [isOpen, setIsOpen] = useState(true)

  // const handleClick = () => {
  //   setIsOpen(show(!isOpen))
  // }

  // setIsOpen(show)
  // const handle = () => {
  //   props.callback(isOpen)
  // }

  return (
    <div className="flex ">
      <RiIcons.RiArrowDropDownFill
        className={isOpen ? 'rotate-180 text-2xl' : ' rotate-0 text-2xl'}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={isOpen ? 'w-full p-4 flex-col' : 'hidden  '}>
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
      </div>
    </div>
  )
}
