const mongoose = require('../config/db.js')
const { Schema } = mongoose

//Estructura de la colección de usuarios
const usuarioSchema = new Schema({ 
    nombres : {
        type:String
    },
    apellidos : {
        type:String
    },
    usuario : {
        type:String,
        unique:true
    },
    correo : {
        type:String,    
        unique:true 
    },
    clave : {
        type:String
    }
})

//Correspondencia de la colección en la base de datos 
const Usuario = mongoose.model('Usuarios', usuarioSchema)

module.exports=Usuario;