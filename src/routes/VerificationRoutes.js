const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/sendVerificationEmail', (req, res) => {
  const { email } = req.body;

  const code = generateVerificationCode(); // Generate a random verification code

  const msg = {
    to: email,
    from: 'your_email@example.com',
    subject: 'Verify your email address',
    html: `<p>Your verification code is: ${code}</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      // Save the verification code to your database and associate it with the email address
      res.send({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.send({ success: false });
    });
});
