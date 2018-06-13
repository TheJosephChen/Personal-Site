var mongoose = require("mongoose");
var cardSchema = require("./card.schema.server");
var cardModel = mongoose.model("CardModel", cardSchema);
var userModel = require("../user/user.model.server");
module.exports = cardModel;

cardModel.createCard = createCard;
cardModel.findCardByName = findCardByName;
cardModel.addCommentToCard = addCommentToCard;

function addCommentToCard(userId, cardname, comment) {
    return cardModel
        .findCardByName(cardname)
        .then(function (card) {
            card.comments.unshift(comment);
            return card.save();
        })
        .then(function () {
            comment += " on card " + cardname;
            userModel
                .addToHistory(userId, comment)
                .then(function (status) {
                    response.json(status);
                })
        });
}

function findCardByName(cardname) {
    // findOne returns null if DOC not found
    return cardModel.findOne({name: cardname});
}

function createCard(card) {
    return cardModel.create(card);
}