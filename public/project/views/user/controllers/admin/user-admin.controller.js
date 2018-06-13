(function () {
    angular
        .module("duelystApp")
        .controller("userAdminController", userAdminController);

    function userAdminController(userService) {
        var model = this;

        model.deleteUser = deleteUser;

        function init() {
            checkLogin();
            userService
                .getAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        };
        init();

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    init();
                })
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