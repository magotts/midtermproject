const express = require("express");
const router = express.Router();
// Secure authentication

const checkoutRouter = (db) => {
  router.get("/", (req, res) => {

    let cart = req.session.cart;
    console.log("CART is",cart);
    console.log("CART items is",cart.items);
    console.log("Total price is",cart.totalPrice);
    for (let list of Object.values(cart.items)) {
      console.log("foods_id is:", list.item.id); //food_id
      console.log("food name is:", list.item.title);
      console.log("qty of food is:", list.qty);
    }
    const templateVars = { cart, user: null };
    res.render("checkout", templateVars);
  });


  return router;

};
module.exports = checkoutRouter;
