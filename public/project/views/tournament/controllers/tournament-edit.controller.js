(function () {
    angular
        .module("duelystApp")
        .controller("tournamentEditController", tournamentEditController);

    function tournamentEditController($routeParams, tournamentService, getLoggedInUser, $location) {
        var model = this;
        model.tournament = {};
        model.loggedInUser = getLoggedInUser
        model.tournamentId = $routeParams["tournamentId"];
        model.deleteUserFromTournament = deleteUserFromTournament;
        model.deleteTournament = deleteTournament;

        function init() {
            tournamentService
                .getTournamentById(model.tournamentId)
                .then(function (tournament) {
                    model.tournament = tournament;
                    model.openings = model.tournament.max - model.tournament.participants.length;
                })
        }
        init();

        function deleteUserFromTournament(user, tournamentId) {
            tournamentService
                .deleteUserFromTournament(user.username, tournamentId)
                .then(function () {
                    init();
                })
        }

        function deleteTournament(tournamentId) {
            tournamentService
                .deleteTournament(tournamentId)
                .then(function () {
                    $location.url("/tournament/");
                })
        }

    }

})();