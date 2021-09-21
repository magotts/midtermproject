const express = require("express");
const router = express.Router();

const placeorderRouter = (db) => {
  router.post("/", (req, res) => {
    const queryString = `INSERT INTO orders (user_id, order_time, total_cost, order_status)
    VALUES
    ('2','NOW()',60,'new')`;
    return db
      .query(queryString)
      .then((result) => {
        console.log("result row is", result.rows);
        //const templateVars = { data: result.rows, user: null };
        res.render("ordersuccess.ejs", { user:null });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return router;
};

module.exports = placeorderRouter;
