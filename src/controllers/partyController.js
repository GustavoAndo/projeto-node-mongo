const Party = require("../models/Party")

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)
    // A linha acima seria fazer um for desse modo:
    // let priceSum = 0
    // for (i=0; i<services.length; i++){
    //    priceSum += services[i].price
    // }

    if (priceSum > budget) {
        return false
    }

    return true
}

const partyController = {

    create: async (req, res) => {
        try{
            const { title, author, description, budget, services } = req.body

            if (!title) {
                return res.status(422).json({msg: 'O título é obrigatório.'})
            }
            if (!author){
                return res.status(422).json({msg: 'O autor é obrigatório.'})
            }
            if (!budget){
                return res.status(422).json({msg: 'O orçamento é obrigatório.'})
            }

            if (services && !checkPartyBudget(budget, services)) {
                return res.status(406).json({msg: "O seu orçamento é insuficiente"})
            }

            const response = await Party.create({
                title,
                author,
                description,
                budget,
                services
            })

            res.status(201).json({response, msg: "Festa criada com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    getAll: async (req, res) => {
        try {
            const parties = await Party.find()

            res.json(parties)
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

            const party = await Party.findById(id)
              
            if (!party) {
                return res.status(404).json({ msg: "Festa não encontrada." })
            }

            res.json(party)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id
            
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(404).json({ msg: "Id inválido." })
            }

            const party = await Party.findById(id)
              
            if (!party) {
                return res.status(404).json({ msg: "Festa não encontrada." })
            }

            const deletedParty = await Party.findByIdAndDelete(id)

            res.status(200).json({deletedParty, msg: "Festa excluída com sucesso"})
        } catch (error) { 
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id
            const { title, author, description, budget, services } = req.body
            
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(404).json({ msg: "Id inválido." })
            }

            if (!title) {
                return res.status(422).json({msg: 'O título é obrigatório.'})
            }
            if (!author){
                return res.status(422).json({msg: 'O autor é obrigatório.'})
            }
            if (!budget){
                return res.status(422).json({msg: 'O orçamento é obrigatório.'})
            }

            if (services && !checkPartyBudget(budget, services)) {
                return res.status(406).json({msg: "O seu orçamento é insuficiente"})
            }

            const party = {
                title,
                author,
                description,
                budget,
                services
            }
    
            const updatedParty = await Party.findByIdAndUpdate(id, party)
    
            if (!updatedParty) {
                return res.status(404).json({msg: "Festa não encontrada"})
            } 
    
            res.status(200).json({party, msg: "Festa atualizada com sucesso."})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    }
}

module.exports = partyController