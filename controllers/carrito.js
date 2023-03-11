const {response, request} = require('express');
const Usuario = require('../models/usuario');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const getCarritoDeCompras = async (req = request, res = response) => {
    const carrito = await Promise.all([
        Carrito.countDocuments(),
        Carrito.find()
            .populate('usuario', 'nombre')
    ])

    res.json({
        msg: 'Lista de carritos',
        carrito
    })
}

const postCarrito = async (req = request, res = response) => {

    const usuario = req.usuario._id;

    const carritoExiste = await Carrito.findOne({usuario: usuario});
    if (carritoExiste) {
        return res.status(400).json({
            msg: 'El usuario ya tiene un carrito ._.'
        })
        
    }
    const producto = [];
    const carritoCreado = new Carrito({usuario, producto});
    await carritoCreado.save();

    res.status(201).json({
        msg: 'POST API Carrito',
        carritoCreado
    });
}

const agregarProductoCarrito = async (req = request, res = response) => {
    const {idProducto} = req.params;
    const usuario = req.usuario._id;
    

    const producto = await Producto.findOne(idProducto);
    const carrito = await Carrito.findOne({usuario: usuario});

    let totalCarrito = carrito.total + producto.precio;

    if (!carrito) {
        return res.status(400).json({
            msg: 'No puedes realizar está acción :/'
        })
    }

    const carritoModificado = await Carrito.findOneAndUpdate(
        { _id: carrito._id },
        { $push: {'producto': producto},
        total: totalCarrito },
        { new: true }
    );
    res.json({
        msg: 'Agregaste un producto a tu Carrito!',
        carritoModificado
    })

}

module.exports = {
    getCarritoDeCompras,
    postCarrito,
    agregarProductoCarrito
}