import axios from "../config/axios";

export function getUsersAll() {
  return axios.get("/user/all");
}

export function getToken() {
  return(localStorage.getItem("accessToken"))
}

export function getUserById(id) {
  // return axios.get(`/user/${id}`);
 
  const property = {
    method: "GET",
    // url: baseAPI + url,
    url: `/user/${id}`,
    // params: filter,
    headers: {
      Authorization: `Bearer ${ getToken() || "unknown"}`
    }
  }
  return axios(property)
}

export function getSectorOfUser() {
  return axios.get(`/user/sectorForSearch`);
}

export function createUser(input) {
  return axios.post("/user/create", input);
}

export function updateUser(input, id) {
  return axios.patch(`/user/update/${id}`, input);
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
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
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
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
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
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
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
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      )
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  // console.log(queryString)

  return axios.get(`/asset/searchQuantitySelector?${queryString}`);
}

export function deleteAsset(input) {
  return axios.delete(`/asset/deleteAsset/${input}`);
}
