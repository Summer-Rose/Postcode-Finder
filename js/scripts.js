$(document).ready(function() {
  $("#findPostcode").click(function(event) {
      event.preventDefault();
      var address = encodeURIComponent($("#address").val());
      var result=0;
      $("#address").val("");
      $("#alert").hide();
    $.ajax({
      type: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/xml?address="+address+"&key=AIzaSyALxgnDY-pRt-5Gx2cF_NZ--jQWAMQBCm4",
      dataType: "xml",
      success: processXML,
      error: error
    });

    function error() {
      $(".alert").hide();
      $("#error").fadeIn();
    }

    function processXML(xml) {
      $(xml).find("address_component").each(function() {
        if ($(this).find("type").text() == "postal_code") {
          $(".alert").hide();
          $("#success").fadeIn;
          $("#success").html("<h5>Address Found</h5><p>The postcode for that address is "+$(this).find("long_name").text()+"</p>").fadeIn();
          result=1;
        }
      });

      if (result == 0) {
        $("#fail").fadeIn();
      }
    };
  });
});

