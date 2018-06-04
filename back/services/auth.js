'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

/* JWT - Payload: datos que viajan entre el cliente y el servidor */
function createToken (user) {
    const payload = {
        sub: user._id, // id del usuario (no incluir el id dela bbdd, en este caso mongodb)
        iat: moment().unix(), // fecha creacion token (momento en que se llama esta funcion)
        esp: moment().add(14, 'days').unix(), // fecha expiracion
    };

    // codificamos payload
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp >= moment().unix())
                reject({
                    status: 401,
                    message: `Token has expired`
                });

            resolve(payload.sub);

        }catch ($err) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    });
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};