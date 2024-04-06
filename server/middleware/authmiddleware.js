const jwt = require("jsonwebtoken")

module.exports = function (request, response, next) {
    try {
        // console.log(request);
        const token = request.headers.authorization.split(" ")[1]
        const decodedJWT = jwt.verify(token, process.env.jwt_secret_key)
        request.body.userId = decodedJWT.userId
        next()
    }
    catch(err) {
        response.send({
            success: false,
            message: err.message
        })
    }
}