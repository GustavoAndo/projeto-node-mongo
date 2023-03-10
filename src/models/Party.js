const mongoose = require("mongoose")

const {Schema} = mongoose

const {serviceSchema} = require('./Service')

const partySchema = new Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        budget: {
            type: String,
            required: true
        },
        services: {
            type: [serviceSchema],
            default: []
        },  
    }, 
    {timestamps: true}
)

const Party = mongoose.model("Party", partySchema)

module.exports = Party;