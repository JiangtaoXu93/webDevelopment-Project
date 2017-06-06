(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);
    
    function WebsiteListController($routeParams,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (found) {
                    model.websites = found;
                });
        }
        init();
    }
})();