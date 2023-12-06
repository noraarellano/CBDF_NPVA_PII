const { model } = require("mongoose")

const mongoose =  require('mongoose')
const urlRemota = "mongodb+srv://norapatricianoris:noramongo1@cluster0-npva.pris9ma.mongodb.net"
mongoose.connect(urlRemota)
module.exports = mongoose;

