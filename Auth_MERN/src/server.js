require("dotenv").config()
const app = require("./app");
const mongoDB = require("./config/db");


(async () => {
    try {

        await mongoDB()

        const PORT = process.env.PORT || 5500
        // console.log(PORT, "...port");

        app.listen(PORT, () => {
            console.log(`Server starts on PORT : ${PORT}`);
        })

    } catch (error) {
        console.log("Error occured !!", error);
        process.exit(1)
    }
})()

