var mongoose = require('mongoose');

var universitySchema = mongoose.Schema({
    name: String,
    stateName: String
}, {collection: "graduate_university"});

module.exports = universitySchema;
