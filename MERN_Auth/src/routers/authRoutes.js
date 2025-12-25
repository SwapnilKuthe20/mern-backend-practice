const router = require('express').Router();
const { signupController, loginController, refreshTokenController } = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const protectedMiddleware = require('../middlewares/protectedMiddleware');

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/refresh-token', refreshTokenController)

router.get('/home', protectedMiddleware, homeController)

module.exports = router
