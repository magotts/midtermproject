const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/admins", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then(data => {
        console.log(data);
        const orderList = data.rows;
        console.log(orderList);
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
