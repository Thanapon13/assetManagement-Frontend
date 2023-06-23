import axios from "../config/axios";

export function getAllMerchant() {
  return axios.get("/merchant");
}

export function createMerchant(body) {
  return axios.post("/merchant/create", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateMerchant(input, id) {
  return axios.patch(`/merchant/update/${id}`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function getQueryString(search) {
  const params = Object.keys(search)
    .filter((key) => search[key] !== "") 
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
    )
    .join("&");
  return params;
}
export function getMerchantBySearch(search) {

  const queryString = getQueryString(search);

  return axios.get(`/merchant/search?${queryString}`);
}

export function getDropdownMerchant() {
  return axios.get(`/merchant/getDropdownMerchant`)
}

export function getMerchantById(id) {
  return axios.get(`/merchant/${id}`)
}

export function getMerchantBySearchViewOnly(search) {
  return axios.get(`/merchant/searchViewOnly?${getQueryString(search)}`)
}

export function deleteMerchant(id, body) {
  return axios.patch(`/merchant/delete/${id}`, body);
}