(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);


    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        };

        init();

        function login(user) {
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if (user === "0" || user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $location.url("/profile/" + user._id);
                    }

                })
        }
    }
})();