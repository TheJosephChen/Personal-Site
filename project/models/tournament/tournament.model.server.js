var mongoose = require("mongoose");
var tournamentSchema = require("./tournament.schema.server");
var tournamentModel = mongoose.model("TournamentModel", tournamentSchema);
var userModel = require("../user/user.model.server");

tournamentModel.createTournament = createTournament;
tournamentModel.findAllTournaments = findAllTournaments;
tournamentModel.findAllTournamentsForOrganizer = findAllTournamentsForOrganizer;
tournamentModel.findAllTournamentsForParticipant = findAllTournamentsForParticipant;
tournamentModel.findTournamentById = findTournamentById;
tournamentModel.addUserToTournament = addUserToTournament;
tournamentModel.deleteUserFromTournament = deleteUserFromTournament;
tournamentModel.deleteTournament = deleteTournament;

module.exports = tournamentModel;

function deleteTournament(tournamentId) {
    return tournamentModel
        .remove({_id: tournamentId})
        .then(function (status) {
            return status;
        });
}

function deleteUserFromTournament(username, tournamentId) {
    return tournamentModel
        .findTournamentById(tournamentId)
        .then(function (tournament) {
            var index = tournament.participants.indexOf(username);
            tournament.participants.splice(index, 1);
            return tournament.save();
        })
}

function addUserToTournament(username, deck, tournamentId) {
    return userModel
        .findUserByUsername(username)
        .then(function (user) {
            participant = {_id: user._id, username: username, deck: deck.deckCode}
            return tournamentModel
                .findById(tournamentId)
                .then(function (tournament) {
                    tournament.participants.push(participant);
                    return tournament.save();
                } );
        })
}

function createTournament(username, tournament) {
    return userModel
        .findUserByUsername(username)
        .then(function (user) {
            organizer = {_id: user._id, username: username}
            tournament.organizer = organizer;
            return tournamentModel.create(tournament);
        })
}

function findAllTournaments() {
    return tournamentModel.find();
}

function findAllTournamentsForOrganizer(username) {
    return userModel
        .findUserByUsername(username)
        .then(function (user) {
            return tournamentModel.find({organizer: {_id: user._id, username: username}});
        })
}

function findAllTournamentsForParticipant(username) {
    return tournamentModel.find({participants: {$elemMatch: {username: username}}});
}

function findTournamentById(tournamentId) {
    return tournamentModel.findById(tournamentId)
}