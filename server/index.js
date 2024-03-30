const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()


app.use(cors())
app.use(express.json())

//importing dbconfig file
const dbConfig = require("./config/dbconfig")
const routes = require("./routes/userRoutes")

app.use("/",routes.router)

const port = 8080
const host = "http://localhost"
app.listen(port, (error) => {
    if (!error) console.log(`Server Listining at ${host}:${port}/`);
    else console.log(error);
})