import axios from "../config/axios";

export function getAllTransfer() {
  return axios.get("/transfer/all");
}

export function getTransferById(id) {
  return axios.get(`/transfer/${id}`);
}

export function deleteTransfer(id, body) {
  return axios.patch(`/transfer/delete/${id}`, body);
}

export function createTransfer(body) {
  return axios.post("/transfer/create", body);
}

export function updateTransfer(body, id) {
  return axios.patch(`/transfer/update/${id}`, body);
}

export function rejectAllWaitingTransfer(body) {
  return axios.patch(`/transfer/rejectAllWaitingTransfer`, body);
}

export function approveAllWaitingTransfer(body) {
  return axios.patch(`/transfer/approveAllWaitingTransfer`, body);
}

export function rejectIndividualWaitingTransfer(body) {
  return axios.patch(`/transfer/rejectIndividualWaitingTransfer`, body);
}

export function approvePartiallyTransfer(id,body) {
  return axios.patch(`/transfer/partiallyApproveTransferApproveDetail/${id}`, body);
}

export function getViewTransferApproveDetailById(id) {
  return axios.get(`/transfer/viewTransferApproveDetailById/${id}`)
}

function getQueryString(search) {
  const params = Object.keys(search)
    .filter((key) => search[key] !== "") // remove empty values
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
    )
    .join("&");
  return params;
}
export function getTransferAssetBySearch(search) {
  const queryString = getQueryString(search);
  return axios.get(`/transfer/searchAssetTransfer?${queryString}`);
}
export function getListApprovalTransferAsset(search) {
  const queryString = getQueryString(search);
  return axios.get(`/transfer/searchTopTransferApprove?${queryString}`);
}

export function getTransferApproveDetailById(id) {
  return axios.get(`/transfer/viewTransferApproveDetailById/${id}`);
}

export function getTransferHistorySector() {
  return axios.get(`/transfer/transferHistorySector`)
}
export function getBySearchTransferHistory(search) {
  const queryString = getQueryString(search)
  return axios.get(`/transfer/searchTransferHistory?${queryString}`)
}
export function getTransferHistoryById(id) {
  return axios.get(`/transfer/${id}`)
}

export function getSectorOfTransfer() {
  return axios.get(`/transfer/transferSectorForSearch`);
}
export function getSectorOfTransferee() {
  return axios.get(`/transfer/transfereeSectorForSearch`);
}