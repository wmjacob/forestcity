const express = require('express');
const mailjetRouter = express.Router();
const { getSecret, KEYS } = require('../lib/global-secrets');

const FCL_NAME = 'Forest City Lodge #388';

const FCL_SECRETARY_NAME = 'Forest City Lodge Secretary';
const FCL_CONTACTS_NAME = 'Forest City Lodge Contacts';
const FCL_WM_NAME = 'Forest City Lodge Worshipful Master';
const FCL_ASSC_SEC_NAME = 'Forest City Lodge Assc. Secretary';

mailjetRouter.get('/status', function (_req, res) {
    res.status(200).json({ status: 'UP' });
});

mailjetRouter.post('/rsvp', async function(req, res) {
    try {
        const mjCreds = await getSecret(KEYS.MAILJET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getSecret(KEYS.EMAIL);
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
        console.error(error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

mailjetRouter.post('/mitzvah-rsvp', async function(req, res) {
    try {
        const mjCreds = await getSecret(KEYS.MAILJET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getSecret(KEYS.EMAIL);
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
                "CustomID": "mitzvahRsvpConfirmationToSiteAdmin"
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
                "CustomID": "mitzvahRsvpConfirmationToAttendee"
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
        console.error(error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

mailjetRouter.post('/contact-us', async function(req, res) {
    try {
        const mjCreds = await getSecret(KEYS.MAILJET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getSecret(KEYS.EMAIL);
        const FCL_CONTACTS_EMAIL = gmailCreds.user;

        const wmCreds = await getSecret(KEYS.WM_EMAIL);
        const FCL_WM_EMAIL = wmCreds.email;

        const secretaryCreds = await getSecret(KEYS.SECRETARY_EMAIL);
        const FCL_SECRETARY_EMAIL = secretaryCreds.email;

        const assocSecretaryCreds = await getSecret(KEYS.ASSOC_SECRETARY_EMAIL);
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
        console.error(error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

mailjetRouter.post('/contact-sunshine-committee', async function(req, res) {
    try {
        const mjCreds = await getSecret(KEYS.MAILJET);
        const mailjet = require ('node-mailjet').connect(mjCreds.mailjetPublicKey, mjCreds.mailjetPrivateKey);

        const gmailCreds = await getSecret(KEYS.EMAIL);
        const FCL_CONTACTS_EMAIL = gmailCreds.user;

        const sunshineCochair1 = await getSecret(KEYS.SUNSHINE_COCHAIR_1);
        const cochairEmail1 = sunshineCochair1.email;
        const sunshineCochair2 = await getSecret(KEYS.SUNSHINE_COCHAIR_2);
        const cochairEmail2 = sunshineCochair2.email;

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
                        "Email": cochairEmail1,
                        "Name": "Sunshine Committe Co-chair"
                    },
                    {
                        "Email": cochairEmail2,
                        "Name": "Sunshine Committee Co-chair"
                    }
                ],
                "Bcc": [
                    {
                        "Email": FCL_CONTACTS_EMAIL,
                        "Name": FCL_CONTACTS_NAME
                    }
                ],
                "TemplateID": 7521633,
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
                "CustomID": "contactSunshineCommittee"
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
        console.error(error);
        res.status(500).json({ error: 'Internal Error' });
    }
});

module.exports = mailjetRouter;
