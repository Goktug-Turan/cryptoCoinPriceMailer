require('dotenv').config();

const rp = require('request-promise');

let apiKey = process.env.API_KEY;
let userEmail = process.env.EMAIL_USER;
let userEmailPass = process.env.EMAIL_PASS;
let emailRecipients = process.env.EMAIL_RECIPIENTS;

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
  },
  headers: {
    'X-CMC_PRO_API_KEY': apiKey,
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});

