import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import jwtDecode from 'jwt-decode'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  // const a = auth?.roles?.some((role) => allowedRoles.includes(role))
  // console.log(a)
  // const content = auth?.roles?.some((role) => allowedRoles.includes(role)) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // )
  const a = auth?.roles?.find((role) => allowedRoles?.includes(role))
  console.log(a)
  const content = auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
  return content
}

export default RequireAuth
