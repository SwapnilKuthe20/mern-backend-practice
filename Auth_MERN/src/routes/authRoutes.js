const { signupController, loginController } = require("../controllers/authController")
const { signupValidation, loginValidation } = require("../validations/authValidations")

const router = require("express").Router()

router.post("/signup", signupValidation, signupController)
router.post("/login", loginValidation, loginController)


module.exports = router