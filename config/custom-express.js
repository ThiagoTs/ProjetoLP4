var express = require('express');

var consign = require('consign');

var bodyParse = require('body-parser');

module.exports = function(){

    var app = express();

    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http/localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    consign()
        .include('controllers')
        .then('persistencia')
        .then('services')
        .into(app);

return app;
}