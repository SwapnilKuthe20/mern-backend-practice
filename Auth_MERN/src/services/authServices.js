const userModel = require("../models/userModel");

const { accessTokenGenerator, refreshTokenGenerator } = require("../utils/jwt")

const signupServices = async ({ name, email, password }) => {

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await userModel.create({
        name, email, password, isActive: true
    })

    return user
}

const loginServices = async ({ email, password }) => {

    const isUserExist = await userModel.findOne({ email }).select("+password")
    // console.log(isUserExist, "...isUser exist ?");

    if (!isUserExist) {
        throw new Error("Invalid credentials");
    }

    const isPassMatch = await isUserExist.comparePass(password)
    // console.log(isPassMatch, "...pass match");

    if (!isPassMatch) {
        throw new Error("Invalid credentials");
    }

    const accessToken = accessTokenGenerator({ id: isUserExist._id, role: isUserExist.role })
    const refreshToken = refreshTokenGenerator({ id: isUserExist._id, role: isUserExist.role })

    return {
        isUserExist,
        accessToken
    }
}

module.exports = {
    signupServices,
    loginServices
}


