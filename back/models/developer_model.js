'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const DeveloperSchema = Schema({
    username: { type: String, unique: true },
    // password: { type: String, select: false }, // select=false para no devovlerlo al cargar un dev
    password: { type: String },
    email: { type: String, unique: true },

    name: { type: String, default: null },
    profile_pic: { type: String, default: null },
    phone: { type: String, default: null },
    bio: { type: String, default: null },
    url: { type: String, default: null },
    location: { type: String, default: null },
    state: { type: String, enum: ['Trabajando', 'Búsqueda activa', 'Búsqueda pasiva', 'Escucho propuestas', 'Sin trabajo'] },

    create_date: { type: Date, default: Date.now() },
    last_login_date: { type: Date, default: null },
    last_recover_pass_date: { type: Date, default: null },
    last_change_pass_date: { type: Date, default: null },
    last_comment_date: { type: Date, default: null }
});

// antes de llamar al save, se ejecutará esta función que enciptará la password
DeveloperSchema.pre('save', function (next) {
    let dev = this;

    if(!dev.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next();

        bcrypt.hash(dev.password, salt, null, (err, hash) => {
            if(err) return next(err);

            dev.password = hash;
            next()
        })
    });

});


module.exports = mongoose.model('Developer', DeveloperSchema);