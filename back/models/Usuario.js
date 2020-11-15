const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },    
    apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true
    },    
    usuario: {
        type: String,
        required: true
    },    
    password: {
        type: String,
        required: true
    },    
    rol: {
        type: Number,
        required: true
    },    
})

module.exports = mongoose.model('Usuario',UsuarioSchema);