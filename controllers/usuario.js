//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const postRegistroUser = async (req = request, res = response) => {

    const { nombre, correo, password } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar el nuevo usuario en la DB
    await usuarioDB.save();

    res.status(200).json({
        msg: 'Registro Exitoso',
        usuarioDB
    });
}


const putUsuarioPerfil = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = req.usuario.id;
    const idUsuario = usuario.toString();

    if (id === idUsuario) {
        const { _id, rol, ...resto } = req.body;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, { new: true });
        res.status(200).json({
            msg: 'PUT API perfil de usuarios',
            usuarioEditado
        })
    } else {
        res.status(401).json({
            msg: 'Solo puedes editar tu perfil >:('

        })
    }

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, role, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();

    resto.password = bcryptjs.hashSync(resto.password, salt);

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'PUT API usuarios',
        usuarioEditado

    })

}


const deleteUsuarioPerfil = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = req.usuario._id;
    const idUsuario = usuario.toString();

    if (id === idUsuario) {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'DELETE API perfil de usuarios',
            usuarioEliminado
        })
    } else {
        res.status(401).json({
            msg: 'Solo puedes eliminar tu perfil >:('

        })
    }

}


const deleteUsuario = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    //Eliminar fisicamente de la DB
    const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuarios',
        usuarioEliminado
    });
}



module.exports = {
    getUsuarios,
    postUsuario,
    postRegistroUser,
    putUsuario,
    putUsuarioPerfil,
    deleteUsuario,
    deleteUsuarioPerfil
}