import React from 'react'
import Sidebar from './Sidebar'

export const Navbar = ({ children }) => {
  return (
    <div className="">
      <div className="h-[56px] bg-text-green flex items-center ">
        <div className="flex sm:hidden">
          <Sidebar />
        </div>
      </div>
      <main className="sm:hidden">{children}</main>
    </div>
  )
}

export default Navbar
