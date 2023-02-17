import axios from "../config/axios";

export function createPackageAsset(input){
    return axios.post("/packageAsset/create" , input, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
}