const express = require('express');
const router = express.Router();
const sendSms = require('../twilio');

const twilioRouter = (db) => {

  //Post for SMS to /admins/:orderId
  router.post('/:orderId', (req, res) => {
    const id = req.params.orderId;

    db.query(`SELECT order_estimation FROM orders WHERE id = ${id}`)
    .then((response) => {

    })
    //sql query to get time from db
    //save in variable
    //pass that time to sendSms function in message body

  })


return router;
}

module.exports= twilioRouter;
