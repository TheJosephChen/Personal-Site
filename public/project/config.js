(function () {
    angular
        .module("duelystApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "views/user/templates/home.html",
                controller: "userSearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/user/templates/admin/user-admin.view.html",
                controller: "userAdminController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/admin/edit/:username", {
                templateUrl: "views/user/templates/admin/edit-admin.view.html",
                controller: "editAdminController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/admin/create", {
                templateUrl: "views/user/templates/admin/create-admin.view.html",
                controller: "createAdminController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/profile/:username", {
                templateUrl: "views/user/templates/profile.view.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.html",
                controller: "registerController",
                controllerAs: "model"})
            .when("/search", {
                templateUrl: "views/search/templates/search.html",
                controller: "cardSearchController",
                controllerAs: "model"
            })
            .when("/deck/:username/:deckCode", {
                templateUrl: "views/search/templates/deck-review.html",
                controller: "deckReviewController",
                controllerAs: "model"
            })
            .when("/details/:cardName", {
                templateUrl: "views/search/templates/card-details.html",
                controller: "cardDetailsController",
                controllerAs: "model"
            })
            .when("/tournament/", {
                templateUrl: "views/tournament/templates/tournament-list.html",
                controller: "tournamentListController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/create", {
                templateUrl: "views/tournament/templates/tournament-create.html",
                controller: "tournamentNewController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/manage/:username", {
                templateUrl: "views/tournament/templates/tournament-manage.html",
                controller: "tournamentManageController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/:tournamentId/info", {
                templateUrl: "views/tournament/templates/tournament-info.html",
                controller: "tournamentInfoController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/:tournamentId/join", {
                templateUrl: "views/tournament/templates/tournament-join.html",
                controller: "tournamentJoinController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/:tournamentId/edit", {
                templateUrl: "views/tournament/templates/tournament-edit.html",
                controller: "tournamentEditController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
            .when("/tournament/active/:username", {
                templateUrl: "views/tournament/templates/tournament-active.html",
                controller: "tournamentActiveController",
                controllerAs: "model",
                resolve: {
                    getLoggedInUser: checkLogin
                }
            })
    }

    // resolve this function to protect any login-only pages
    function checkLogin(userService, $q) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.reject();
                } else {
                    deferred.resolve(user);
                }
            })
        return deferred.promise;
    }
})();