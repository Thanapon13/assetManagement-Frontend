import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components'
import {
  Dashboard,
  BorrowList,
  BorrowRecord,
  BorrowApprove,
  BorrowSaving,
  BorrowDetailApprove,
  PackageAssetInformation,
  AssetInformation,
  AssetWithdraw,
  TransferAsset,
  RepairDashboard,
  SaveAssetWithdraw,
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
          <Route path="/saveAssetWithdraw" element={<SaveAssetWithdraw />} />
          <Route path="/borrowList" element={<BorrowList />} />
          <Route path="/borrowList/borrowSaving" element={<BorrowSaving />} />
          <Route path="/borrowRecord" element={<BorrowRecord />} />
          <Route path="/borrowApprove" element={<BorrowApprove />} />
          <Route
            path="/borrowApprove/borrowDetailApprove"
            element={<BorrowDetailApprove />}
          />
          <Route path="/transferAsset" element={<TransferAsset />} />
          <Route path="/repairDashboard" element={<RepairDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
