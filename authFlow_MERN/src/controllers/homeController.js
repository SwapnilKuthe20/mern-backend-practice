const asyncCatch = require("../utils/asyncCatch");

const homeController = asyncCatch(async (req, res) => {

    console.log("I am in Home controller...");

    return res.status(200).json({
        success: true,
        message: "Home Api running...."
    })

})

module.exports = homeController