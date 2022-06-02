const express = require('express');
const recaptchaRouter = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const RECAPTCHA_SECRET_KEY = 'recaptcha-secret-key';

const getSecretKey = async (secretCredentials) => {
    if(process.env.NODE_ENV !== 'development') {
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

recaptchaRouter.post('/submitContactUs', async function(request, response) {
    try {
        const data = request.body;

        const recaptchaSecretKey = await getSecretKey(RECAPTCHA_SECRET_KEY);



        //post token and secretkey to
        // https://www.google.com/recaptcha/api/siteverify

    }
    catch(error) {

    }
});

module.exports = recaptchaRouter;
