var app = require('./express');
var express = app.express;

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

require("./project/app");


var port = process.env.PORT || 3000;
app.listen(port);