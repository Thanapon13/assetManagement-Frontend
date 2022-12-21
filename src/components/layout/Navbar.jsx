import React from 'react'
import { FaBars } from 'react-icons/fa'
import { MdNotificationsNone } from 'react-icons/md'
import profile from '../../assets/profile.png'

export const Navbar = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-green w-full flex justify-between items-center text-2xl p-1">
        <div className="ml-10">
          <FaBars />
        </div>
        <div className="flex gap-2">
          <div className=" border-cyan-50 border-r-2 text-4xl">
            <MdNotificationsNone />
          </div>
          <img src={profile} className="h-9 w-9 rounded-full mr-10"></img>
        </div>
      </div>
      <main className="">{children}</main>
    </div>
  )
}

export default Navbar
