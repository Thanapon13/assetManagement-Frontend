import axios from "../config/axios";

export function createPackageAsset(input) {
  return axios.post("/packageAsset/create", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updatePackageAsset(input, id) {
  return axios.patch(`/packageAsset/update/${id}`, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getAllPackageAsset() {
  return axios.get("/packageAsset");
}

export function getPackageAssetById(id) {
  return axios.get(`/packageAsset/${id}`);
}

export function getImageById(name) {
  return axios.get(`/images/${name}`);
}

export function getPackageAssetBySearch(search) {
  function getQueryString(search) {
    const params = Object.keys(search)
      .filter((key) => search[key] !== "") // remove empty values
      .map(
        (key) => `${(key)}=${(search[key])}`
      )
      .join("&");
    return params;
  }

  const queryString = getQueryString(search);

  console.log(queryString)

  return axios.get(`/packageAsset/search?${queryString}`);
}

export function deletePackageAsset(input) {
  return axios.delete(`/packageAsset/deleteAsset/${input}`);
}
