(function () {
    angular
        .module("duelystApp")
        .service("cardService", cardService);

    function cardService($http) {
        this.searchCardByName = searchCardByName;
        this.getCardByName = getCardByName;
        this.getCardByCardName = getCardByCardName;
        this.createCard = createCard;
        this.findCardByName = findCardByName;
        this.createComment = createComment;


        function createComment(userId, cardName, comment) {
            var url = "/api/card?userId=" + userId + "&cardname=" + cardName + "&comment=" + comment;
            return $http.put(url);
        }

        function getCardByCardName(cardName) {
            var card = {name: cardName};
            return getCardByName(cardName);
        }

        function findCardByName(cardName) {
            var url = "/api/card?cardname=" + cardName;
            return $http.get(url);
        }

        function createCard(card) {
            var url = "/api/card";
            return $http.post(url, card);
        }

        function searchCardByName(cardName) {
            var url = "/api/duelyststats/cardname/" + cardName;
            //var url = "https://duelyststats.info/scripts/carddata/get.php?cardName=" + cardName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        // function only used to get detailed card information
        // assumes card name is unique (already parsed in search list)
        function getCardByName(cardName) {
            var url = "/api/duelyststats/cardname/" + cardName;
            //var url = "https://duelyststats.info/scripts/carddata/get.php?cardName=" + cardName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }

})();