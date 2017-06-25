var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    title: {type: String, unique: true},
    description: String,
    galleryURL: String,
    price: Number,
    location:String,
    status: {type: String, enum: ['selling', 'sold']},
    _seller:{type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "graduate_user"});

module.exports = userSchema;
