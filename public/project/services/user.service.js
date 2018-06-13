(function () {
    angular
        .module("duelystApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsernameAndPassword": login,
            "findUserByUsername": findUserByUsername,
            "findUserByID": findUserByID,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "rateUser": rateUser,
            "checkLogin": checkLogin,
            "logout": logout,
            "getAllUsers": getAllUsers
        };
        return api;

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                });
        }
        function registerUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByID(userId) {
            return $http.get("/api/user/" + userId);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function rateUser(ratingId, message) {
            var url = "/api/user?userId=" + ratingId + "&message=" + message;
            return $http.put(url);
        }

        function getAllUsers() {
            var url = "/api/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();