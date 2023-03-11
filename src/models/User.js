const mongoose = require("mongoose")

const { Schema } = mongoose

const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: Number,
            required: true,
            select: false
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = {
    User,
    userSchema
}