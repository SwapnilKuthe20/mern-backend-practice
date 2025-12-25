require('dotenv').config();
const app = require('./app');
const mongoDB = require('./config/db');

const PORT = process.env.PORT;

(async () => {
    try {
        await mongoDB();

        app.listen(PORT, () => {
            console.log(`Server starts on Port : ${PORT}`);
        })
    } catch (error) {
        console.log("Error..", error);
        process.exit(1);
    }
})()
