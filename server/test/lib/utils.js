var expect    = require("chai").expect;
var retrievePrimeNumbers = require("../../src/lib/utils").retrievePrimeNumbers;

describe("Retrieve Prime Numbers", function() {
  describe("Initial Checks ", function () {

    it("deals with limit of just 1 entry", function () {
      let params = {query: {limit: 1, start: 0}};
      id = 9;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:1, offset: 0, results: [2], total:4});
    });

    it("deals with limit of limit of 12, but entry should only return 1 entry because id = 2", function () {
      let params = {query: {limit: 12, start: 0}};
      id = 2;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:12, offset: 0, results: [2], total:1});
    });

    it("deals with id = 0", function () {
      let params = {query: {limit: 12, start: 0}};
      id = 0;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:12, offset: 0, results: [], total:0});
    });

    it("deals with expected full page of entries of results when page size is 12, and using a prime number for id", function () {
      let params = {query: {limit: 12, start: 0}};
      id = 37;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:12, offset: 0, results: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37], total:12});
    });

    it("deals with expected partial page of entries of results when page size is 12, and a non-prime number id", function () {
      let params = {query: {limit: 12, start: 0}};
      id = 12;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:12, offset: 0, results: [2, 3, 5, 7, 11], total:5});
    });

    it("deals with expected partial page of entries of results when page size is 12, and a non-prime number id, and offset is 12", function () {
      let params = {query: {limit: 12, start: 12}};
      id = 44;
      let response = retrievePrimeNumbers(params, id);
      expect(response).to.deep.equal({limit:24, offset: 12, results: [41, 43 ], total:14});
    });

  });
});


