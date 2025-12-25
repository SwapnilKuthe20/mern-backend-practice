const express = require('express')
const helmet = require("helmet")
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

// app.use('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "API running..."
//     })
// })

app.get("/user", async (req, res, next) => {
    try {

        const user = null
        if (!user) {
            throw new Error("Password galat hai");
        }

        res.json(user)

    } catch (error) {
        next(error)
    }
});

// FINAL MINI TASK (practice karo)
// /register route banao
// Email missing ho to error throw karo
// next(err) se middleware bhejo
// JSON error response bhejo

app.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are mandatory !!")
        }

        res.status(200).json({
            success: true,
            message: "User register successfully !!"
        })

    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

module.exports = app
