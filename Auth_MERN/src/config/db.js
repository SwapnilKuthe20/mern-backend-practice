const mongoose = require('mongoose')

const Mongo_url = process.env.MONGO_URL
// console.log(Mongo_url, "...mongo url");


const mongoDB = async () => {
    try {
        await mongoose.connect(Mongo_url)
        console.log("MongoDB connected !!");

    } catch (error) {
        console.log("MonogoDb connection failed !!", error);
        process.exit(1)
    }
}

module.exports = mongoDB