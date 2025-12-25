const mongoose = require('mongoose');

const Mongo_Url = process.env.MONGO_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(Mongo_Url);
        console.log("MongoDB connected");

    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1)
    }
}

module.exports = mongoDB;