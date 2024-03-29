const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, maxLength: 100 },
    userEmail: { type: String, required: true, maxLength: 255 },
    password: { type: String, required: true, minLength: 8 },
    isAdmin: { type: Boolean, default: false, required: true }
})

module.exports = mongoose.model("users", userSchema)