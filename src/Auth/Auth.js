const jwt = require('jsonwebtoken');
const verifyToken = (req, response, next)=>{//Next genera una ruta intermedia para seguir a donde se requería
    const token = req.body.token;
    if(!token){
        return response.status(200).send('Token requerido');
    }
    try {
        //De esta manera se pueden mantener diferentes sesiones abiertas
        const decodif = jwt.verify(token, process.env.TOKEN_KEY);
        req.userVerified = decodif; 
    } catch (error) {
        return response.status(200).send('Token invalidas');
    }

    return next();
}

module.exports = verifyToken;