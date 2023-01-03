import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, LeftBar } from '../../components'

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="hidden sm:flex w-[100vw]">
        <LeftBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
