require('./server/index');
const { expect } = require('chai');

const appRoute = 'http://localhost:4000';

const getRoute = (route) => `${appRoute}${route}`;

module.exports = {
  expect,
  getRoute,
};
