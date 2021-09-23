$(document).ready(function() {

// delete the tr in table id fooditems
  $("#fooditems").on("click", "#deletebutton", function() {
    $(this).closest("tr").remove();
  });


  // $(this).data("deleteid")

  });
