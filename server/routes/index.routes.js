import express from 'express';

const indexRoute = express.Router();

indexRoute.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Keek API (Version 1)',
  });
});

export default indexRoute;
