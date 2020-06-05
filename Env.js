const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  get: (envVariable) => process.env[envVariable],
};
