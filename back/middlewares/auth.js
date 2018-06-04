'use strict';

const service = require('../services/auth');

// funcion para contolar si esta autenticado o no el user
function isAuth(req, res, next){
    if (!req.headers.authorization)
        return res.status(403).send({ message: `Not authorized` });

    const token = req.headers.authorization.split(" ")[1];


    service.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch( response => {
            res.status(response.status).send(response.message);
        })
}

module.exports = {
    isAuth
};