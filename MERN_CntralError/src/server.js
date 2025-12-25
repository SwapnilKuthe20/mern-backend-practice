require("dotenv").config()
const app = require("./app");
const mongoDB = require("./config/db");

const PORT = process.env.PORT || 2000;
// console.log(PORT, "...port");

(async () => {
    try {

        await mongoDB()

        app.listen(PORT, () => {
            console.log(`Server starts on PORT : ${PORT}`);
        })
    } catch (error) {
        console.log("ERROR..", error);
        process.exit(1)
    }
})()
