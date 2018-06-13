var mongoose = require("mongoose");
var tournamentSchema = mongoose.Schema({
    name: String,
    organizer: {_id: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}, username: String},
    participants: [{_id: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}, username: String, deck: String}],
    max: Number
}, {collection: "tournament"});
module.exports = tournamentSchema;