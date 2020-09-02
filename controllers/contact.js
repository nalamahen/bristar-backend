const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENGRID_API_KEY);

const emailBody = require('../templates/contact');

exports.emailToAdmin = (req, res) => {
  console.log('email to admin.....');
  console.log('req.body', req.body);

  const emailData = {
    to: 'sales@bristar.be',
    from: req.body.email,
    subject: req.body.subject,
    html: emailBody(req.body.name, req.body.message),
  };
  sgMail
    .send(emailData)
    .then((sent) => console.log('SENT >>>', sent))
    .catch((err) => console.log('ERR >>>', err));

  res.json({ message: 'Email received' });
};
