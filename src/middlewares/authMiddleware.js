const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: "Acesso negado!"})
    }
    
    try {
        const dataUser = jwt.verify(token, process.env.SECRET)
        res.locals = {id: dataUser.id, profile: dataUser.profile}

        next()
    } catch (error) {
        res.status(400).json({msg: "Token inválido"})
    }
}

const checkManager = (req, res, next) => {
    const { profile } = res.locals

    if (profile !== "manager" && profile !== "admin") {
        return res.status(401).json({msg: "Acesso negado!"})
    }

    next()
}

const checkAdmin = (req, res, next) => {
    const { profile } = res.locals

    if (profile !== "admin") {
        return res.status(401).json({msg: "Acesso negado!"})
    }

    next()
}


module.exports = {checkToken, checkManager, checkAdmin}