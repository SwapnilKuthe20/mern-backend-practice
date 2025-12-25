require('dotenv').config();
const app = require('./app');
const mongoDB = require('./config/db');

(async () => {
    try {
        await mongoDB()

        const PORT = process.env.PORT || 4000
        app.listen(PORT, () => {
            console.log(`Server starts on PORT : ${PORT}`);
        })
    } catch (error) {
        console.log("Error Occured !!", error);
        process.exit(1)
    }
})()

