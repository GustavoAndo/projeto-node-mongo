const {User} = require("../models/User")

const userController = {
    
    create: async (req, res) => {
        try {
            const { name, email, password, profile } = req.body

            if (!name) {
                return res.status(422).json({msg: 'O nome é obrigatório.'})
            }
            if (!email){
                return res.status(422).json({msg: 'O email é obrigatório.'})
            }
            if (!password){
                return res.status(422).json({msg: 'A senha é obrigatória.'})
            }

            if (profile && !["user", "manager", "admin"].includes(profile)){
                return res.status(422).json({msg: 'Perfil inválido.'})
            }

            const userExists = await User.findOne({email})

            if (userExists) {
                return res.status(422).json({msg: 'Por favor, utilize outro email.'})
            }

            const response = await User.create({
                name,
                email,
                password,
                profile
            })

            delete response._doc.password

            res.status(201).json({response, msg: "Usuário criado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },
    
}

module.exports = userController