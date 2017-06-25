var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    stateName: String
}, {collection: "graduate_state"});

module.exports = stateSchema;
