var mongoose = require('mongoose');
var orderSchema = require('./order.schema.server');
var orderModel = mongoose.model('GraduateOrderModel', orderSchema);
var productModel = require('../product/product.model.server');

orderModel.createOrder = createOrder;
orderModel.findOrderById = findOrderById;
orderModel.findAllOrders = findAllOrders;
orderModel.findOrderByBuyerId = findOrderByBuyerId;
orderModel.findOrderBySellerId = findOrderBySellerId;
orderModel.updateOrder = updateOrder;
orderModel.deleteOrder = deleteOrder;

module.exports = orderModel;

function createOrder(order) {
    return orderModel.create(order)
        .then(function () {
            return productModel.updateProductStatus(order._product);
        });
}

function findOrderById(orderId) {
    return orderModel.findById(orderId)
        .populate('_buyer')
        .populate('_seller')
        .populate('_university')
        .populate('_product')
        .exec();
}


function findAllOrders() {
    return orderModel.find()
        .populate('_buyer')
        .populate('_seller')
        .populate('_university')
        .populate('_product')
        .exec();
}

function findOrderByUniversiyuId(universityId) {
    return orderModel.find({_university: universityId})
        .populate('_buyer')
        .populate('_seller')
        .populate('_university')
        .populate('_product')
        .exec();
}

function findOrderByBuyerId(buyerId) {
    return orderModel.find({_buyer:buyerId})
        .populate('_buyer')
        .populate('_seller')
        .populate('_university')
        .populate('_product')
        .exec();
}

function findOrderBySellerId(sellerId) {
    return orderModel.find({_seller:sellerId})
        .populate('_buyer')
        .populate('_seller')
        .populate('_university')
        .populate('_product')
        .exec();
}

function updateOrder(orderId, newOrder) {
    return orderModel.update({_id: orderId}, {$set: newOrder});
}

function deleteOrder(orderId) {
    return orderModel.remove({_id: orderId});
}