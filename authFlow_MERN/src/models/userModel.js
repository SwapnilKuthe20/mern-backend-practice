const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "name should be atleast 3 characters"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        index: true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Please enter valid email Id"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
        minlength: [8, "Password should be 8 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

userSchema.pre("save", async function () {

    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePass = async function (password) {
    return bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;