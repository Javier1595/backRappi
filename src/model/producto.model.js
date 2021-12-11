const mongoose = require ('mongoose');
const {Schema} = require ('mongoose');


let productoSchema = new Schema ({
    categoria:  {type: String, required: true},
    nombre:  {type: String, required: true},
    codigo:  {type: String, required: true},
    descripcion:  {type: String, required: true},
    precio:  {type: Number, required: true},
    unidades:  {type: Number, required: true},
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;