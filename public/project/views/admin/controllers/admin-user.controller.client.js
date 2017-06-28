(function () {
    angular
        .module('WebProject')
        .controller('AdminUserController', AdminUserController);

    function AdminUserController($routeParams,
                                $route,
                                userService,
                                 universityService,
                                currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.user = currentUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.getUniversitiesByState = getUniversitiesByState;
        model.showUpdate = showUpdate;
        model.updateUser = updateUser;

        function init() {

            userService.findAllUsers()
                .then(function (found) {
                    model.items = found;
                });

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


        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (data) {
                    $route.reload();
                })
        }

        function updateUser(user) {
            var newRoles = [];
            if (model.newRolesBuyer) {
                newRoles.push("BUYER")
            }
            if (model.newRolesSeller) {
                newRoles.push("SELLER")
            }
            if (model.newRolesAdmin) {
                newRoles.push("ADMIN")
            }

            user._university = model.selectedUniversity;

            user.roles = newRoles;
            userService.updateUser(user._id,user)
                .then(function (data) {
                    $route.reload();
                })
        }



        function createUser() {
            if (model.newUser.username && model.newUser.password && model.newRoles && model.selectedUniversity) {
                var newRoles = [];
                if (model.newRoles.buyer) {
                    newRoles.push("BUYER")
                }
                if (model.newRoles.seller) {
                    newRoles.push("SELLER")
                }

                if (model.newRoles.admin) {
                    newRoles.push("ADMIN")
                }

                var newUser = {
                    username: model.newUser.username,
                    password: model.newUser.password,
                    _university: model.selectedUniversity,
                    roles: newRoles
                };

                userService.createUser(newUser)
                    .then(function () {
                        $route.reload();
                    })


            } else {
                model.error = "You should fill in all the input area!"
            }

        }


        function showUpdate(item) {
            model.itemUpdate = angular.copy(item);
            model.selectedState = model.itemUpdate._university.stateName;
            model.selectedUniversity = model.itemUpdate._university._id;
            if(model.itemUpdate.roles.indexOf('BUYER')>-1){
                model.newRolesBuyer = "BUYER";
            }

            if(model.itemUpdate.roles.indexOf('SELLER')>-1){
                model.newRolesSeller = "SELLER";
            }

            if(model.itemUpdate.roles.indexOf('ADMIN')>-1){
                model.newRolesAdmin = "ADMIN";
            }

            getUniversitiesByState();
        }

    }





})();
