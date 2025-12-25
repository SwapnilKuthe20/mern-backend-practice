const { signupController, loginController } = require('../controllers/authcontroller');

const router = require('express').Router()
// console.log(router, "...router");

router.post('/signup', signupController)
router.post('/login', loginController)


module.exports = router
