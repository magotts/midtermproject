const express = require('express');
const router  = express.Router();

// const {getAllOrders} = require('../db/order-queries')

const adminRouter = (db) => {

  //GET /admins
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
    .then((response) => {
      // res.json(response.rows);

      //response.rows is an array of objects
      const templateVars = {data: response.rows}
      res.render('admins.ejs', templateVars);
    });
  });

  return router;
};

module.exports = adminRouter;
