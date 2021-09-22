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
      console.log("id is:", list.item.price);
      console.log("food name is:", list.item.title);
      console.log("qty of food is:", list.qty);
   }
    const templateVars = { cart, user: null };
    res.render("checkout", templateVars);
  });

  router.post("/", (req, res) => {
    const queryString = `INSERT INTO order_details (foods_id, orders_id, quantity)
    VALUES (1245, 4, 2),
  (1436, 4, 2)`;
    return db
      .query(queryString)
      .then(result => result.rows)
      .catch((err) => {
        console.log(err.message);
      });
    });
  return router;

};
module.exports = checkoutRouter;
