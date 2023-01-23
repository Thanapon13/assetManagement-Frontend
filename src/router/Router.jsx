import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  PublicLayout,
  Layout,
  RequireAuth,
  PersistLogin,
  Unauthorized,
} from '../components'
import {
  Dashboard,
  BorrowList,
  BorrowEdit,
  BorrowDetail,
  BorrowCheckIndex,
  BorrowCheckSaving,
  BorrowCheckDetail,
  BorrowRecord,
  BorrowApprove,
  BorrowSaving,
  BorrowApproveDetail,
  PackageAssetInformation,
  AssetInformationIndex,
  AssetInformation,
  AssetWithdraw,
  SaveAssetWithdraw,
  ApprovalAssetWithdraw,
  TransferAsset,
  RepairDashboard,
  LoginPage,
  ForgotPassword,
  EmailConfirmation,
} from '../pages'

// import useAuth from '../hooks/useAuth'

const Public = () => {
  return (
    <>
      <div className=" text-8xl flex justify-center items-center w-[100vw] h-[100vh]">
        Hi !!!!! you wrong again
      </div>
    </>
  )
}

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        {/* public routes */}
        {/* <Route index element={<Public />} /> */}
        {/* <Route index element={<Navigate to="/login" />} /> */}
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="signup" element={<SignupPage />} /> */}
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="emailConfirmation" element={<EmailConfirmation />} />
        {/* <Route path="changePassword/:word" element={<ChangePasswordPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protect routes */}
        {/* <Route element={<PersistLogin />}> */}
        <Route path="" element={<Layout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
          <Route path="assetInformation" element={<AssetInformation />} />
          <Route
            path="assetInformationIndex"
            element={<AssetInformationIndex />}
          />
          {/* </Route> */}
          <Route
            path="packageAssetInformation"
            element={<PackageAssetInformation />}
          />
          <Route path="assetWithdraw" element={<AssetWithdraw />} />
          <Route path="saveAssetWithdraw" element={<SaveAssetWithdraw />} />
          <Route
            path="approvalAssetWithdraw"
            element={<ApprovalAssetWithdraw />}
          />
          <Route path="borrowList" element={<BorrowList />} />
          <Route path="borrowList/borrowSaving" element={<BorrowSaving />} />
          <Route path="borrowList/borrowEdit" element={<BorrowEdit />} />
          <Route path="borrowList/borrowDetail" element={<BorrowDetail />} />

          <Route path="borrowCheckIndex" element={<BorrowCheckIndex />} />
          <Route
            path="borrowCheckIndex/borrowCheckSaving"
            element={<BorrowCheckSaving />}
          />
          <Route
            path="borrowCheckIndex/borrowCheckDetail"
            element={<BorrowCheckDetail />}
          />

          <Route path="borrowRecord" element={<BorrowRecord />} />

          <Route path="borrowApprove" element={<BorrowApprove />} />
          <Route
            path="borrowApprove/borrowApproveDetail"
            element={<BorrowApproveDetail />}
          />

          <Route path="transferAsset" element={<TransferAsset />} />
          <Route path="repairDashboard" element={<RepairDashboard />} />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
  )
}

export default Router
