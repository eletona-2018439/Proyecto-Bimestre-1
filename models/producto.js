const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Producto', ProductoSchema)