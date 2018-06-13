(function () {
    angular
        .module("duelystApp")
        .controller("cardSearchController", cardSearchController);

    function cardSearchController(cardService, $location, userService) {
        var model = this;
        var _cards = [];

        model.searchCardByName = searchCardByName;
        model.navToDeck = navToDeck;

        function init() {
            checkLogin();
        }
        init();

        function navToDeck() {
            $location.url("/deck");
        }

        function getCardByName(cardName) {
            cardService
                .getCardByName(cardName)
                .then(clearSearch);
        }

        function searchCardByName(cardName) {
            cardService
                .searchCardByName(cardName)
                .then(parseCardResponse)
                .then(clearSearch);
        }

        function clearSearch() {
            _cards = [];
        }

        function parseCardResponse(cards) {
            var parse = cards.split(": ");
            var responseQuantifier = parse[0];
            if (responseQuantifier === "No cards found for query") {
                // no cards were returned in the response
                parseNoCards();
            } else if (responseQuantifier === "Multiple found") {
                // many cards were found in the response
                parseMultipleCards(parse[1]);
            } else {
                // one card was found in the response
                parseOneCard(cards);
            }
        }

        function parseNoCards() {
            // No cards found for query: (Name)
            _cards.push({"value": "no cards"});
            model.cards = _cards;
        }

        function parseMultipleCards(cards) {
            // Multiple found: Item | Item | Item | Item | Item | Item | Item | Item | Item | Item{TOO MANY RESULTS, REFINE SEARCH}
            var parse = cards.split("| ");
            if (parse.length === 10) {
                var overflowFilter = parse[9].split("{");
                if (overflowFilter.length > 1) {
                    parse[9] = overflowFilter[0];
                }
            }
            for (var c in parse) {
                _cards.push({"value": parse[c]});
            }
            model.cards = _cards;
        }

        function parseOneCard(card) {
            // Name, cost, faction, type[, stats][: Text]
            var parse = card.split(", ");
            var cardName = parse[0];
            _cards.push({"value": cardName});
            model.cards = _cards;
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