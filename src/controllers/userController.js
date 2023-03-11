const {User} = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    getAll: async(req, res) => {
        try {
            const users = await User.find()

            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    },

    get: async(req, res) => {
        try {
            const id = req.params.id
            
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(404).json({ msg: "Id inválido." })
            }

            const user = await User.findById(id)
              
            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado." })
            }

            res.json(user)
        } catch (error) {
            res.status(500).json({error})
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email) {
                return res.status(422).json({ msg: "O email é obrigatório"})
            }

            if (!password) {
                return res.status(422).json({ msg: "A senha é obrigatória"})
            }

            const user = await User.findOne({email}).select("+password")

            if (!user) {
                return res.status(422).json({msg: "Usuário não encontrado."})
            }
            
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                return res.status(422).json({msg: "Senha inválida"})
            }

            const token = jwt.sign({id: user._id}, process.env.SECRET)
            
            res.status(200).json({token, msg: "Autenticação realizada com sucesso"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

}

module.exports = userController