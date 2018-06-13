(function () {
    angular
        .module("duelystApp")
        .controller("cardDetailsController", cardDetailsController);

    function cardDetailsController($routeParams, cardService, userService) {
        var model = this;

        model.cardName = $routeParams.cardName;
        model.comments = "something went wrong";
        model.card = {};

        model.createComment = createComment;

        function init() {
            checkLogin();
            cardService
                .getCardByCardName(model.cardName)
                .then(getCardComments)
                .then(renderCard);
        }
        init();

        function renderCard(card) {
            model.card.text = card;
            return card;
        }

        function getCardComments(card) {
            var cardName = card.split(",")[0];
            cardService
                .findCardByName(cardName)
                .then(function (response) {
                    var comments = response.data;
                    if (comments !== null) {
                        model.card.comments = comments.comments;
                    } else {
                        cardService
                            .createCard({name: cardName})
                            .then(function (response) {
                                model.card.comments = response.data.comments;
                            })
                    }
                })
            return card;
        }

        function createComment(user, comment) {
            var _comment = user.username + " commented '" + comment + "'";
            cardService.createComment(user._id, model.cardName, _comment);
            init();
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