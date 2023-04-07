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
 