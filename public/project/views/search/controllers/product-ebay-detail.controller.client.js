(function () {
    angular
        .module('WebProject')
        .controller('ProductEbayDetailController', ProductEbayDetailController);

    function ProductEbayDetailController($routeParams,
                                     $location,
                                     $route,
                                         $scope,
                                     productService,
                                     currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.itemId = $routeParams.itemId;

        function init() {

            productService.findProductEbayDetailById(model.itemId)
                .then(function(found) {
                    $scope.$apply(function() {
                        model.item = found.Item;
                        console.log(model.item)
                    })
                });

        }
        init();

    }
})();