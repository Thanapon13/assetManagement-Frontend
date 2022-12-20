import React from 'react'
import { Sidebar } from '../../components/'

export const Navbar = ({ children }) => {
  return (
    <div className="flex h-[50px] w-screen max-w-[100em] ">
      <Sidebar />
      <div>Navbar</div>
    </div>
  )
}

export default Navbar
