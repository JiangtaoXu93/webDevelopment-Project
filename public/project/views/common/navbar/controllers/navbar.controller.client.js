(function () {
    angular
        .module('WebProject')
        .controller('NavbarController', NavbarController);

    function NavbarController($route ,$location, userService, $q) {
        var model = this;
        model.logout=logout;
        model.switchRole=switchRole;


        // var result=getCurrentUser();
        // model.user= result;
        getCurrentUser();
        function logout() {
            console.log("logout");
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                        $route.reload();
                    },
                function () {
                })
        }

        function switchRole(role) {
            model.user.currentRole = role;
            userService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    $route.reload();
                   console.log("User update was successful");
                })
            // $location.url("/");

        }


        function getCurrentUser() {
            userService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        model.user = {};
                    } else {
                        model.user = user;
                    }
                });
        }


    }
})();