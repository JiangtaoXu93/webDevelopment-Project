var mongoose = require('mongoose');
var wishlistSchema = require('./wishlist.schema.server');
var wishlistModel = mongoose.model('GraduateWishlistModel', wishlistSchema);
var productModel = require('../product/product.model.server');

wishlistModel.createWishlist = createWishlist;
wishlistModel.findWishlistById = findWishlistById;
wishlistModel.findAllWishlists = findAllWishlists;
wishlistModel.findWishlistByUserId = findWishlistByUserId;
wishlistModel.updateWishlist = updateWishlist;
wishlistModel.deleteWishlist = deleteWishlist;
wishlistModel.addProductToUser = addProductToUser;
wishlistModel.removeProductFromUser = removeProductFromUser;

module.exports = wishlistModel;

function addProductToUser(productId, wishlistId) {
    return wishlistModel
        .findById(wishlistId)
        .then(function (wishlist) {
            wishlist.products.push(productId);
            return wishlist.save();
        });
}

function removeProductFromUser(productId, wishlistId) {
    return wishlistModel
        .findById(wishlistId)
        .then(function (wishlist) {
            var index = wishlist.products.indexOf(productId);
            wishlist.products.splice(index, 1);
            return wishlist.save();
        });
}

function createWishlist(wishlist) {
    return wishlistModel.create(wishlist);
        // .then(function () {
        //     return productModel.updateProductStatus(wishlist._product);
        // });
}

function findWishlistById(wishlistId) {
    return wishlistModel.findById(wishlistId)
        .populate('_user')
        .exec();
}


function findAllWishlists() {
    return wishlistModel.find()
        .populate('_user')
        .exec();
}


function findWishlistByUserId(buyerId) {
    var wishlist = wishlistModel.findOne({_user:buyerId})
        .populate('_user')
        .populate('products')
        .exec();

    if (wishlist === null){
        var newWishList = {
            _user : buyerId,
            products :[]
        };
        wishlistModel.create(newWishList);
        wishlist = wishlistModel.findOne({_user:buyerId})
            .populate('_user')
            .populate('products')
            .exec();
    }

    return wishlist;
}


function updateWishlist(wishlistId, newWishlist) {
    return wishlistModel.update({_id: wishlistId}, {$set: newWishlist});
}

function deleteWishlist(wishlistId) {
    return wishlistModel.remove({_id: wishlistId});
}