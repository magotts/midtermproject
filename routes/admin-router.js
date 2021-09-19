const express = require('express');
const router  = express.Router();

const adminRouter = (db) => {

  //GET /admins
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
    .then((response) => {
      res.json(response.rows);
    });
  });

  return router;
};

module.exports = adminRouter;
