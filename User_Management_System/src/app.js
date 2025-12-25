const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const app = express()

// security middleware
app.use(helmet())

// cors 
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Running")
})

// console.log("apppp....");

module.exports = app;
