var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    _author: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    subComments: {type: mongoose.Schema.Types.ObjectId, ref: "CommentModel"}
}, {collection: "comment"});
module.exports = commentSchema;