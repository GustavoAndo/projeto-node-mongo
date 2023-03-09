const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Olá, Mundo!")
})

port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("Servidor rodando na porta", port)
})