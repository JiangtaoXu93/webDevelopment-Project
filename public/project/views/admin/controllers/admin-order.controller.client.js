(function () {
    angular
        .module('WebProject')
        .controller('AdminOrderController', AdminOrderController);

    function AdminOrderController($routeParams,
                                $route,
                                orderService,
                                 userService,
                                 productService,
                                 universityService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteOrder = deleteOrder;
        model.createOrder = createOrder;
        model.getUniversitiesByState = getUniversitiesByState;
        model.showUpdate = showUpdate;
        model.updateOrder = updateOrder;

        function init() {

            orderService.findAllOrders()
                .then(function (found) {
                    model.items = found;
                });

            universityService.findAllStates().then(
                function (found) {
                    model.states = found;
                }
            );


        }
        init();

        function getUniversitiesByState() {
            var state = model.selectedState;
            universityService.findUniversityByStateName(state).then(
                function (found) {
                    model.universities = found;
                }
            );
        }


        function deleteOrder(orderId) {
            orderService.deleteOrder(orderId)
                .then(function (data) {
                    $route.reload();
                })
        }

        function updateOrder(order) {
            var sellerId = order._seller._id;
            var buyerId = order._buyer._id;
            var productId = order._product._id;
            var universityId = model.selectedUniversity;
            var newOrder = {
                _product: productId,
                _buyer: buyerId,
                _seller:sellerId,
                _university:universityId
            }
            orderService.updateOrder(order._id,newOrder)
                .then(function (data) {
                    $route.reload();
                })
        }



        function createOrder() {
            if(!model.newOrder){
                model.error = "You should fill in all the input area!";
            }else if (model.newOrder._product
                && model.newOrder._buyer
                && model.newOrder._seller
                && model.selectedUniversity) {

                userService.findUserById(model.newOrder._buyer).then(function (found) {
                    if (found ==='Not Found'){
                        model.error = "Please input the correct buyer id";
                    }else{
                        userService.findUserById(model.newOrder._seller).then(function (found) {
                            if (found ==='Not Found'){
                                model.error = "Please input the correct seller id";
                            }else{
                                productService.findProductById(model.newOrder._product).then(function (found) {
                                    if (found ==='Not Found'){
                                        model.error = "Please input the correct product id";
                                    }else{
                                        model.newOrder._university = model.selectedUniversity;
                                        orderService.createOrder(model.newOrder)
                                            .then(function () {
                                                $route.reload();
                                            });
                                    }
                                },function () {
                                    model.error = "Please input the correct product id";
                                });
                            }
                        },function () {
                            model.error = "Please input the correct seller id";
                        });
                    }
                },function () {
                    model.error = "Please input the correct buyer id";
                });

            }else{
                model.error = "You should fill in all the input area!";
            }



        }


        function showUpdate(item) {
            model.itemUpdate = angular.copy(item);
            model.selectedState = model.itemUpdate._university.stateName;
            model.selectedUniversity = model.itemUpdate._university._id;
            getUniversitiesByState();
        }

    }





})();
