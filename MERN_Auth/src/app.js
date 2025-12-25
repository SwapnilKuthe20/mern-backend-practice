const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/authRoutes');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser());

app.use('/api/v1/auth', router);
app.use('/api/v1', router);

app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API running...!!"
    })
})

app.use(errorHandler);

module.exports = app;
