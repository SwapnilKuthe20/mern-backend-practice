const { signupService, loginService, refreshTokenServices } = require("../services/authServices");
const catchAsync = require("../utils/catchAsync");

const signupController = catchAsync(async (req, res) => {

    const user = await signupService(req.body)

    return res.status(201).json({
        success: true,
        message: "User created Succefully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
})

const loginController = catchAsync(async (req, res) => {

    // console.log(Object.getOwnPropertyNames(res.__proto__.__proto__), "...res obj");


    const { existUser, accessToken, refreshToken } = await loginService(req.body)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,         // js cant access cookie // xss atatct protection
        secure: true,           // cookie send over on https 
        sameSite: "strict",     // accept only own site req
        maxAge: 7 * 24 * 60 * 60 * 1000    // 7days    expiry
    })

    return res.status(200).json({
        success: true,
        message: "User login Successfully !!",
        data: {
            accessToken,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email
            }
        }
    })
})

const refreshTokenController = catchAsync(async (req, res) => {

    // console.log(req.cookies.refreshToken, "....req");

    const refreshToken = req.cookies.refreshToken;
    const accessToken = await refreshTokenServices(refreshToken)

    res.status(200).json({
        success: true,
        message: "access token renew success",
        accessToken
    })
})

module.exports = {
    signupController,
    loginController,
    refreshTokenController
}
