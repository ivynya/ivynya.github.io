$(document).ready(function() {
  $("#featured").slideDown();
  $("#infoblock").slideDown();

  $("#showfeatured").click(function() {
    $("#showfeatured").slideUp();
    $("#showfeatured").promise().done(function() {
      $("#featured").slideDown();
    });
  });

  $("#hidefeatured").click(function() {
    $("#featured").slideUp();
    $("#featured").promise().done(function() {
      $("#showfeatured").slideDown();
    });
  });
});
