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

module.exports = router;
