const express = require("express")
const cors = require("cors")


//importacion de routes
const Mercado_Pago = require("./router/MercadoPago.js")


const server = express()




// middelware
server.use(express.json())
server.use(cors())
server.use("/mercado-pago",Mercado_Pago)


module.exports = server;