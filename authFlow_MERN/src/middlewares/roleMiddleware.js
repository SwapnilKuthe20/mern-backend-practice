const AppError = require("../utils/AppError");

const roleMiddleware = (...roles) => {

    return (req, res, next) => {
        // console.log(roles, "...roles");
        // console.log(req.user.role, "...req user role");

        if (!req.user || !req.user.role) {
            throw new AppError(401, "User data missing !!")
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError(403, "You don't have permission to access this route")
        }

        next();
    }

}

module.exports = roleMiddleware;
