const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "name must be atleast 3 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter valid Email ID"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: true,
        minlength: [8, "Password must be atleast 8 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        trim: true
    }

}, { timestamps: true })

const userModel = mongoose.model("User", userScheme)

module.exports = userModel