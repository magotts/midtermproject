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

   const modalElement = function (pizza){

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

  </div>`


   }

  $("#order-button").on("click", function (e) {
    $.post(`/order/cart`).then((response) => {
      $("#order-modal").modal("show");
      // $('#order-id').html(response.cart)

      console.log(response.cartObj.items);
      // $("#modalBody").html("");
      $.each(Object.values(response.cartObj.items), function (index, pizza) {
        e.stopPropagation();
        console.log(pizza.qty);
        const $modal = modalElement(pizza);
        $("#modalBody").append($modal);
        console.log(pizza.item);
      });

      // for (let pizza of Object.values(response.cartObj.items)) {
      //   console.log(pizza.item);
      //   $('#order-id').html(pizza.item.title)
      //   $.each(function(){
      //     console.log('something');
      //     const title = pizza.item.title
      //     $('#modalBody').append(`${title}`)
      //   })

      // }
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
