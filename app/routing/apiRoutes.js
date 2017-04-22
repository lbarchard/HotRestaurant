const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");
const mysql = require("mysql");



module.exports = function(app) {
    require('../data/reservations.js');
    // Add this line below
    app.use(bodyParser.urlencoded({ extended: true })) 

    app.use(bodyParser.json());

    app.get('/api/tables', function (req, res) {
        // res.sendFile(path.join(__dirname, '../data', 'reservations.js'));
        console.log("Get Tables");
        res.json(reservations);
        //
    });

    app.post('/api/tables', function (req, res) {
        console.log(req.body);
        res.end();
    });

    app.delete('/api/tables', function (req, res) {
        console.log("Delete Tables");
        res.end();
    });
}