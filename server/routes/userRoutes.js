const express = require("express")
const router = express.Router()
const Users = require("../models/userModel")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



router.post("/api/user/register", async (request, response) => {
    try {
        const userDetails = request.body
        const userInDB = await Users.findOne({ userEmail: userDetails.userEmail })
        //check if user is in the DB
        if (userInDB) {
            return response.send({
                message: "User already Registered",
                success: false
            })
        }
        if (request.body.password.length < 8) return response.send({
            message: "Password should be more than 8 characters",
            success: false
        })
        // hashing the user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(request.body.password, salt)
        userDetails.password = hashedPassword

        const newUser = new Users(userDetails)
        await newUser.save()
        response.send({
            message: "User Added Successfully",
            success: true
        })
    }
    catch (err) {
        response.send({
            message: "Somthing went, wrong unable to add user",
            error: [err.name, err.message]
        })
        console.log(err)
    }

})

router.post("/api/user/login", async (request, response) => {

    try {
        const userDetails = request.body
        const userFromDB = await Users.findOne({ userEmail: request.body.userEmail })

        //check if user is in DB
        if (!userFromDB) return response.send(
            {
                message: "User not found",
                success: false
            })
        //generating web tokens for authentication using JWT
        const tocken = jwt.sign({ userID: userFromDB._id, userEmail: userFromDB.userEmail }, process.env.jwt_secret_key, { expiresIn: "2m" })

        //comparing the hashed password
        const isCorrectPassword = await bycrypt.compare(userDetails.password, userFromDB.password)

        // compare the email and password
        if (isCorrectPassword) {
            response.send({
                message: "Login successfull",
                success: true,
                data: tocken
            })
        }
        else {
            response.send({
                message: "Invalid Credentials",
                success: false
            })
        }
    }
    catch (err) {
        console.log(err);
        response.send({
            message: "Something went wrong",
            error: [err.name, err.message]
        })
    }

})


// endpoint to get all Users
// router.get("/api/users/users", async(_, response) => {
//     try {
//         const allUsers = await Users.find()
//         response.send(allUsers)
//     }
//     catch (err) {
//         console.log(err)
//         response.end(err)
//    }
// })

module.exports = { router }