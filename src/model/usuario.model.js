const mongoose = require('mongoose');
const {Schema} = require('mongoose');

let usuarioSchema = new Schema({
    documento: {type: String, required: true}, //Atributo requerido
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: String, //Atributo no requerido
    direcciones: [{direccion: String, ciudad: String}], //Objeto
    correo:{type: String, required: true},
    clave:{type: String, required: true},
    token: String
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;