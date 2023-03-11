//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Producto = require('../models/producto');


const getProductos = async (req = request, res = response) => {
    //Condiciones del get    
    const query = { estado: true };
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', "nombre")
            .populate('categoria', "nombre")
    ]);
    res.json({
        msg: 'GET Api Productos',
        listaProductos
    });
}

const getProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        msg: 'categoria por id',
        producto
    });

}

const getProductoMasVendidos = async(req = request , res = response) =>{
   
 
    let listaProductos = await Producto.find().sort({stock: 1})
       

    res.json({
        msg: 'Productos mas vendidos',
        listaProductos
    })
}

const getProductosAgotados = async(req = request , res = response) =>{
   

    const query = { stock : 0 };
     const listaProductos = await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
     ])
 
     res.json({
         msg: 'Productos',
         listaProductos
     })
 
 
 }

const postProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;

    //validación si existe un producto en la db
    const productoEnDB = await Producto.findOne( { nombre: body.nombre } );

    if ( productoEnDB ) {
        return res.status(400).json({
            mensajeError: `El producto ${ productoEnDB.nombre } ya existe en la DB`
        });
    }
    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre,
        usuario: req.usuario._id
    }

    const productoAgregado = new Producto( data );

    //Guardar en DB
    await productoAgregado.save();

    res.status(201).json({
        msg: 'POST API productos',
        productoAgregado
    });

}

const putProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre;
    }
    data.usuario = req.usuario._id
    //edicion de producto 
    const editarProducto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: "PUT API productos",
        editarProducto
    })

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
    getProductoPorId,
    getProductoMasVendidos,
    getProductosAgotados,
    postProducto,
    putProducto,
    deleteProducto
}