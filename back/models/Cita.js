const mongoose = require('mongoose');

const CitaSchema = mongoose.Schema({
    matricula: {
        type: String,
        required: true
    },    
    descripcion: {
        type: String,
        required: true
    },    
    fecha: {
        type: Date,
        required: true
    },     
    diaSemana: {
        type: Number,
        required: true
    }, 
    estado: {
        type: Number,
        required: true
    } 
})

module.exports = mongoose.model('Cita',CitaSchema);