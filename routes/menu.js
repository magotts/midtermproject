const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // function to help get user by ID
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
  exports.findUserById = findUserById;

  // Update cart for when a user adds items to their cart /PIZZA/:id
  // req.session is then updated with new cart information
  // returns quantity and price to be used in the navbar

  router.post("/pizza/:id", (req, res) => {
    const { pizza, numberOfItems } = req.body;
    const quantity = parseInt(numberOfItems);
    const userId = req.session.user_id;
    // console.log("userId:", userId);
    findUserById(userId)
      .then((user) => {
        if (user && userId) {
          if (!req.session.cart) {
            req.session.cart = {
              items: {},
              totalQty: 0,
              totalPrice: 0,
            };
          }
          let cart = req.session.cart;
           console.log("session cart", cart);

          if (!cart.items[pizza.id]) {
            cart.items[pizza.id] = {
              item: pizza,
              qty: quantity,
            };
            cart.totalQty = cart.totalQty + quantity;
            cart.totalPrice = cart.totalPrice + parseInt(pizza.price);
          } else {
            cart.items[pizza.id].qty = cart.items[pizza.id].qty + quantity;
            cart.totalQty = cart.totalQty + quantity;
            cart.totalPrice = cart.totalPrice + parseInt(pizza.price);
          }
          // console.log("this is a cart:",cart.items[1853]);
          return res.status(200).json({
            totalQty: req.session.cart.totalQty,
            totalPrice: req.session.cart.totalPrice,
          });
        }
        return res.send("No user found");
      })
      .catch((err) => console.log({ err: err.message }));
  });

  router.get("/", (req, res) => {
    // get user id from cookies
    const userId = req.session.user_id;
    const session = req.session;
    // console.log(session);

    findUserById(userId)
      .then((user) => {
        // get menu items from the db
        const queryText = {
          text: `SELECT * FROM foods;`,
        };

        db.query(queryText)
          .then((data) => {
            // console.log(data);
            // data.rows.forEach((e) => console.log(e));
            console.log(data.rows, user);
            const templateVars = { user, data: data.rows, session };
            res.render("menu", templateVars);
          })
          .catch((err) => {
            err: err.message;
          });
      })
      .catch((err) => {
        {
          err: err.message;
        }
      });
  });

  return router;
};
