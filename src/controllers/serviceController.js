const {Service} = require("../models/Service")

const serviceController = {
    
    create: async (req, res) => {
        try {
            const { name, description, price } = req.body

            if (!name) {
                return res.status(422).json({msg: 'O nome é obrigatório.'})
            }
            if (!price){
                return res.status(422).json({msg: 'O preço é obrigatório.'})
            }

            const response = await Service.create({
                name,
                description,
                price
            })

            res.status(201).json({response, msg: "Serviço criado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    getAll: async (req, res) => {
        try {
            const services = await Service.find()

            res.json(services)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
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
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    delete: async(req, res) => {
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

            const deletedService = await Service.findByIdAndDelete(id)

            res.status(200).json({deletedService, msg: "Serviço excluído com sucesso"})
        } catch (error) { 
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {  
                return res.status(404).json({ msg: "Id inválido." })
            }
    
            const { name, description, price } = req.body

            if (!name) {
                return res.status(422).json({msg: 'O nome é obrigatório.'})
            }
            if (!price){
                return res.status(422).json({msg: 'O preço é obrigatório.'})
            }
    
            const service = {
                name,
                description,
                price
            }
    
            const updatedService = await Service.findByIdAndUpdate(id, service)
    
            if (!updatedService) {
                return res.status(404).json({msg: "Serviço não encontrado"}) 
            } 
    
            res.status(200).json({service, msg: "Serviço atualizado com sucesso."})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    }
}

module.exports = serviceController