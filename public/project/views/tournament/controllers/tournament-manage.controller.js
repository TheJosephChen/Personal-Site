(function () {
    angular
        .module("duelystApp")
        .controller("tournamentManageController", tournamentManageController);

    function tournamentManageController($routeParams, tournamentService, getLoggedInUser) {
        var model = this;
        model.tournaments = [];
        model.loggedInUser = getLoggedInUser;
        var username = $routeParams.username;

        function init() {
            tournamentService
                .getAllTournamentsForOrganizer(username)
                .then(function (tournaments) {
                    model.tournaments = tournaments;
                })
        }
        init();

    }

})();