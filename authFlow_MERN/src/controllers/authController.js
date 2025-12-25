const { signupServices, loginServices, refreshServices } = require("../services/authServices")
const asyncCatch = require("../utils/asyncCatch")

const signupController = asyncCatch(async (req, res) => {

    const user = await signupServices(req.body);

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })

});

const loginController = asyncCatch(async (req, res) => {

    const { existUser, accessToken, refreshToken } = await loginServices(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        success: true,
        message: "User login successfully",
        data: {
            id: existUser._id,
            email: existUser.email,
            accessToken
        }
    })

})

const refreshController = asyncCatch(async (req, res) => {
    // console.log(req.cookies.refreshToken, "...req");

    const { user, newAccessToken } = await refreshServices(req)

    return res.status(200).json({
        success: true,
        message: "New Access Token Generate successfully",
        data: {
            id: user.id,
            role: user.role,
            accessToken: newAccessToken
        }
    })

})

const logoutController = asyncCatch(async (req, res) => {

    // console.log(res.__proto__.__proto__, "...res API");

    res.clearCookie("refresh", {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    })

    return res.status(200).json({
        success: true,
        message: "User Logout successfully"
    })
})

module.exports = {
    signupController,
    loginController,
    refreshController,
    logoutController
}
