(function () {
    angular
        .module('WebProject')
        .controller('HomeController', HomeController);

    function HomeController($location,currentUser, $timeout, $routeParams, userService, universityService) {
        var model = this;
        model.user = currentUser;
        model.getUniversitiesByState = getUniversitiesByState;
        model.universitySearch = universitySearch;

        function init() {
            universityService.findAllStates().then(
                function (found) {
                    model.states = found;
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

        function universitySearch(universityId){
            $location.url('/search/' + universityId);
        }


    }
})();