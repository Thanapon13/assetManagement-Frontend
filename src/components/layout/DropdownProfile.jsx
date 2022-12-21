import React, { useState } from 'react'
import * as RiIcons from 'react-icons/ri'
import profile from '../../assets/profile.png'

export const DropdownProfile = () => {
  const [isActive, setIsActive] = useState(false)

  const handleOnClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="inline-flex bg-transparent">
      <a
        href="#"
        className="px-1 py-1 rounded-full border-spacing-0 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 "
        // rounded-l-md
      >
        <img
          src={profile}
          width={50}
          height={30}
          className=" border-spacing-0 rounded-full"
        />
      </a>
      {/* dropdown toggle */}
      <div className="relative">
        <button
          type="button"
          onClick={handleOnClick}
          className="inline-flex items-center justify-center h-full px-1  hover:text-gray-700"
          // border-l border-gray-100 rounded-r-md
        >
          <RiIcons.RiArrowDropDownFill className="w-6 h-6 rounded-full text-white hover:text-black hover:bg-sidebar-green" />
        </button>
        {/* dropdown profile menu */}
        <div
          className={
            isActive
              ? 'absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg'
              : 'hidden'
          }
        >
          <div className="p-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Some Menu
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Some Menu
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Some Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
