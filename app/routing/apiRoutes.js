const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "cdbrannon",
  database: "HotRestaurantDB"
});

connection.connect(function(err) {
  if (err) throw err;

});

module.exports = function(app) {
    require('../data/reservations.js');
    // Add this line below
    app.use(bodyParser.urlencoded({ extended: true })) 

    app.use(bodyParser.json());

    app.get('/api/tables', function (req, res) {
        reserveGet(function(response) {
            res.json(response);
        });
    });

    app.post('/api/tables', function (req, res) {
        res.json(reservePost(req));
    });

    app.delete('/api/tables', function (req, res) {
        reserveDelete(function (response) {
            res.json(response);
        });
    });
}

function reserveGet(callback) {
    connection.query(
    "SELECT reservation_id, name, phone_number, email, reservation_type FROM tables",
        function(err, res) {
        if (err) throw err;
        console.log(res);
        callback(res);
    });
}

function reservePost(request) {
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

function reserveDelete(callback) {
    connection.query(
        "DELETE FROM tables",
        function(err, res) {
            if (err) throw err;
            var deleted = {
                "result": "Success"
            };
            callback(deleted);
        }
    )
    
}