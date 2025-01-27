import { Issuer } from 'openid-client';

(async () => {
  try {
    console.log('Starting OpenID discovery...');
    const issuer = await Issuer.discover('https://developer.intuit.com/.well-known/openid_sandbox_configuration');
    console.log('Discovered Issuer:', issuer.issuer);
  } catch (err) {
    console.error('Discovery failed:', err);
  }
})();
