const express = require("express");
const router = express.Router();
// Secure authentication

const checkoutRouter = (db) => {

  const findUserById = function (userId) {
    const queryString = `
    SELECT * FROM users WHERE id = $1
    `;

    return db
      .query(queryString, [userId])
      .then((res) => {
        return res.rows.length > 0 ? res.rows[0] : null;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  };

  router.get("/", (req, res) => {
    const user_id = req.session.user_id || "";

    findUserById(user_id)
      .then((user) => {
        let cart = req.session.cart;
        let session = req.session;
        console.log("CART is",cart);
        console.log("CART items is",cart.items);
        console.log("Total price is",cart.totalPrice);
        for (let list of Object.values(cart.items)) {
          console.log("foods_id is:", list.item.id); //food_id
          console.log("food name is:", list.item.title);
          console.log("qty of food is:", list.qty);
        }
        const templateVars = { session, user, cart};
        res.render("checkout", templateVars);

      });


  });

  // delete cart.items.this??

  return router;

};
module.exports = checkoutRouter;
