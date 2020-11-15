const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    matricula: {
        type: String,
        required: true
    },    
    descripcion: {
        type: String,
        required: true
    },    
    fechaAlta: {
        type: Date,
        required: true
    },    
    fechaInicioEstado: {
        type: Date,
        required: true
    },    
    estado: {
        type: Number,
        required: true
    }, 
})

module.exports = mongoose.model('Tarea',TareaSchema);