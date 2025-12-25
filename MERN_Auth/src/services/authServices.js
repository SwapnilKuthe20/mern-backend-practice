const { generateAccessToken, generateRefreshToken } = require("../config/generateToken");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken');

const signupService = async ({ name, email, password }) => {

    if (!email || !name || !password) {
        throw new AppError(400, "All fields are mandatory !!")
    }

    const existUser = await userModel.findOne({ email })
    if (existUser) {
        throw new AppError(401, "User already registered")
    }

    if (password.length < 8) {
        throw new AppError(400, "Password must be 8 character")
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    return user;
}

const loginService = async ({ email, password }) => {

    if (!email || !password) {
        throw new AppError("Email and passwords are mandatory")
    }

    const existUser = await userModel.findOne({ email }).select("+password")
    // console.log(existUser, "...exist user");

    if (!existUser) {
        throw new AppError(401, "Invalid credential")
    }

    const comparePass = await existUser.comparePass(password);
    // console.log(comparePass, "...comapre pass");

    if (!comparePass) {
        throw new AppError(401, "Invalid credentials.. Please enter valid credentials")
    }

    const accessToken = generateAccessToken({ id: existUser._id, email: existUser.email })
    const refreshToken = generateRefreshToken({ id: existUser._id, email: existUser.email })

    return {
        existUser,
        accessToken,
        refreshToken
    }
}

const refreshTokenServices = async (refreshToken) => {

    if (!refreshToken) {
        throw new AppError(401, "refeshToken missing")
    }

    const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    // console.log(decodedPayload, "....decodedPayload");

    if (!decodedPayload) {
        throw new AppError(401, "Refresh token is Invalid")
    }

    const newAccessToken = generateAccessToken({
        id: decodedPayload.id,
        email: decodedPayload.email
    })

    return newAccessToken;

}

module.exports = {
    signupService,
    loginService,
    refreshTokenServices
}


