//Set up twilio REST client using a function
require("dotenv").config();


const sendSms = (textMessage) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const clientNumber = process.env.USER_PHONE_NUMBER;
  const client = require('twilio')(accountSid, authToken);

  return client.messages
  .create({from: phoneNumber, to: clientNumber, body:`Your order will be ready in ${textMessage} minutes`})
  .then(message => {
    // console.log(`Message: ${message.body} sent to ${phoneNumber}`)
    console.log(message.sid)
    res.json(message);
  });

};

//export the function
module.exports = sendSms;
