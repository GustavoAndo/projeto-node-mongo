const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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
            type: String,
            required: true,
            select: false
        },
        profile: {
            type: String,
            enum: ['user', 'manager', 'admin'],
            required: true,
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