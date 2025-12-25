const jwt = require('jsonwebtoken')

const generateToken = (payload, expiresIn) => {
    return jwt.sign(
        payload,
        process.env.ACEESS_SECRET,
        expiresIn
    )
}

module.exports = generateToken
