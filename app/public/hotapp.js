console.log('doc loaded');

$(document).ready(function() {
  console.log('document loaded');

  // Declare global variables
  var name = "";
  var phone_number = "";
  var email = "";

  // Grab form data from make reservation page
  $("#submitButton").on("click", function() {
    event.preventDefault();
    console.log("click registered");

    name = $("#guestName").val().trim();
    phone_number = $("#guestPhone").val().trim();
    console.log(phone_number);
    email = $("#guestEmail").val().trim();

    var guestInfo = {
      "name": name,
      "phone_number": phone_number,
      "email": email
    };

    $.ajax({
      url: 'http://localhost:8080/api/tables',
      type: 'POST',
      data: guestInfo,
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }
    });

  });
  // $("#guestForm")[0].reset();
});
