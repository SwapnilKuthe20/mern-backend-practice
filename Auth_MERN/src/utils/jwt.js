const jwt = require('jsonwebtoken')

const accessTokenGenerator = (payload) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    )
}

const refreshTokenGenerator = (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    )
}

module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator
}
