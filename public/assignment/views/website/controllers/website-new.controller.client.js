(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);
    
    function NewWebsiteController($routeParams,
                                   $location,
                                  $timeout,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if (typeof website === 'undefined') {

                model.error = "name and description should not be both empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{
                website.developerId = model.userId;
                websiteService.createWebsite(website);
                $location.url('/user/'+model.userId+'/website');
            }

        }
    }
})();