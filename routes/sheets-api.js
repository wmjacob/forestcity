const express = require('express');
const sheetsRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const googleSheets = require('@googleapis/sheets');
const fs = require('fs');

const SHEETS_SECRET = 'sheets-credentials';
const SHEETS_ID_SECRET = 'sheets-id';

const HEADER_VALUES = ['Last Name', 'First Name', 'Email', 'Early Bird Dinner', 'Number of Meals', 'Meal Choice'];

sheetsRouter.get('/status', function (_req, res) {
    res.status(200).json({ status: 'UP' });
});

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
}

sheetsRouter.post('/append-rsvp', async function(request, response) {
    try {
        const data = request.body;
        const eventNameDate = data.event.name + ' ' + data.date; // event name and date for sheets/tabs
        // check if the sheet exists, if so, append, if not, create the page and add the row

        const sheetsSecret = await getAuth(SHEETS_SECRET);

        // const sheetsCreds = {
        //     client_email: sheetsSecret.client_email,
        //     private_key: sheetsSecret.private_key
        // }

        let jwtClient = new googleSheets.auth.JWT(sheetsSecret.client_email,
                                            null,
                                            sheetsSecret.private_key,
                                            ["https://www.googleapis.com/auth/spreadsheets"]);

        jwtClient.authorize(function(err, tokens) {
            if (err) {
                console.log(err);
                return;
              } else {
                console.log("Successfully connected!");
              }
        });

        // const auth = new googleSheets.auth.GoogleAuth({
        //     credentials: sheetsCreds,
        //     scopes: [
        //         'https://www.googleapis.com/auth/spreadsheets'
        //     ]
        // });

        // const authClient = await auth.getClient();
        const sheets = googleSheets.sheets({version: 'v4', auth: jwtClient});
        const rsvpSheet = await getAuth(SHEETS_ID_SECRET);

        let sheetsRequest = await sheets.spreadsheets.values.get({spreadsheetId: rsvpSheet.sheetId});
        console.log(sheetsRequest.data);

        const res = await sheets.spreadsheets.values.append({
            spreadsheetId : rsvpSheet.sheetId,
            range : "A1:F1",
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [
                [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.mealSelection]
              ],
            },
          });
          console.log(res.data);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({error: 'Internal Service Error'});
    }

});

module.exports = sheetsRouter;
