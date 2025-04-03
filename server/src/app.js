const express = require('express');
const cors = require('cors');
const api = require('./api.js');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', api);

module.exports = app;
