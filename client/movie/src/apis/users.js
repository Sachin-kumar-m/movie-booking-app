import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/",
    headers: {
        credentials: "include",
        method: "post",
        "Content-typy" : "application/json"
    }
})