const {Service} = require("../models/Service")

const serviceController = {
    
    create: async (req, res) => {
        try {
            const { name, description, price, image } = req.body

            const response = await Service.create({
                name,
                description,
                price,
                image
            })

            res.status(201).json({response, msg: "Serviço criado com sucesso!"})
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}

module.exports = serviceController