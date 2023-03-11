const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({msg: "Acesso negado!"})
    }
    
    try {
        jwt.verify(token, process.env.SECRET)

        next()
    } catch (error) {
        res.status(400).json({msg: "Token inválido"})
    }
}

module.exports = checkToken