const { signupServices, loginServices } = require("../services/authServices");

const signupController = async (req, res, next) => {
    try {

        const user = await signupServices(req.body)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.log("Something went wrong...", error);
        next(error)
    }
}

const loginController = async (req, res, next) => {
    try {

        const { isUserExist, accessToken } = await loginServices(req.body)

        return res.status(200).json({
            success: true,
            message: "User login successfully !!",
            user: {
                id: isUserExist._id,
                name: isUserExist.name,
                accessToken
            }
        })

    } catch (error) {
        console.log("something went wrong !!", error);
        next(error)
    }
}

module.exports = {
    signupController,
    loginController
}
