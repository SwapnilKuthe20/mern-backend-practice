const mongoose = require("mongoose")

const mongo = process.env.MONGO_URL
console.log(mongo, "...MONGO_URL");

const connectDB = async () => {
    await mongoose.connect(mongo)
    console.log("MongoDB connected");
}

module.exports = connectDB;
