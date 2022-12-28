import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components'
import {
  Dashboard,
  BorrowList,
  BorrowRecord,
  BorrowApprove,
  BorrowSaving,
  PackageAssetInformation,
  AssetInformation,
  AssetWithdraw,
  TransferAsset,
  RepairDashboard,
} from '../pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assetInformation" element={<AssetInformation />} />
          <Route
            path="/packageAssetInformation"
            element={<PackageAssetInformation />}
          />
          <Route path="/assetWithdraw" element={<AssetWithdraw />} />
          <Route path="/borrowList" element={<BorrowList />} />
          <Route path="/BorrowRecord" element={<BorrowRecord />} />
          <Route path="/BorrowSaving" element={<BorrowSaving />} />
          <Route path="/BorrowApprove" element={<BorrowApprove />} />
          <Route path="/transferAsset" element={<TransferAsset />} />
          <Route path="/repairDashboard" element={<RepairDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
