const {Router} = require("express");
const router = Router();
const auth = require('../Auth/Auth');


const{getUsuarios, tokenUsuario, getUsuario, createUsuario, editUsuario, deleteUsuario} = require('../controller/usuario.controller');

router.post('/usuarios', auth, getUsuarios); // pedir todos los usuarios
router.post('/usuario/tokenUsuario', tokenUsuario); // Crear Token
router.post('/usuario/:documento',auth, getUsuario); // pedir un solo usuario
router.post('/usuario',auth, createUsuario); // Crear un usuario
router.put('/usuario/:documento', editUsuario); // Editar un usuario
router.delete('/usuario/:documento', deleteUsuario); // Eliminar un usuario

module.exports = router;