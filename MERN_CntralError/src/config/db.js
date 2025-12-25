const mongoose = require("mongoose");

const Mongo_URL = process.env.MONGO_URL
// console.log(Mongo_URL, "...mongo url");

const mongoDB = async () => {
    try {

        mongoose.connect(Mongo_URL)
        console.log("MongoDB connected..!!");

    } catch (error) {
        console.log("MongoDB DisConnected !!", error);
        process.exit(1)
    }
}

module.exports = mongoDB
