(function(){
    angular
        .module('WebProject')
        .factory('wishlistService', wishlistService);

    function wishlistService($http,$sce) {

        var api = {
            createWishlist: createWishlist,
            findWishlistById: findWishlistById,
            findWishlistByBuyer: findWishlistByBuyer,
            findAllWishlists:findAllWishLists,
            updateWishlist: updateWishlist,
            deleteWishlist: deleteWishlist,
            addProductToUser:addProductToUser,
            removeProductFromUser:removeProductFromUser
        };
        return api;

        function addProductToUser(productId,wishlistId) {
            var url = '/api/wishlist/'+wishlistId+'/product/'+productId+'/add';
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function removeProductFromUser(productId,wishlistId) {
            var url = '/api/wishlist/'+wishlistId+'/product/'+productId+'/remove';
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWishlist(wishlist) {
            var url = "/api/wishlist";
            return $http.post(url, wishlist)
                .then(function (response) {
                    return response.data;
                });
        }


        function findWishlistById(wishlistId) {
            var url = "/api/wishlist/"+wishlistId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWishLists() {
            var url = "/api/wishlists";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findWishlistByBuyer(){
            var url = "/api/wishlist";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWishlist(wishlistId, wishlist){
            var url = "/api/wishlist/"+wishlistId;
            return $http.put(url, wishlist)
                .then(function (response) {
                    return response.data;
                });


        }

        function deleteWishlist(wishlistId){
            var url = "/api/wishlist/"+wishlistId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

    }
})();