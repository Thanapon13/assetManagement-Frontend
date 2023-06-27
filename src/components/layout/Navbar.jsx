import React from 'react'
import DropdownProfile from './DropdownProfile'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    <div className="h-[56px] bg-text-green flex justify-between items-center sticky md:static top-0 z-50 ">
      <div className=" bg-slate-200 h-[56px] items-center hidden md:flex">
        Logo
      </div>
      <div className="flex md:hidden">
        <Sidebar />
      </div>
      <DropdownProfile />
    </div>
  )
}

export default Navbar
