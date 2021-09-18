const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/administrators", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then(data => {
        const orderList = data.rows;
        res.json({ orderList });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
