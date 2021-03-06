const router = require('express').Router();
// const nodemailer = require('nodemailer');
const axios = require('axios');
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
    occupation,
    extra
  } = req.body;
  console.log(req.body);


  axios({
    method: 'post',
    url: process.env.AXIOS_URL,
    data: {
      "person": {
        "email_addresses": [{
          "address": req.body.email
        }],
        "custom_fields": {
          "Industry": req.body.industry,
          "Salary": req.body.salary,
          "Unpaid Hours": req.body.unpaidHours,
          "Unpaid Salary": req.body.unpaidSalary,
          "Occupation/Role": req.body.occupation,
          "Start time": req.body.start,
          "Finish time": req.body.end,
          "Lunch break": req.body.lunch,
          "Extra time": req.body.extra,

        }
      },
      "add_tags": [
        "C: Unpaid Overtime', 'A: Calculator"
      ],
      "triggers": {
        "autoresponse": {
          "enabled": true
        }
      }
    }
  });



  const entryResult = await Entry.create({
    industry,
    salary,
    start,
    end,
    lunch: lunch === 'yeslunch',
    unpaidHours,
    unpaidSalary,
    email,
    occupation,
    extra
  });

  res.json({
    success: true,
    entryResult,
  });

  //   var mailOptions = {
  //     from: '"Mark Morey - Unions NSW" <reply@unionsnsw.org.au>',
  //     to: req.body.email,
  //     subject: 'Thanks for using the unpaid overtime calculator',
  //     text: `Hey ${req.body.email}, thanks for using our unpaid overtime calculator :)`,
  //     html: `<p>Hey ${req.body.email}! </p>
  //    <p> You worked ${req.body.unpaidHours} hours for a total of $${req.body.unpaidSalary}, was it worth it?</p>
  //     <p> Australians work some of the highest levels of unpaid overtime in the world and it 's only getting worse. We'
  //     d like that to stop.</p>

  //     <p>It's not just that you're working for free, it's time that you could be spending doing the things that make you happy, like hanging out with family and friends, being active in your community, pursuing your passions or relaxing and caring for your mental and physical health.</p>

  //       <p> Do you know anyone else who might like using this calculator? Share them this link: <a href="https://unpaid-overtime.herokuapp.com/"> https://unpaid-overtime.herokuapp.com/</a></p>
  //       <p>Thanks,</p>
  //       <p>Mark Morey, Secretary of Unions NSW</p>
  //       <br>
  //       <br>`,
  //   };

  //   transport.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //   });
  // });


  // var transport = nodemailer.createTransport({
  //   host: "smtp-mail.outlook.com", // hostname
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   port: 587, // port for secure SMTP
  //   tls: {
  //     ciphers: 'SSLv3'
  //   },
  //   auth: {
  //     user: 'reply@unionsnsw.org.au',
  //     pass: process.env.PASS,
  //   }
});

module.exports = router;