const express = require("express");
const router = express.Router();
// Secure authentication

const checkoutRouter = (db) => {
  router.get("/", (req, res) => {
    let cart = req.session.cart;
    console.log("CART is",cart);
    console.log("Total price is",cart.totalPrice);
    for (let list of Object.values(cart.items)) {
      console.log(list.item.id);
      console.log(list.item.title);
      console.log(list.qty);
      console.log(list.price);

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
