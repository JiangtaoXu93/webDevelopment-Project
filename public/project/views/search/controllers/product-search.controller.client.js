(function () {
    angular
        .module('WebProject')
        .controller('ProductSearchController', ProductSearchController);

    function ProductSearchController($location,
                                     currentUser,
                                     $timeout,
                                     $routeParams,
                                     productService,
                                     userService,
                                     universityService) {
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

            if (typeof model.universityId !== 'undefined'){
                universityService.findUniversityById(model.universityId).then(
                    function (found) {
                        model.selectedState=found.stateName;
                        model.selectedUniversity = found._id;
                        model.searchArea = "campus"
                        getUniversitiesByState();
                    }
                );

                productService.findProductByUniversityId($routeParams.universityId)
                    .then(function (found) {
                        model.campusItems = found;
                    })

            }

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
            if (model.searchArea === null || model.searchArea === ''
                || typeof model.searchArea === 'undefined'){
                model.error = "On Campus or Ebay should be selected";
                $timeout(function() {

                    model.error = false;

                }, 3000)
            }else if(model.searchArea === "campus"){
                searchOnCampus();
            }else{
                searchOnEbay();
            }
        }

        function searchOnEbay(){
            if(model.keyword === null || model.keyword === ''|| typeof model.keyword === 'undefined'){
                model.error = "Keyword should be input";
                $timeout(function() {

                    model.error = false;

                }, 3000)
            }else{
                productService.findProductOnEbay(model.keyword)
                    .then(function (data) {
                        if(data === null || data === "" || typeof data === 'undefined'){
                            model.error ='Sorry, no result for keyword: "model.keyword"';
                        }else{
                            model.error ='';
                            model.items = data;
                            model.ebayResult = 'Ebay';
                        }

                    },function () {
                        model.error ='Sorry, no result for keyword: "model.keyword"';
                    });
            }

        }

        function searchOnCampus() {

            if(model.selectedUniversity === null || model.selectedUniversity === ''
                || typeof model.selectedUniversity === 'undefined'){
                model.error = "University should be selected";
                $timeout(function() {
                    model.error = false;
                }, 3000)
            }else if(model.keyword === null || model.keyword === ''|| typeof model.keyword === 'undefined'){
                productService.findProductByUniversityId(model.selectedUniversity)
                    .then(function (data) {
                        if(data.length ===0 || data === "" || typeof data === 'undefined'){
                            model.error ="Sorry, no result for current university";
                            model.campusItems = data;
                            model.ebayResult = 'Campus';
                        }else{
                            model.error ='';
                        }
                        model.campusItems = data;
                        model.ebayResult = 'Campus';
                    })
            }else{
                productService.findProductOnCampus(model.keyword,model.selectedUniversity)
                    .then(function (data) {
                        if(data.length ===0 || data === "" || typeof data === 'undefined'){
                            model.error ="Sorry, no result for current university and keyword: "+ model.keyword;

                        }else{
                            model.error ='';
                        }
                        model.campusItems = data;
                        model.ebayResult = 'Campus';

                    },function () {
                        model.error ="Sorry, no result for keyword: "+ model.keyword;
                    });
            }



        }


    }
})();