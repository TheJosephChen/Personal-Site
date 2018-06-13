(function () {
    angular
        .module("duelystApp")
        .controller("tournamentNewController", tournamentNewController);

    function tournamentNewController($routeParams, tournamentService, $location, userService, getLoggedInUser) {
        var model = this;
        model.loggedInUser = getLoggedInUser;

        model.createTournament = createTournament;
        function init() {
        }
        init();

        function createTournament(user, tournament) {
            tournamentService
                .createTournament(user.username, tournament)
                .then(function () {
                    if (!isUserOrganizerRole(user)) {
                        user.roles.push("ORGANIZER");
                        userService
                            .updateUser(user._id, user)
                    }
                    $location.url("/tournament/");
                })
        }

        function isUserOrganizerRole(user) {
            var roles = user.roles;
            return (roles.indexOf("ORGANIZER") !== -1);
        }

    }

})();