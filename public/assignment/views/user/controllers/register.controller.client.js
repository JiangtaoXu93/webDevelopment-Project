(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);
    
    function RegisterController($location, userService) {

        var model = this;

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
                model.error="email is not correct";
                return;
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
                            .createUser(newUser)
                            .then(function (user) {
                                $location.url('/user/' + user._id);
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