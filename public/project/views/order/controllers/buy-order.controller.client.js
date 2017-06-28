(function () {
    angular
        .module('WebProject')
        .controller('BuyOrderController', BuyOrderController);

    function BuyOrderController($routeParams,
                                 orderService,
                                 currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;

        function init() {
            model.searchArea = 'order';
            orderService.findOrderByBuyer(model.userId)
                .then(function (data) {
                    model.items = data;
                })
        }
        init();


    }
})();
