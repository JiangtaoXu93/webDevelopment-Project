(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);
    
    function NewPageController($routeParams,
                                   $location,
                                  $timeout,
                               currentUser,
                                   pageService) {
        var model = this;

        model.userId =currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;
        model.submit = submit;

        function submit() {
            return false;
        }

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (found) {
                    model.pages = found;
                });
            // model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page) {
            if (typeof page === 'undefined') {

                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else if (typeof page.name ==='undefined'){
                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{
                page.websiteId = model.websiteId;
                pageService.createPage(page)
                    .then(function () {
                        $location.url('/website/' + model.websiteId + '/page');
                    });

            }

        }
    }
})();