(function () {
    angular
        .module('WebProject')
        .controller('SellOrderController', SellOrderController);

    function SellOrderController($routeParams,
                                   orderService,
                                   currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;

        function init() {
            model.searchArea = 'order';
            orderService.findOrderBySeller(model.userId)
                .then(function (data) {
                    model.items = data;
                })
        }
        init();
        

    }
})();
