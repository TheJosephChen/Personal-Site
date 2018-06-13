(function () {
    angular
        .module("duelystApp")
        .controller("userSearchController", userSearchController);


    function userSearchController($location, userService) {
        var model = this;

        model.userName = "";
        model.findUserByName = findUserByName;


        function init() {
            checkLogin();
        };

        init();

        function findUserByName(username) {
            userService.findUserByUsername(username)
                .then(function (user) {
                    if (user === "0" || user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $location.url("/profile/" + user.username);
                    }

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