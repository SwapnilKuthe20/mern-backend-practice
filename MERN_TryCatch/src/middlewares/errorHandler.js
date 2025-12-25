
const errorHandler = (err, req, res, next) => {
    console.log("🔥 Error Middleware Hit");
    console.log("Error..", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}

module.exports = errorHandler