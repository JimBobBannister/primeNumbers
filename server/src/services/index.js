const primes = require('./primes/primes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(primes);
};
