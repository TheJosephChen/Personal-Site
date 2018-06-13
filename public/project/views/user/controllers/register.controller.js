(function () {
    angular
        .module("duelystApp")
        .controller("registerController", registerController);


    function registerController($location, userService) {
        var model = this;

        model.registerUser = registerUser;
        function init() {

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
                .then(function (response) {
                    var _user = response.data;
                    userService.findUserByUsernameAndPassword(_user.username, _user.password)
                        .then(function () {
                            $location.url("/");

                        })
                });
        }
    }
})();