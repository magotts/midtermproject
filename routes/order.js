const express = require("express");
const app = express();
const router = express.Router();
const sms = require("../public/scripts/api/twilio");
const { findUserById } = require("../lib/helper_functions");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userId = req.session.user_id || "";
    const cartObj = req.session.cart;
    // console.log(cartObj.items);
    // console.log(cartObj.totalPrice);
    if (userId && cartObj) {
      let totalPrice = cartObj.totalPrice;
      console.log("tots:", totalPrice);

      const queryText = {
        text: `INSERT INTO orders (user_id, total_cost) VALUES ($1, $2) RETURNING id`,
        values: [userId, totalPrice],
      };

      findUserById(db, userId).then((user) => {
        return db
          .query(queryText)
          .then((data) => {
            const orderId = data.rows[0];

            /*
              -- sample query by the following query: INSERT INTO order_details (foods_id, orders_id, quantity) VALUES  (1436, 40, 3), (1853, 40, 2)
          */

            let text = `INSERT INTO order_details (foods_id, orders_id, quantity) VALUES `;
            let arrOfFoodIds = Object.keys(cartObj.items);
            for (let id of arrOfFoodIds) {
              text += ` (${id}, ${orderId.id}, ${cartObj.items[id].qty}),`;
            }
            // removes that last comma
            text = text.substring(0, text.length - 1);
            console.log(text);

            db.query(text).catch((err) => {
              res.status(500).json({ error: err.message });
            });
            console.log(user);

            sms(
              `Hi ${user.first_name}! Good news, your order was successfully placed. Your order number is: ${orderId.id}`
            );

            req.session.cart = null;
            console.log("here is order Id", orderId);
            // sending this to menu js to be handled through ajax
            res.status(200).redirect("ordersuccess");
          })
          .catch((err) => {
            res.send(err.message);
          });
      });
    } else {
      res.redirect("/");
    }
  });

  router.post("/cart", (req, res) => {
    const userId = req.session.user_id || "";
    const cartObj = req.session.cart;

    if (!cartObj) {
      return res.json({ error: "cart is empty" });
    }
    res.status(200).json({ cartObj });
  });

  return router;
};
