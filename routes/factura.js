const {Router} = require('express');
const { getFactura, generarFactura } = require('../controllers/factura');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT
], getFactura);

router.get('/generarFactura',[
    validarJWT
], generarFactura)


module.exports = router