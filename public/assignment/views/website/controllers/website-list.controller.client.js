(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);
    
    function WebsiteListController($routeParams,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
    }
})();