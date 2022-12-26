import React from 'react'
import { DropdownProfile } from './DropdownProfile'
import Sidebar from './Sidebar'

export const Navbar = ({ children }) => {
  return (
    <div className="">
      <div className="h-[56px] bg-text-green flex justify-between sm:justify-end items-center ">
        <div className="flex sm:hidden">
          <Sidebar />
        </div>
        <DropdownProfile />
      </div>
      <main className="sm:hidden">{children}</main>
    </div>
  )
}

export default Navbar
