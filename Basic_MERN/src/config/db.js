const mongoose = require("mongoose")

const Mongo_Url = process.env.MONGO_URL

const mongoDB = async () => {
    try {
        await mongoose.connect(Mongo_Url)
        console.log("Mongo Connected !!");
    } catch (error) {
        throw new Error(`MongoDB connection failed: ${error.message}`)
    }
}

module.exports = mongoDB



