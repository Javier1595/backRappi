const usuarioController = {};
const Usuario = require('../model/usuario.model');
const jwt = require('jsonwebtoken');

usuarioController.getUsuarios = async (req,res) =>{ 
    try {
        const usuarios = await Usuario.find({});
        if(Object.entries(usuarios).length === 0){
            res.status(200).send("No se encontraron usuarios en el sistema");
        }else{
            res.status(200).json(usuarios);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar los usuarios");
    }
};
usuarioController.getUsuario = async (req,res) =>{
    try {
        const usuario = await Usuario.findOne({documento:req.params.documento});
        if(usuario === null){
            res.status(200).send("No se encontró el usuario en el sistema");
        }else{
            res.status(200).json(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al consultar el usuario");
    }
};
usuarioController.createUsuario = async (req,res) =>{
    try {
        const usuarioTemp = {
            documento: req.body.documento,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direcciones: req.body.direcciones,
            correo: req.body.correo,
            clave: req.body.clave,
            token: ""
        };
        let createUsuario = new Usuario(usuarioTemp);
        await createUsuario.save();
        res.status(201).send('Usuario creado exitosamente');
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear el usuario");
    }
};
usuarioController.editUsuario = async (req,res) =>{
    try{
        const usuario = await Usuario.findOne({documento:req.params.documento});
        if(usuario === null){
            res.status(200).send("No se encontró el usuario en el sistema");
        }else{
            const usuarioTemp = {
                documento: req.body.documento,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                direcciones: req.body.direcciones,
                correo: req.body.correo,
                clave: req.body.clave
            };
            await Usuario.updateOne({documento: req.params.documento},usuarioTemp);
            res.status(201).send('Usuario actualizado exitosamente');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al editar el usuario");
    }
};
usuarioController.deleteUsuario = async (req,res) =>{
    try {
        const usuario = await Usuario.findOne({documento:req.params.documento});
        if(usuario === null){
            res.status(200).send("No se encontró el usuario en el sistema");
        }else{
            await Usuario.deleteOne(usuario);
            res.status(200).send('Usuario eliminado exitosamente');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al eliminar el usuario");
    }
};

usuarioController.tokenUsuario = async (req, response) => {
    try {
        //Busca que la clave enviada desde el front no este vacia
        const {documento} = req.body;
        const {clave} = req.body;
        if(!(clave) || !(documento)){
            response.status(200).send('credenciales requeridas');
        }else{
            const usr = await Usuario.findOne({documento:documento});
            if(usr != null){//Verifica que exista la persona en la BD
                //Se firma el token, anexando una clave privada del sistema en las variables de entorno
                if(usr.clave === clave){
                    const token = jwt.sign({userId:usr._id, correo:usr.correo, nombre:usr.nombre, apellido:usr.apellido}, process.env.TOKEN_KEY, {
                        expiresIn:"24h"//Cantidad de tiempo para expirar el token
                    })
                    await Usuario.updateOne({documento:documento},{token:token})
                    response.status(200).json(token);
                }else{
                    response.status(200).send('Clave incorrecta');     
                }
            }else{
                response.status(200).send('Usuario no encontrado');
            }
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("Ocurrio un error al iniciar sesión");
    }
};

module.exports = usuarioController;