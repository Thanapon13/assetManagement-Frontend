import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar, Navbars } from '../components'
import {
  Dashboard,
  BorrowList,
  AssetGroup,
  AssetInformation,
  AssetWithdraw,
  TransferAsset,
  RepairDashboard,
} from '../pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path="/assetInformation" element={<AssetInformation />} />
        <Route path="/assetGroup" element={<AssetGroup />} />
        <Route path="/assetWithdraw" element={<AssetWithdraw />} />
        <Route path="/borrowList" element={<BorrowList />} />
        <Route path="/transferAsset" element={<TransferAsset />} />
        <Route path="/repairDashboard" element={<RepairDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
