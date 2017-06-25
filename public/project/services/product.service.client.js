(function(){
    angular
        .module('WebProject')
        .factory('productService', productService);

    function productService($http,$sce) {

        var api = {
            createProduct: createProduct,
            findProductById: findProductById,
            findProductByStateName: findProductByStateName,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            findAllStates:findAllStates,
            findProductOnEbay:findProductOnEbay
        };
        return api;

        function findAllStates() {
            var url="/api/states";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }




        function createProduct(product) {

            var url = "/api/product";
            return $http.post(url, product)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductByStateName(stateName) {
            var url = "/api/product?stateName="+stateName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findProductById(productId) {
            var url = "/api/product/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }


        function updateProduct(productId, product){
            var url = "/api/product/"+productId;
            return $http.put(url, product)
                .then(function (response) {
                    return response.data;
                });


        }

        function deleteProduct(productId){
            var url = "/api/product/"+productId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findProductOnEbay(keyword) {
            var url = "https://svcs.ebay.com/services/search/FindingService/v1";
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME=Jiangtao-Webdev-PRD-77a8f702d-1a6a9d14";
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&REST-PAYLOAD";
            url += "&paginationInput.entriesPerPage=10";

            url = url + "&keywords="+ encodeURI(keyword);

            return $http.jsonp($sce.trustAsResourceUrl(url))
                .then(function (found) {
                    if (typeof  found.data.findItemsByKeywordsResponse[0].searchResult ==="undefined"){
                        return {};
                    }else{
                        var items = found.data.findItemsByKeywordsResponse[0].searchResult[0].item;
                        return items;
                    }
                });
        }


    }
})();