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
            res.status(500).json({error})
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await Service.find()

            res.json(services)
        } catch (error) {
            res.status(500).json({error})
        }
    },

    get: async(req, res) => {
        try {
            const id = req.params.id
            
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).json({ msg: "Id inválido." })
                return
            }

            const service = await Service.findById(id)
              
            if (!service) {
                res.status(404).json({ msg: "Serviço não encontrado." })
                return
            }

            res.json(service)
        } catch (error) {
            res.status(500).json({error})
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id
            
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).json({ msg: "Id inválido." })
                return
            }

            const service = await Service.findOne({_id: id})
              
            if (!service) {
                res.status(404).json({ msg: "Serviço não encontrado." })
                return
            }

            const deletedService = await Service.findByIdAndDelete(id)

            res.status(200).json({deletedService, msg: "Serviço excluído com sucesso"})
        } catch (error) { 
            res.status(500).json({error})
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).json({ msg: "Id inválido." })
                return
            }
    
            const { name, description, price, image } = req.body
    
            const service = {
                name,
                description,
                price,
                image
            }
    
            const updatedService = await Service.findByIdAndUpdate(id, service)
    
            if (!updatedService) {
                res.status(404).json({msg: "Serviço não encontrado"})
                return
            } 
    
            res.status(200).json({service, msg: "Serviço atualizado com sucesso."})
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = serviceController