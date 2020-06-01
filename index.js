const express = require('express');
const Env = require('./Env');

const app = express();
const port = Env.get('PORT') || 3000;

app.get('/', (req, res) => res.send('Welcome to Keek'));

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Keek API service started at http://localhost:${port}`)
);
