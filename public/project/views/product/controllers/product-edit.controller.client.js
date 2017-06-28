(function () {
    angular
        .module('WebProject')
        .controller('ProductEditController', ProductEditController);

    function ProductEditController($routeParams,
                                   $route,
                                   $location,
                                   $timeout,
                                   productService,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.productId = $routeParams['productId'];
        model.deleteProduct = deleteProduct;
        model.updateProduct = updateProduct;

        function init() {


            productService.findProductByUser(model.userId)
                .then(function (found) {
                    model.items = found;
                });

            productService.findProductById(model.productId)
                .then(function (found) {
                    model.productEdit = found;
                    if(typeof $routeParams.galleryURL !== 'undefined'){
                        model.productEdit.galleryURL= "/project/uploads/"+ $routeParams['galleryURL'];
                    }
                })


        }
        init();


        function deleteProduct(productId) {
            productService.deleteProduct(productId)
                .then(function () {
                    $location.url('/product-management');
                })
        }

        function updateProduct() {
            model.error = null;
            var product = model.productEdit;
            if (typeof product ==='undefined'){
                model.error = "Title should not be empty";
            }else if (product.galleryURL === null|| product.galleryURL===''||typeof product.galleryURL ==='undefined'){
                model.error = "Image should not be empty";
            }else if (product.price === null|| product.price===''||typeof product.price ==='undefined'){
                model.error = "Price should not be empty";
            }else if (product.title === null|| product.title===''||typeof product.title ==='undefined'){
                model.error = "Title should not be empty";
            }else if (isNaN(product.price)){
                model.error = "Price should be number";
            }else{
                productService.updateProduct(model.productId,product)
                    .then(function (data) {
                        $route.reload();

                    });
            }


        }
    }
})();