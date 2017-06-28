var app = require('../../express');
var wishlistModel = require('../model/wishlist/wishlist.model.server');
app.get ('/api/wishlist/:wishlistId', findWishlistById);
app.get ('/api/wishlists', isAdmin,findAllWishlists);
app.get('/api/wishlist',isBuyerAdmin,findWishlistByBuyerId);
app.post('/api/wishlist', isAdmin, createWishlist);
app.put ('/api/wishlist/:wishlistId',isAdmin, updateWishlist);
app.delete ('/api/wishlist/:wishlistId', isAdmin,deleteWishlist);
app.put ('/api/wishlist/:wishlistId/product/:productId/add',isBuyerAdmin, addProductToUser);
app.put ('/api/wishlist/:wishlistId/product/:productId/remove',isBuyerAdmin, removeProductFromUser);


function isBuyer(req, res, next){
    if(req.isAuthenticated() &&  req.user.currentRole === 'BUYER'){
        next();
    }else{
        res.sendStatus(401);
    }
}

function isSellerAdmin(req, res, next){
    if(req.isAuthenticated() && (req.user.currentRole === 'ADMIN' || req.user.currentRole === 'SELLER')){
        next();
    }else{
        res.sendStatus(401);
    }
}

function isBuyerAdmin(req, res, next){
    if(req.isAuthenticated() && (req.user.currentRole === 'ADMIN' || req.user.currentRole === 'BUYER')){
        next();
    }else{
        res.sendStatus(401);
    }
}

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.currentRole === 'ADMIN'){
        next();
    }else{
        res.sendStatus(401);
    }
}

function addProductToUser(req, res){
    var wishlistId = req.params.wishlistId;
    var productId = req.params.productId;
    wishlistModel
        .addProductToUser(productId,wishlistId)
        .then(function (status) {
            res.send(status);
        });
}
function removeProductFromUser(req, res){
    var wishlistId = req.params.wishlistId;
    var productId = req.params.productId;
    wishlistModel
        .removeProductFromUser(productId,wishlistId)
        .then(function (status) {
            res.send(status);
        });
}


function deleteWishlist(req, res) {
    var wishlistId = req.params.wishlistId;
    wishlistModel
        .deleteWishlist(wishlistId)
        .then(function (status) {
            res.send(status);
        });
}

function updateWishlist(req, res) {
    var wishlist = req.body;
    wishlistModel
        .updateWishlist(req.params.wishlistId, wishlist)
        .then(function (status) {
            res.send(status);
        });
}

function createWishlist(req, res) {
    var wishlist = req.body;
    wishlistModel.createWishlist(wishlist)
        .then(function (wishlist) {
            res.json(wishlist);
        }, function (err) {
            res.send(err);
        });
}

function findWishlistById(req, res) {
    var wishlistId = req.params['wishlistId'];
    wishlistModel
        .findWishlistById(wishlistId)
        .then(function (wishlist) {
            res.json(wishlist);
        });
}

function findWishlistByBuyerId(req, res) {
    wishlistModel.findWishlistByUserId(req.user._id)
        .then(function (wishlist) {
            if (wishlist === null || wishlist === ''){
                var newWishList = {
                    _user : req.user._id,
                    products :[]
                };
                wishlistModel.createWishlist(newWishList)
                    .then(function (wl) {
                        console.log(wl);
                        res.json(wl);
                    }, function (err) {
                        console.log("error");
                        res.send(err);
                    });
            }else{
                res.json(wishlist);
            }

        });
}

function findWishlistBySellerId(req, res) {
    wishlistModel.findWishlistBySellerId(req.user._id)
        .then(function (wishlist) {
            res.json(wishlist);
        });
}



function findAllWishlists(req, res) {
    var userId = req.query['userId'];
    var universiyuId = req.query['universiyuId'];
    if(userId) {
        wishlistModel
            .findWishlistByUserId(userId)
            .then(function (wishlist) {
                if(wishlist) {
                    res.json(wishlist);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(universiyuId) {
        wishlistModel
            .findWishlistByUniversiyuId(universiyuId)
            .then(function (wishlist) {
                if(wishlist) {
                    res.json(wishlist);
                } else {
                    res.sendStatus(404);
                }
            });
    }else {
        wishlistModel
            .findAllWishlists()
            .then(function (wishlists) {
                res.json(wishlists);
            });
    }
}