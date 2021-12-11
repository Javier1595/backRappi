const { Router } = require("express");
const router = Router();
const auth = require('../Auth/Auth');

const {getProductos, getProducto, createProducto, editProducto, deleteProducto } = require ('../controller/producto.controller');

router.post('/productos',auth, getProductos); // pedir todos los productos
router.post('/producto/:codigo', auth, getProducto); // pedir un solo producto
router.post('/producto', auth, createProducto); // Crear un producto
router.put('/producto/:codigo', editProducto); // Editar un producto
router.delete('/producto/:codigo', deleteProducto); // Eliminar un producto

module.exports = router;