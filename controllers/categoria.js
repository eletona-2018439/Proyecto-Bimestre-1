//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');


const getCategorias = async (req = request, res = response) => {
    //condiciones del get    
    const query = { estado: true };
    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);
    res.json({
        msg: 'GET Api Categorias',
        listaCategorias
    });
}

const getCategoriaPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json({
        msg: 'GET API categoria por ID',
        categoria
    })
}

const postCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const proveedor = req.body.proveedor;

    const categoriaDB = await Categoria.findOne({ nombre })
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe.`
        });
    }
    const data = {
        usuario: req.usuario._id,
        nombre,
        descripcion,
        proveedor
    }

    const categoriaAgregada = new Categoria(data);
    await categoriaAgregada.save();
    res.json({
        msg: 'POST API de categoria',
        categoriaAgregada
    });
}

const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, estado, ...resto } = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'PUT API de categoria',
        categoriaEditada
    });

}

const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const query = { categoria: id };
    const productos = await Producto.find(query);
    const productoId = productos.map((product) => product._id);
    const idA = req.usuario.id;

    const colleccion = "Categoria";
    const categoriaDB = await Categoria.findOne({ nombre: colleccion });

    if (!categoriaDB) {
        const deleteCategoria = new Categoria({
            nombre: "Default",
            descripcion:"Default",
            proveedor: "Default",
            usuario: idA,
        });

        await deleteCategoria.save();
    }

    const querys = { nombre: "Categoria" };
    const { _id } = await Categoria.findOne(querys);

    const editado = await Producto.updateMany({ categoria: id }, { categoria: _id });

    const categoriaBorrada = await Categoria.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE Categoria',
        categoriaBorrada
    });
}


module.exports = {
    getCategorias,
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoria
}