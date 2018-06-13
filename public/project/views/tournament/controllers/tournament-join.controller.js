(function () {
    angular
        .module("duelystApp")
        .controller("tournamentJoinController", tournamentJoinController);


    function tournamentJoinController($routeParams, deckService, userService, $location, getLoggedInUser, tournamentService) {
        var model = this;

        model.tournamentId = $routeParams["tournamentId"];
        model.loggedInUser = getLoggedInUser;
        model.deck = [];
        model.getDeckByCode = getDeckByCode;
        model.joinTournament = joinTournament;


        function init() {
            checkLogin();
        }
        init();

        function getDeckByCode(deckCode) {
            deckService
                .getDeckByCode(deckCode)
                .then(renderDeck)
                .then(function () {
                    model.validDeck = true;
                });
        }

        function renderDeck(deck) {
            deck.cards.splice(0, 0, getDeckGeneral(deck));
            model.deck = deck.cards;

        }

        function getDeckGeneral(deck) {
            var generalCard = {"name": deck.general, "count": 1};
            return generalCard;

        }

        function joinTournament(user, deckCode, tournamentId) {
            var deck = {deckCode: deckCode};
            tournamentService
                .addUserToTournament(user.username, deck, tournamentId)
                .then(function () {
                    if (!isUserParticipantRole(user)) {
                        user.roles.push("PARTICIPANT");
                        userService
                            .updateUser(user._id, user)
                    }

                    $location.url("/tournament/active/" + model.loggedInUser.username);
                })
        }

        function isUserParticipantRole(user) {
            var roles = user.roles;
            return (roles.indexOf("PARTICIPANT") !== -1);
        }

        function checkLogin() {
            userService
                .checkLogin()
                .then(function (user) {
                    if (user === "0") {
                        model.loggedInUser = null;
                    } else {
                        model.loggedInUser = user;
                    }
                })
        }
    }
})();