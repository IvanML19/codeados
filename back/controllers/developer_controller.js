'use strict';

const Developer = require('../models/developer_model');
const service = require('../services/auth');


/**
 * Function to get all devs in db
 * @param req
 * @param res
 * @returns array with all devs
 */
function getAllDevs(req, res){
    Developer.find({}, (err, devs) => {
        if (err) return res.status(500).send( { message: `Error al recuperar los devs:`, error: `Error al recuperar los devs: ${err}` } );
        if (devs.length === 0) return res.status(404).send( { success: false, message: `No existen desarrolladores` } );

        res.status(200).send({ success: true, devs })
    })
}

/**
 * Function to create a new dev
 * @param req
 * @param res
 * @returns If true --> token // else --> err
 */
function register (req, res){
    //checkeamos los 3 campos obligatorios
    if (req.body.usuario === undefined || req.body.correo === undefined || req.body.contrasena === undefined || req.body.usuario === "" || req.body.correo === "" || req.body.contrasena === "") {
        res.status(500).send({ success: false, error: `No se han cumplimentado los campos` });
    }else{
        // comprobamos el email
        Developer.find({ email: req.body.correo }, (err, devMail) => {
            if (err) res.status(500).send({ success: false, error: `Error connecting to the server: ${err}` });

            if(devMail.length === 0) {
                // comprobamos el username
                Developer.find({username: req.body.usuario}, (err, devUsername) => {
                    if (err) res.status(500).send({ success: false, error: `Error connecting to the server: ${err}` });

                    if(devUsername.length === 0) {
                        const dev = new Developer({
                            username: req.body.usuario,
                            email: req.body.correo,
                            password: req.body.contrasena
                        });

                        dev.save((err) =>{
                            if(err) return res.status(500).send({ message: `Se ha producido un error creando el usuario`, error: `${err}` });
                            res.status(201).send({ success: true, token: service.createToken(dev)});
                        });
                    } else {
                        res.status(500).send({ success: false, error: `Username en uso` });
                    }
                });
            } else {
                res.status(500).send({ success: false, error: `Email en uso` });
            }
        });
    }
}

module.exports = {
    register,
    getAllDevs
};


/*
// LOGIN
function login (req, res) {

    if ( req.body.correo === undefined || req.body.correo === "" ){
        res.status(500).send({error: `No se han cumplimentado los campos`});
    }else {
        Developer.findOne({ email: req.body.correo, username: req.body.usuario }, (err, dev) => {
            if (err) res.status(500).send({message: err});

            if (!dev) {
                res.status(404).send({message: `User doesn't exist`});
            }else{
                console.log(dev);
                req.dev = dev;
                res.status(200).send({ token: service.createToken(dev) });
            }
        });
    }
}
 */