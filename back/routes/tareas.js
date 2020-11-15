const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');
const verifyToken = require('./verifyToken');

//Consulta todas las tareas
router.get('/', verifyToken, async (req, res) => {
    console.log('Consulto todas las tareas');
    try{
        const tareas = await Tarea.find();
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: tareas.length,
            tareas
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})        
    }
});

//Consulta una tarea especifica
router.get('/:tareaID', verifyToken, async (req, res) => {
    console.log('Devuelvo una tarea especifica');
    try{
        const tarea = await Tarea.findById(req.params.tareaID);
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: tarea.length,
            tarea
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})
    }
});

//Inserta una tarea
router.post('/', verifyToken, async (req, res) => {
    const tarea = new Tarea({
        matricula: req.body.matricula,
        descripcion: req.body.descripcion,
        fechaAlta: Date.now(),
        fechaInicioEstado: Date.now(),
        estado: 1,
    });
    console.log('Inserto: ',tarea);
    
    try{
        const savedTarea = await tarea.save();
        res.send({
            mensaje: 'Alta realizada correctamente',
            numeroRegistros: savedTarea.length,
            tarea: savedTarea
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el alta'})
    }

});

//Borra una tarea especifica
router.delete('/:tareaID', verifyToken, async (req, res) => {
    console.log('Borra una tarea especifica: ',req.params.tareaID);
    try{
        const removedTarea = await Tarea.deleteOne({ _id: req.params.tareaID});
        res.send({
            mensaje: 'Borrado realizado correctamente',
            numeroRegistros: removedTarea.length,
            tarea: removedTarea
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el borrado'})
    }
});

//Modifica una tarea especifica
router.patch('/:tareaID', verifyToken, async (req, res) => {
    console.log('Modifica una tarea especifica: ',req.params.tareaID);
    try{
        const updatedTarea = await Tarea.updateOne(
            { _id: req.params.tareaID}, 
            { $set: {
                fechaInicio: Date.now(),
                estado: req.body.estado,
            }}
        );
        res.send({
            mensaje: 'Modificación realizada correctamente',
            numeroRegistros: updatedTarea.length,
            tarea: updatedTarea
        });
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la modificación'})
    }
});

module.exports = router;