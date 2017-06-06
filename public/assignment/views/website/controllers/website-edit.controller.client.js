(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);
    
    function EditWebsiteController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (found) {
                    model.websites = found;
                });

            websiteService.findWebsiteById(model.websiteId)
                .then(function (found) {
                    var websiteEdit = {
                        _id : found._id,
                        name : found.name,
                        developerId : found.developerId,
                        description : found.description
                    }
                    model.website = found;
                    model.websiteEdit = websiteEdit;

                });

        }
        init();

        function deleteWebsite(websiteId) {
            // websiteService.deleteWebsite(websiteId);
            // $location.url('/user/'+model.userId+'/website');

            websiteService.deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId,website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website')
                });
        }
    }
})();