'use strict';

const Startup = require('../models/startup_model');
const service = require('../services/auth');


/**
 * Function to get all startup in db
 * @param req
 * @param res
 * @returns array with all devs
 */
function getAllStartups(req, res){
    Startup.find({}, (err, startups) => {
        if (err) return res.status(500).send( { success: false, message: `Error al recuperar las startups:`, error: `Error: ${err}` } );
        if (startups.length === 0) return res.status(404).send( { success: false, message: `No existen startups` } );

        res.status(200).send({success: true, startups })
    })
}

/**
 * Function to create a new startup
 * @param req
 * @param res
 * @returns If true --> token // else --> err
 */
function register (req, res){
    let companyName = (req.body.company === undefined || req.body.company === "") ? false : req.body.company;
    let correo = (req.body.correo === undefined || req.body.correo === "") ? false : req.body.correo;
    let pass = (req.body.pass === undefined || req.body.pass === "") ? false : req.body.pass;

    //checkeamos los 3 campos obligatorios
    if (!companyName || !pass || !correo) {
        res.status(500).send({ success: false,  error: `No se han cumplimentado los campos` });
    }else{
        // comprobamos el email
        Startup.find({ email: correo }, (err, startupMail) => {
            if (err) res.status(500).send({ success: false,  message: `Error connecting to the server: ${err}` });

            if(startupMail.length === 0) {
                // comprobamos el companyName
                Startup.find({ companyName: companyName }, (err, startupName) => {
                    if (err) res.status(500).send({ success: false, message: `Error connecting to the server: ${err}` });

                    if(startupName.length === 0) {
                        const startup = new Startup({
                            companyName: companyName,
                            email: correo,
                            password: pass
                        });

                        startup.save((err) =>{
                            if(err) return res.status(500).send({ success: false, message: `Se ha producido un error creando la startup`, error: `${err}` });

                            return res.status(201).send({ success: true,  token: service.createToken(startup)});
                        });
                    } else {
                        res.status(500).send({ success: false,  error: `Nombre de compañía en uso` });
                    }
                });
            } else {
                res.status(500).send({ success: false,  error: `Email en uso` });
            }
        });
    }
}

module.exports = {
    register,
    getAllStartups
};