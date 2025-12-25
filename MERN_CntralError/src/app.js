const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const router = require("./routers/authRouter")

const app = express()

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}))

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API running...."
    })
})

app.use('/api/v1/auth', router)
app.use('/api/v1/auth', router)

const errorHandler = (err, req, res, next) => {
    console.log("Error occured..", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    })
}

app.use(errorHandler)

module.exports = app

