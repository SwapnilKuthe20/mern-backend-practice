const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routers/authRouter');

const app = express()

app.use(helmet());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use('/api/v1/auth', authRouter)

app.use('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API running !!"
    })
})

app.use(errorMiddleware)

module.exports = app;
