var express = require('express');

var consign = require('consign');

var bodyParse = require('body-parser');

module.exports = function(){

    var app = express();

    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());

    consign()
    .include('controllers')
    .then('persistencia')
    .then('services')
    .into(app);

return app;
}