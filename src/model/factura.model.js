const mongoose = require ('mongoose');
const {Schema} = require ('mongoose');

let facturaSchema = new Schema ({

    numeroFactura: {type: Number, required: true},    
    cliente: {type: String, required: true},
    fecha: {type: Date, required: true},
    numPedido: {type: Number, required: true},
    lugarEntrega: {type: String, required: true},
    modoPago: {type: String, required: true},
});

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;