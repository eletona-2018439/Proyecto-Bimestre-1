//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Categoria = require('../models/categoria');


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

const postCategoria = async (req = request, res = response) => {

    const { nombre, proveedor, descripcion } = req.body;
    const categoriaDB = new Categoria({ nombre, proveedor, descripcion });

    //Guardar en Base de datos
    await categoriaDB.save();

    res.json({
        msg: 'POST API de categoria',
        categoriaDB
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
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de categoria',
        categoriaEliminada
    });

}



module.exports = {
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}