import axios from "../config/axios";

export function adminLogin(input) {
    return axios.post("/auth/admins/login", input);
  }

export function userLogin(input) {
    return axios.post("/auth/users/login", input);
  }