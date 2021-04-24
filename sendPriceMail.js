require('dotenv').config();

const rp = require('request-promise');

let mailFunction = require('./mailFunc.js');

let apiKey = process.env.API_KEY;

const fetchPriceAndSendEmail = () => {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
      'symbol':'BTC'
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
    json: true,
    gzip: true
  };
  
  let lowerTarget = 47100.00;
  let upperTarget = 53100.00;
  rp(requestOptions).then(response => {
    const btcPrice = response.data.BTC.quote.USD.price.toFixed(2)
    if(btcPrice < lowerTarget) {
      mailFunction.send('BTC', btcPrice, lowerTarget, upperTarget)
    } if(btcPrice > upperTarget) {
      mailFunction.send('BTC', btcPrice, lowerTarget, upperTarget)
    };
    console.log(btcPrice)
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
};

fetchPriceAndSendEmail();
setInterval(fetchPriceAndSendEmail, 5 * 60 * 1000);

