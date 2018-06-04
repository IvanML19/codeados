'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const StartupSchema = Schema({
    companyName: { type: String, unique: true },
    email: { type: String, unique: true },
    // password: { type: String, select: false }, // select=false para no devovlerlo al cargar un dev
    password: { type: String },

    logo: { type: String, default: null },
    description: { type: String, default: null },
    site: { type: String, default: null },
    location: { type: String, default: null },
    phone: { type: String, default: null },

    create_date: { type: Date, default: Date.now() },
    last_login_date: { type: Date, default: null },
    last_recover_pass_date: { type: Date, default: null },
    last_change_pass_date: { type: Date, default: null },

    comments: { type: String, default: null }
    // members: { type: String, default: null }, // listado de usuarios que trabajan para la startup
});

// lanzaremos esto antes de realizar un grabado (registro) de un player
StartupSchema.pre('save', function (next) {
    let startup = this;

    if(!startup.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next();

        bcrypt.hash(startup.password, salt, null, (err, hash) => {
            if(err) return next(err);

            startup.password = hash;
            next()
        })
    })
});

module.exports = mongoose.model('Startup', StartupSchema);