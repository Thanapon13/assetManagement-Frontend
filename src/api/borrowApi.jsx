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

export function getViewBorrowApproveDetailById(id) {
  return axios.get(`/borrow/viewBorrowApproveDetailById/${id}`);
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


export function getAllFirstFetchBorrowApprove() {
  return axios.get(`/borrow/allFirstFetchBorrowApprove`);
}
export function getBySearchTopBorrowApprove(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/borrow/searchTopBorrowApprove?${queryString}`);
}
export function approveAllWaitingBorrow(input) {
  return axios.patch(`/borrow/approveAllWaitingBorrow`,input);
}
export function rejectAllWaitingBorrow(input) {
  return axios.patch(`/borrow/rejectAllWaitingBorrow`,input);
}
export function rejectIndividualWaitingBorrow(input) {
  return axios.patch(`/borrow/rejectIndividualWaitingBorrow`,input);
}

// borrowApproveDetail page
export function partiallyApproveBorrowApproveDetail(id,input) {
  return axios.patch(`/borrow/partiallyApproveBorrowApproveDetail/${id}`,input);
}
export function rejectAllBorrowApproveDetail(id,input) {
  console.log(id,input)
  return axios.patch(`/borrow/rejectAllBorrowApproveDetail/${id}`,input);
}


// dropdown
export function getAllSectorFromBorrow() {
  return axios.get(`/borrow/dropdownAllSectorFromBorrow`);
}

// getBySearchBorrowHistory
export function getBySearchBorrowHistory(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/borrow/searchBorrowHistory?${queryString}`);
}

// BorrowHistory page dropdown
export function getBorrowHistorySector() {
  return axios.get(`/borrow/BorrowHistorySector`);
}

// getBySearchBorrowCheck
export function getBySearchBorrowCheck(search) {

  function getQueryString(search) {
    const params = Object.keys(search)
      .filter(key => search[key] !== "") // remove empty values
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`)
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/borrow/searchBorrowCheck?${queryString}`);
}

// BorrowHistory page dropdown
export function getBorrowCheckSector() {
  return axios.get(`/borrow/borrowCheckSector`);
}

export function getBorrowCheckById(id) {
  return axios.get(`/borrow/borrowCheck/${id}`);
}