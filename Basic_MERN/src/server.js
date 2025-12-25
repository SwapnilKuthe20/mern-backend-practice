require("dotenv").config()
const app = require("./app")
const mongoDB = require("./config/db")

const PORT = process.env.Port || 5000
console.log(PORT, "...port");

(async () => {
    try {
        await mongoDB()

        app.listen(PORT, () => {
            console.log(`Server starts on POrt : ${PORT}`);
        })
    } catch (error) {
        console.error("❌ Server failed", error);
        process.exit(1);
    }
})()

