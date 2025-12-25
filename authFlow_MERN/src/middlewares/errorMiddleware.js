
const errorMiddleware = (err, req, res, next) => {
    console.log("Error middleare run..", err);
    // console.log(req, "...req");
    console.log(err.status, "...error status");

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    res.status(status).json({
        success: false,
        message: message
    })

}

module.exports = errorMiddleware;
