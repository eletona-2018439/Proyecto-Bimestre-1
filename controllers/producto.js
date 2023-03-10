//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Producto = require('../models/producto');


const getProductos = async (req = request, res = response) => {
    //condiciones del get    
    const query = { estado: true };
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'correo')
            .populate('categoria', 'nombre')
    ]);
    res.json({
        msg: 'GET Api Productos',
        listaProductos
    });
}

const postProducto = async (req = request, res = response) => {

    const { nombre, precio, descripcion } = req.body;
    const productoDB = new Producto({ nombre, precio, descripcion });

    //Guardar en Base de datos
    await productoDB.save();

    res.json({
        msg: 'POST API de producto',
        productoDB
    });

}

const putProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;

    const productoEditado = await Producto.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'PUT API de producto',
        productoEditado
    });

}



const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de producto',
        productoEliminado
    });

}

module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}