(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);
    
    function PageListController($routeParams,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();
    }
})();