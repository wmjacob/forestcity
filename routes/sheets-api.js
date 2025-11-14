const express = require('express');
const sheetsRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { google } = require('googleapis');

const SHEETS_SECRET = 'sheets-credentials';
const RSVP_SHEETS_ID_SECRET = 'sheets-id';
const SOCIAL_RSVP_SHEETS_ID_SECRET = 'social-rsvp-sheet-id';

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
        const rsvpSheet = await getAuth(RSVP_SHEETS_ID_SECRET);
        const doc = new GoogleSpreadsheet(rsvpSheet.sheetId);
        const sheetsSecret = await getAuth(SHEETS_SECRET);
        
        await doc.useServiceAccountAuth({
            client_email: sheetsSecret.client_email,
            private_key: sheetsSecret.private_key
          });

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[eventNameDate];
        if(sheet) {
            if(data.fourthChoice) {
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.thirdChoiceCount, data.fourthChoiceCount, data.numberOfAttendees]
                );
            }
            else if(data.thirdChoice) {
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
            if(data.fourthChoice) {
                const HEADER_VALUES = ['Last Name', 'First Name', 'Email', 'Early Bird Dinner', 'Number of Meals', data.firstChoice, data.secondChoice, data.thirdChoice, data.fourthChoice, 'Number of Attendees'];
                sheet = await doc.addSheet({headerValues: HEADER_VALUES, title: eventNameDate});
                await sheet.addRow(
                    [data.lastName, data.firstName, data.email, data.earlyBirdDinner, data.numberOfMeals, data.firstChoiceCount, data.secondChoiceCount, data.thirdChoiceCount, data.fourthChoiceCount, data.numberOfAttendees]
                );
            }
            else if(data.thirdChoice) {
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

        const sheetsClient = await getSheetsClient(sheetsSecret);

        const sheetId = await getSheetId(rsvpSheet, sheetsClient);

        await highlightDuplicates(sheetId, rsvpSheet.sheetId, sheetsClient);
    }
    catch (error) {
        response.status(500).json({error: 'Internal Service Error: ' + error});
    }

    response.status(200).json({ status: 'Ok' });
});

sheetsRouter.post('/append-social-rsvp', async function(request, response) {
    try {
        const data = request.body;

        // event name and date for sheet titles
        const eventNameDate = data.event.name + ' ' + data.date;
        const rsvpSheet = await getAuth(SOCIAL_RSVP_SHEETS_ID_SECRET);
        const doc = new GoogleSpreadsheet(rsvpSheet.sheetId);
        const sheetsSecret = await getAuth(SHEETS_SECRET);

        await doc.useServiceAccountAuth({
            client_email: sheetsSecret.client_email,
            private_key: sheetsSecret.private_key
          });

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[eventNameDate];
        if(sheet) {
            await sheet.addRow(
                [data.lastName, data.firstName, data.email, data.numberOfAttendees]
            );
        }
        else {
            const HEADER_VALUES = ['Last Name', 'First Name', 'Email', 'Number of Attendees'];
            sheet = await doc.addSheet({headerValues: HEADER_VALUES, title: eventNameDate});
            await sheet.addRow(
                [data.lastName, data.firstName, data.email, data.numberOfAttendees]
            );
        }
    }
    catch (error) {
        response.status(500).json({error: 'Internal Service Error: ' + error});
    }
    response.status(200).json({ status: 'Ok' });
});

sheetsRouter.get('/read', async function(request, response) {
    try {
        // update this with required sheet name
        const eventNameDate = '50th Annual Brotherhood Night Wed, Dec 6, 2023';

        const rsvpSheet = await getAuth(RSVP_SHEETS_ID_SECRET);
        const doc = new GoogleSpreadsheet(rsvpSheet.sheetId);
        const sheetsSecret = await getAuth(SHEETS_SECRET);

        await doc.useServiceAccountAuth({
            client_email: sheetsSecret.client_email,
            private_key: sheetsSecret.private_key
        });

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[eventNameDate];

        await sheet.loadCells(); //load cells into cache

        let count = 0;
        for(let i = 2; i <= sheet.rowCount; i++) {
            // cell E for meals, I for attendees
            let cell = sheet.getCellByA1('E' + i);
            count = count + cell.value;
        }

        response.status(200).json({data: count});
    }
    catch(error) {
        console.error(error);
        response.status(500).json({error: 'Internal Service Error: ' + error});
    }

});

async function highlightDuplicates(sheetId, spreadsheetId, sheetsClient) {
    const column1Letter = 'A';
    const column2Letter = 'B';
    const requests = [{
        addConditionalFormatRule: {
            rule: {
                ranges: [{
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: null,
                    startColumnIndex: column1Letter.charCodeAt(0) - 'A'.charCodeAt(0), // Convert letter to 0-based index
                    endColumnIndex: column2Letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1, // End column is exclusive
                }],
                booleanRule: {
                    condition: {
                        type: 'CUSTOM_FORMULA',
                        values: [{
                            userEnteredValue: `=COUNTIFS($${column1Letter}$${startRowIndex + 1}:$${column1Letter}$${endRowIndex}, $${column1Letter}${startRowIndex + 1}, $${column2Letter}$${startRowIndex + 1}:$${column2Letter}$${endRowIndex}, $${column2Letter}${startRowIndex + 1}) > 1`,
                        }]
                    },
                    format: {
                        backgroundColor: {
                            red: 1.0,
                            green: 0.8,
                            blue: 0.8
                        }
                    }
                }
            },
            index: 0
        }
    }];

    try {
        const response = sheetsClient.spreadsheets.batchUpdate({
            spreadsheetId: spreadsheetId,
            resource: requests,
        });
        console.log('Conditional formatting rule added:', response.data);
    } catch (err) {
    console.error('Error adding conditional formatting rule:', err);
    }

}

async function getSheetsClient(sheetsSecret) {
    const client = new google.auth.JWT(
        sheetsSecret.client_email,
        null,
        sheetsSecret.private_key,
        ['https://www.googleapis.com/auth/spreadsheets'],
        null
    );
    return new Promise((resolve, reject) => {
        client.authorize((err, tokens) => {
            if (err) {
                reject(err);
            } else {
                google.options({
                    auth: client
                });
                resolve();
            }
        });
    });
}

async function getSheetId(rsvpSheet, sheetsClient) {
    const request = {
        spreadsheetId: rsvpSheet.sheetId,
        ranges: 'A1:B1',
        includeGridData: false
    };
    let res = await sheetsClient.spreadsheets.get(request);
    for(i = 0; i < res.sheets.length; i++) {
        if(res.sheets[i].title === eventNameDate) {
            return res.sheets[i].sheetId;
        }
    }
}

module.exports = sheetsRouter;
