import { movieInstance } from "./movies"
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

export const getLoginUser = async() => {
    try {
        const response = await axiosInstance.get("api/user/is-authorised-user", {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const getMovies = async () => {
    try {
        const response = await movieInstance.get("api/movies/getmovies")
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteMovies = async (payload) => {
    console.log("payload=>",payload);
    try {
        const response = await movieInstance.delete("/api/movies/delete", {
            data: payload //have to do this if not the payload will not be sent to backend, this is very specfic to delete route
        })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}