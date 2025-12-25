const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be atleast 3 characters"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter valid Email"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
        minlength: [8, "Password must be atleast 8 characters"]
    },
    role: {
        type: String,
        trim: true,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

})

userSchema.methods.comparePass = async function (pass) {
    return bcrypt.compare(pass, this.password);
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
