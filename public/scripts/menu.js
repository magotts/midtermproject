const addToCart = (foodId, cartValueAsString) => {
  const cartObj = cartValueAsString ? JSON.parse(cartValueAsString) : {};

  if (cartObj[foodId]) {
    cartObj[foodId] += 1;
  } else {
    cartObj[foodId] = 1;
  }

  cartValueAsString = JSON.stringify(cartObj);

  return cartValueAsString;
};

$(document).ready(function () {
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

  $(".cart-btn").on("click", function () {
    const numberOfItems = parseInt($(this).siblings().find("input").val());
    const pizza = JSON.parse($(this).val());
    console.log(pizza, numberOfItems);
    $.post(`/pizza/${pizza.id}`, { pizza, numberOfItems })
      .then((response) => {
        console.log("number of", response.totalQty);
        $("#cartQuantity").empty().html(response.totalQty);
        $("#cartPrice").html(`Running total is $${response.totalPrice}`);
      })
      .then()
      .catch((err) => {});
  });
});

// if (res.totalQty > currentVal) {
//   $(".alert-success").show();
//   setTimeout(() => {
//     $(".alert-success").fadeOut();
//   }, 500);
// }
// else {
//   $(".alert-danger").show();
//   setTimeout(() => {
//     $(".alert-danger").fadeOut();
//   }, 500);
// }
