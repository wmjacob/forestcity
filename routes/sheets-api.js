const express = require('express');
const sheetsRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SHEETS_SECRET = 'sheets-credentials';
const SHEETS_ID_SECRET = 'sheets-id';

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

        // event name and date for sheet titles
        const eventNameDate = data.event.name + ' ' + data.date;
        const rsvpSheet = await getAuth(SHEETS_ID_SECRET);
        const doc = new GoogleSpreadsheet(rsvpSheet.sheetId);
        const sheetsSecret = await getAuth(SHEETS_SECRET);

        await doc.useServiceAccountAuth({
            client_email: sheetsSecret.client_email,
            private_key: sheetsSecret.private_key
          });

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[eventNameDate];
        if(sheet) {
            if(data.thirdChoice) {
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.thirdChoiceCount, data.numberOfAttendees]
                );
            }
            else {
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.numberOfAttendees]
                );
            }

        }
        else {
            if(data.thirdChoice) {
                const HEADER_VALUES = ['Last Name', 'First Name', 'Email', 'Early Bird Dinner', 'Number of Meals', data.firstChoice, data.secondChoice, data.thirdChoice, 'Number of Attendees'];
                sheet = await doc.addSheet({headerValues: HEADER_VALUES, title: eventNameDate});
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.thirdChoiceCount, data.numberOfAttendees]
                );
            }
            else {
                const HEADER_VALUES = ['Last Name', 'First Name', 'Email', 'Early Bird Dinner', 'Number of Meals', data.firstChoice, data.secondChoice, 'Number of Attendees'];
                sheet = await doc.addSheet({headerValues: HEADER_VALUES, title: eventNameDate});
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.numberOfAttendees]
                );
            }
        }
    }
    catch (error) {
        response.status(500).json({error: 'Internal Service Error: ' + error});
    }
    response.status(200).json({ status: 'Ok' });
});

sheetsRouter.post('/read', async function(request, response) {
    try {
        // update this with required sheet name
        const eventNameDate = 'Table Lodge Wed, Jun 21, 2023';

        const rsvpSheet = await getAuth(SHEETS_ID_SECRET);
        const doc = new GoogleSpreadsheet(rsvpSheet.sheetId);
        const sheetsSecret = await getAuth(SHEETS_SECRET);

        await doc.useServiceAccountAuth({
            client_email: sheetsSecret.client_email,
            private_key: sheetsSecret.private_key
        });

        let filter = eventNameDate + '!I:I';
        await doc.loadInfo();

        doc.loadCells(filter).then((result) => {
            response.status(200).json({data: result});
        })
        .catch((error) => {
            console.error(error.statusCode);
            response.status(500).json({error: 'Internal Service Error: ' + error});
        })
    }
    catch(error) {
        console.error(error);
        response.status(500).json({error: 'Internal Service Error: ' + error});
    }

});

module.exports = sheetsRouter;
