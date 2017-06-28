(function () {
    angular
        .module('WebProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/homepage/templates/homepage.view.client.html',
                controller:'HomeController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/search/:universityId', {
                templateUrl: 'views/search/templates/product-search.view.client.html',
                controller: 'ProductSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/search', {
                templateUrl: 'views/search/templates/product-search.view.client.html',
                controller: 'ProductSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/search/detail/ebay/:itemId', {
                templateUrl: 'views/search/templates/product-ebay-detail.view.client.html',
                controller: 'ProductEbayDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/search/detail/:productId', {
                templateUrl: 'views/search/templates/product-detail.view.client.html',
                controller: 'ProductDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })



            .when('/product-management', {
                templateUrl: 'views/product/templates/product-list.view.client.html',
                controller: 'ProductListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/product/new', {
                templateUrl: 'views/product/templates/product-new.view.client.html',
                controller: 'ProductNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/product/new/:galleryURL', {
                templateUrl: 'views/product/templates/product-new.view.client.html',
                controller: 'ProductNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/product/:productId/new/:galleryURL', {
                templateUrl: 'views/product/templates/product-edit.view.client.html',
                controller: 'ProductEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/product/:productId', {
                templateUrl: 'views/product/templates/product-edit.view.client.html',
                controller: 'ProductEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/order/sell', {
                templateUrl: 'views/order/templates/sell-order.view.client.html',
                controller: 'SellOrderController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
                }
            })
            .when('/order/buy', {
                templateUrl: 'views/order/templates/buy-order.view.client.html',
                controller: 'BuyOrderController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsBuyer
                }
            })
            .when('/wish-list', {
                templateUrl: 'views/wish-list/templates/wish-list.view.client.html',
                controller: 'WishListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsBuyer
                }
            })
            .when('/wish-list/detail/:productId', {
                templateUrl: 'views/search/templates/product-detail.view.client.html',
                controller: 'ProductDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-user.view.client.html',
                controller: 'AdminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsAdmin
                }
            })
            .when('/admin/product', {
                templateUrl: 'views/admin/templates/admin-product.view.client.html',
                controller: 'AdminProductController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsAdmin
                }
            })
            .when('/admin/order', {
                templateUrl: 'views/admin/templates/admin-order.view.client.html',
                controller: 'AdminOrderController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsAdmin
                }
            })
            .when('/admin/wishlist', {
                templateUrl: 'views/admin/templates/admin-wishlist.view.client.html',
                controller: 'AdminWishlistController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsAdmin
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });

        function checkLoggedIn(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }

        function checkAsSeller($q, $location, userService) {
            var deferred = $q.defer();
            userService
                .loggedin()
                .then(function (currentUser) {
                    if(currentUser.currentRole === 'SELLER') {
                        deferred.resolve(currentUser);
                    } else {
                        deferred.resolve({});
                        $location.url('/');
                    }
                });
            return deferred.promise;
        }

        function checkAsAdmin($q, $location, userService) {
            var deferred = $q.defer();
            userService
                .loggedin()
                .then(function (currentUser) {
                    if(currentUser.currentRole === 'ADMIN') {
                        deferred.resolve(currentUser);
                    } else {
                        deferred.resolve({});
                        $location.url('/');
                    }
                });
            return deferred.promise;
        }

        function checkAsBuyer($q, $location, userService) {
            var deferred = $q.defer();
            userService
                .loggedin()
                .then(function (currentUser) {
                    if(currentUser.currentRole === 'BUYER') {
                        deferred.resolve(currentUser);
                    } else {
                        deferred.resolve({});
                        $location.url('/');
                    }
                });
            return deferred.promise;
        }


        function getCurrentUser(UserService, $q) {
            var deferred = $q.defer();
            UserService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.resolve({});
                        console.log(user);
                    } else {
                        deferred.resolve(user);
                        console.log(user);
                    }
                });
            return deferred.promise;
        }

        function checkCurrentUser(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.resolve({});
                         // $location.url('/login');
                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }

    }
})();