(function () {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;

        function init() {
            userService.findUserByID(userId)
                .then(function (response) {
                    model.user = angular.copy(response.data);
                    model.origUser = angular.copy(model.user);
                
            });
        };
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            angular.copy(model.user, model.origUser);
        };

        function unregisterUser(userId) {
            userService.deleteUser(userId);
            $location.url("/login");
        };
    }
})();