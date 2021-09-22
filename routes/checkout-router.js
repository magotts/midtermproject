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
        if (!cart) {
          res.redirect('/');
        }
        console.log("CART items is",cart.items); //delete cart.items['1436']

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
  // router.delete('/', (req, res) => {
  //   let cart = req.session.cart;
  //   delete cart.items['this'];

  // });

  // router.delete("/", (req, res) => {
  //   const shortURL = req.params.shortURL;
  //   const user = users[req.session["user_id"]];

  //   delete cart.items[];
  //   res.status(200).send();

  // });

  return router;

};
module.exports = checkoutRouter;
