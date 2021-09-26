const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const handlebars = require('handlebars');
const fs = require('fs');

const GOOGLE_EMAIL_SECRET = 'email-credentials'

const getAuth = async () => {
  if (process.env.NODE_ENV !== 'development') {
    const client = new SecretManagerServiceClient();
    const name = `projects/forest-city-325620/secrets/${GOOGLE_EMAIL_SECRET}/versions/latest`;
    const [version] = await client.accessSecretVersion({ name });
    if (!version.payload || !version.payload.data || !version.payload.data.toString) {
      res.status(500).json({ error: 'Internal Error' });
      return;
    }
    return JSON.parse(Buffer.from(version.payload.data.toString(), 'base64'));
  }
  return {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    recipient: process.env.GMAIL_RECIPIENT,
  };
}

router.get('/status', function (_req, res) {
  res.status(200).json({ status: 'UP' });
});

router.post('/email-to-fcl', async function (req, res) {
  try {
    const auth = await getAuth();
    const transporter = nodemailer.createTransport({
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
      service: 'gmail',
    });
    const data = req.body;
    const subject = data.subject;

    const mailOptions = {
      subject,
      from: auth.user,
      to: auth.recipient,
      html: `<p>RSVP Received</p><br>
        <ul>
          <li>Name: ${data.firstName} ${data.lastName}</li>
          <li>Event: ${data.event.name}</li>
          <li>Date: ${data.date}
        <ul>`
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });
    res.status(200).json({ status: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Error' });
  }
});

router.post('/email-to-user', async function (req, res) {
  try {
    const auth = await getAuth();
    const source = fs.readFileSync('./src/app/core/email/rsvp-template.html', 'utf-8').toString();
    const template = handlebars.compile(source);

    const transporter = nodemailer.createTransport({
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
      service: 'gmail',
    });
    const data = req.body;
    const subject = data.subject;
    const recipient = data.email;

    const replacements = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.event.name,
      date: data.date
    };
    const htmlToSend = template(replacements);

    const mailOptions = {
      subject,
      from: auth.user,
      to: recipient,
      html: htmlToSend
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });
    res.status(200).json({ status: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Error' });
  }
});

module.exports = router;
