const mangoose = require("mongoose")

const moviesSchema = new mangoose.Schema({
    title : {type:String, maxLength:255, requied:true},
    description : {type:String, maxLength:1000, requied:true},
    duration: { type: Number, requied: true },
    language: { type: String, requied: true },
    gener:{type:String, requied: true},
    release_date: { type: Date, requied: true },
    poster_URL: {type:String}
})

module.exports = mangoose.model("movies", moviesSchema)