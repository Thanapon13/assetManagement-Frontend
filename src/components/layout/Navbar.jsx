import React from 'react'
import DropdownProfile from './DropdownProfile'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    <div className="">
      <div className="h-[56px] bg-text-green flex justify-between items-center ">
        <div className=" bg-slate-200 h-[56px] items-center hidden sm:flex">
          Logo
        </div>
        <div className="flex sm:hidden">
          <Sidebar />
        </div>
        <DropdownProfile />
      </div>
      {/* <main className="sm:hidden">{children}</main> */}
    </div>
  )
}

export default Navbar
