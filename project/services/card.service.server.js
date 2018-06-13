var app = require("../../express");
var cardModel = require("../models/card/card.model.server");
var userModel = require("../models/user/user.model.server");

app.post("/api/card", createCard);
app.get("/api/card", getCard);
app.put("/api/card", createComment);

function createComment(req, response) {
    var userId = req.query.userId;
    var cardName = req.query.cardname;
    var comment = req.query.comment;
    cardModel
        .addCommentToCard(userId, cardName, comment)
        .then(function (card) {
            response.json(card);
            return;
        })

}

function getCard(req, response) {
    var cardName = req.query.cardname;
    if (cardName) {
        cardModel
            .findCardByName(cardName)
            .then(function (card) {
                response.json(card);
                return;
            }, function (err) {
                response.sendStatus(404).send(err);
                return;
            })
    }
}

function createCard(req, response) {
    var card = req.body;
    cardModel
        .createCard(card)
        .then(function (card) {
            response.json(card);
        })

}