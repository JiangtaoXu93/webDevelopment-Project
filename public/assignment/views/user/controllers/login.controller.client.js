(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);
    
    function LoginController($location, userService,$timeout) {

        var model = this;

        model.login = login;

        function login(username, password) {
           // var found = userService.findUserByCredentials(username, password);

            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    $location.url('/user/' + found._id);
                },function(){
                    model.message = "sorry, " + username + " and password are not found. please try again!";
                    $timeout(function() {

                        model.message = false;

                    }, 3000)
                });

            // if(found !== null) {
            //     $location.url('/user/' + found._id);
            // } else {
            //     model.message = "sorry, " + username + " not found. please try again!";
            // }
        }
    }
})();