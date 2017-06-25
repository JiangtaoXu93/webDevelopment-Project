(function () {
    angular
        .module('WebProject')
        .controller('RegisterController', RegisterController);
    
    function RegisterController($location,currentUser, userService,$rootScope) {

        var model = this;
        model.user = currentUser;
        model.submit = submit;

        function submit() {
            return false;
        }

        model.register = register;

        function register(username, password, repassword, email, lastName, firstName) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== repassword || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            if (typeof email==='undefined'){
                email = null;
                // return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            email: email,
                            firstName: firstName,
                            lastName:lastName
                        };
                        userService
                            .register(newUser)
                            .then(function (user) {
                                var user = user.data;
                                $rootScope.currentUser = user;
                                $location.url("/profile");

                            });
                    }
                );


            // var found = userService.findUserByUsername(username);
            //
            // if(found !== null) {
            //     model.error = "sorry, that username is taken";
            // } else {
            //     var newUser = {
            //         username: username,
            //         password: password,
            //         email: email,
            //         firstName: firstName,
            //         lastName:lastName
            //     };
            //     newUser = userService.createUser(newUser);
            //     $location.url('/user/' + newUser._id);
            // }
        }
    }
})();