(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            var pageEdit = {
                _id : model.page._id,
                name : model.page.name,
                websiteId : model.page.websiteId,
                description : model.page.description
            }
            model.pageEdit = pageEdit;
        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
        }

        function updatePage(pageId, page) {
            pageService.updatePage(pageId,page);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
        }
    }
})();