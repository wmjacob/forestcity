const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const PROJECT_ID = 'forest-city-325620';
const GLOBAL_SECRET_NAME = 'website-secret';

/** Keys inside the global-secret JSON payload (former per-secret names). */
const KEYS = {
  EMAIL: 'email-credentials',
  MAILJET: 'mailjet-credentials',
  WM_EMAIL: 'worshipful-master-email',
  SECRETARY_EMAIL: 'secretary-email',
  ASSOC_SECRETARY_EMAIL: 'associate-secretary-email',
  SUNSHINE_COCHAIR_1: 'sunshine-committee-cochair-1',
  SUNSHINE_COCHAIR_2: 'sunshine-committee-cochair-2',
  SHEETS: 'sheets-credentials',
  RSVP_SHEET_ID: 'sheets-id',
  MITZVAH_RSVP_SHEET_ID: 'mitzvah-rsvp-sheet-id',
};

let cachedSecrets = null;

async function loadGlobalSecrets() {
  if (cachedSecrets) {
    return cachedSecrets;
  }
  const client = new SecretManagerServiceClient();
  const name = `projects/${PROJECT_ID}/secrets/${GLOBAL_SECRET_NAME}/versions/latest`;
  const [version] = await client.accessSecretVersion({ name });
  if (!version.payload?.data) {
    throw new Error('Failed to load global-secret from Secret Manager');
  }
  const raw = version.payload.data.toString('utf8');
  try {
    cachedSecrets = JSON.parse(raw);
  } catch {
    cachedSecrets = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  }
  return cachedSecrets;
}

function getDevSecret(key) {
  switch (key) {
    case KEYS.MAILJET:
      return {
        mailjetPublicKey: process.env.MAILJET_PUBLIC_KEY || process.env.GMAIL_USER,
        mailjetPrivateKey: process.env.MAILJET_PRIVATE_KEY || process.env.GMAIL_PASS,
      };
    case KEYS.EMAIL:
      return {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
        recipient: process.env.GMAIL_RECIPIENT,
      };
    case KEYS.WM_EMAIL:
      return { email: process.env.WORSHIPFUL_MASTER_EMAIL };
    case KEYS.SECRETARY_EMAIL:
      return { email: process.env.SECRETARY_EMAIL };
    case KEYS.ASSOC_SECRETARY_EMAIL:
      return { email: process.env.ASSOCIATE_SECRETARY_EMAIL };
    case KEYS.SUNSHINE_COCHAIR_1:
      return { email: process.env.SUNSHINE_COMMITTEE_COCHAIR_1_EMAIL };
    case KEYS.SUNSHINE_COCHAIR_2:
      return { email: process.env.SUNSHINE_COMMITTEE_COCHAIR_2_EMAIL };
    case KEYS.SHEETS:
      return {
        client_email: process.env.SHEETS_CLIENT_EMAIL,
        private_key: (process.env.SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      };
    case KEYS.RSVP_SHEET_ID:
      return { sheetId: process.env.RSVP_SHEET_ID };
    case KEYS.MITZVAH_RSVP_SHEET_ID:
      return { sheetId: process.env.MITZVAH_RSVP_SHEET_ID };
    default:
      throw new Error(`Unknown secret key: ${key}`);
  }
}

async function getSecret(key) {
  if (process.env.NODE_ENV === 'development') {
    return getDevSecret(key);
  }
  const secrets = await loadGlobalSecrets();
  if (secrets[key] === undefined) {
    throw new Error(`global-secret is missing key: ${key}`);
  }
  return secrets[key];
}

module.exports = { getSecret, KEYS };
