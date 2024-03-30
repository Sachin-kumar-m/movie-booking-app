import { axiosInstance } from "./users"

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post("api/user/register", payload)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("api/user/login", payload)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}