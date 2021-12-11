const {Router} = require('express');
const router = Router();
const auth = require('../Auth/Auth');


const {getCategorias, getCategoria, createCategoria, editCategoria, deleteCategoria} = require('../controller/categoria.controller');

router.post('/categorias', auth, getCategorias);
router.post('/categoria/:codigo', auth, getCategoria);
router.post('/categoria', auth, createCategoria);
router.put('/categoria/:codigo', editCategoria);
router.delete('/categoria/:codigo', deleteCategoria);

module.exports = router;