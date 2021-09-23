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

  // GET VALUES FROM CART
  router.get("/", (req, res) => {
    const user_id = req.session.user_id || "";

    findUserById(user_id)
      .then((user) => {
        let cart = req.session.cart;
        let session = req.session;

        if (!cart) {
          return res.redirect('/');
        }

        const templateVars = { session, user, cart};
        res.render("checkout", templateVars);

      });
  });

  // DELETE AN ITEM IN THE CART
  router.post('/delete/:id', (req, res) => {
    const user_id = req.session.user_id || "";

    findUserById(user_id)
      .then((user) => {
        let cart = req.session.cart;
        let session = req.session;
        const id = req.params.id;
        delete cart.items[id];
        req.session.cart = cart;
        const templateVars = { session, user, cart};
        res.render("checkout", templateVars);
      });
  });

  // EDIT THE QUANTITY
  router.post("/edit/:id", (req, res) => {
    const user_id = req.session.user_id || "";
    findUserById(user_id)
      .then((user) => {
        let cart = req.session.cart;
        let session = req.session;
        const id = req.params.id;
        let newQty = req.body.editqty;
        cart.items[id].qty = newQty;
        req.session.cart = cart;
        const templateVars = { session, user, cart};
        res.render("checkout", templateVars);
      });

  });

  return router;

};
module.exports = checkoutRouter;
