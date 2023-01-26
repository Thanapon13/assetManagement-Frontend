import axios from "axios";
// import { getAccessToken } from "../services/localStorage";
import { API_END_POINT_URL } from "./env";

axios.defaults.baseURL = API_END_POINT_URL;

//ให้แทรกtokenไปตอนก่่อนส่งไปback
// axios.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = "Bearer " + token; //เอาtoken จาก localStorageมาใส่ในheaders
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

export default axios;

