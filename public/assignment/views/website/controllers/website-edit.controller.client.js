(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);
    
    function EditWebsiteController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        model.submit = submit;

        function submit() {
            return false;
        }

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
                    $location.url('/website');
                });
        }

        function updateWebsite(websiteId, website) {
            if (typeof website.name ==='undefined' || website.name ===''|| website.name ===null){
                model.error = "name should not be empty";

                $timeout(function () {

                    model.error = false;

                }, 3000)
            }else{
                websiteService.updateWebsite(websiteId,website)
                    .then(function () {
                        $location.url('/website')
                    });
            }

        }
    }
})();