import React from 'react'
import Sidebar from './Sidebar'

export const Navbar = ({ children }) => {
  return (
    <div className="">
      <div className="h-[56px] bg-text-green flex items-center">
        <Sidebar />
      </div>
      <main className="">{children}</main>
    </div>
  )
}

export default Navbar
