const authRouter = require('express').Router()
const { signupController, loginController, refreshController, logoutController } = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const protectedMiddleware = require('../middlewares/protectedMiddleware')

authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.post('/refresh-token', refreshController)
authRouter.post('/logout', logoutController)
authRouter.get('/home', protectedMiddleware, homeController)


module.exports = authRouter