const mongoose = require("mongoose")


const mongoDB = async () => {
    try {
        const Mongo_URL = process.env.MONGO_URL
        await mongoose.connect(Mongo_URL)
        console.log("MongoDb Connected !!");

    } catch (error) {
        console.log("MongoDB connection failed ??", error.message);
        process.exit(1)
    }
}

module.exports = mongoDB
