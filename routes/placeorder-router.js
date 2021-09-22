const express = require("express");
const router = express.Router();

const placeorderRouter = (db) => {

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
        let session = req.session;

        const templateVars = { session, user};
        res.render("ordersuccess", templateVars);

      });


  });

  // router.post("/", (req, res) => {
  //   let cart = req.session.cart;
  //   for (let list of Object.values(cart.items)) {
  //     console.log(list.item.id, list.qty);
  //     db.query(`INSERT INTO order_details (foods_id, quantity) VALUES ($1, $2)`, [list.item.id, list.qty])
  //       .then((result) => {
  //         console.log("result row is", result.rows);
  //         //const templateVars = { data: result.rows, user: null };
  //         res.render("ordersuccess", { user: null });
  //       });
  //   }
  //   req.session.cart = null;

  // });


  // router.post("/", (req, res) => {
  //   const queryString = `INSERT INTO orders (user_id, order_time, total_cost, order_status)
  //   VALUES
  //   ('2','NOW()',60,'new')`;
  //   return db
  //     .query(queryString)
  //     .then((result) => {
  //       console.log("result row is", result.rows);
  //       //const templateVars = { data: result.rows, user: null };
  //       res.render("ordersuccess.ejs", { user: null });
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });

  return router;
};

module.exports = placeorderRouter;
