const userModel = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../config/generateToken");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken')

const signupServices = async ({ name, email, password }) => {

    if (!name || !email || !password) {
        throw new AppError(400, "All fields are mandatory");
    }

    if (password.length < 8) {
        throw new AppError(400, "Password must be 8 Character")
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
        throw new AppError(400, "User already registered")
    }

    const user = await userModel.create({
        name, email, password
    })

    return user;
}

const loginServices = async ({ email, password }) => {

    if (!email || !password) {
        throw new AppError(400, "email and Password are compulsory fields")
    }

    const existUser = await userModel.findOne({ email }).select("+password");
    if (!existUser) {
        throw new AppError(400, "Email is not registered")
    }

    const comparePass = await existUser.comparePass(password);
    // console.log(comparePass, "...comapre pass");

    if (!comparePass) {
        throw new AppError(400, "Invalid credentials")
    }

    const accessToken = generateAccessToken({ id: existUser._id, role: existUser.role });
    const refreshToken = generateRefreshToken({ id: existUser._id, role: existUser.role });

    // console.log(accessToken, "...accessToken");
    // console.log(refreshToken, "...refreshToken");

    return {
        existUser,
        accessToken,
        refreshToken
    };
}

const refreshServices = async (req) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(401, "Authorisation Error : Token Missing")
    }

    const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    // console.log(decodedPayload, "...decode payload refresh");

    const newAccessToken = generateAccessToken({ id: decodedPayload._id, role: decodedPayload.role })

    return {
        user: decodedPayload,
        newAccessToken
    }

}

module.exports = {
    signupServices,
    loginServices,
    refreshServices
}