module.exports = {
	port: process.env.PORT || 4000,
	db: process.env.MONGODB_URI ||'mongodb://localhost:27017/codeados',
	SECRET_TOKEN: 'secrettoken'
};

// mongodb://codeados_master:ivanjin@ds231529.mlab.com:31529/heroku_7v1dl80h',