(function () {
    angular
        .module('WebProject')
        .controller('LoginController', LoginController);
    
    function LoginController($location,currentUser, userService,$timeout, $window) {

        var model = this;

        model.user = currentUser;

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
                        $window.history.back()
                        // $location.url('/');
                    },function(){
                        model.message = "sorry, username " + username + " and password are not found. please try again!";
                        $timeout(function() {

                            model.message = false;

                        }, 3000)
                    });
            }



        }
    }
})();