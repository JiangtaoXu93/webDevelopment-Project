(function () {
    angular
        .module('WebProject')
        .controller('ProductSearchController', ProductSearchController);

    function ProductSearchController($location,currentUser, $timeout, $routeParams,productService, userService, universityService) {
        var model = this;
        model.user = currentUser;
        model.getUniversitiesByState = getUniversitiesByState;
        model.universityId = $routeParams.universityId;
        model.searchProduct = searchProduct;

        function init() {
            universityService.findAllStates().then(
                function (found) {
                    model.states = found;
                }
            );

            universityService.findUniversityById(model.universityId).then(
                function (found) {
                    model.selectedState=found.stateName;
                    model.selectedUniversity = found._id;
                    model.searchArea = "campus"
                    getUniversitiesByState();
                }
            )
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

        function searchProduct() {
            if(model.searchArea === "campus"){
                searchOnCampus();
            }else{
                searchOnEbay();
            }
        }

        function searchOnEbay(){
            productService.findProductOnEbay(model.keyword)
                .then(function (data) {
                    if(data === null || data === "" || typeof data === 'undefined'){
                        model.message ='Sorry, no result for keyword: "model.keyword"';
                    }else{
                        model.message ='';
                        model.items = data;
                    }

                },function () {
                    model.message ='Sorry, no result for keyword: "model.keyword"';
                })

        }

        function searchOnCampus() {

        }


    }
})();