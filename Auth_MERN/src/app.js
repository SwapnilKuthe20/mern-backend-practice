const express = require('express')
const helmet = require('helmet')
const cors = require("cors")
const router = require('./routes/authRoutes')

const app = express()

app.use(helmet())

app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}))

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    })
})

app.use('/api/v1/auth', router)

app.use((err, req, res, next) => {
    console.error(err.stack, "...error stack ")

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

module.exports = app
