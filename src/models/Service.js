const mongoose = require("mongoose")

const { Schema } = mongoose

const serviceSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

const Service = mongoose.model("Service", serviceSchema)

module.exports = {
    Service,
    serviceSchema
}