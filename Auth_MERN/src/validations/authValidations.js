

const signupValidation = (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "name, email and password are mandatory"
        })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be 6 chars" });
    }

    next()
}

const loginValidation = (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "email and password required..!!"
        })
    }

    next()
}

module.exports = {
    signupValidation,
    loginValidation
}
