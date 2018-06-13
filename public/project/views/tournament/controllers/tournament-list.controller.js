(function () {
    angular
        .module("duelystApp")
        .controller("tournamentListController", tournamentListController);

    function tournamentListController(tournamentService, getLoggedInUser) {
        var model = this;
        model.tournaments = [];
        model.loggedInUser = getLoggedInUser;
        model.deleteTournament = deleteTournament;

        function init() {
            tournamentService
                .getAllTournaments()
                .then(function (tournaments) {
                    model.tournaments = tournaments;
                })
        }
        init();

        // for admins only
        function deleteTournament(tournamentId) {
            tournamentService
                .deleteTournament(tournamentId)
                .then(function () {
                    init();
                })
        }

    }

})();