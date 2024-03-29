const express = require("express")
const router = express.Router()
const Users = require("../models/userModel")
const bycrypt = require("bcrypt")


router.post("/register", async (request, response) => {
    try {
        const userDetails = request.body
        const userInDB = await Users.findOne({ userEmail: userDetails.userEmail })
        //check if user is in the DB
        if (userInDB) {
            return response.status(403).send({
                message: "User already Exists",
                success: false
            })
        }

        //hashing the user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(request.body.password, salt)
        userDetails.password = hashedPassword

        const newUser = new Users(userDetails)
        await newUser.save()
        response.send({
            message: "User added",
            success: true
        })
    }
    catch (err) {
        response.status(500).send({
            message: "Somthing wrong unable to add user",
            error: [err.name, err.message]
        })
        console.log(err)
    }

})

router.get("/login", async (request, response) => {
    try {
        const userDetails = request.body
        const userFromDB = await Users.findOne({ userEmail: request.body.userEmail })

        if (userFromDB === null) return response.status(404).send(
            {
                message: "User not found",
                success: false
            })
        
        //comparing the hashed password
        const isCorrectPassword = await bycrypt.compare(userDetails.password, userFromDB.password)

        // compare the email and password
        if (userDetails.userEmail === userFromDB.userEmail && isCorrectPassword) {
            response.send({
                message: "Login successfull",
                success: true
            })
        }
        else {
            response.status(401).send({
                message: "Not authorized",
                success: false
            })
        }
    }
    catch (err) {
        response.send({
            message: "Something went wrong",
            error: [err.name, err.message]
        })
    }

})

module.exports = { router }