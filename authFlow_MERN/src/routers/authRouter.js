const authRouter = require('express').Router()
const ROLES = require('../config/roles')
const { signupController, loginController, refreshController, logoutController, adminController, logoutAllController, resetPasswordController } = require('../controllers/authController')
const homeController = require('../controllers/homeController')
const protectedMiddleware = require('../middlewares/protectedMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.post('/refresh-token', refreshController)
authRouter.post('/logout', logoutController)
authRouter.get('/home', protectedMiddleware, homeController)
authRouter.get('/admin', protectedMiddleware, roleMiddleware(ROLES.ADMIN), adminController)
authRouter.post('/logout-all', protectedMiddleware, logoutAllController)
authRouter.post('/reset-password', protectedMiddleware, resetPasswordController)

module.exports = authRouter
