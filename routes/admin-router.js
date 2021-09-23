const express = require('express');
const router  = express.Router();
const sendSms = require('../twilio');

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
    console.log('hello world');
    console.log('est time', estimatedTime, 'id', id)
    // add query to update db with time value
    db.query(`SELECT * FROM orders WHERE id = $1`, [id])
    .then((response) => {
      // res.json(response.rows);
      const record = response.rows[0];
      console.log('record:', record);
      db.query(`UPDATE orders
      SET order_estimation = ${estimatedTime},
      order_status = 'accepted'
      WHERE id=${id}
      RETURNING order_estimation`)
      .then((response) => {
        console.log('THIS IS THE RESPONSE:', response.rows[0].order_estimation);
        const orderIsReady = (response.rows[0].order_estimation);
        sendSms(orderIsReady);
      })
      .then((data) => {
        res.json(data);
      })
    });
  });


  router.post('/del/:id', (req, res) => {
    const orderId = req.params.id
    db.query(`UPDATE orders SET order_status = 'declined' WHERE id=${orderId} RETURNING order_status`)
    .then((response) => {
      res.json(response);
    })
    })

  return router;
};

module.exports = adminRouter;
