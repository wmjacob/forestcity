const express = require('express');
const router = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const fs = require('fs');

const GOOGLE_MAILJET_SECRET = 'mailjet-credentials';

const getAuth = async () => {
    if (process.env.NODE_ENV !== 'development') {
      const client = new SecretManagerServiceClient();
      const name = `projects/forest-city-325620/secrets/${GOOGLE_MAILJET_SECRET}/versions/latest`;
      const [version] = await client.accessSecretVersion({ name });
      if (!version.payload || !version.payload.data || !version.payload.data.toString) {
        res.status(500).json({ error: 'Internal Error' });
        return;
      }
      return JSON.parse(Buffer.from(version.payload.data.toString(), 'base64'));
    }
    return {
      mailjetPublicKey: process.env.GMAIL_USER,
      mailjetPrivateKey: process.env.GMAIL_PASS
    };
}

router.get('/status', function (_req, res) {
    res.status(200).json({ status: 'UP' });
});

router.post('/rsvp-to-fcl', async function(req, res) {
    try {
        const auth = await getAuth();
        const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

        const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From":
                {
                    "Email": "forestcitylodgecontacts@gmail.com",
                    "Name": "Forest City Lodge Sender"
                },
                "To": [
                    {
                        "Email": "forestcitylodgecontacts@gmail.com",
                        "Name": "Forest City Lodge Recipient"
                    }
                ],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
            }
        ]
        });

        request.then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
        res.status(200).json({ status: 'Ok' });
    }
    catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal Error' });
    }
})


