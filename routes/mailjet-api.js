const express = require('express');
const mailjetRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const fs = require('fs');
const handlebars = require('handlebars');

const GOOGLE_MAILJET_SECRET = 'mailjet-credentials';
const SECRETARY_EMAIL_ADDRESS = 'forestcitylodgecontacts@gmail.com'; // TODO update as necessary

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

mailjetRouter.post('/rsvp-to-fcl', async function(req, res) {
    try {
        const auth = await getAuth();
        const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

        const fclSource = fs.readFileSync('./src/app/core/email/fcl-rsvp-template.html', 'utf-8').toString();
        const fclTemplate = handlebars.compile(fclSource);
        const attendeeSource = fs.readFileSync('./src/app/core/email/attendee-rsvp-template.html', 'utf-8').toString();
        const attendeeTemplate = handlebars.compile(attendeeSource);

        const data = req.body;
        const subject = data.subject;
        const recipient = data.email;

        const fclReplacements = {
            firstName: data.firstName,
            lastName: data.lastName,
            name: data.event.name,
            email: data.email,
            date: data.date
          };
          const attendeeReplacements = {
            firstName: data.firstName,
            lastName: data.lastName,
            name: data.event.name,
            date: data.date
          };
        const fclHtmlToSend = fclTemplate(fclReplacements);
        const attendeeHtmlToSend = attendeeTemplate(attendeeReplacements);

        const request = mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From":
                {
                    "Email": "forestcitylodgecontacts@gmail.com",
                    "Name": "Forest City Lodge #388"
                },
                "To": [
                    {
                        "Email": SECRETARY_EMAIL_ADDRESS,
                        "Name": "Forest City Lodge Secretary"
                    }
                ],
                "Subject": subject,
                "TextPart": "RSVP Received",
                "HTMLPart": fclHtmlToSend,
                "InlinedAttachments": [
                    {
                            "ContentType": "image/png",
                            "Filename": "fcl-bell-color.png",
                            "Content": fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
                            "ContentID": "fcl-bell"
                    },
                ],
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
                        "Email": recipient
                    }
                ],
                "Subject": subject,
                "TextPart": "RSVP Received",
                "HTMLPart": attendeeHtmlToSend,
                "InlinedAttachments": [
                    {
                            "ContentType": "image/png",
                            "Filename": "fcl-bell-color.png",
                            "Content": fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
                            "ContentID": "fcl-bell"
                    },
                    {
                            "ContentType": "image/png",
                            "Filename": "email-fb-icon.png",
                            "Content": fs.createReadStream('./src/assets/images/email-fb-icon.png'),
                            "ContentID": "fb-icon"
                    },
                    {
                            "ContentType": "image/png",
                            "Filename": "email-twitter-icon.png",
                            "Content": fs.createReadStream('./src/assets/images/email-twitter-icon.png'),
                            "ContentID": "twitter-icon"
                    },
                    {
                            "ContentType": "image/png",
                            "Filename": "email-instagram-icon.png",
                            "Content": fs.createReadStream('./src/assets/images/email-instagram-icon.png'),
                            "ContentID": "ig-icon"
                    }
                ],
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

// mailjetRouter.post('/rsvp-to-attendee', async function(req, res) {
//     try {
//         const auth = await getAuth();
//         const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

//         const source = fs.readFileSync('./src/app/core/email/attendee-rsvp-template.html', 'utf-8').toString();
//         const template = handlebars.compile(source);

//         const data = req.body;
//         const subject = data.subject;
//         const recipient = data.email;

//         const replacements = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             name: data.event.name,
//             date: data.date
//           };
//         const htmlToSend = template(replacements);

//         const request = mailjet.post("send", {'version': 'v3.1'}).request({
//         "Messages":[
//             {
//                 "From":
//                 {
//                     "Email": "forestcitylodgecontacts@gmail.com",
//                     "Name": "Forest City Lodge #388"
//                 },
//                 "To": [
//                     {
//                         "Email": recipient
//                     }
//                 ],
//                 "Subject": subject,
//                 "TextPart": "RSVP Received",
//                 "HTMLPart": htmlToSend,
//                 "InlinedAttachments": [
//                     {
//                             "ContentType": "image/png",
//                             "Filename": "fcl-bell-color.png",
//                             "content": fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
//                             "cid": "fcl-bell"
//                     },
//                     {
//                             "ContentType": "image/png",
//                             "Filename": "email-fb-icon.png",
//                             "content": fs.createReadStream('./src/assets/images/email-fb-icon.png'),
//                             "cid": "fb-icon"
//                     },
//                     {
//                             "ContentType": "image/png",
//                             "Filename": "email-twitter-icon.png",
//                             "content": fs.createReadStream('./src/assets/images/email-twitter-icon.png'),
//                             "cid": "twitter-icon"
//                     },
//                     {
//                             "ContentType": "image/png",
//                             "Filename": "email-instagram-icon.png",
//                             "content": fs.createReadStream('./src/assets/images/email-instagram-icon.png'),
//                             "cid": "ig-icon"
//                     }
//                 ],
//                 "CustomID": "rsvpConfirmationToAttendee"
//             }
//         ]
//         });

//         request.then((result) => {
//             console.log(result.body)
//         })
//         .catch((err) => {
//             console.log(err.statusCode)
//         })
//         res.status(200).json({ status: 'Ok' });
//     }
//     catch (error) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Error' });
//     }
// });

// mailjetRouter.post('/rsvp-to-fcl', async function(req, res) {
//     try {
//         const auth = await getAuth();
//         const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

//         const source = fs.readFileSync('./src/app/core/email/fcl-rsvp-template.html', 'utf-8').toString();
//         const template = handlebars.compile(source);

//         const data = req.body;
//         const subject = data.subject;

//         const replacements = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             name: data.event.name,
//             date: data.date
//           };
//         const htmlToSend = template(replacements);

//         const request = mailjet.post("send", {'version': 'v3.1'}).request({
//         "Messages":[
//             {
//                 "From":
//                 {
//                     "Email": "forestcitylodgecontacts@gmail.com",
//                     "Name": "Forest City Lodge #388"
//                 },
//                 "To": [
//                     {
//                         "Email": SECRETARY_EMAIL_ADDRESS,
//                         "Name": "Forest City Lodge Secretary"
//                     }
//                 ],
//                 "Subject": subject,
//                 "TextPart": "RSVP Received",
//                 "HTMLPart": htmlToSend,
//                 "CustomID": "rsvpConfirmationToSecretary"
//             }
//         ]
//         });

//         request.then((result) => {
//             console.log(result.body)
//         })
//         .catch((err) => {
//             console.log(err.statusCode)
//         })
//         res.status(200).json({ status: 'Ok' });
//     }
//     catch (error) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Error' });
//     }
// });

// mailjetRouter.post('/rsvp-to-fcl', async function(req, res) {
//     try {
//         const auth = await getAuth();
//         const mailjet = require ('node-mailjet').connect(auth.mailjetPublicKey, auth.mailjetPrivateKey);

//         const source = fs.readFileSync('./src/app/core/email/fcl-rsvp-template.html', 'utf-8').toString();
//         const template = handlebars.compile(source);

//         const data = req.body;
//         const subject = data.subject;

//         const replacements = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             name: data.event.name,
//             date: data.date
//           };
//         const htmlToSend = template(replacements);

//         const request = mailjet.post("send", {'version': 'v3.1'}).request({
//         "Messages":[
//             {
//                 "From":
//                 {
//                     "Email": "forestcitylodgecontacts@gmail.com",
//                     "Name": "Forest City Lodge #388"
//                 },
//                 "To": [
//                     {
//                         "Email": SECRETARY_EMAIL_ADDRESS,
//                         "Name": "Forest City Lodge Secretary"
//                     }
//                 ],
//                 "Subject": subject,
//                 "TextPart": "RSVP Received",
//                 "HTMLPart": htmlToSend,
//                 "CustomID": "rsvpConfirmationToSecretary"
//             }
//         ]
//         });

//         request.then((result) => {
//             console.log(result.body)
//         })
//         .catch((err) => {
//             console.log(err.statusCode)
//         })
//         res.status(200).json({ status: 'Ok' });
//     }
//     catch (error) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Error' });
//     }
// });
module.exports = mailjetRouter;
