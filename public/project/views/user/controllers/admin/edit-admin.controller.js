(function () {
    angular
        .module("duelystApp")
        .controller("editAdminController", editAdminController);

    function editAdminController($routeParams, userService) {
        var model = this;

        model.username = $routeParams["username"];
        model.roles = ["ORGANIZER", "PARTICIPANT", "ADMIN"];
        model.updateIGN = updateIGN;
        model.assignRole = assignRole;
        model.deleteRole = deleteRole;

        function init() {
            checkLogin();
            userService
                .findUserByUsername(model.username)
                .then(function (user) {
                    model.user = angular.copy(user);
                    model.origUser = angular.copy(model.user);
                    model.userRoles = model.user.roles;

                })
        };
        init();

        function assignRole(role, user) {
            user.roles.push(role);
            userService.updateUser(user._id, user);
            angular.copy(model.user, model.origUser);
            init();
        };

        function deleteRole(role, user) {
            var index = user.roles.indexOf(role);
            user.roles.splice(index, 1);
            userService.updateUser(user._id, user);
            angular.copy(model.user, model.origUser);
            init();
        };

        function updateIGN(user) {
            userService.updateUser(user._id, user);
            angular.copy(model.user, model.origUser);
        };

        function checkLogin() {
            userService
                .checkLogin()
                .then(function (user) {
                    if (user === "0") {
                        model.loggedInUser = null;
                    } else {
                        model.loggedInUser = user;
                    }
                })
        }
    }
})();