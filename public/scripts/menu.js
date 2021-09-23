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



  const modalElement = function (pizza) {
    return `<div class="modal-body">
    <table class="table table-image">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-25">
            <img src="${
              pizza.item.image_url
            }" class="img-fluid img-thumbnail" alt="Sheep">
          </td>
          <td>${pizza.item.title}</td>
          <td id="order-id">${pizza.item.price}</td>
          <td class="qty"> ${pizza.qty}</td>
          <td>$${pizza.item.price * pizza.qty}</td>
        </tr>
      </tbody>
    </table>
  </div>`;
  };


    /*
   --- Post request for cart button.
   ---  When user, clicks on the cart, post request is sent to order/cart which responds with an req.session.cart.
  */

  $("#order-button").on("click", function () {
    $.post(`/order/cart`).then((response) => {
      $("#order-modal").modal("show");
      console.log();
      $.each(Object.values(response.cartObj.items), function (index, pizza) {
        console.log(pizza.qty);
        const $modal = modalElement(pizza);
        $("#modalBody").append($modal);

      });
      $('.price').append(`$${response.cartObj.totalPrice}`)
    });
  });

  // Empties the modal when someone closes it
  $("#order-modal").on("hidden.bs.modal", function () {
    $("#modalBody").empty();
    $('.price').empty();
  });


  // Handles "Add to Cart" button and the counter incrementsw
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
