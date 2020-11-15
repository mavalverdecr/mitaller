const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation } = require('../validation');

//Login de usuario
router.post('/login', async (req, res) => {
    //Comprobar si existe el usuario
    const usuario = await Usuario.findOne({ usuario: req.body.usuario});
    if (!usuario) return res.status(400).send({mensaje: 'Usuario inexistente'});
    //Validar contraseña
    const validarPass = await bcrypt.compare(req.body.password, usuario.password);
    if (!validarPass) return res.status(400).send({mensaje: 'Contraseña incorrecta'});

    //Crear token
    const token = jwt.sign(
        { 
            usuario: usuario.usuario,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            rol: usuario.rol,
        }, 
        process.env.TOKEN_SECRET
    );

    //Enviar respuesta
    res.send({
        mensaje: "Login correcto",
        usuario: {
            usuario: usuario.usuario,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            rol: usuario.rol,
        },
        token
    })

    console.log('Login!', usuario.usuario)
});

//Registro de usuario
router.post('/signup', async (req, res) => {
    console.log('signup',req.body)
    //Validar request
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send({mensaje: error.details[0].message});
    //Comprobar si ya existe el usuario
    const usuarioExist = await Usuario.findOne({ usuario: req.body.usuario});
    if (usuarioExist) return res.status(400).send({mensaje: 'Usuario ya existente.'});

    //Comprobar si ya existe el email
    const emailExist = await Usuario.findOne({ email: req.body.email});
    if (emailExist) return res.status(400).send({mensaje: 'Email ya existente.'});
    
    //Guardar usuario
    try {
    
        //Hash contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
      
        //Crear usuario
        const usuario = new Usuario({
            nombre: req.body.nombre,    
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,    
            usuario: req.body.usuario,    
            password: hashedPass, 
            rol: req.body.rol,   
        });  
        const savedUsuario = await usuario.save();
        //Crear token
        const token = jwt.sign(
            { 
                usuario: usuario.usuario,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.email,
            }, 
            process.env.TOKEN_SECRET
        );
        res.send({
            mensaje: "Usuario creado correctamente",
            usuario: {
                usuario: savedUsuario.usuario,
                nombre: savedUsuario.nombre,
                apellidos: savedUsuario.apellidos,
                email: savedUsuario.email
            },
            token
        })
        
        console.log('Nuevo usuario')

    } catch (err) {
        console.log(err)
        res.status(400).send({mensaje: 'Error en el servidor al realizar el registro'})        
    }

});

//Verificar TOKEN
router.post('/verifyToken', async (req, res) => {
    const token = req.body.token;
    try {
        const payload = jwt.verify(token,process.env.TOKEN_SECRET);
        res.send(payload);
    } catch (err) {
        res.status(401).send({mensaje: 'Token no válido'})
    }
})

module.exports = router;