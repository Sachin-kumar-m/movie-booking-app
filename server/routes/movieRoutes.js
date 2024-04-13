const express = require("express")
const Movies = require("../models/movieModel")
const router = express.Router()

router.get("/api/movies/getmovies", async (_, response) => {
    try {
        const allMovies = await Movies.find()
        response.send({
            success: true,
            message: "Movies fetched successfully",
            data: allMovies
        })
    }
    catch (err) {
        response.send({
            success: false,
            message: err.message
        })
    }
})


router.post("/api/movies/add", async (request, response) => {
    try {
        const movie = request.body
        const movieInDB = await Movies.findOne({ title: movie.title })
        if (movieInDB) {
            return response.send({
                success: false,
                message: "Movie already in Database"
            })
        }
        const newMovie = new Movies(movie)
        newMovie.save()
        response.send({
            success: true,
            message: "Movies added Successfully"
        })
    }
    catch (err) {
        response.send({
            success: false,
            message: err.message
        })
    }
})


router.put("/api/movies/edit", async (request, response) => {
    try {
        const patchMovie = request.body
        const movie = await Movies.findById(patchMovie._id)
        await Movies.findOneAndUpdate({ _id: movie._id }, patchMovie)
        response.send({
            success: true,
            message:"Saved Successfully"
        })
    }
    catch (err) {
        console.log(err);
        response.send({
            success: false,
            message:"Unable Edit, something went wrong"
        })
    }
})


router.delete("/api/movies/delete", async (request, response) => {
    try {
        const movie = request.body.title
        const movieInDB = await Movies.findOne({ title: movie })
        if (movieInDB) {
            await Movies.deleteOne({ title: movie })
            response.send({
                success: true,
                message: "Movie deleted",
                data: movie
            })
        }
        else {
            response.send({
                success: false,
                message: "Movie not found if DB"
            })
        }
    }
    catch (err) {
        response.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = { router }
