'use strict';

const Developer = require('../models/developer_model');
const Startup = require('../models/startup_model');

const bcrypt = require('bcrypt-nodejs');
const service = require('../services/auth');

/**
 * Function to log in and create send Token
 * @param req
 * @param res
 * @returns JWT if user/email and pass are ok // Error if not
 */
function login (req, res) {
    let usuario = (req.body.usuario === undefined || req.body.usuario === "") ? false : req.body.usuario;
    let pass = (req.body.pass === undefined || req.body.pass === "") ? false : req.body.pass;

    if( !usuario || !pass ) {
        res.status(500).send({success: false, error: `No se han cumplimentado los campos`});

    } else {
        // buscamos en dev
        Developer.findOne({$or: [{email: usuario}, {username: usuario}]}, (err, dev) => {
            if (err)
                res.status(500).send({success: false, message: err});

            else if (dev) {
                bcrypt.compare(pass, dev.password, function (err, passOK) {
                    if (err)
                        res.status(500).send({success: false, message: err});
                    else if (!passOK)
                        res.status(404).send({success: false, message: `Error password`});
                    else {
                        dev.password = undefined;
                        res.status(200).send({success: true, token: service.createToken(dev) });
                    }
                });

            } else {
                Startup.findOne({$or: [{email: usuario}, {companyName: usuario}]}, (err, startup) => {
                    if (err)
                        res.status(500).send({success: false, message: err});

                    else if (startup) {
                        bcrypt.compare(pass, startup.password, function (err, passOK) {
                            if (err)
                                res.status(500).send({success: false, message: err});
                            else if (!passOK)
                                res.status(404).send({success: false, message: `Error password.`});
                            else {

                                startup.password = undefined;
                                res.status(200).send({success: true, token: service.createToken(startup) });
                            }
                        });
                    }

                    else
                        res.status(404).send({success: false, message: `Usuario no encontrado`});
                });
            }
        })
    }
}

module.exports = {
    login
};