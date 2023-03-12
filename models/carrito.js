const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, 
    producto: {
        type: Array,
        default: []
    },
    total:{
        type: Number,
        default: 0
    }
});

module.exports = model('Carrito', CarritoSchema);