
require("dotenv").config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    to: process.env.MY_PHONE_NUMBER,
    body: "hello from the laptop of YHL.",
    from: "+18177569554"
  })
  .then((message) => console.log(message.sid));
