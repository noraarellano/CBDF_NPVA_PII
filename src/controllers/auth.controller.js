const Usuario = require('../models/auth.model');
const usuarios = require('../models/auth.model');
const bcrypt = require('bcrypt')

exports.login = async(req, res)=>{
    try{
        const{correo, clave} = req.body;
        if(correo==undefined|| clave==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Faltan parámetros"
            })
        }else{
            const usuario = await usuarios.findOne({correo:correo});
            if(!usuario){
                res.status(404).json({
                    estado:0,
                    mensaje:"Usuario no encontrado"
                })
            }else{
                //Comparar las claves
                const resultadoComparacion =await bcrypt.compare(clave, usuario.clave);
                if(resultadoComparacion){
                    //Temporalmente 
                    res.status(200).json({
                        estado:1,
                        mensaje:"Acceso correcto"
                    })
                }else{
                    res.status(401).json({
                        estado:0,
                        mensaje:"Clave incorrecta"
                    })
                }
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
    }
}

exports.getAllUser = async(req,res)=>{
    try{
        const Usuarios = await Usuario.find();
        res.status(200).json({
            estado: 1,
            mensaje: "Usuarios encontrados",
            Usuarios : Usuarios
        })
    }catch(error){
        res.status(500).json({
            estado:0,
            mensaje:"Usuarios no encontrados"
        })
    }
}

exports.getAllUserByEmail = async(req,res)=>{
    try {
          const {correo} = req.params;
          const usuario = await Usuario.findOne({correo:correo}).exec();
            if(usuario){
                res.status(200).json({
                    estado:1,
                    mensaje:"Usuario encontrado",
                    usuario:usuario
                })
            }else{
                res.status(400).json({
                    estado:0,
                    mensaje:"Usuario no encontrado"
                })
            }
    }catch(error){
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
        console.log(error);
    }
}

exports.addUser = async(req, res)=>{
    try{
        const{nombres, apellidos, usuario, correo, clave} = req.body;
        if(nombres == undefined || apellidos == undefined || usuario == undefined || correo == undefined || clave == undefined){
           res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros"
           })
           //Falta encriptar la clave
        }else{
            const NuevoUsuario = await Usuario.create({nombres, apellidos, usuario, correo, clave})
            if(NuevoUsuario){
                res.status(200).json({
                    estado:1,
                    mensaje:"Usuario creado con éxito",
                    usuario:NuevoUsuario
                })
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Ocurrió un error desconocido"
                })
            }
        }  
    }catch(error){
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
        //Programador
        console.log(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        // Qué datos actualizamos
        const { correo } = req.params;
        const { nombres, apellidos, clave } = req.body;

        if (nombres === undefined || apellidos === undefined || clave === undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan parámetros"
            });
        } else {
            // Se requiere escribir la nueva clave
            const salt = await bcrypt.genSalt(8);
            const claveEncriptada = await bcrypt.hash(clave, salt);

            await Usuario.findOneAndUpdate({ correo: correo }, {
                nombres: nombres,
                apellidos: apellidos,
                clave: claveEncriptada
            });

            res.status(200).json({
                estado: 1,
                mensaje: "Usuario actualizado"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrió un error desconocido"
        });
    }
};

exports.deleteUser = async(req,res)=>{
    try {
          const {correo} = req.params;
          const usuario = await Usuario.findOne({correo}).exec();
          if(usuario){
            await Usuario.deleteOne(usuario)
            res.status(200).json({
                estado:1,
                mensaje:"Usuario eliminado"
            })
          }else{
            res.status(500).json({
                estado:0,
                mensaje:"Usuario no encontrado"
            })
          }
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido"
        })
    }
}