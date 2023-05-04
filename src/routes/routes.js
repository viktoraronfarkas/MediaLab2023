const sgMail = require('@sendgrid/mail');
const express = require('express');
const bodyParser = require('body-parser');

sgMail.setApiKey(
  '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'
);

const app = express();
// parse application/json
app.use(bodyParser.json());

// Create random code
function generateVerificationCode() {
  const codeLength = 6;
  const characters = '0123456789';
  let code = '';

  for (let i = 0; i < codeLength; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
app.post('/sendVerificationEmail', (req, res) => {
  // const { email } = req.body;
  console.log(req.body);

  // const code = generateVerificationCode(); // Generate a random verification code

  // const msg = {
  //   to: email,
  //   from: 'uasync@outlook.com',
  //   subject: 'Verify your email address',
  //   html: `<p>Your verification code is: ${code}</p>`,
  // };

  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     // Save the verification code to your database and associate it with the email address

  //     res.send({ success: true });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.send({ success: false });
  //   });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
