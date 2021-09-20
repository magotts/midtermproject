const express = require('express');
const router  = express.Router();


const adminRouter = (db) => {

  //GET /admins
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders
    ORDER BY order_time DESC;`)
    .then((response) => {
      //response.rows is an array of objects
      const templateVars = {data: response.rows, user:null}
      res.render('admins.ejs', templateVars);
    });
  });

  return router;
};

module.exports = adminRouter;
