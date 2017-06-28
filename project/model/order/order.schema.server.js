var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    title: String,
    _buyer: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    _seller: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    _product: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateProductModel"},
    _university:{type: mongoose.Schema.Types.ObjectId, ref: "GraduateUniversityModel"},
    price: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "graduate_order"});

module.exports = orderSchema;
