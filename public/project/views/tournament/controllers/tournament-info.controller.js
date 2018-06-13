(function () {
    angular
        .module("duelystApp")
        .controller("tournamentInfoController", tournamentInfoController);

    function tournamentInfoController($routeParams, tournamentService, getLoggedInUser) {
        var model = this;
        model.tournament = {};
        model.loggedInUser = getLoggedInUser
        var tournamentId = $routeParams["tournamentId"];

        function init() {
            tournamentService
                .getTournamentById(tournamentId)
                .then(function (tournament) {
                    model.tournament = tournament;
                    model.openings = model.tournament.max - model.tournament.participants.length;
                })
        }
        init();

    }

})();