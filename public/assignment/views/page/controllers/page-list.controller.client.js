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
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (found) {
                    model.pages = found;
                });
            // model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();
    }
})();