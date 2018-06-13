var mongoose = require("mongoose");
var commentSchema = require("./comment.schema.server");
var commentModel = mongoose.model("CommentModel", commentSchema);
module.exports = commentModel;
