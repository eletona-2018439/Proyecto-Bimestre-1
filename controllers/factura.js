const { request, response } = require('express');
const Factura = require('../models/factura');


const getFacturas = async (req = request, res = response) => {

    const listaFactura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
            .populate('admin', 'nombre')
            .populate('cliente', 'nombre')
            .populate('carrito'),
    ]);

    res.json({
        msg: 'GET API facturas',
        listaFactura
    });

}

const getFacturaPorID = async (req = request, res = response) => {
    const { id } = req.params;
    const facturaById = await Factura.findById(id)
        .populate('admin', "nombre")
        .populate('cliente', "nombre")
        .populate('carrito');

    res.status(201).json({
        msg: 'GET API Facturas Por Id',
        facturaById
    });

}

const postFactura = async (req = request, res = response) => {

    const { admin, ...body } = req.body;

    const facturaDB = await Factura.findOne({ codigo: body.codigo });

    if ( facturaDB ) {
        return res.status(400).json({
            msg: `La factura ${ facturaDB.codigo }, ya existe en la DB`
        });
    }

    const data = {
        ...body,
        codigo: body.codigo,
        admin: req.usuario._id
    }

    const factura = await Factura( data );
    await factura.save();

    res.status(201).json({
        msg: 'POST API Factura',
        factura
    });

}

module.exports = {
    getFacturas,
    getFacturaPorID,
    postFactura
}