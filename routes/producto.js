//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/producto');
const { existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/mostrar', getProductos);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
],postProducto);

router.put('/editar/:id', [
    validarJWT,
    check('id').custom( existeProductoPorId ),
    validarCampos
], putProducto);

router.delete('/eliminar/:id', [
    validarJWT, 
    esAdminRole,
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],deleteProducto);



module.exports = router;