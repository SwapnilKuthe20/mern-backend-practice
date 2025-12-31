const { googleAuthServices } = require("../services/googleAuthServices");
const asyncCatch = require("../utils/asyncCatch");

const googleRedirectController = asyncCatch(async (req, res) => {

})

const googleCallbackController = asyncCatch(async (req, res) => {

    const { user, accessToken, refreshToken } = googleAuthServices(req);

    // refresh token cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        message: "Google login successful",
        accessToken,
        user
    });
})

module.exports = {
    googleRedirectController,
    googleCallbackController
}
