(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController($routeParams,
                                   $location,
                                currentUser,
                                   pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (found) {
                    model.pages = found;
                });

            pageService.findPageById(model.pageId)
                .then(function (found) {
                    var pageEdit = {
                        _id : found._id,
                        name : found.name,
                        websiteId : found.websiteId,
                        description : found.description
                    }
                    model.pageEdit = pageEdit;
                    model.page = found;
                });

        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                });

        }

        function updatePage(pageId, page) {
            if (typeof page.name ==='undefined' || page.name ===''|| page.name ===null){
                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{
                pageService.updatePage(pageId,page)
                    .then(function () {
                        $location.url('/website/' + model.websiteId + '/page');
                    });
            }



        }
    }
})();