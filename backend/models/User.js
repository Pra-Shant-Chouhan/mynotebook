const mongoose = require('mongoose')
// or
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: string,
        require: true
    },
    email: {
        type: string,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        defaulat: Date.now
    },
});
module.export = mongoose.model('user', UserSchema);