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
                templateUrl: 'views/product/templates/product-search.view.client.html',
                controller: 'ProductSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/product/sellOrder', {
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
            .when('/product/:productId', {
                templateUrl: 'views/product/templates/product-edit.view.client.html',
                controller: 'ProductEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAsSeller
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
            })
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'ImageSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
        }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'ImageSearchController',
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