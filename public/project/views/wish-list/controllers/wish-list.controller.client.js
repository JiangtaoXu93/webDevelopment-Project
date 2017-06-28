(function () {
    angular
        .module('WebProject')
        .controller('WishListController', WishListController);

    function WishListController($routeParams,
                                $route,
                                wishlistService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteProduct = deleteProduct;

        function init() {
            wishlistService.findWishlistByBuyer(model.userId)
                .then(function (found) {
                    model.wishlist = found;
                    model.items = found.products;
                })

        }
        init();


        function deleteProduct(productId) {
            wishlistService.removeProductFromUser(productId,model.wishlist._id)
                .then(function (data) {
                    $route.reload();
                })
        }

    }
})();
