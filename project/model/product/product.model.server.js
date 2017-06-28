var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var productModel = mongoose.model('GraduateProductModel', productSchema);

productModel.createProduct = createProduct;
productModel.findProductById = findProductById;
productModel.findAllProducts = findAllProducts;
productModel.findProductByUserId = findProductByUserId;
productModel.findProductByUniversiyuId = findProductByUniversiyuId;
productModel.findProductByKeyword = findProductByKeyword;
productModel.updateProduct = updateProduct;
productModel.updateProductStatus = updateProductStatus;
productModel.deleteProduct = deleteProduct;
productModel.findProductDetailById = findProductDetailById;

module.exports = productModel;

function createProduct(product) {
    return productModel.create(product);
}

function findProductById(productId) {
    return productModel.findById(productId);
}

function  findProductDetailById(productId) {
    return productModel.findById(productId)
        .populate('_university')
        .populate('_user')
        .exec();
}

function findAllProducts() {
    return productModel.find()
        .populate('_user')
        .populate('_university')
        .exec();
}

function findProductByUniversiyuId(universityId) {
    return productModel.find({_university: universityId, status:'selling'});
}

function findProductByUserId(UserId) {
    return productModel.find({_user: UserId});
}

function findProductByKeyword(keyword,universityId) {
    return productModel.find({title:{ $regex: keyword, $options : "i"},_university: universityId});
}

function updateProduct(productId, newProduct) {
    return productModel.update({_id: productId}, {$set: newProduct});
}

function updateProductStatus(productId) {
    return productModel.update({_id: productId}, {status: 'sold'});
}

function deleteProduct(productId) {
    return productModel.remove({_id: productId});
}