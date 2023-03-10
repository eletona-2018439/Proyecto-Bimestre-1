const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    }, 
    estado: {
        type: Boolean,
        default: true,
        required: true
    }, 
    precio: {
        type: Number,
        default: 0
    },
    descripcion: { 
        type: String 
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    vendido:{
        type: Number,
        default: 0
    }
});

module.exports = model('Producto', ProductoSchema);