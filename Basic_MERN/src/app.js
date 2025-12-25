const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(helmet())
app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true
}))

app.get("/", (req, res) => {
    res.send(`Home page... API runnig successfully !!`);
})

app.use('/api/v1/auth', authRoutes)

module.exports = app

console.log("appp.....");

