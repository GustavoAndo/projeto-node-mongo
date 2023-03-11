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
        },
        profile: {
            type: String,
            enum: ['users', 'manager', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = {
    User,
    userSchema
}