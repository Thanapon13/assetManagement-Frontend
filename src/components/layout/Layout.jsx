import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, LeftBar } from '../../components'

const Layout = ({menu}) => {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="hidden sm:block">
          <LeftBar menu={menu} />
        </div>
        <div className="w-[100vw]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
