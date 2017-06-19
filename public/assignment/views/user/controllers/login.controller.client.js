(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);
    
    function LoginController($location, userService,$timeout) {

        var model = this;

        model.login = login;

        model.submit = submit;

        function submit() {
            return false;
        }

        function login(username, password) {

            if (username === "" || typeof username  === 'undefined' || username === null){
                model.message = "user name is required!";
                $timeout(function() {

                    model.message = false;

                }, 3000)
            }else if (password === "" || typeof password  === 'undefined' || password === null ){
                model.message = "password is required!";
                $timeout(function() {

                    model.message = false;

                }, 3000)
            }else{
                userService
                    .login(username, password)
                    .then(function (found) {
                        $location.url('/profile');
                    },function(){
                        model.message = "sorry, username " + username + " and password are not found. please try again!";
                        $timeout(function() {

                            model.message = false;

                        }, 3000)
                    });
            }




            // userService
            //     .findUserByCredentials(username, password)
            //     .then(function (found) {
            //         $location.url('/user/' + found._id);
            //     },function(){
            //         model.message = "sorry, " + username + " and password are not found. please try again!";
            //         $timeout(function() {
            //
            //             model.message = false;
            //
            //         }, 3000)
            //     });


        }
    }
})();