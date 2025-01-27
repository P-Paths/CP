import express from 'express';
import bodyParser from 'body-parser';
import * as openidClient from 'openid-client'; // Import the whole module
const { Issuer } = openidClient; // Extract Issuer from the imported module

// Replace these placeholders with your actual client credentials
const client_id = 'AB5noVZbNGBW7NbeNlfCplrAW4ELRtWG3XL44GFWbyD6wpYQrz';
const client_secret = '9ckeLSWu63GLGSQnX2kwQSEGWbYOgkrImskCZH8t';
const redirect_uri = 'http://localhost:3000/callback';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

let client; // Declare client globally

// Middleware to check if the client is initialized
const ensureClientInitialized = (req, res, next) => {
  if (!client) {
    res.status(503).send('OAuth client not yet initialized. Please try again later.');
  } else {
    next();
  }
};

// Async function to configure the OpenID client
(async () => {
  try {
    console.log('Starting OpenID discovery...');
    const issuer = await Issuer.discover('https://developer.intuit.com/.well-known/openid_sandbox_configuration');
    console.log('Issuer discovered:', issuer.issuer);

    // Configure the client
    client = new issuer.Client({
      client_id,
      client_secret,
      redirect_uris: [redirect_uri],
      response_types: ['code'],
    });

    console.log('OAuth2 client configured successfully!');
  } catch (error) {
    console.error('Discovery failed:', error);
  }
})();

// Define a root route to handle GET /
app.get('/', (req, res) => {
  res.send('Welcome to the QuickBooks OAuth Server!');
});

// Define the authorization route with client initialization check
app.get('/authorize', ensureClientInitialized, (req, res) => {
  const authorizationUrl = client.authorizationUrl({
    scope: 'com.intuit.quickbooks.accounting openid profile email',
    redirect_uri,
  });
  res.redirect(authorizationUrl);
});

// Define the callback route with client initialization check
app.get('/callback', ensureClientInitialized, async (req, res) => {
  try {
    const params = client.callbackParams(req); // Get query params (e.g., code, state)
    const tokenSet = await client.callback(redirect_uri, params); // Exchange code for tokens
    console.log('Tokens received:', tokenSet);
    res.send('Authorization successful! Tokens are logged in the console.');
  } catch (err) {
    console.error('Callback error:', err);
    res.status(500).send('Authorization failed.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
