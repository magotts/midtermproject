//Set up twilio REST client using a function
require("dotenv").config();

const sendSms = (textMessage) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const clientNumber = process.env.USER_PHONE_NUMBER;
  const client = require("twilio")(accountSid, authToken);

  return client.messages
    .create({
      from: phoneNumber,
      to: clientNumber,
      body: textMessage,
    })
    .then((message) => {
      console.log(message.sid);
      res.json(message);
    });
};

//export the function
module.exports = sendSms;
