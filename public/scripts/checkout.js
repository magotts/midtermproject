$(document).ready(function() {


  $("#fooditems").on("click", "#deletebutton", function() {
    $(this).closest("tr").remove();
  });


  });
