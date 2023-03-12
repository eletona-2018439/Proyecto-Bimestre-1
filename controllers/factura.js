const {response, request} = require('express');
const Factura = require('../models/factura');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const getFactura = async (req = request, res = response) => {
    const factura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
    ])

    res.json({
        msg: 'Historial de facturas',
        factura
    })
}

const generarFactura = async (req = request, res = response) => {
    const usuario = req.usuario._id;
    const carrito = await Carrito.findOne({usuario: usuario});
    const total = carrito.total;
    const detalles = carrito.producto;
    const facturaDB = new Factura({usuario, total, detalles});

    await facturaDB.save();

    res.status(201).json({
        msg: 'Factura generada',
        facturaDB
    })
}

module.exports = {
    getFactura,
    generarFactura
}