// Initializes the `primes` service on path `/primes`
const hooks = require('./primes.hooks');

const retrievePrimeNumbers = require('../../lib/utils').retrievePrimeNumbers;

module.exports = function (app) {
  // Initialize our service
  app.use('/primes', new PrimeNumbers());
  // Get our initialized service so that we can register hooks
  const service = app.service('primes');
  // register - see validation in hooks.
  service.hooks(hooks);
};

class PrimeNumbers {

  async find(params) {
    console.log(JSON.stringify(params))
    // Return the list of all primeNumbers
    return {results: primeNumbers};
  }

  async get(id, params) {
    // maximum number entry is defined via the id
    return retrievePrimeNumbers(params, id);
  }

  // following methods not implemented and a 404 error will be raised if access is attempted.
  async create(data, params) {
    throw new Error(`Not implemented`);
  }

  async patch(id, data, params) {
    throw new Error(`Not implemented`);
  }

  async remove(id, params) {
    throw new Error(`Not implemented`);
  }
}
