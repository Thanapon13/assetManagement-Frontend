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

// function getQueryString(search) {
//   const params = Object.keys(search)
//     .filter(key => search[key] !== "") // remove empty values
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
//     .join("&");
//   return params;
// }

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

export const getBuildingOutsourceForSearchOutsource = async () =>
  axios.get("/repair/getBuildingOutsourceForSearchOutsource");

export const getRepairTypeOutsourceForSearchOutsource = async () =>
  axios.get("/repair/getRepairTypeOutsourceForSearchOutsource");

export const getFloorForSearchOutsource = async options =>
  axios.get("/repair/getFloorForSearchOutsource");

export function getRepairTechnicianBySearch(options) {
  return axios.get(`/repair/searchDetailRecord${getQueryString(options)}`);
}

export const getSectorForSearchDetailRecord = () =>
  axios("/repair/sectorForSearchDetailRecord");

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
  console.log("id:", id);
  console.log("body:", body);
  return axios.patch(`/repair/recordDetail/${id}`, body);
}

export function getListApprovalRepair(options) {
  const queryString = getQueryString(options);
  return axios.get(`/repair/searchTopApprove?${queryString}`);
}

export function approveAllWaitingRepair(body) {
  return axios.patch(`/repair/approveAllWaiting`, body);
}
export function approveIndividualWaitingRepair(body) {
  return axios.patch(`/repair/approveIndividualWaiting`, body);
}

export function updateOutsourceRecord(id, formData) {
  console.log("formData:", formData);
  return axios.patch(`/repair/outSourceRecord/${id}`, formData);
}

export const rejectIndividualWaitingRepair = topApproveList =>
  axios.patch("/repair/rejectIndividualWaiting", topApproveList);

export const offWorkRepair = (id, input) => {
  axios.patch(`/repair/offwork/${id}`, { input: input });
};

export const updateStatusForCheckJobRepair = id => {
  axios.patch(`/repair/updateStatusForCheckJob/${id}`);
};

export const getSectorForSearchHistory = () =>
  axios.get("/repair/sectorForSearchHistory");
