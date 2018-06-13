(function () {
    angular
        .module("duelystApp")
        .controller("tournamentActiveController", tournamentActiveController);

    function tournamentActiveController($routeParams, tournamentService, getLoggedInUser) {
        var model = this;
        model.tournaments = [];
        model.loggedInUser = getLoggedInUser;
        var username = $routeParams.username;

        function init() {
            tournamentService
                .getAllTournamentsForParticipant(username)
                .then(function (tournaments) {
                    model.tournaments = tournaments;
                })
        }
        init();

    }

})();