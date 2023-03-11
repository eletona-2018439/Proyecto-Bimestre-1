const {Router} = require('express');
const { getCarritoDeCompras, postCarrito, agregarProductoCarrito} = require('../controllers/carrito');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getCarritoDeCompras);

router.post('/agregar',[
    validarJWT
], postCarrito);

router.put('/agregarProducto/:id',[
    validarJWT
], agregarProductoCarrito);

module.exports = router;