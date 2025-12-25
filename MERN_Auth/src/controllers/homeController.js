const catchAsync = require("../utils/catchAsync");

const homeController = catchAsync(async(req, res) => {
    console.log("I am in home...");


    res.status(200).json({
        success: true,
        message: "Login api run..."
    })

})

module.exports = homeController;