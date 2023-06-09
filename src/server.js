// imports
require('dotenv').config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())

// conexão com o banco
const conn = require("./config/connDb")
conn()

const routes = require("./routes/router")

app.use("/", routes)

app.get('/', (req, res) => {
    res.send("Olá, Mundo!")
})

port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("Servidor rodando na porta", port)
})