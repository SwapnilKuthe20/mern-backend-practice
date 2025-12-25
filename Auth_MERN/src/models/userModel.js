const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "name must be atleast 3 characters"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email.. please enter correct email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be 6 characters"],
        trim: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


userSchema.pre("save", async function () {
    // Agar password change hi nahi hua, to dobara hash mat karo
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePass = async function (pass) {
    return bcrypt.compare(pass, this.password)
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
