(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);
    
    function WebsiteListController($routeParams,
                                   currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;

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