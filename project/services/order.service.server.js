var app = require('../../express');
var orderModel = require('../model/order/order.model.server');
app.get ('/api/order/:orderId', findOrderById);
app.get ('/api/orders',findAllOrders);
app.get('/api/buy-orders',isBuyerAdmin,findOrderByBuyerId);
app.get('/api/sell-orders',isSellerAdmin,findOrderBySellerId);
app.post('/api/order', isBuyerAdmin, createOrder);
app.put ('/api/order/:orderId',isAdmin, updateOrder);
app.delete ('/api/order/:orderId', isAdmin,deleteOrder);


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

function deleteOrder(req, res) {
    var orderId = req.params.orderId;
    orderModel
        .deleteOrder(orderId)
        .then(function (status) {
            res.send(status);
        });
}

function updateOrder(req, res) {
    var order = req.body;
    orderModel
        .updateOrder(req.params.orderId, order)
        .then(function (status) {
            res.send(status);
        });
}

function createOrder(req, res) {
    var order = req.body;
    orderModel.createOrder(order)
        .then(function (order) {
            res.json(order);
        }, function (err) {
            res.send(err);
        });
}

function findOrderById(req, res) {
    var orderId = req.params['orderId'];
    orderModel
        .findOrderById(orderId)
        .then(function (order) {
            res.json(order);
        });
}

function findOrderByBuyerId(req, res) {
    orderModel.findOrderByBuyerId(req.user._id)
        .then(function (order) {
            res.json(order);
        });
}

function findOrderBySellerId(req, res) {
    orderModel.findOrderBySellerId(req.user._id)
        .then(function (order) {
            res.json(order);
        });
}



function findAllOrders(req, res) {
    var userId = req.query['userId'];
    var universiyuId = req.query['universiyuId'];
    if(userId) {
        orderModel
            .findOrderByUserId(userId)
            .then(function (order) {
                if(order) {
                    res.json(order);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(universiyuId) {
        orderModel
            .findOrderByUniversiyuId(universiyuId)
            .then(function (order) {
                if(order) {
                    res.json(order);
                } else {
                    res.sendStatus(404);
                }
            });
    }else {
        orderModel
            .findAllOrders()
            .then(function (orders) {
                res.json(orders);
            });
    }
}