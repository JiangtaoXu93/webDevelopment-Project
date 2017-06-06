(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);
    
    function pageService($http) {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage = updatePage;



        function createPage(page) {
            // page._id = (new Date()).getTime() + "";
            // pages.push(page);

            var url = "/api/website/"+ page.websiteId+"/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            // var page = findPageById(pageId);
            // var index = pages.indexOf(page);
            // pages.splice(index, 1);

            var url = "/api/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findPageById(pageId) {
            // return pages.find(function (page) {
            //     return page._id === pageId;
            // });

            var url = "/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {
            // var results = [];
            //
            // for(var v in pages) {
            //     if(pages[v].websiteId === websiteId) {
            //         pages[v].created = new Date();
            //         pages[v].accessed = new Date();
            //         results.push(pages[v]);
            //     }
            // }
            //
            // return results;


            var url =  "/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page){
            // var oldpage = findPageById(pageId);
            // var oldIndex = pages.indexOf(oldpage);
            // pages.splice(oldIndex, 1);
            // pages.push(page);

            var url = "/api/page/"+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();