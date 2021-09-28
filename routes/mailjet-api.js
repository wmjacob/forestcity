const express = require('express');
const mailjetRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const GOOGLE_MAILJET_SECRET = 'mailjet-credentials';
const FCL_CONTACTS_EMAIL = 'forestcitylodgecontacts@gmail.com';
const FCL_NAME = 'Forest City Lodge #388';

const FCL_SECRETARY_EMAIL = 'forestcitylodgecontacts@gmail.com'; // TODO update as necessary
const FCL_SECRETARY_NAME = 'Forest City Lodge Secretary';

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

mailjetRouter.get('/status', function (_req, res) {
    res.status(200).json({ status: 'UP' });
});

mailjetRouter.post('/rsvp', async function(req, res) {
    try {
        const auth = await getAuth();
        const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

        const data = req.body;
        const subject = data.subject;
        const recipientEmail = data.email;
        const recipientName = data.firstName + " " + data.lastName;

        const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From":
                {
                    "Email": FCL_CONTACTS_EMAIL,
                    "Name": FCL_NAME
                },
                "To": [
                    {
                        "Email": FCL_SECRETARY_EMAIL,
                        "Name": FCL_SECRETARY_NAME
                    }
                ],
                "TemplateID": 3205968,
				"TemplateLanguage": true,
                "Subject": subject,
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "email": data.email,
                    "eventName": data.event.name,
                    "date": data.date
                },
                "CustomID": "rsvpConfirmationToSecretary"
            },
            {
                "From":
                {
                    "Email": "forestcitylodgecontacts@gmail.com",
                    "Name": "Forest City Lodge #388"
                },
                "To": [
                    {
                        "Email": recipientEmail,
                        "Name": recipientName
                    }
                ],
                "TemplateID": 3209683,
				"TemplateLanguage": true,
                "Subject": subject,
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "eventName": data.event.name,
                    "date": data.date
                },
                "CustomID": "rsvpConfirmationToAttendee"
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
});

mailjetRouter.post('/contact-us', async function(req, res) {
    try {
        const auth = await getAuth();
        const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

        const data = req.body;
        const subject = data.subject;
        const recipientEmail = data.email;
        const recipientName = data.firstName + " " + data.lastName;

        const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From":
                {
                    "Email": FCL_CONTACTS_EMAIL,
                    "Name": FCL_NAME
                },
                "To": [
                    {
                        "Email": FCL_SECRETARY_EMAIL,
                        "Name": FCL_SECRETARY_NAME
                    }
                ],
                "TemplateID": 3210113,
				"TemplateLanguage": true,
                "Subject": subject,
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "email": data.email,
                    "phoneNumber": data.phoneNumber,
                    "message": data.message
                },
                "CustomID": "contactUsConfirmationToSecretary"
            },
            {
                "From":
                {
                    "Email": "forestcitylodgecontacts@gmail.com",
                    "Name": "Forest City Lodge #388"
                },
                "To": [
                    {
                        "Email": recipientEmail,
                        "Name": recipientName
                    }
                ],
                "TemplateID": 3210138,
				"TemplateLanguage": true,
                "Subject": "We Have Received Your Message",
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName
                },
                "CustomID": "contactUsConfirmationToAttendee"
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
});

module.exports = mailjetRouter;
