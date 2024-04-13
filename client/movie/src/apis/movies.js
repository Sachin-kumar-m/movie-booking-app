import axios from "axios"

export const movieInstance = axios.create({
    baseURL:"http://localhost:8080/",
    headers: {
        withCredentials: true,
        method: "post",
        "Content-type": "application/json",
        // Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})