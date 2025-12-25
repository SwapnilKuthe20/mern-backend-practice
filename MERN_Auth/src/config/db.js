const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

const mongoDB = async () => {
    try {

        await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected !!");

    } catch (error) {
        console.log("MongoDB connection failed ??", error);
        process.exit(1)
    }
}

module.exports = mongoDB

