const express = require('express');
const mailjetRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const GOOGLE_EMAIL_SECRET = 'email-credentials'
const GOOGLE_MAILJET_SECRET = 'mailjet-credentials';
const WM_EMAIL_SECRET = 'worshipful-master-email';
const SECRETARY_EMAIL_SECRET = 'secretary-email';
const ASSOC_SECRETARY_EMAIL_SECRET = 'associate-secretary-email';
const FCL_NAME = 'Forest City Lodge #388';

const FCL_SECRETARY_NAME = 'Forest City Lodge Secretary';
const FCL_CONTACTS_NAME = 'Forest City Lodge Contacts';
const FCL_WM_NAME = 'Forest City Lodge Worshipful Master';
const FCL_ASSC_SEC_NAME = 'Forest City Lodge Assc. Secretary';

const getAuth = async (secretCredentials) => {
    if (process.env.NODE_ENV !== 'development') {
      const client = new SecretManagerServiceClient();
      const name = `projects/forest-city-325620/secrets/${secretCredentials}/versions/latest`;
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
        const mjCreds = await getAuth(GOOGLE_MAILJET_SECRET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getAuth(GOOGLE_EMAIL_SECRET);
        const FCL_CONTACTS_EMAIL = gmailCreds.user;

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
                        "Email": FCL_CONTACTS_EMAIL,
                        "Name": FCL_CONTACTS_NAME
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
                    "date": data.date,
                    "numberOfAttendees": data.numberOfAttendees,
                    "earlyBirdDinner": data.earlyBirdDinner,
                    "numberOfMeals": data.numberOfMeals,
                    "mealSelection": data.mealSelection
                },
                "CustomID": "rsvpConfirmationToSecretary"
            },
            {
                "From":
                {
                    "Email": FCL_CONTACTS_EMAIL,
                    "Name": FCL_NAME
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
                    "date": data.date,
                    "numberOfAttendees": data.numberOfAttendees,
                    "earlyBirdDinner": data.earlyBirdDinner,
                    "earlyBirdTime": data.earlyBirdTime,
                    "numberOfMeals": data.numberOfMeals,
                    "costPerMeal": data.costPerMeal,
                    "mealSelection": data.mealSelection,
                    "address": data.event.address,
                    "location": data.event.location
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

mailjetRouter.post('/social-rsvp', async function(req, res) {
    try {
        const mjCreds = await getAuth(GOOGLE_MAILJET_SECRET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getAuth(GOOGLE_EMAIL_SECRET);
        const FCL_CONTACTS_EMAIL = gmailCreds.user;

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
                        "Email": FCL_CONTACTS_EMAIL,
                        "Name": FCL_CONTACTS_NAME
                    }
                ],
                "TemplateID": 4839243,
				"TemplateLanguage": true,
                "Subject": subject,
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "email": data.email,
                    "eventName": data.event.name,
                    "date": data.date,
                    "numberOfAttendees": data.numberOfAttendees
                },
                "CustomID": "socialRsvpConfirmationToSiteAdmin"
            },
            {
                "From":
                {
                    "Email": FCL_CONTACTS_EMAIL,
                    "Name": FCL_NAME
                },
                "To": [
                    {
                        "Email": recipientEmail,
                        "Name": recipientName
                    }
                ],
                "TemplateID": 4839232,
				"TemplateLanguage": true,
                "Subject": subject,
                "Variables": {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "eventName": data.event.name,
                    "date": data.date,
                    "numberOfAttendees": data.numberOfAttendees,
                    "location": data.event.location,
                    "address": data.event.locationAddress
                },
                "CustomID": "socialRsvpConfirmationToAttendee"
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
        const mjCreds = await getAuth(GOOGLE_MAILJET_SECRET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getAuth(GOOGLE_EMAIL_SECRET);
        const FCL_CONTACTS_EMAIL = gmailCreds.user;

        const wmCreds = await getAuth(WM_EMAIL_SECRET);
        const FCL_WM_EMAIL = wmCreds.email;

        const secretaryCreds = await getAuth(SECRETARY_EMAIL_SECRET);
        const FCL_SECRETARY_EMAIL = secretaryCreds.email;

        const assocSecretaryCreds = await getAuth(ASSOC_SECRETARY_EMAIL_SECRET);
        const FCL_ASSC_SEC_EMAIL = assocSecretaryCreds.email;

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
                "Bcc": [
                    {
                        "Email": FCL_CONTACTS_EMAIL,
                        "Name": FCL_CONTACTS_NAME
                    },
                    {
                        "Email": FCL_WM_EMAIL,
                        "Name": FCL_WM_NAME
                    },
                    {
                        "Email": FCL_ASSC_SEC_EMAIL,
                        "Name": FCL_ASSC_SEC_NAME
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
                "Headers": {
                    "Reply-To": recipientEmail
                },
                "CustomID": "contactUsConfirmationToSecretary"
            },
            {
                "From":
                {
                    "Email": FCL_CONTACTS_EMAIL,
                    "Name": FCL_NAME
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
