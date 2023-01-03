import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import {
  Dashboard,
  BorrowList,
  BorrowRecord,
  BorrowApprove,
  BorrowSaving,
  PackageAssetInformation,
  AssetInformationIndex,
  AssetInformation,
  AssetWithdraw,
  SaveAssetWithdraw,
  ApprovalAssetWithdraw,
  TransferAsset,
  RepairDashboard,
  LoginPage,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Routes> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assetInformation" element={<AssetInformation />} />
          <Route
            path="/assetInformationIndex"
            element={<AssetInformationIndex />}
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
          <Route path="/BorrowRecord" element={<BorrowRecord />} />
          <Route path="/BorrowSaving" element={<BorrowSaving />} />
          <Route path="/BorrowApprove" element={<BorrowApprove />} />
          <Route path="/transferAsset" element={<TransferAsset />} />
          <Route path="/repairDashboard" element={<RepairDashboard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
      {/* </Routes> */}
    </BrowserRouter>
  );
};

export default Router;
