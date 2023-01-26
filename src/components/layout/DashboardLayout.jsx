import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, LeftBar } from '../../components'

const DashboardLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="hidden sm:block">
          <LeftBar />
        </div>
        <div className="w-[100vw]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
