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

            var found = userService.findUserByUsername(username);
            
            if(found !== null) {
                model.error = "sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName:lastName
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();