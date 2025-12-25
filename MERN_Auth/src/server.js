require('dotenv').config();
const app = require('./app');
const mongoDB = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await mongoDB()

        app.listen(PORT, () => {
            console.log(`Server listen on PORT : ${PORT}`);
        })

    } catch (error) {
        console.log("Error Occured", error);
        process.exit(1)
    }
})()
