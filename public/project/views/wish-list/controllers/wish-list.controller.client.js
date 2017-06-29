(function () {
    angular
        .module('WebProject')
        .controller('WishListController', WishListController);

    function WishListController($routeParams,
                                $route,
                                wishlistService,
                                productService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteProduct = deleteProduct;
        model.addProductToWishList = addProductToWishList;

        function init() {
            wishlistService.findWishlistByBuyer(model.userId)
                .then(function (found) {
                    model.wishlist = found;
                    model.items = found.products;
                })

        }
        init();

        function addProductToWishList(productId){
            productService.findProductById(productId)
                .then(function (found) {
                    if (found === 'Not Found'){
                        model.error = "Please input the correct product id"
                    }else{
                        wishlistService.addProductToUser(productId,model.wishlist._id)
                            .then(function (data) {
                                $route.reload();
                            });
                    }

                })
        }


        function deleteProduct(productId) {
            wishlistService.removeProductFromUser(productId,model.wishlist._id)
                .then(function (data) {
                    $route.reload();
                })
        }

    }
})();
