(function () {
    angular
        .module('WebProject')
        .controller('RegisterController', RegisterController);
    
    function RegisterController($location,
                                currentUser,
                                userService,
                                wishlistService,
                                $rootScope,
                                universityService) {

        var model = this;
        model.user = currentUser;
        model.submit = submit;
        model.getUniversitiesByState = getUniversitiesByState;

        function init() {
            universityService.findAllStates().then(
                function (found) {
                    model.states = found;
                }
            );
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


        function submit() {
            return false;
        }

        model.register = register;

        function register(username, password, repassword, email, lastName, firstName,universityId) {

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

            if(universityId ===''|| typeof universityId ==='undefined'){
                model.error = "university should not be empty";
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
                            lastName:lastName,
                            _university: universityId
                        };
                        userService
                            .register(newUser)
                            .then(function (user) {
                                // var user = user.data;
                                // $rootScope.currentUser = user;
                                //
                                userService.findUserByUsername(username)
                                    .then(function (user) {
                                        var NewWishList = {
                                            _user:user._id,
                                            products:[]
                                        }
                                        wishlistService.createWishlist(NewWishList)
                                            .then(function () {
                                                $location.url("/profile");
                                            });
                                    })

                                $location.url("/profile");
                                // var NewWishList = {
                                //     _user:user._id,
                                //     products:[]
                                // }
                                // wishlistService.createWishlist(NewWishList)
                                //     .then(function () {
                                //         $location.url("/profile");
                                //     });
                            });
                    }
                );


        }
    }
})();