var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var productModel = mongoose.model('GraduateProductModel', productSchema);

productModel.createProduct = createProduct;
productModel.findProductById = findProductById;
productModel.findAllProducts = findAllProducts;
productModel.findProductByUserId = findProductByUserId;
productModel.findProductByKeyword = findProductByKeyword;
productModel.updateProduct = updateProduct;
productModel.deleteProduct = deleteProduct;



function createProduct(product) {
    return productModel.create(product);
}

function findProductById(productId) {
    return productModel.findById(productId);
}

function findAllProducts() {
    return productModel.find();
}

function findProductByUserId(UserId) {
    return productModel.find({_user: UserId});
}

function findProductByKeyword(keyword) {
    return productModel.find({title:{ $regex: keyword, $options : "i"}});
}

function updateProduct(productId, newProduct) {
    return productModel.update({_id: productId}, {$set: newProduct});
}

function deleteProduct(productId) {
    return productModel.remove({_id: productId});
}