import socket from 'socket.io';
import koii from 'koii';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes/index';
import sockets from './socket';

const express = require('express');
const Env = require('../Env');

const app = express();
const baseUrl = '/v1';
const port = Env.get('PORT') || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`${baseUrl}`, routes);

// displays endpoints when the server starts

app.get('/', (req, res) => res.status(200).send('Welcome to Keek'));

app.use(koii);

// catch invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

const server = app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Keek API service started at http://localhost:${port}`)
);

// socket setup
const io = socket(server);
sockets(io);

module.exports = app;
