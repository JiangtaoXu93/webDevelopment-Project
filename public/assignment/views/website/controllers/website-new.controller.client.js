(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);
    
    function NewWebsiteController($routeParams,
                                   $location,
                                  $timeout,
                                  currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.createWebsite = createWebsite;
        model.submit = submit;

        function submit() {
            return false;
        }

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (found) {
                    model.websites = found;
                });

            // model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if (typeof website === 'undefined') {

                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else if (typeof website.name ==='undefined'){
                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }
            else{
                website.developerId = model.userId;
                websiteService.createWebsite(website)
                    .then(function () {
                        $location.url('/website');
                    });

            }

        }
    }
})();