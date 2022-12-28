import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, LeftBar } from '../../components'

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar children={children} />
      <div className="hidden sm:block">
        <LeftBar children={children} />
      </div>
    </div>
  )
}

export default Layout
