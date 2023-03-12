//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, postProducto, putProducto, deleteProducto, getProductoPorId, getProductosAgotados, getProductoMasVendidos } = require('../controllers/producto');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/mostrar', getProductos);

router.get('/agotados', [
    validarJWT,
    esAdminRole
] ,getProductosAgotados);

router.get('/vendidos', getProductoMasVendidos);

router.get('mostrar/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], getProductoPorId);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio','Tienes que colocar un número para definir el precio').isNumeric(),
    check('stock','Tienes que colocar un número para el stock').isNumeric(),
    validarCampos
],postProducto);

router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    //check('id').custom( existeProductoPorId ),
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
], putProducto);

router.delete('/eliminar/:id', [
    validarJWT, 
    esAdminRole,
    check('id', 'No es un ID valido.').isMongoId(),
    //check('id').custom( existeProductoPorId ),
    validarCampos
],deleteProducto);



module.exports = router;