(function () {
    angular
        .module("duelystApp")
        .controller("deckReviewController", deckReviewController);


    function deckReviewController($routeParams, deckService, userService) {
        var model = this;

        model.deckCode = $routeParams["deckCode"];
        model.username = $routeParams["username"];
        model.deck = [];
        model.getDeckByCode = getDeckByCode;


        function init() {
            checkLogin();
            getDeckByCode();
        }
        init();

        function getDeckByCode() {
            deckService
                .getDeckByCode(model.deckCode)
                .then(renderDeck)
        }

        function renderDeck(deck) {
            deck.cards.splice(0, 0, getDeckGeneral(deck));
            model.deck = deck.cards;

        }

        function getDeckGeneral(deck) {
            var generalCard = {"name": deck.general, "count": 1};
            return generalCard;

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