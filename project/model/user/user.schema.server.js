var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    currentRole:{type: String, default:"BUYER"},
    roles: [{type: String, enum: ['BUYER', 'SELLER',  'ADMIN']}],
    facebook: {
        id:    String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: "graduate_user"});

module.exports = userSchema;
