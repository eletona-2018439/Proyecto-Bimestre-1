//importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getCategorias, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategorias);

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre de la categoria es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
], postCategoria);

router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], putCategoria);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], deleteCategoria);

module.exports = router;