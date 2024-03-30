import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/",
    headers: {
        withCredentials: true,
        method: "post",
        "Content-typy" : "application/json"
    }
})