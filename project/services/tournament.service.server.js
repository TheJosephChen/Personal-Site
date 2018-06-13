var app = require("../../express");
var tournamentModel = require("../models/tournament/tournament.model.server");

app.post("/api/tournament/user/:username", createTournament);
app.get("/api/tournament", getAllTournaments);
app.get("/api/tournament/:username/manage", getAllTournamentsForOrganizer);
app.get("/api/tournament/:username/active", getAllTournamentsForParticipant);
app.get("/api/tournament/:tournamentId", getTournamentById);
app.put("/api/tournament/:tournamentId/join", addUserToTournament);
app.delete("/api/tournament/:tournamentId/user", deleteUserFromTournament);
app.delete("/api/tournament/:tournamentId/delete", deleteTournament);

function deleteTournament(req, response) {
    var tournamentId = req.params.tournamentId;
    tournamentModel
        .deleteTournament(tournamentId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteUserFromTournament(req, response) {
    var tournamentId = req.params.tournamentId;
    var username = req.query.username;
    tournamentModel
        .deleteUserFromTournament(username, tournamentId)
        .then(function (tournament) {
            response.json(tournament);
        })
}

function addUserToTournament(req, response) {
    var tournamentId = req.params.tournamentId;
    var username = req.query.username;
    var deck = req.body;
    tournamentModel
        .addUserToTournament(username, deck, tournamentId)
        .then(function (tournament) {
            response.json(tournament);
        })
}

function createTournament(req, response) {
    var username = req.params.username;
    var tournament = req.body;
    tournamentModel
        .createTournament(username, tournament)
        .then(function (tournament) {
            response.json(tournament);
        })

}

function getAllTournaments(req, response) {

    tournamentModel
        .findAllTournaments()
        .then(function (tournaments) {
            response.json(tournaments);
        })
}

function getAllTournamentsForOrganizer(req, response) {
    var username = req.params.username;
    tournamentModel
        .findAllTournamentsForOrganizer(username)
        .then(function (tournaments) {
            response.json(tournaments);
        })
}

function getAllTournamentsForParticipant(req, response) {
    var username = req.params.username;
    tournamentModel
        .findAllTournamentsForParticipant(username)
        .then(function (tournaments) {
            response.json(tournaments);
        })
}

function getTournamentById(req, response) {
    var tournamentId = req.params.tournamentId;
    tournamentModel
        .findTournamentById(tournamentId)
        .then(function (tournaments) {
            response.json(tournaments);
        })
}