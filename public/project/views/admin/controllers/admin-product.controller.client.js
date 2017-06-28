(function () {
    angular
        .module('WebProject')
        .controller('AdminProductController', AdminProductController);

    function AdminProductController($routeParams,
                                $route,
                                productService,
                                 universityService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteProduct = deleteProduct;
        model.createProduct = createProduct;
        model.getUniversitiesByState = getUniversitiesByState;
        model.showUpdate = showUpdate;
        model.updateProduct = updateProduct;

        function init() {

            productService.findAllProducts()
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


        function deleteProduct(productId) {
            productService.deleteProduct(productId)
                .then(function (data) {
                    $route.reload();
                })
        }

        function updateProduct(product) {
            product._university = model.selectedUniversity;
            productService.updateProduct(product._id,product)
                .then(function (data) {
                    $route.reload();
                })
        }



        function createProduct() {
            if (model.newProduct.galleryURL
                && model.newProduct.title
                && model.newProduct.price
                && model.selectedUniversity) {

                model.newProduct._university = model.selectedUniversity;
                model.newProduct._user = model.userId;
                productService.createProduct(model.newProduct)
                    .then(function () {
                        $route.reload();
                    })
            } else {
                model.error = "You should fill in all the input area!"
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
