(function () {
    angular
        .module("duelystApp")
        .service("tournamentService", tournamentService);

    function tournamentService($http) {
        this.createTournament = createTournament;
        this.getAllTournaments = getAllTournaments;
        this.getAllTournamentsForOrganizer = getAllTournamentsForOrganizer;
        this.getAllTournamentsForParticipant = getAllTournamentsForParticipant;
        this.getTournamentById = getTournamentById;
        this.addUserToTournament = addUserToTournament;
        this.deleteUserFromTournament = deleteUserFromTournament;
        this.deleteTournament = deleteTournament;

        function deleteTournament(tournamentId) {
            var url = "/api/tournament/" + tournamentId + "/delete";
            return $http.delete(url);
        }

        function createTournament(username, tournament) {
            var url = "/api/tournament/user/" + username;
            return $http.post(url, tournament);
        }

        function getAllTournaments() {
            var url = "/api/tournament";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllTournamentsForOrganizer(username) {
            var url = "/api/tournament/" + username + "/manage";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllTournamentsForParticipant(username) {
            var url = "/api/tournament/" + username + "/active";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTournamentById(tournamentId) {
            var url = "/api/tournament/" + tournamentId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addUserToTournament(username, deck, tournamentId) {
            var url = "/api/tournament/" + tournamentId + "/join?username=" + username;
            return $http.put(url, deck);

        }

        function deleteUserFromTournament(username, tournamentId) {
            var url = "/api/tournament/" + tournamentId + "/user?username=" + username;
            return $http.delete(url);
        }
    }

})();