//Set up twilio REST client using a function

const sendSms = (textMessage) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER
  const client = require('twilio')(AccountSid, AuthToken);

  return client.messages
  .create({from: '+18177569554', to: phoneNumber, body:textMessage})
  .then(message => console.log(`Message: ${message.body} sent to ${phoneNumber}`));

};

//export the function
module.exports = sendSms;
