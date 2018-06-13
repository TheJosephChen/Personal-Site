var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.addToHistory = addToHistory;
userModel.getAllUsers = getAllUsers;
module.exports = userModel;

function deleteUser(userId) {
    return userModel
        .remove({_id: userId})
        .then(function (status) {
            return status;
        });
}

function findUserByUsername(username) {
    // findOne returns null if DOC not found
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    // findOne returns null if DOC not found
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function addToHistory(userId, message) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.history.unshift(message);
            return user.save();
        } );
}

function getAllUsers() {
    return userModel.find();
}