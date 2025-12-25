
const errorHandler = (err, req, res, next) => {
    console.log("Error handler run...", err);

    const status = err.statusCode || 500;
    const message = err.isOpertional ? err.message : "Something went wrong"

    return res.status(status).json({
        success: false,
        message: message
    })
}

module.exports = errorHandler;
