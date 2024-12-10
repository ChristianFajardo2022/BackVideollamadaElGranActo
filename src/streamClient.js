// src/streamClient.js
const { StreamVideo } = require('@stream-io/node-sdk');
require('dotenv').config();

const { API_KEY, API_SECRET } = process.env;

if (!API_KEY || !API_SECRET) {
  throw new Error('Faltan API_KEY o API_SECRET en el archivo .env');
}

const client = new StreamVideo({
  apiKey: API_KEY,
  secret: API_SECRET,
});

module.exports = { client };
