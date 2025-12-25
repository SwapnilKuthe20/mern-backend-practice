const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be minimum 2 character"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Email format is wrong"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password length must be minimum 4"],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "Role must be user or admin only"
        },
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


userSchema.pre("save", async function () {
    //  password agr change nhi hua, to dobara hash mt kro
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;

