const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'El proveedor es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Categoria', CategoriaSchema)