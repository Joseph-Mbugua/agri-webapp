const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const consumerKey = 'HTrW4FxWKrcMXAgIXM590XFY5Rl8iSQaPirSM7mLgT1OpoLU';
const consumerSecret = 'N7RVd2AHUbhmXcFxyJZJJOXlJzphNjPE49wAjkf5eAQygckAGdNDswvjFiUXcERL';
const shortcode = 'YOUR_SHORTCODE';
const passkey = 'YOUR_PASSKEY';
const callbackURL = 'https://yourdomain.com/mpesa-callback';

// Function to get OAuth token
const getOAuthToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting OAuth token:', error);
  }
};

// Function to get password
const getPassword = () => {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '');
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
  return { password, timestamp };
};

// Endpoint to initiate M-Pesa payment
app.post('/mpesa-payment', async (req, res) => {
  const { amount, phoneNumber, accountReference, transactionDesc } = req.body;

  const token = await getOAuthToken();
  const { password, timestamp } = getPassword();

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackURL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// Callback endpoint to handle M-Pesa payment responses
app.post('/mpesa-callback', (req, res) => {
  console.log('M-Pesa callback received:', req.body);
  // Handle the callback data here
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
