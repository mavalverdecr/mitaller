const mongoose = require('mongoose');

const VehiculoSchema = mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },    
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

module.exports = mongoose.model('Vehiculo',VehiculoSchema);