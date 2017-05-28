(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);
    
    function ProfileController($location, $timeout, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);

        model.updateUser = updateUser;
        function updateUser(uid, u){

            if (typeof u.email ==="undefined"){

                model.error="email is not correct";

                $timeout(function() {

                    model.error = false;

                }, 3000)

            }else{
                userService.updateUser(uid,u);
                model.error="update successfully";
                $timeout(function() {

                    model.error = false;

                }, 3000)
                return;
            }



        }

    }
})();