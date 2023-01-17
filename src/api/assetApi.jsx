import axios from "../config/axios";

export function createAsset(input){
    return axios.post("/asset/create" , input, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
}