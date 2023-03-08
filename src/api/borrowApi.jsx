import axios from "../config/axios";

export function createBorrow(input) {
  return axios.post("/borrow/create", input);
}

export function updateBorrow(input,id) {
  return axios.patch(`/borrow/update/${id}`, input);
}

export function getAllBorrow() {
  return axios.get("/borrow");
}

export function getBorrowById(id) {
  return axios.get(`/borrow/${id}`);
}

export function getBorrowImageById(name) {
  return axios.get(`/images/${name}`);
}

export function getBorrowBySearch(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/borrow/search?${queryString}`);
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

  return axios.get(`/borrow/searchAssetNumberSelector?${queryString}`);
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

  return axios.get(`/borrow/searchProductSelector?${queryString}`);
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

  return axios.get(`/borrow/searchQuantitySelector?${queryString}`);
}

export function deleteAsset(input) {
  return axios.delete(`/borrow/deleteAsset/${input}`);
}


export function getAllSectorFromBorrow() {

  return axios.get(`/borrow/dropdownAllSectorFromBorrow`);
}