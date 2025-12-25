require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")

const port = process.env.PORT || 5000
    // console.log(port, "...port");

    (async () => {
        try {
            await connectDB();

            console.log("connect.....");


            app.listen(port, () => {
                console.log(`Server starts on Port : ${port}`);
            })
        } catch (err) {
            console.error("Server failed to start..", err);
            process.exit(1);

            // console.error("MongoDB connection failed:", err.message);
            // throw err;
        }
    })()




