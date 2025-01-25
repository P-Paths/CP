import * as openidClient from 'openid-client'; // Imports the entire openid-client library

// Replace these placeholders with your actual client credentials
const client_id = 'AB5noVZbNGBW7NbENLfCplrAW4ELRtWG3XL44GFWbyD6wpYQrz';
const client_secret = '9ckeLSWu63GLGSQnX2kwQSEGWbYOgkrImskCZH8t';
const redirect_uri = 'http://localhost:3000/callback';

(async () => {
    try {
        console.log('Starting OpenID discovery...'); // Logs the start of discovery

        // Debugging: Log the entire openidClient object to see its properties
        console.log('openidClient:', openidClient);

        // Discover the OpenID configuration
        const issuer = await openidClient.discovery(
            new URL('https://developer.intuit.com/.well-known/openid_sandbox_configuration')
        ).catch(err => {
            console.error('Discovery failed:', err); // Catch and log discovery errors
            return null; // Return null to handle the error gracefully
        });

        if (!issuer) {
            console.error('Issuer discovery failed. Exiting...');
            return; // Exit if discovery fails
        }

        console.log('Discovered Issuer:', issuer); // Log the Issuer object after discovery

        // Configure the client
        const client = new issuer.Client({
            client_id,
            client_secret,
            redirect_uris: [redirect_uri],
            response_types: ['code'],
        });

        console.log('OAuth2 client configured successfully'); // Log success message
    } catch (error) {
        console.error('Error configuring OAuth2 client:', error); // Log any errors
    }
})();



