(function () {
    angular
        .module('WebProject')
        .controller('ProductDetailController', ProductDetailController);

    function ProductDetailController($routeParams,
                                     $location,
                                     $route,
                                     productService,
                                     userService,
                                     wishlistService,
                                     orderService,
                                     currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.productId = $routeParams.productId;
        model.buy = buy;
        model.switchRole = switchRole;
        model.addWishList = addWishList;

        function init() {
            productService.findProductDetailById(model.productId)
                .then(function (found) {
                    model.item = found;
                });

            if(model.user.currentRole ==="BUYER"){
                wishlistService.findWishlistByBuyer(model.userId)
                    .then(function (found) {
                        model.wishlist = found;
                        var products = model.wishlist.products;
                        model.productIds = [];
                        for(var i in products){
                            model.productIds.push(products[i]._id);
                        }
                    });
            }



        }
        init();


        function addWishList(productId) {
            wishlistService.addProductToUser(productId,model.wishlist._id)
                .then(function () {
                    $location.url("/wish-list");
                })
        }

        function switchRole(role) {
            model.user.currentRole = role;
            userService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    $route.reload();
                });
        }

        function buy(itemId){
            if (typeof model.user.currentRole ==='undefined'
                || model.user.currentRole === null || model.user.currentRole === ''){
                $location.url('/login');
            }else if (model.user.currentRole !=="BUYER"){
                model.message= "To buy it, please switch as buyer "
            }else{
                var newOrder={
                    title: model.item.title,
                    _buyer: model.user._id,
                    _seller: model.item._user,
                    _product: itemId,
                    _university:model.user._university,
                    price: model.item.price
                }

                orderService.createOrder(newOrder)
                    .then(function (data) {
                        model.message= "buy successfully!"
                        $location.url("/order/buy");
                    });


            }
        }
    }
})();