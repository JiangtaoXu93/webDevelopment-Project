(function () {
    angular
        .module('WebProject')
        .controller('NavbarController', NavbarController);

    function NavbarController($route ,$location, $window, userService, $q) {
        var model = this;
        model.logout=logout;
        model.switchRole=switchRole;
        model.backPage = backPage;

        function init() {
            var url = $location.url();
            if(url ==='/'){
                model.homePage = "homePage";
            }
            getCurrentUser();
        }
        init();

        function backPage() {
            var url = $location.url();
            var sections = url.split('/');
            if (sections[1] === 'search' && sections[2] === 'detail'){
                $location.url("/search");
            }else if (sections[1] === 'search'){
                $location.url("/");
            }else if(sections[1] === 'login'){
                $location.url("/");
            }else if(sections[1] === 'register'){
                $location.url("/");
            }else if(sections[1] === 'profile'){
                $location.url("/");
            }else if(sections[1] === 'product-management'){
                $location.url("/profile");
            }else if (sections[1] === 'product'){
                $location.url("/product-management");
            }else if (sections[1] === 'order'){
                $location.url("/profile");
            }else if (sections[1] === 'wish-list'&& sections[2] === 'detail'){
                $location.url("/wish-list");
            }else if (sections[1] === 'wish-list'){
                $location.url("/profile");
            }else if (sections[1] === 'admin'){
                $location.url("/profile");
            }


        }

        function logout() {
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
                });

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