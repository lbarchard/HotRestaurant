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
        var reservations = [
            {
                "name": "Jimi Hendrix",
                "phone_number": 1234567890,
                "email": "jimi@areyouexperienced.com",
                "reservation_type": "reservation"
            },
            {
                "name": "Person1",
                "phone_number": 1510395713,
                "email": "himi@areyo.com",
                "reservation_type": "wait-list"
            }
        ];
        // res.sendFile(path.join(__dirname, '../data', 'reservations.js'));
        console.log("Get Tables");
        res.json(reservations);
        //
    });

    app.post('/api/tables', function (req, res) {
        reservPost(req);
        res.json(reservPost());
    });

    app.delete('/api/tables', function (req, res) {
        var deleted = {
                "result": "Success"
        };
        console.log(deleted.result);
        res.json(deleted);
    });
}

function reservPost(request) {
    var wait_list = {
        "reservation_type": "wait-list"
    };

    var reservation = {
        "reservation_type": "reservation"
    };

    var randNum = Math.floor(Math.random() * 2);

    if (randNum) {
        return reservation;
    } else {
        return wait_list;
    }
}