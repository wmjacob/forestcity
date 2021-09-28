// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
// const handlebars = require('handlebars');
// const fs = require('fs');

// const GOOGLE_EMAIL_SECRET = 'email-credentials'

// const getAuth = async () => {
//   if (process.env.NODE_ENV !== 'development') {
//     const client = new SecretManagerServiceClient();
//     const name = `projects/forest-city-325620/secrets/${GOOGLE_EMAIL_SECRET}/versions/latest`;
//     const [version] = await client.accessSecretVersion({ name });
//     if (!version.payload || !version.payload.data || !version.payload.data.toString) {
//       res.status(500).json({ error: 'Internal Error' });
//       return;
//     }
//     return JSON.parse(Buffer.from(version.payload.data.toString(), 'base64'));
//   }
//   return {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//     recipient: process.env.GMAIL_RECIPIENT,
//   };
// }

// router.get('/status', function (_req, res) {
//   res.status(200).json({ status: 'UP' });
// });

// router.post('/rsvp-email-to-fcl', async function (req, res) {
//   try {
//     const auth = await getAuth();
//     const source = fs.readFileSync('./src/app/core/email/fcl-rsvp-template.html', 'utf-8').toString();
//     const template = handlebars.compile(source);

//     const transporter = nodemailer.createTransport({
//       auth: {
//         user: auth.user,
//         pass: auth.pass,
//       },
//       service: 'gmail',
//     });
//     const data = req.body;
//     const subject = data.subject;

//     const replacements = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       name: data.event.name,
//       date: data.date
//     };
//     const htmlToSend = template(replacements);

//     const mailOptions = {
//       subject,
//       from: auth.user,
//       to: auth.recipient,
//       html: htmlToSend,
//       attachments: [
//         {
//           filename: 'fcl-bell-color.png',
//           content: fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
//           cid: 'fcl-bell'
//         }
//       ]
//     };
//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (error, info) =>{
//         if (error) {
//           reject(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           resolve(true);
//         }
//       });
//     });
//     res.status(200).json({ status: 'Ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Error' });
//   }
// });

// router.post('/rsvp-email-to-user', async function (req, res) {
//   try {
//     const auth = await getAuth();
//     const source = fs.readFileSync('./src/app/core/email/attendee-rsvp-template.html', 'utf-8').toString();
//     const template = handlebars.compile(source);

//     const transporter = nodemailer.createTransport({
//       auth: {
//         user: auth.user,
//         pass: auth.pass,
//       },
//       service: 'gmail',
//     });
//     const data = req.body;
//     const subject = data.subject;
//     const recipient = data.email;

//     const replacements = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       name: data.event.name,
//       date: data.date
//     };
//     const htmlToSend = template(replacements);

//     const mailOptions = {
//       subject,
//       from: auth.user,
//       to: recipient,
//       html: `<p>RSVP Details:</p>
//             <ul>
//               <li>Name: ${data.firstName} ${data.lastName}</li>
//               <li>Date: ${data.date}</li>
//             </ul>`,
//       // attachments: [
//       //   {
//       //     filename: 'fcl-bell-color.png',
//       //     content: fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
//       //     cid: 'fcl-bell'
//       //   },
//       //   {
//       //     filename: 'email-fb-icon.png',
//       //     content: fs.createReadStream('./src/assets/images/email-fb-icon.png'),
//       //     cid: 'fb-icon'
//       //   },
//       //   {
//       //     filename: 'email-twitter-icon.png',
//       //     content: fs.createReadStream('./src/assets/images/email-twitter-icon.png'),
//       //     cid: 'twitter-icon'
//       //   },
//       //   {
//       //     filename: 'email-instagram-icon.png',
//       //     content: fs.createReadStream('./src/assets/images/email-instagram-icon.png'),
//       //     cid: 'ig-icon'
//       //   }
//       // ]
//     };
//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (error, info) =>{
//         if (error) {
//           reject(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           resolve(true);
//         }
//       });
//     });
//     res.status(200).json({ status: 'Ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Error' });
//   }
// });

// router.post('/contact-us-email-to-fcl', async function (req, res) {
//   try {
//     const auth = await getAuth();
//     const source = fs.readFileSync('./src/app/core/email/fcl-contact-us-template.html', 'utf-8').toString();
//     const template = handlebars.compile(source);

//     const transporter = nodemailer.createTransport({
//       auth: {
//         user: auth.user,
//         pass: auth.pass,
//       },
//       service: 'gmail',
//     });
//     const data = req.body;
//     const subject = data.subject;

//     const replacements = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       phoneNumber: data.phoneNumber,
//       message: data.message
//     };
//     const htmlToSend = template(replacements);

//     const mailOptions = {
//       subject,
//       from: auth.user,
//       to: auth.recipient,
//       html: htmlToSend,
//       attachments: [
//         {
//           filename: 'fcl-bell-color.png',
//           content: fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
//           cid: 'fcl-bell'
//         }
//       ]
//     };
//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (error, info) =>{
//         if (error) {
//           reject(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           resolve(true);
//         }
//       });
//     });
//     res.status(200).json({ status: 'Ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Error' });
//   }
// });

// router.post('/contact-us-email-to-user', async function (req, res) {
//   try {
//     const auth = await getAuth();
//     const source = fs.readFileSync('./src/app/core/email/enduser-contact-us-template.html', 'utf-8').toString();
//     const template = handlebars.compile(source);

//     const transporter = nodemailer.createTransport({
//       auth: {
//         user: auth.user,
//         pass: auth.pass,
//       },
//       service: 'gmail',
//     });
//     const data = req.body;
//     const subject = data.subject;
//     const recipient = data.email;

//     const replacements = {
//       firstName: data.firstName,
//       lastName: data.lastName
//     };
//     const htmlToSend = template(replacements);

//     const mailOptions = {
//       subject,
//       from: auth.user,
//       to: recipient,
//       html: htmlToSend,
//       attachments: [
//         {
//           filename: 'fcl-bell-color.png',
//           content: fs.createReadStream('./src/assets/images/fcl-bell-color.png'),
//           cid: 'fcl-bell'
//         },
//         {
//           filename: 'email-fb-icon.png',
//           content: fs.createReadStream('./src/assets/images/email-fb-icon.png'),
//           cid: 'fb-icon'
//         },
//         {
//           filename: 'email-twitter-icon.png',
//           content: fs.createReadStream('./src/assets/images/email-twitter-icon.png'),
//           cid: 'twitter-icon'
//         },
//         {
//           filename: 'email-instagram-icon.png',
//           content: fs.createReadStream('./src/assets/images/email-instagram-icon.png'),
//           cid: 'ig-icon'
//         }
//       ]
//     };
//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailOptions, (error, info) =>{
//         if (error) {
//           reject(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           resolve(true);
//         }
//       });
//     });
//     res.status(200).json({ status: 'Ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Error' });
//   }
// });

// module.exports = router;


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

module.exports = router;
