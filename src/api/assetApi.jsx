import axios from "../config/axios";

export function createAsset(input) {
  return axios.post("/asset/create", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateAsset(input,id) {
  return axios.patch(`/asset/update/${id}`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getAllAsset() {
  return axios.get("/asset");
}

export function getAssetById(id) {
  return axios.get(`/asset/${id}`);
}

export function getImageById(name) {
  return axios.get(`/images/${name}`);
}

export function getBySearch(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/asset/search?${queryString}`);
}

export function getByAssetNumberSelector(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/asset/searchAssetNumberSelector?${queryString}`);
}

export function getByProductSelector(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/asset/searchProductSelector?${queryString}`);
}

export function getQuantitySelector(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/asset/searchQuantitySelector?${queryString}`);
}

export function deleteAsset(id, body) {
  return axios.patch(`/asset/deleteAsset/${id}`, body);
}

export function getSectorOfAsset() {
  return axios.get(`/asset/sectorForSearch`);
}


export function getAllAssetForRepairDropdown() {
  return axios.get(`asset/repairDropdown`);
}