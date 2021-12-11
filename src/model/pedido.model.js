const mongoose = require ('mongoose');
const {Schema} = require ('mongoose');


let pedidoSchema = new Schema ({
    numeroPedido: {type: Number, required: true},
    cliente: {type: String, required: true},
    fecha: {type: Date, required: true},
    producto: {type: String, required: true},
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;