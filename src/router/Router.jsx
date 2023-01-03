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
  AssetInformationIndex,
  AssetInformation,
  AssetWithdraw,
  TransferAsset,
  RepairDashboard,
  SaveAssetWithdraw,
} from '../pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assetInformation" element={<AssetInformation />} />
          <Route path="/assetInformationIndex" element={<AssetInformationIndex />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
