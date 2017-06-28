(function () {
    angular
        .module('WebProject')
        .controller('ProductListController', ProductListController);

    function ProductListController($routeParams,
                                   productService,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;

        function init() {
            productService.findProductByUser(model.userId)
                .then(function (found) {
                    model.items = found;
                });
        }
        init();
    }
})();