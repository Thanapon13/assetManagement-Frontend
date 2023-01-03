import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, LeftBar } from '../../components'

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="hidden sm:flex">
        <LeftBar />
        <div className="w-[100vw]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
