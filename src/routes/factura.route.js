const {Router} = require("express")
const router = Router();
const auth = require('../Auth/Auth');

const {getFacturas, getFactura, createFactura, editFactura, deleteFactura } = require ('../controller/factura.controller');

router.get('/facturas', auth, getFacturas); // pedir todos los facturas
router.get('/factura/:numeroFactura', auth, getFactura); // pedir un solo factura
router.post('/factura', auth, createFactura); // Crear un factura
router.put('/factura/:numeroFactura', auth, editFactura); // Editar un factura
router.delete('/factura/:numeroFactura', auth, deleteFactura); // Eliminar un factura

module.exports = router;