var app = require('../../express');
var request = require('request');

app.get("/api/decklyst/deck/:deckCode", searchQuery);

function searchQuery(req, res) {
    var deck = req.params.deckCode;
    request('http://decklyst.xyz/deck/' + deck, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
}