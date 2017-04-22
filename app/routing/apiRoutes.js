const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");

module.exports = function(app) {
    // Add this line below
    app.use(bodyParser.urlencoded({ extended: true })) 

    app.use(bodyParser.json());

    app.get('/api/tables', function (req, res) {
        res.sendFile(path.join(__dirname, '../data', 'reservations.js'));
    });

    app.post('/api/tables', function (req, res) {
        console.log("Tables");
    });
}