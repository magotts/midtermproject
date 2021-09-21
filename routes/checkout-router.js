const express = require("express");
const app = express();
const router = express.Router();
// Secure authentication

const checkoutRouter = (db) => {
  router.post("/", (req, res) => {
    const queryString = `
    SELECT foods.title, order_details.quantity
    FROM foods
    JOIN order_details ON order_details.foods_id = foods.id
    JOIN orders ON order_details.orders_id = orders.id
    WHERE orders_id = 3`;
    return db
      .query(queryString)
      .then((result) => {
        console.log("result row is", result.rows);
        // const templateVars = {data: result.rows};
        // res.render('checkout.ejs', templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return router;
};
module.exports = checkoutRouter;


