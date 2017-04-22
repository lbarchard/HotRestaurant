const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'home.html'));
    });

    app.get('/tables', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'tables.html'));
    });

    app.get('/reserve', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'reserve.html'));
    });
}