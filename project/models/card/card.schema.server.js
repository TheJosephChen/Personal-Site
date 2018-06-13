var mongoose = require("mongoose");
var cardSchema = mongoose.Schema({
    name: String,
    comments: [{type: String}]
}, {collection: "card"});
module.exports = cardSchema;