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
  password: "Bmtsubs1!1",
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
         reservePost(req.body, function(reservationType) {
            response = {
                "result": reservationType 
            }
            res.json(response);
        })
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
        callback(res);
    });
}

function reservePost(body, callback) {
    var reservationType
    connection.query(
        "SELECT  COUNT(*) AS NumberOfReservations FROM tables WHERE reservation_type=?",
        ["reserved"],
        function(err, res) {
            if (err) throw err;
            if (res[0].NumberOfReservations >= 5) {
                reservationType = "wait-list"
                }
            else {
                reservationType = "reserved"
            }
            connection.query(
                "INSERT INTO tables (name, phone_number, email, reservation_type) VALUES (?, ?, ?, ?)",
                [body.name, body.phone_number, body.email, reservationType],
                function(err, res) {
                    if (err) throw err;
                    callback(reservationType);
                })
        });
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