(function(){
    angular
        .module('WebProject')
        .factory('universityService', universityService);
    
    function universityService($http) {

        var api = {
            createUniversity: createUniversity,
            findUniversityById: findUniversityById,
            findUniversityByStateName: findUniversityByStateName,
            updateUniversity: updateUniversity,
            deleteUniversity: deleteUniversity,
            findAllStates:findAllStates
        };
        return api;

function findAllStates() {
    var url="/api/states";
    return $http.get(url)
        .then(function (response) {
            return response.data;
        });
}




        function createUniversity(university) {

            var url = "/api/university";
            return $http.post(url, university)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUniversityByStateName(stateName) {
            var url = "/api/university?stateName="+stateName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUniversityById(universityId) {
            var url = "/api/university/"+universityId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }


        function updateUniversity(universityId, university){
            var url = "/api/university/"+universityId;
            return $http.put(url, university)
                .then(function (response) {
                    return response.data;
                });


        }

        function deleteUniversity(universityId){
            var url = "/api/university/"+universityId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }



    }
})();