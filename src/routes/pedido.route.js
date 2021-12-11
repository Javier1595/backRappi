const { Router } = require("express")
const router = Router();
const auth = require('../Auth/Auth');

const {getPedidos, getPedido, createPedido, editPedido, deletePedido } = require ('../controller/pedido.controller');

router.get('/pedidos', auth, getPedidos); // pedir todos los pedidos
router.get('/pedido/:numeroPedido', auth, getPedido); // pedir un solo pedido
router.post('/pedido', auth, createPedido); // Crear un pedido
router.put('/pedido/:numeroPedido', auth, editPedido); // Editar un pedido
router.delete('/pedido/:numeroPedido', auth, deletePedido); // Eliminar un pedido

module.exports = router;