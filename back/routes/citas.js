const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const Vehiculo = require('../models/Vehiculo');
const verifyToken = require('./verifyToken');

//Consulta todas las citas
router.get('/', verifyToken, async (req, res) => {
    console.log('Consulto todas las citas');
    try{
        const citas = await Cita.find()
        const citasFilter = citas.filter(cita => (new Date(cita.fecha) >= new Date(req.query.fechaIni) && new Date(cita.fecha) <= new Date(req.query.fechaFin)));
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: req.query.fechaIni || req.query.fechaFin ? citasFilter.length : citas.length,
            citas: req.query.fechaIni || req.query.fechaFin ? citasFilter : citas
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})        
    }
});

//Consulta una cita especifica
router.get('/:citaID', verifyToken, async (req, res) => {
    console.log('Devuelvo una cita especifica');
    try{
        const cita = await Cita.findById(req.params.citaID);
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros:cita.length,
            cita
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})        
    }
});

//Inserta una cita
router.post('/', verifyToken, async (req, res) => {
    //Comprobar si existe el vehículo
    const existeVehiculo = await Vehiculo.findOne({ matricula: req.body.matricula});
    if (!existeVehiculo) return res.status(400).send({mensaje: 'El vehículo no existe en el sistema'});
    
    const cita = new Cita({
        matricula: req.body.matricula,
        descripcion: req.body.descripcion,
        fecha: new Date(req.body.fecha+'T'+req.body.hora),
        diaSemana: 0,
        estado: 1
    }); 

    cita.diaSemana = cita.fecha.getDay();

    console.log('Inserto: ',cita);
    
    try{
        const savedCita = await cita.save();
        res.send({
            mensaje: 'Alta realizada correctamente',
            numeroRegistros:savedCita.length,
            cita: savedCita
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el alta'})
    }

});

//Borra una cita especifica
router.delete('/:citaID', verifyToken, async (req, res) => {
    console.log('Borra una cita especifica: ',req.params.citaID);
    try{
        const removedCita = await Cita.deleteOne({ _id: req.params.citaID});
        res.send({
            mensaje: 'Borrado realizado correctamente',
            numeroRegistros:removedCita.length,
            cita: removedCita
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el borrado'})
    }
});

//Modifica una cita especifica
router.patch('/:citaID', verifyToken, async (req, res) => {
    console.log('Modifica una cita especifica: ',req.params.citaID);
    try{
        const cita = {
            matricula: req.body.matricula,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            diaSemana: 0,
            estado: req.body.estado
        }
        cita.diaSemana = cita.fecha.getDay();
        console.log('Actualizo cita: ',cita)

        const updatedCita = await Cita.updateOne(
            { _id: req.params.citaID}, 
            { $set: cita}
        );
        res.send({
            mensaje: 'Modificación realizado correctamente',
            numeroRegistros:updatedCita.length,
            cita: updatedCita
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la modificación'})
    }
});

module.exports = router;