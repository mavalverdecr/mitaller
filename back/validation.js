const Joi = require('joi');

const signupValidation = data => {
    const schema = Joi.object({
        nombre: Joi.string()
                .regex(/^([A-Za-zÑñÁÉÍÓÚáéíóú]+[ ]?){1,2}$/)
                .required(),
        apellidos: Joi.string()
                .regex(/^([A-Za-zÑñÁÉÍÓÚáéíóú]+[ ]?){1,2}$/)
                .required(),
        telefono: Joi.string()
                .regex(/^\d+$/)
                .min(9)
                .max(9)        
                .required(),
        email: Joi.string()
                .email() 
                .required(),                
        usuario: Joi.string()
                .alphanum()
                .min(6)
                .max(10)
                .required(),
        password: Joi.string()
                .alphanum()
                .min(8)
                .required(),
        rol: Joi.number()
                .min(1)
                .max(2)
                .required(),
        repeatPassword: Joi.ref('password'),
    })
    return schema.validate(data);
}

module.exports.signupValidation = signupValidation;