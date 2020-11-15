const mongoose = require('mongoose');

const VehiculoSchema = mongoose.Schema({
    matricula: {
        type: String,
        required: true
    },    
    marca: {
        type: String,
        required: true
    },    
    modelo: {
        type: String,
        required: true
    },    
    combustible: {
        type: String,
        required: true
    }
})

const ClienteSchema = mongoose.Schema({
    dni: {
        type: String,
        required: true
    },    
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
    estado: {
        type: Number,
        required: true
    },
    fechaAlta: {
        type: Date,
        required: true
    },
    fechaBaja: {
        type: Date,
        required: false
    },
    vehiculos:{
        type: [VehiculoSchema],
        required:false
    }
})

module.exports = mongoose.model('Cliente',ClienteSchema);