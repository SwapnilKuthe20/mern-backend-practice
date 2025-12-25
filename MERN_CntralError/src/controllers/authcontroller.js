const userModel = require("../models/userModel");

const signupController = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(name, email, password, "....req body");

        if (!name || !email || !password) {
            const err = new Error("Name, Email and Password are mandatory..!")
            err.statusCode = 400
            throw err
        }

        // const user = await userModel.create({
        //     name,
        //     email,
        //     password
        // })

        // console.log(user, "...user");
        // if (!user) {
        //     throw new Error(400, "user not created")
        // }


    } catch (error) {
        console.log(error, "...errr");

        console.log(error.statusCode, "...error in catch signup");
        console.log(error.code, "...error in catch signup");
        console.log(error.message, "...error in catch signup");
    }
}

const loginController = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    signupController,
    loginController
}
