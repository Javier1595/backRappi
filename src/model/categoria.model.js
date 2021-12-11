const mongoose = require('mongoose');
const {Schema} = require('mongoose');

let categoriaSchema = new Schema ({
    codigo: {type:String, required:true},
    nombre: {type:String, required:true},
    descripcion: String
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;