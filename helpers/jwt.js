// Dependencias
const jwt = require('jwt-simple');
const moment = require('moment');

// Clave secreta
const secretKey =
    'o1Jicro1Q6A9ynAXB0j0axonth3wJytezaRaY3ic3bOKFlqj86NChPBjxjHx3Mcg';

// Generar los tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    };

    // Devolver jwt codificado
    return jwt.encode(payload, secretKey);
};

module.exports = { createToken, secretKey };
