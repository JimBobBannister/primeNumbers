const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [
      function (context) {
        // verify id is in range between 0 and 1000000, todo use constants to lookup maximum number entry as this may change.
        if (context.id) {
          if (!parseInt(context.id) && !(parseInt(context.id) > -1 && parseInt(context.id) < 1000001)) {
            //throw new Error('id is incorrect. Range of id is from 0 to 1000000 (1M).');
            throw new errors.BadRequest('id (number entry) is incorrect. Range is from 0 to 1000000 (1M).');
          }
        }
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
