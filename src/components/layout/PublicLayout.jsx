import React from 'react'
import { Outlet } from 'react-router-dom'
const PublicLayout = () => {
  return (
    <div className=" bg-red-50">
      <Outlet />
    </div>
  )
}

export default PublicLayout
