// My API (POST https://us12.api.mailchimp.com/3.0/lists/f198f98367/members)

$(document).ready(function () {
  $( "form" ).submit(function() {
    event.preventDefault();
    emailAddress = $("#email-address").val()
    console.log(emailAddress);
    $.ajax({
        url: "https://us12.api.mailchimp.com/3.0/lists/f198f98367/members",
        type: "POST",
        headers: {
            "Authorization": "Basic cGFja2Vyc3dlZWtseTo1Y2YzZWRkMmYzZWQzY2M5Yzc1ZmM2MmNmM2FkNGUyZi11czEy",
            "Content-Type": "application/json",
        },
        contentType: "application/json",
        dataType: 'jsonp',
        data: JSON.stringify({
            "status": "subscribed",
            "email_address": emailAddress
        }),
      })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
        })
      console.log("Got Here")
    });
});
