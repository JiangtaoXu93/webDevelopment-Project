(function () {
    angular
        .module('WebProject')
        .controller('ProductListController', ProductListController);

    function ProductListController($routeParams,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;

        function init() {

        }
        init();
    }
})();