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

  router.post('/orders/:id', (req, res) => {
    const {estimatedTime} = req.body;
    const id = req.params.id;
    // add query to update db with time value
    db.query(`SELECT * FROM orders WHERE id = $1`, [id])
    .then((response) => {
      // res.json(response.rows);
      const record = response.rows[0];
      db.query(`UPDATE orders SET estimated_time = ${estimatedTime} WHERE id=${record.id} RETURNING estimated_time`).then((response2) => {
        console.log(response2);
        res.json(response2);
      })
    });
  });

  return router;
};

module.exports = adminRouter;
