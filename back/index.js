'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
	if (err) return console.log(`Error al conectar a la BD: ${err}`);
	
	console.log(`DB connected correctly.`);

	app.listen(config.port, () => {
		console.log(`Server running on http://localhost:${config.port}`);
	})
});
