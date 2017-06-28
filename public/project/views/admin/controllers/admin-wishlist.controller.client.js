(function () {
    angular
        .module('WebProject')
        .controller('AdminWishlistController', AdminWishlistController);

    function AdminWishlistController($routeParams,
                                $route,
                                productService,
                                wishlistService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.showUpdate = showUpdate;
        model.updateWishlist = updateWishlist;
        model.deleteProductFromList = deleteProductFromList;
        model.addProductToList = addProductToList;
        model.updateProductInList = updateProductInList;

        function init() {

            wishlistService.findAllWishlists()
                .then(function (found) {
                    model.items = found;
                });

        }
        init();


        function deleteProductFromList(product) {
            var index = model.itemUpdate.products.indexOf(product);
            model.itemUpdate.products.splice(index,1);
        }

        function addProductToList() {
            if(model.itemUpdate.products.indexOf(' ') === -1){
                model.itemUpdate.products.push(' ');
            }
        }

        function updateProductInList(product,index){
            model.itemUpdate.products[index] = product;
        }

        function updateWishlist(wishlist) {
            var emptyIndex = wishlist.products.indexOf(' ');
            if(emptyIndex !== -1){
                wishlist.products.splice(emptyIndex,1);
            }

            var index = wishlist.products.length - 1;

            checkIdInList(index,wishlist);

        }

        function checkIdInList( index,wishlist) {

            if(index < 0){
                wishlistService.updateWishlist(wishlist._id,wishlist)
                    .then(function (data) {
                        $route.reload();
                    })
            }else{
                var a = wishlist.products[index];
                productService.findProductById(wishlist.products[index])
                        .then(function (data) {
                            if (data === 'Not Found'){
                                errorId = wishlist.products[index];
                                model.error =  errorId + " is not a correct id."
                            }else{
                                index = index - 1;
                                checkIdInList(index,wishlist);
                            }

                        },function () {
                            errorId = wishlist.products[index];
                            model.error =  errorId + " is not a correct id."
                        })
            }
        }


        function showUpdate(item) {
            model.itemUpdate = angular.copy(item);
        }

    }





})();
