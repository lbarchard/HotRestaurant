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
    let reservation = request.body;
    connection.query(
        "SELECT  COUNT(*) AS NumberOfReservations FROM tables WHERE reservation_type=?",
        ["reserved"],
        function(err, res) {
            if (err) throw err;
            console.log(res[0].NumberOfReservations);

            if (res[0].NumberOfReservations >= 5) {
                connection.query(
                    "INSERT INTO tables (name, phone_number, email, reservation_type) VALUES (?, ?, ?, ?)",
                    ["Cody", "5978345", "enadga@gmail.com", "wait-list"],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res);
                });
            } else {
                connection.query(
                    "INSERT INTO tables (name, phone_number, email, reservation_type) VALUES (?, ?, ?, ?)",
                    ["Cody", "5978345", "enadga@gmail.com", "reserved"],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res);
                });
            }
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