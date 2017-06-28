(function(){
    angular
        .module('WebProject')
        .factory('orderService', orderService);

    function orderService($http,$sce) {

        var api = {
            createOrder: createOrder,
            findAllOrders: findAllOrders,
            findOrderById: findOrderById,
            findOrderByBuyer: findOrderByBuyer,
            findOrderBySeller:findOrderBySeller,
            updateOrder: updateOrder,
            deleteOrder: deleteOrder,
        };
        return api;


        function createOrder(order) {
            var url = "/api/order";
            return $http.post(url, order)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllOrders() {
            var url = "/api/orders";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findOrderById(orderId) {
            var url = "/api/order/"+orderId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findOrderBySeller(){
            var url = "/api/sell-orders";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOrderByBuyer(){
            var url = "/api/buy-orders";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateOrder(orderId, order){
            var url = "/api/order/"+orderId;
            return $http.put(url, order)
                .then(function (response) {
                    return response.data;
                });


        }

        function deleteOrder(orderId){
            var url = "/api/order/"+orderId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findOrderOnEbay(keyword) {
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