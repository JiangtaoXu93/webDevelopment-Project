(function(){
    angular
        .module('WebProject')
        .factory('productService', productService);

    function productService($http,$sce) {

        var api = {
            createProduct: createProduct,
            findProductById: findProductById,
            findProductByUser: findProductByUser,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct,
            findAllProducts: findAllProducts,
            findProductByUniversityId:findProductByUniversityId,
            findProductOnEbay:findProductOnEbay,
            findProductOnCampus:findProductOnCampus,
            findProductDetailById:findProductDetailById,
            findProductEbayDetailById:findProductEbayDetailById
        };
        return api;

        function findAllProducts() {
            var url="/api/products";
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


        function findProductById(productId) {
            var url = "/api/product/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                },function (response) {
                    return response.data;
                });
        }

        function findProductDetailById(productId) {
            var url = "/api/product/detail/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductByUser(userId){
            var url = "/api/products?userId=" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductByUniversityId(universityId){
            var url = "/api/products?universityId=" + universityId;
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

        function findProductOnCampus(keyword,universityId) {
            var url="/api/search?keyword=" + keyword +"&universityId=" + universityId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findProductEbayDetailById(itemId) {
            var url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=Jiangtao-Webdev-PRD-77a8f702d-1a6a9d14&"
                +"siteid=0&"
                +"version=967&"
                +"IncludeSelector=Description,ItemSpecifics,ShippingCosts&"
                +"ItemID="+itemId
                +"&callbackname=thisIsMyCallBack";



            return Promise.resolve( $.ajax({
                url: url,
                dataType:"jsonp",
                jsonpCallback: 'thisIsMyCallBack'
            }));
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