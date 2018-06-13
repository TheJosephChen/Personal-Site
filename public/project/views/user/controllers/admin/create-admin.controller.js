(function () {
    angular
        .module("duelystApp")
        .controller("createAdminController", createAdminController);


    function createAdminController($location, userService, getLoggedInUser) {
        var model = this;
        model.loggedInUser = getLoggedInUser;

        model.registerUser = registerUser;

        function init() {

            checkLogin();
        }
        init();

        function registerUser(user) {
            userService.findUserByUsername(user.username)
                .then(function (_user) {
                    if (_user === "0" || _user === null) {
                        if (user.username === "admin" && user.password === "admin") {
                            user.roles = [];
                            user.roles.push("ADMIN");
                        }
                        return userService.registerUser(user);
                    } else {
                        model.error = "User Already exists";
                    }
                })
                .then(function () {
                    $location.url("/admin/");
                });
        }

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