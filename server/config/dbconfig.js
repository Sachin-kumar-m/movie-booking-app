const mongoose = require("mongoose")
require("dotenv").config() //to handle .env file

//db connection
mongoose.connect(process.env.mongoURL, {})
const connected = mongoose.connection
connected.on("connected", (err) => {
    if (!err) console.log("DataBase connection succesfull")
    else console.log(err)
})
