const {User} = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

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
                password: await hashPassword(password),
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
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
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

            const user = await User.findById(id)
              
            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado." })
            }

            const deletedUser = await User.findByIdAndDelete(id)

            res.status(200).json({deletedUser, msg: "Usuário excluído com sucesso"})
        } catch (error) { 
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    update: async(req, res) => {
        try {
            const { id } = req.params
            const { name, email, profile } = req.body

            if (!name) {
                return res.status(422).json({msg: 'O nome é obrigatório.'})
            }
            if (!email){
                return res.status(422).json({msg: 'O email é obrigatório.'})
            }

            if (profile && !["user", "manager", "admin"].includes(profile)){
                return res.status(422).json({msg: 'Perfil inválido.'})
            }

            const userExists = await User.findOne({email})
            const oldUser = await User.findById(id)

            if (email != oldUser.email && userExists) {
                return res.status(422).json({msg: 'Por favor, utilize outro email.'})
            }

            const user = {
                name,
                email,
                profile
            }
    
            const updatedUser = await User.findByIdAndUpdate(id, user)
    
            if (!updatedUser) {
                return res.status(404).json({msg: "Usuário não encontrado"})
            } 
    
            res.status(200).json({user, msg: "Usuário atualizado com sucesso."})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    },

    updatePassword: async(req, res) => {
        try {
            const { id } = req.params
            const { password } = req.body

            if (!password) {
                return res.status(422).json({msg: 'A senha é obrigatória.'})
            }
    
            const updatedUser = await User.findByIdAndUpdate(id, {password: await hashPassword(password)})
    
            if (!updatedUser) {
                return res.status(404).json({msg: "Usuário não encontrado"})
            } 
    
            res.status(200).json({msg: "Senha atualizada com sucesso."})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
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

            const token = jwt.sign({id: user._id, profile: user.profile}, process.env.SECRET ?? '', {expiresIn: "8h"})
            
            res.status(200).json({token, msg: "Autenticação realizada com sucesso"})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Oops! Ocorreu um erro no servidor, tente novamente mais tarde!"})
        }
    }

}

module.exports = userController