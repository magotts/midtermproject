const express = require("express");
const app = express();
const router = express.Router();

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



          req.session.cart = null;

          // sending this to menu js to be handled through ajax
          res.status(200).redirect("ordersuccess");
        })
        .catch((err) => {
          res.send(err.message);
        });
    } else {
      res.redirect("/");
    }
  });

  return router;
};
