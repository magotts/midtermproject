$(document).ready(function () {
  /*
   --- Checks if right or left increment counters are clicked
   --- If the plus icon is clicked increments input
   --- If the minus icon is clicked decreases input
  */

  $(".quantity-right-plus").on("click", function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    const quantity = parseInt($(this).parent().siblings(".input-number").val());
    // If is not undefined
    $(this)
      .parent()
      .siblings(".input-number")
      .val(quantity + 1);
    // Increment
  });

  $(".quantity-left-minus").on("click", function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    const quantity = parseInt($(this).parent().siblings(".input-number").val());
    // If is not undefined
    // Increment
    if (quantity > 0) {
      $(this)
        .parent()
        .siblings(".input-number")
        .val(quantity - 1);
    }
  });

  /*
   --- Post request for cart button.
   ---  When user, clicks on Add to Cart, the object pizza data is sent to /pizza/id-of-current-pizza
   ---  Server adds pizza to cart session and responds with the total quantity and total price of the current session
  */

  $("#order-id").on("click", function () {
    $.post(`/order`).then((response) => {
      $('#order-modal').modal('show')
      $('#order-id').html(response.orderId)
    });
  });

  $(".cart-btn").on("click", function () {
    // count how many items
    const numberOfItems = parseInt($(this).siblings().find("input").val());
    $("input").val(0);
    const $cartBefore = $("#cartQuantity").html();
    console.log("cartCount", $cartBefore);
    const pizza = JSON.parse($(this).val());
    $.post(`/pizza/${pizza.id}`, { pizza, numberOfItems })
      .then((response) => {
        $("#cartQuantity").empty().html(response.totalQty);
        $("#cartPrice").html(`Running total is $${response.totalPrice}`);

        // check if there is an increment in the cart quantity and alert whether  item was added or not
        const $cartAfter = $("#cartQuantity").html();

        console.log("cartCount", $cartAfter);
        if ($cartAfter > $cartBefore) {
          $(".alert-success").show();
          setTimeout(() => {
            $(".alert-success").fadeOut();
          }, 500);
        } else {
          $(".alert-danger").show();
          setTimeout(() => {
            $(".alert-danger").fadeOut();
          }, 500);
        }
      })
      .catch((err) => {});
  });
});
