$(document).ready(function() {

// delete the tr in table id fooditems
  $("#fooditems").on("click", "#deletebutton", function() {
    $(this).closest("tr").remove();
  });



  });
// delete cart.items['1436']
  // const deleteItem = function() {
  //  $.ajax("/checkout", { method: "GET", datatype: "JSON" }).done((data) => {
  //   delete data.items["id"];
  // });
  // }
