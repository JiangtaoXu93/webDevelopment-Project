var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    title: String,
    description: String,
    galleryURL: String,
    price: Number,
    location:String,
    status: {type: String, default: 'selling', enum: ['selling', 'sold']},
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    _university:{type: mongoose.Schema.Types.ObjectId, ref: "GraduateUniversityModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "graduate_product"});

module.exports = productSchema;
