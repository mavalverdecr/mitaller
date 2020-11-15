const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const verifyToken = require('./verifyToken');

//Consulta todos los clientes
router.get('/', verifyToken, async (req, res) => {
    console.log('Consulto todos los clientes', req.query.q);
    try{
        const clientes = await Cliente.find()
        const clientesFilter = req.query.q ? clientes.filter(cliente => (
            cliente.nombre.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1 ||
            cliente.apellidos.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1 ||
            cliente.dni.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1
        )) : {}
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: req.query.q ? clientesFilter.length : clientes.length,
            clientes: req.query.q ? clientesFilter : clientes
        }); 
    }catch (err) {
        res.json({mensaje: err})        
    }
});

//Consulta un cliente específico
router.get('/:clienteID', verifyToken, async (req, res) => {
    console.log('Devuelvo un cliente especifico');
    try{
        const cliente = await Cliente.findById(req.params.clienteID);
        res.send({
            mensaje: 'Consulta realizada correctamente',
            numeroRegistros: cliente.length,
            cliente
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la consulta'})
    }
});

//Inserta un cliente
router.post('/', verifyToken, async (req, res) => {

    const cliente = new Cliente({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        email: req.body.email,
        estado: 1,
        fechaAlta: Date.now(),
    });

    //Comprobar si existe el cliente
    const existeDni = await Cliente.findOne({ dni: req.body.dni});
    if (existeDni) return res.status(400).send({mensaje: 'Cliente ya existente en el sistema'});
    console.log('Inserto: ',cliente);
    
    try{
        const savedCliente = await cliente.save();
        res.send({
            mensaje: 'Alta realizada correctamente',
            numeroRegistros: savedCliente.length,
            cliente: savedCliente
        }); 
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el alta'})        
    }

});

//Borra un cliente especifico
router.delete('/:clienteID', verifyToken, async (req, res) => {
    console.log('Borra un cliente especifico: ',req.params.clienteID);
    try{
        const removedCliente = await Cliente.deleteOne({ _id: req.params.clienteID});
        res.send({
            mensaje: 'Borrado realizado correctamente',
            numeroRegistros: removedCliente.length,
            cliente: removedCliente
        });  
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar el borrado'})        
    }
});

//Modifica un cliente especifico
router.patch('/:clienteID', verifyToken, async (req, res) => {
    console.log('Modifica un cliente especifico: ',req.params.clienteID);
    try{
        const updatedCliente = await Cliente.updateOne(
            { _id: req.params.clienteID}, 
            { $set: {
                telefono: req.body.telefono,
                email: req.body.email,
                estado: req.body.estado,
                fechaBaja: req.body.fechaBaja,
            }}
        );
        res.send({
            mensaje: 'Modificación realizada correctamente',
            numeroRegistros: updatedCliente.length,
            cliente: updatedCliente
        });
    }catch (err) {
        res.status(400).send({mensaje: 'Error en el servidor al realizar la modificación'})
    }
});

module.exports = router;