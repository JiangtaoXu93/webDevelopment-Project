(function () {
    angular
        .module('WebProject')
        .controller('ProductEditController', ProductEditController);

    function ProductEditController($routeParams,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;

        function init() {

        }
        init();
    }
})();