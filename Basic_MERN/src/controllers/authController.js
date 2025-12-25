const userModel = require("../models/User")
const generateToken = require("../services/jwt")

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // console.log(name, email, pass, role, "...req.body");

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "name, email and password are compulsory fields " })
        }

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(400).json({ success: false, message: "Email already registered" })
        }

        await userModel.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            success: true,
            message: "User signup successfully",
            user: { name, email }
        })

    } catch (error) {
        console.log("Something went wrong....", error.message);
        return res.status(500).json({ success: false, message: "signup failed" })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // console.log(email, "...email");
        // console.log(password, "...password");

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" })
        }

        const userLogin = await userModel.findOne({ email }).select("+password")

        console.log(userLogin, "...user doc instance");


        if (!userLogin) {
            return res.status(400).json({ success: false, message: "Invalid email or password" })
        }

        const validPass = await userLogin.comparePassword(password, userLogin.password)

        console.log(validPass, "...is valid");

        if (!validPass) {
            return res.status(400).json({ success: false, message: "Invalid credential" })
        }

        const accessToken = generateToken({ sub: userLogin._id, role: userLogin.role }, { expiresIn: "15m" })
        const refreshToken = generateToken({ sub: userLogin._id, role: userLogin.role }, { expiresIn: "7d" })

        return res.status(200).json({
            success: true,
            message: "User login successfully",
            accessToken,
            user: {
                id: userLogin._id,
                email: userLogin.email,
                role: userLogin.role
            }
        })

    } catch (error) {
        console.log("Something wemt wrong....", error);
        return res.status(500).json({ success: false, message: "login failed" })
    }
}

module.exports = {
    signupController,
    loginController
}

