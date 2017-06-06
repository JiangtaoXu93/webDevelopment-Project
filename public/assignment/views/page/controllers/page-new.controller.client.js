(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);
    
    function NewPageController($routeParams,
                                   $location,
                                  $timeout,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

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

                model.error = "name and description should not be both empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{
                page.websiteId = model.websiteId;
                pageService.createPage(page)
                    .then(function () {
                        $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
                    });

            }

        }
    }
})();