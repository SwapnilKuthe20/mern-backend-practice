const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protectedMiddleware = (req, res, next) => {
    let token;

    console.log(req.headers.authorization, "...req.headers.authorization");


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log(token, "...token");


    if (!token) {
        return next(new AppError(401, "Not authorized"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    req.user = decoded; // 🔥 IMPORTANT
    next();
}


module.exports = protectedMiddleware;   