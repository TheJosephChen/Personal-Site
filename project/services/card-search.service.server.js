var app = require('../../express');
var request = require('request');

app.get("/api/duelyststats/cardname/:cardName", searchQuery);

function searchQuery(req, res) {
    var card = req.params.cardName;
    request('https://duelyststats.info/scripts/carddata/get.php?cardName=' + card, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
}