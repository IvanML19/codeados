'use strict';

const express = require('express');
const auth = require('../middlewares/auth');

const devCtrl = require('../controllers/developer_controller');
const startupCtrl = require('../controllers/startup_controller');
const devStartupCtrl = require('../controllers/devStartup_controller');


const api = express.Router();

/*************** DEVELOPER ******************/
api.get('/devs', devCtrl.getAllDevs);
api.post('/registerDev', devCtrl.register);
// api.post('/login', devCtrl.login);

/**************** STARTUP *******************/
api.get('/startups', startupCtrl.getAllStartups);
api.post('/registerStartup', startupCtrl.register);


/*********** STARTUP/DEVELOPER **************/
api.post('/login', devStartupCtrl.login);



/* TEST PRIVATE ROUTES */
api.get('/private',  auth.isAuth, (req, res) =>  {
    res.status(200).send({ message: `Access Granted` });
});

/* Test routes */
api.post('/register', (req, res) => {
   res.send({
       message: `Hello ${req.body.email}! Your user was registered!`
   })
});

module.exports = api;


/*
api.get('/product', productCtrl.getProducts )
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

PLAYER
api.get('/getPlayers', playerCtrl.getPlayers);
api.post('/signup', playerCtrl.signUpPlayer);
api.post('/signin', playerCtrl.signInPlayer);


api.get('/team', teamCtrl.testTeam);
*/