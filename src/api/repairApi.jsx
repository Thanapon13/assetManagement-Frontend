import { Input } from "@material-ui/icons";
import axios from "../config/axios";

export function createRepair(input) {
  return axios.post("/repair/create", input);
}

export function updateRepair(repairId, input) {
  return axios.patch(`/repair/update/${repairId}`, input);
}

export function getAllRepair() {
  return axios.get("/repair/getAll");
}

export function getSectorOfRepair() {
  return axios.get("/repair/sectorForSearch");
}

function getQueryString(options) {
  let option = "?";
  for (const key in options) {
    if (Object.hasOwnProperty.call(options, key)) {
      option += key + "=" + options[key] + "&";
    }
  }
  return option;
}

export function getRepairBySearch(options) {
  return axios.get(`/repair/search${getQueryString(options)}`);
}

export function getRepairHistoryBySearch(options) {
  return axios.get(`/repair/searchHistory${getQueryString(options)}`);
}

export function getRepairById(id) {
  return axios.get(`/repair/${id}`);
}

export function getRepairHistoryOfAsset(number) {
  return axios.get(
    `/repair/getHistoryThisAssetByAssetId?assetNumber=${number}`
  );
}

export function getRepairOutsourceBySearch(options) {
  return axios.get(`/repair/searchOutsource${getQueryString(options)}`);
}

export function getRepairTechnicianBySearch(options) {
  return axios.get(`/repair/searchDetailRecord${getQueryString(options)}`);
}

export function updateStatusForGetJobRepair(id, status, reason) {
  return axios.patch(
    `/repair/updateStatusForGetJob/${id}?status=${status}`,
    reason
  );
}

export function updateStatusForCheckJob(id) {
  return axios.patch(`/repair/updateStatusForCheckJob/${id}`);
}

export function deleteRepair(id) {
  return axios.patch(`/repair/delete/${id}`);
}

export function updateRecordRepairDetail(id, body) {
  return axios.patch(`/repair/recordDetail/${id}`, body);
}

export function getListApprovalRepair() {
  return axios.get(
    `/repair/searchTopApprove?listStatus=inProgressOfDetailRecord`
  );
}

export function approveAllWaitingRepair(body) {
  return axios.patch(`/repair/approveAllWaiting`, body);
}

export function updateOutsourceRecord(id, body) {
  return axios.patch(`/repair/outSourceRecord/${id}`, body);
}

export const rejectIndividualWaitingRepair = topApproveList =>
  axios.patch("/repair/rejectAllWaiting", topApproveList);
