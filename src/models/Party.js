const mongoose = require("mongoose")

const {Schema} = mongoose

const {serviceSchema} = require('./Service')
const {userSchema} = require('./User')

const partySchema = new Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: userSchema,
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
            type: [serviceSchema]
        },  
    }, 
    {timestamps: true}
)

const Party = mongoose.model("Party", partySchema)

module.exports = Party;