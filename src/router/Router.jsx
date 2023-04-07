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
  PackageAssetInformationIndex,
  PackageAssetInformation,
  AssetInformationIndex,
  AssetInformation,
  AssetWithdraw,
  SaveAssetWithdraw,
  ApprovalAssetWithdraw,
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
  BorrowHistoryIndex,
  BorrowHistoryDetail,
  TransferAsset,
  RepairIndex,
  RepairDetail,
  RepairEdit,
  RepairRecord,
  RepairTechnicianIndex,
  RepairTechnicianRecord,
  RepairTechnicianDetail,
  LoginPage,
  ForgotPassword,
  EmailConfirmation,
  DefaultData,
  MerchantIndex,
  UserInformationIndex,
  AddUserInformation,
  ViewAssetInformation,
  EditAssetInformation,
  ViewPackageAssetInformation,
  EditPackageAssetInformation,
  TransferIndex,
  SaveTransferAsset,
  ApprovalTransferAsset,
  ApprovalTransferAssetDetail,
  ViewApprovalTransferAssetDetail,
  ViewWaitingTransferAsset,
  EditTransferAsset,
  SaveMerchant,
  Merchant,
  ViewMerchant,
  ReportMerchantInfo,
  ViewReportMerchantInfo,
  EditMerchant,

} from "../pages";

import useAuth from '../hooks/useAuth'
import ViewBorrowApproveDetail from '../pages/ViewBorrowApproveDetail';

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
      <Route path="/dd" element={<PublicLayout />}>
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
      </Route>
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
        <Route
          path="/viewAssetInformation/:assetId"
          element={<ViewAssetInformation />}
        />
        <Route
          path="/editAssetInformation/:assetId"
          element={<EditAssetInformation />}
        />
        {/* </Route> */}
        <Route
          path="/packageAssetInformationIndex"
          element={<PackageAssetInformationIndex />}
        />
        <Route
          path="packageAssetInformation"
          element={<PackageAssetInformation />}
        />
        <Route
          path="viewPackageAssetInformation/:packageAssetId"
          element={<ViewPackageAssetInformation />}
        />
        <Route
          path="editPackageAssetInformation/:packageAssetId"
          element={<EditPackageAssetInformation />}
        />
        <Route path="merchant" element={<Merchant />} />
        <Route path="saveMerchant" element={<SaveMerchant />} />
        <Route path="editMerchant/:merchantId" element={<EditMerchant />} />
        <Route path="viewMerchant/:merchantId" element={<ViewMerchant />} />
        <Route path="reportMerchantInfo" element={<ReportMerchantInfo />} />
        <Route path="viewReportMerchantInfo/:merchantId" element={<ViewReportMerchantInfo />} />

        <Route path="assetWithdraw" element={<AssetWithdraw />} />
        <Route path="saveAssetWithdraw" element={<SaveAssetWithdraw />} />
        <Route
          path="approvalAssetWithdraw"
          element={<ApprovalAssetWithdraw />}
        />
        <Route path="borrowList" element={<BorrowList />} />
        <Route path="borrowList/borrowSaving" element={<BorrowSaving />} />
        <Route path="borrowEdit/:borrowId" element={<BorrowEdit />} />
        <Route path="borrowDetail/:borrowId" element={<BorrowDetail />} />
        <Route path="borrowCheckIndex" element={<BorrowCheckIndex />} />
        <Route
          path="borrowCheckSaving/:borrowId"
          element={<BorrowCheckSaving />}
        />
        <Route
          path="borrowCheckIndex/borrowCheckDetail"
          element={<BorrowCheckDetail />}
        />
        <Route path="borrowRecord" element={<BorrowRecord />} />
        <Route path="borrowApprove" element={<BorrowApprove />} />
        <Route
          path="borrowApproveDetail/:borrowId"
          element={<BorrowApproveDetail />}
        />
        <Route
          path="viewBorrowApproveDetail/:borrowId"
          element={<ViewBorrowApproveDetail />}
        />
        <Route path="borrowHistory" element={<BorrowHistoryIndex />} />
        <Route
          path="borrowHistoryDetail/:borrowId"
          element={<BorrowHistoryDetail />}
        />

        <Route path="transferIndex" element={<TransferIndex />} />
        <Route path="saveTransferAsset" element={<SaveTransferAsset />} />
        <Route path="approvalTransferAsset" element={<ApprovalTransferAsset />} />
        <Route path="approvalTransferAssetDetail/:transferId" element={<ApprovalTransferAssetDetail />} />
        <Route path="viewApprovalTransferAssetDetail/:transferId" element={<ViewApprovalTransferAssetDetail />} />
        <Route path="viewWaitingTransferAsset/:transferId" element={<ViewWaitingTransferAsset />} />
        <Route path="editTransferAsset/:transferId" element={<EditTransferAsset />} />

        {/* <Route path="repairDashboard" element={<RepairDashboard />} /> */}
        <Route path="transferAsset" element={<TransferAsset />} />
        <Route path="repairIndex" element={<RepairIndex />} />
        <Route path="repairIndex/repairDetail" element={<RepairDetail />} />
        <Route path="repairIndex/repairEdit" element={<RepairEdit />} />
        <Route path="repairRecord" element={<RepairRecord />} />
        <Route
          path="repairTechnicianIndex"
          element={<RepairTechnicianIndex />}
        />
        <Route
          path="repairTechnicianIndex/repairTechnicianRecord"
          element={<RepairTechnicianRecord />}
        />
        <Route
          path="repairTechnicianIndex/repairTechnicianDetail"
          element={<RepairTechnicianDetail />}
        />

        <Route path="/defaultData" element={<DefaultData />} />
        <Route path="/merchantIndex" element={<MerchantIndex />} />
        <Route
          path="/userInformationIndex"
          element={<UserInformationIndex />}
        />
        <Route path="/addUserInformation" element={<AddUserInformation />} />
      </Route>

      {/* </Route> */}
    </Routes>
  )
}

export default Router
