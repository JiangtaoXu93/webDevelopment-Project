var mongoose = require('mongoose');

var wishlistSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "GraduateProductModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "graduate_wishlist"});

module.exports = wishlistSchema;
