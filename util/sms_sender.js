const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM_PHONE = process.env.FROM_PHONE;
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

function sendMessage(toPhone, smsBody){
    client.messages
  .create({
    body: smsBody,
    from: FROM_PHONE,
    to: toPhone
  })
  .then(message => console.log(`Mensaje de texto enviado: ${message.sid}`))
  .catch(error => console.error(`Error al enviar el mensaje de texto: ${error.message}`));
}

module.exports = sendMessage;