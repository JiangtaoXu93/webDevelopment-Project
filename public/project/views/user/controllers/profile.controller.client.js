(function () {
    angular
        .module('WebProject')
        .controller('ProfileController', ProfileController);
    
    function ProfileController($location, currentUser, $timeout, $routeParams, userService) {

        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        var initialUserName;

        //model.user = userService.findUserById(model.userId);

        model.updateUser = updateUser;
        //function

        init();

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

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser (user) {
            model.user = user;
            initialUserName = user.username;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
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