const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Vehiculo = require('../models/Vehiculo');
const verifyToken = require('./verifyToken');

//Consulta los vehículos de un cliente específico
router.get('/:clienteID', verifyToken, async (req, res) => {
    console.log('Devuelvo los vehículos de un cliente especifico');
    try{
        const cliente = await Cliente.findById(req.params.clienteID);
        const vehiculos = await Vehiculo.find({cliente: cliente.dni});
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: cliente.length,
            vehiculos
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})
    }
});

//Inserta un vehiculo
router.post('/', verifyToken, async (req, res) => {

    //Comprobar si existe el cliente
    const existeDni = await Cliente.findOne({ dni: req.body.cliente});
    if (!existeDni) return res.status(400).send({mensaje: 'El cliente no existente en el sistema'});
    //Comprobar si existe matrícula
    const existeMatricula = await Vehiculo.findOne({ matricula: req.body.matricula});
    if (existeMatricula) return res.status(400).send({mensaje: 'El vehículo ya existe en el sistema'});

    const vehiculo = new Vehiculo({
        cliente: req.body.cliente,
        matricula: req.body.matricula,
        marca: req.body.marca,
        modelo: req.body.modelo,
        combustible: req.body.combustible,
    });

    try{
        const savedVehiculo = await vehiculo.save();
        res.send({
            mensaje: 'Alta realizada correctamente',
            numeroRegistros: savedVehiculo.length,
            cliente: savedVehiculo
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el alta'})        
    }

});

//Borra los vehículos de un cliente
router.delete('/:vehiculoID', verifyToken, async (req, res) => {
    console.log('Borra el vehículo: ',req.params.vehiculoID);
    try{
        const removedVehiculo = await Vehiculo.deleteOne({ _id: req.params.vehiculoID});
        res.send({
            mensaje: 'Borrado realizado correctamente',
            numeroRegistros: removedVehiculo.length,
            cliente: removedVehiculo
        });  
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el borrado'})        
    }
});

module.exports = router;