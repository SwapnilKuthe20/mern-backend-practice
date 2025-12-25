const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");
const jwt = require('jsonwebtoken');

const protectedMiddleware = asyncCatch(async (req, res, next) => {
    console.log("I am in protected middleware");


    // console.log(req.headers.authorization.split(" "), "...token");

    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        throw new AppError(401, "Unauthorized: token missing")
    }

    const token = authHeaders.split(" ")[1]
    // console.log(token, "...token");

    // console.log(jwt.verify(token, process.env.REFRESH_SECRET), "...token verify");
    const decodedPayload = jwt.verify(token, process.env.ACCESS_SECRET)
    // console.log(decodedPayload, ",,,verify token");

    if (!decodedPayload) {
        throw new AppError(401, "Invalid token, Please Enter valid token")
    }

    req.user = decodedPayload;

    next()

})

module.exports = protectedMiddleware
