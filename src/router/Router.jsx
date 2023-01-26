import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components";
import {
  Dashboard,
  BorrowList,
  BorrowRecord,
  BorrowApprove,
  BorrowSaving,
  BorrowDetailApprove,
  PackageAssetInformationIndex,
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
  DefaultData,
  MerchantIndex,
  UserInformationIndex,
  AddUserInformation,
  ViewAssetInformation} from "../pages";

const Router = () => {
  const user = "a";

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assetInformation" element={<AssetInformation />} />
            <Route
              path="/assetInformationIndex"
              element={<AssetInformationIndex />}
            />
            <Route
              path="/viewAssetInformation"
              element={<ViewAssetInformation />}
            />
            <Route
              path="/packageAssetInformationIndex"
              element={<PackageAssetInformationIndex />}
            />
            <Route
              path="/packageAssetInformation"
              element={<PackageAssetInformation />}
            />
            <Route path="/assetWithdraw" element={<AssetWithdraw />} />
            <Route path="/saveAssetWithdraw" element={<SaveAssetWithdraw />} />
            <Route
              path="/approvalAssetWithdraw"
              element={<ApprovalAssetWithdraw />}
            />
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
            <Route path="/defaultData" element={<DefaultData />} />
            <Route path="/merchantIndex" element={<MerchantIndex />} />
            <Route path="/userInformationIndex" element={<UserInformationIndex />} />
            <Route path="/addUserInformation" element={<AddUserInformation />} />
          </Route>
        ) : (
          <>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="signup" element={<SignupPage />} /> */}
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="emailConfirmation" element={<EmailConfirmation />} />
            {/* <Route path="changePassword/:word" element={<ChangePasswordPage />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
