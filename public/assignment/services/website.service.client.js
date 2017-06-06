(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);
    
    function websiteService($http) {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;


        function createWebsite(website) {
            var url = "/api/user/"+ website.developerId+"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            // var website = findWebsiteById(websiteId);
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);

            var url = "/api/website/"+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWebsiteById(websiteId) {
            // return websites.find(function (website) {
            //     return website._id === websiteId;
            // });

            var url = "/api/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsitesByUser(userId) {
            var url =  "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website){
            // var oldWebsite = findWebsiteById(websiteId);
            // var oldIndex = websites.indexOf(oldWebsite);
            // websites.splice(oldIndex, 1);
            // websites.push(website);

            var url = "/api/website/"+websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();