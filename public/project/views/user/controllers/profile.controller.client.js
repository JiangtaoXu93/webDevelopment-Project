(function () {
    angular
        .module('WebProject')
        .controller('ProfileController', ProfileController);
    
    function ProfileController($location, currentUser, $timeout, $routeParams, userService,universityService) {

        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.universityId = model.user._university;
        model.getUniversitiesByState = getUniversitiesByState;
        model.deleteUser = deleteUser;
        model.updateUser = updateUser;
        model.logout = logout;
        var initialUserName;

        function init() {
            renderUser(currentUser);
            initialUserName = currentUser.username;
            universityService.findAllStates().then(
                function (found) {
                    model.states = found;
                }
            );

            universityService.findUniversityById(model.universityId).then(
                function (found) {
                    model.selectedState=found.stateName;
                    model.user._university = found._id;
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


        function updateUser(uid, u){
            if (model.user.username !== initialUserName){
                userService
                    .findUserByUsername(u.username)
                    .then(function () {
                        model.message = "This user name is existed, please try another";
                        $timeout(function() {

                            model.message = false;

                        }, 3000)
                    }, function () {
                        userService
                            .updateUser(uid, u)
                            .then(updateSuccess,updateFail);
                    })
            }else{
                userService
                    .updateUser(uid, u)
                    .then(updateSuccess,updateFail);
            }






        }

        function updateSuccess(){
            model.message = "User update was successful";
            $timeout(function() {

                model.message = false;

            }, 3000)
        }

        function updateFail(){
            model.error = "User update was failure ";
            $timeout(function() {

                model.message = false;

            }, 3000)
        }



        function renderUser (user) {
            model.user = user;
            initialUserName = user.username;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function deleteUser(user) {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }


        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    })
        }

    }
})();