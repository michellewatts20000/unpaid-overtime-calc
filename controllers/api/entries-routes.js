const router = require('express').Router();
const nodemailer = require('nodemailer');
const {
  Entry
} = require('../../models');

// Create new entries
router.post('/', async (req, res) => {
  const {
    email,
    industry,
    start,
    end,
    lunch,
    salary,
    unpaidHours,
    unpaidSalary,
  } = req.body;
  console.log(req.body);

  const entryResult = await Entry.create({
    industry,
    salary,
    start,
    end,
    lunch: lunch === 'yeslunch',
    unpaidHours,
    unpaidSalary,
    email,
  });

  res.json({
    success: true,
    entryResult,
  });

  var mailOptions = {
    from: '"Mark Morey - Unions NSW" <reply@unionsnsw.org.au>',
    to: req.body.email,
    subject: 'Thanks for using the unpaid overtime calculator',
    text: `Hey ${req.body.email}, thanks for using our unpaid overtime calculator :)`,
    html: `<b>Hey ${req.body.email}! </b><br><br>You worked ${req.body.unpaidHours} hours for a total of $${req.body.unpaidSalary}, was it worth it?<br><br>
      <br>
      <br>
       Do you know anyone else who might like using this calculator ? <br> Share them this link: <a href="https://unpaid-overtime.herokuapp.com/"> https://unpaid-overtime.herokuapp.com/</a><br>
      Thanks,<br>
      <b>The unpaid overtime team</b>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
});


var transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: 'reply@unionsnsw.org.au',
    pass: process.env.PASS,
  }
});

module.exports = router;