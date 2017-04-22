$(document).ready(function() {

// Declare global variables
var formName = "";
var formNumber = "";
var formEmail = "";

// Grab form data from make reservation page
$("#submitButton").on("click", function() {
    event.preventDefault();
    console.log("click registered");

    formName = $("#guestName").val().trim();
    formNumber = $("#guestPhone").val().trim();
    formEmail = $("#guestEmail").val().trim();
    console.log(formName);
    });
    $("#guestForm")[0].reset();
});
