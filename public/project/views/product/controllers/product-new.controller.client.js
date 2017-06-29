(function () {
    angular
        .module('WebProject')
        .controller('ProductNewController', ProductNewController);

    function ProductNewController($routeParams,
                                  currentUser,
                                  $location,
                                  productService) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.universityId = currentUser._university;
        model.createProduct = createProduct;

        function init() {
            if(typeof $routeParams.galleryURL !== 'undefined'){
                model.galleryURL= "/project/uploads/"+ $routeParams.galleryURL;
            }

        }
        init();

        function createProduct(product,galleryURL){
            if (typeof galleryURL ==='undefined'){
                model.error = "Image should be upload";
            }else if (typeof product ==='undefined'){
                model.error = "Title should not be empty";
            }else if (product.price === null|| product.price===''||typeof product.price ==='undefined'){
                model.error = "Price should not be empty";
            }else if (product.title === null|| product.title===''||typeof product.title ==='undefined'){
                model.error = "Title should not be empty";
             }else if (isNaN(product.price)){
                model.error = "Price should be number";
            }else if (typeof model.user._university === 'undefined'){
                model.error = "Please go to your profile page to SELECT YOUR UNIVERSITY first!";
            }else{
                model.error = "";
                product._university = model.user._university;
                product.galleryURL =galleryURL;
                product._user = model.userId;
                productService.createProduct(product)
                    .then(function () {
                        $location.url("/product-management");
                    });
            }


        }
    }
})();