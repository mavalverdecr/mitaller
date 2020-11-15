const jwt = require('jsonwebtoken');

module.exports = function auth (req,res,next){
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({mensaje: 'Acceso denegado'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log('Token correcto :)')
        next();
    }catch(err) {
        console.log('Token inválido :_(')
        res.status(400).send({mensaje: 'Token inválido'})
    }
}