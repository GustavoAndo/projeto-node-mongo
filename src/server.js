const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

const conn = require("./db/conn")
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