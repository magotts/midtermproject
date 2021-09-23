// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const phone_number = process.env.PHONE_NUMBER;
// const user_phone_number = process.env.USER_PHONE_NUMBER;
// const client = require("twilio")(accountSid, authToken);

require("dotenv").config();

module.exports = (textDetails) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phone_number = process.env.PHONE_NUMBER;
  const user_phone_number = process.env.USER_PHONE_NUMBER;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: textDetails,
      from: phone_number,
      to: user_phone_number,
    })
    .then((message) => console.log(message.sid));
};
