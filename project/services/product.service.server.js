var app = require('../../express');
var productModel = require('../model/product/product.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });
app.get ('/api/product/:productId', findProductById);
app.get ('/api/product/detail/:productId', findProductDetailById);
app.get('/api/search', findKeywordProducts);
app.get ('/api/products', findAllProducts);
app.post('/api/product', createProduct);
app.put ('/api/product/:productId', updateProduct);
app.delete ('/api/product/:productId', deleteProduct);
app.post ("/api/upload", upload.single('myFile'), uploadImage);


function isBuyerAdmin(req, res, next){
    if(req.isAuthenticated() && (req.user.currentRole === 'ADMIN' || req.user.currentRole === 'BUYER')){
        next();
    }else{
        res.sendStatus(401);
    }
}


function uploadImage(req, res) {

    var myFile= req.file;
    var productId      = req.body.productId;
    if (typeof myFile !== 'undefined'){
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        if (typeof productId === 'undefined' || productId ===''|| productId === null){
            var callbackUrl   = "/project/#!/product/new/"+filename;
            res.redirect(callbackUrl);
        }else{
            var callbackUrl   = "/project/#!/product/" +productId+"/new/"+filename;
            res.redirect(callbackUrl);
        }

    }


}

function deleteProduct(req, res) {
    var productId = req.params.productId;
    productModel
        .deleteProduct(productId)
        .then(function (status) {
            res.send(status);
        });
}

function updateProduct(req, res) {
    var product = req.body;
    productModel
        .updateProduct(req.params.productId, product)
        .then(function (status) {
            res.send(status);
        });
}

function createProduct(req, res) {
    var product = req.body;
    productModel.createProduct(product)
        .then(function (product) {
            res.json(product);
        }, function (err) {
            res.send(err);
        });
}

function findKeywordProducts(req, res) {
    var keyword = req.query['keyword'];
    var universityId = req.query['universityId'];
    productModel.findProductByKeyword(keyword,universityId)
        .then(function (product) {
            res.json(product);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findProductById(req, res) {
    var productId = req.params['productId'];
    productModel
        .findProductById(productId)
        .then(function (product) {
            res.json(product);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findProductDetailById(req, res) {
    var productId = req.params['productId'];
    productModel.
    findProductDetailById(productId)
        .then(function (product) {
            res.json(product);
        }, function (err) {
            res.sendStatus(404);
        });
}



function findAllProducts(req, res) {
    var userId = req.query['userId'];
    var universiyuId = req.query['universityId'];
    if(userId) {
        productModel
            .findProductByUserId(userId)
            .then(function (product) {
                if(product) {
                    res.json(product);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(universiyuId) {
        productModel
            .findProductByUniversiyuId(universiyuId)
            .then(function (product) {
                if(product) {
                    res.json(product);
                } else {
                    res.sendStatus(404);
                }
            });
    }else {
        productModel
            .findAllProducts()
            .then(function (products) {
                res.json(products);
            });
    }
}