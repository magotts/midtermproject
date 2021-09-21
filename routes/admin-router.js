const express = require('express');
const router  = express.Router();

const adminRouter = (db) => {
  router.get("/", (req, res) => {
    // const templateVars = {user: null}
      res.render('admins.ejs', {user: null});
  })

  //GET /admins
  router.get("/orders", (req, res) => {
    db.query(`SELECT * FROM orders
    ORDER BY order_time DESC;`)
    .then((response) => {
      res.json(response.rows);
    })
    .catch((error) => {
      console.error(error);
    })
  });

  return router;
};

module.exports = adminRouter;
